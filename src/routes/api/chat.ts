import { createFileRoute } from "@tanstack/react-router";

const N8N_WEBHOOK_URL =
  "https://ashutosh2005.app.n8n.cloud/webhook-test/0be283df-ac6d-4d36-8c5f-84c16625fa02";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: { message?: string; history?: unknown } = {};
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const message = (payload.message ?? "").toString().trim();
        if (!message) {
          return Response.json({ error: "Message required" }, { status: 400 });
        }

        try {
          const res = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message,
              history: payload.history ?? [],
              timestamp: new Date().toISOString(),
            }),
          });

          const contentType = res.headers.get("content-type") ?? "";
          let reply = "";
          let raw: unknown = null;
          if (contentType.includes("application/json")) {
            raw = await res.json();
            const r = raw as Record<string, unknown>;
            reply =
              (typeof r?.reply === "string" && r.reply) ||
              (typeof r?.output === "string" && r.output) ||
              (typeof r?.message === "string" && r.message) ||
              (typeof r?.text === "string" && r.text) ||
              (typeof r?.answer === "string" && r.answer) ||
              "";
            if (!reply) reply = JSON.stringify(raw);
          } else {
            reply = await res.text();
            raw = reply;
          }

          if (!res.ok) {
            return Response.json(
              { error: `n8n webhook returned ${res.status}`, details: reply },
              { status: 502 },
            );
          }

          return Response.json({ reply: reply || "(no response)", raw });
        } catch (err) {
          return Response.json(
            { error: err instanceof Error ? err.message : "Failed to reach n8n" },
            { status: 502 },
          );
        }
      },
    },
  },
});
