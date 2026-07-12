import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, tool, stepCountIs, type UIMessage } from "ai";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { createLovableAiGateway } from "@/lib/ai-gateway.server";

const SYSTEM_PROMPT = `You are SageSync, a friendly, concise AI assistant for first-year students at Sage University Indore.

You help with two things:
1. Answering common Sage University Indore campus questions (hostel fees, library timings, mess timings, office timings, campus locations, hostel rules, bus timings, WiFi, admissions, scholarships, student services, medical, sports, whom to contact).
2. Raising complaints (hostel maintenance, electricity, water leakage, mess, WiFi, cleaning, security, admin).

Guidelines:
- Be warm, professional, and student-focused. Keep answers short and clear. Use markdown (short lists, **bold** for key info).
- If asked something you truly don't know specific to Sage University Indore, recommend the appropriate office to contact rather than guessing.
- Provide reasonable general defaults when helpful (e.g. "Most campus libraries are open 8am–10pm — check with your library desk for exact hours.").

Complaints:
- When a user wants to raise a complaint, collect: Name, Student ID, Hostel Block, Room Number, Category, and a short Description.
- Ask for any missing fields in a single friendly message. Do NOT ask for them one-by-one.
- Once you have all fields, call the submit_complaint tool. After the tool returns, confirm to the user with the Complaint ID and reassure them the team will follow up.
- If a field is genuinely optional (e.g. block for a non-hostel complaint), you may pass "N/A".`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("Messages required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const supabase = createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_PUBLISHABLE_KEY!,
          { auth: { persistSession: false, autoRefreshToken: false } },
        );

        const gateway = createLovableAiGateway(key);
        const model = gateway("google/gemini-2.5-flash");

        const result = streamText({
          model,
          system: SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages),
          stopWhen: stepCountIs(5),
          tools: {
            submit_complaint: tool({
              description:
                "Submit a student complaint to the campus maintenance/admin database. Only call once you have all required fields.",
              inputSchema: z.object({
                student_name: z.string().describe("Full name of the student"),
                student_id: z.string().describe("Student ID / roll number"),
                hostel_block: z.string().describe("Hostel block, or 'N/A' if not applicable"),
                room_number: z.string().describe("Room number, or 'N/A' if not applicable"),
                category: z
                  .string()
                  .describe(
                    "One of: Hostel Maintenance, Electricity, Water, Mess, WiFi, Cleaning, Security, Administrative, Other",
                  ),
                description: z.string().describe("Short description of the issue"),
              }),
              execute: async (input) => {
                const { data, error } = await supabase
                  .from("complaints")
                  .insert({
                    student_name: input.student_name,
                    student_id: input.student_id,
                    hostel_block: input.hostel_block,
                    room_number: input.room_number,
                    category: input.category,
                    description: input.description,
                  })
                  .select("complaint_code")
                  .single();
                if (error) {
                  return { success: false, error: error.message };
                }
                return { success: true, complaint_id: data.complaint_code };
              },
            }),
          },
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
