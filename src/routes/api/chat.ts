import { createFileRoute } from "@tanstack/react-router";

// n8n webhooks come in two flavors:
//   - TEST:       https://<host>/webhook-test/<id>  → only live while the editor
//                 is open AND you've clicked "Listen for test event"; each click
//                 accepts exactly ONE request, then returns 404
//                 "webhook \"<id>\" is not registered". Reopen / re-listen and
//                 it works again for one request.
//   - PRODUCTION: https://<host>/webhook/<id>       → always live, but ONLY when
//                 the workflow's "Active" toggle (top-right of the editor) is ON.
//                 Inactive workflows return 404 with the same "not registered"
//                 message.
//
// Configurable via the N8N_WEBHOOK_URL env var so you can switch between test
// and production without editing code. Defaults to the test URL for local
// debugging against "Listen for test event".
const DEFAULT_N8N_WEBHOOK_URL =
  "https://ashutosh2005.app.n8n.cloud/webhook/campus-chat";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookUrl = process.env.N8N_WEBHOOK_URL || DEFAULT_N8N_WEBHOOK_URL;

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

        const requestBody = JSON.stringify({
          message,
          timestamp: new Date().toISOString(),
        });

        // Log outgoing request so you can confirm the exact URL + body in
        // the dev-server logs.
        console.log("[api/chat] → POST", webhookUrl, "body:", requestBody);

        try {
          const res = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: requestBody,
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

          console.log(
            "[api/chat] ← n8n",
            res.status,
            "content-type:",
            contentType,
            "body:",
            typeof reply === "string" ? reply.slice(0, 500) : reply,
          );

          if (!res.ok) {
            // Surface n8n's own message + a hint so the UI shows why it failed.
            const isTestUrl = webhookUrl.includes("/webhook-test/");
            const hint =
              res.status === 404
                ? isTestUrl
                  ? "n8n test webhooks only accept ONE request per click of 'Listen for test event'. Click it again in n8n, then retry. For always-on use, switch to the production URL (/webhook/<id>) and activate the workflow."
                  : "n8n production webhook is not registered. Open the workflow in n8n and toggle 'Active' ON (top-right)."
                : undefined;
            return Response.json(
              {
                error: `n8n webhook returned ${res.status}`,
                url: webhookUrl,
                details: reply,
                hint,
              },
              { status: 502 },
            );
          }

          return Response.json({ reply: reply || "(no response)", raw });
        } catch (err) {
          console.error("[api/chat] fetch failed:", err);
          return Response.json(
            {
              error: err instanceof Error ? err.message : "Failed to reach n8n",
              url: webhookUrl,
            },
            { status: 502 },
          );
        }
      },
    },
  },
});
