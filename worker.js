// Harmonia Frequency Studio — Cloudflare Worker starter
// 1. Create a Worker and bind the Workers AI service as "AI" in Cloudflare.
// 2. Add this file as the Worker entry point.
// 3. Deploy, then set window.HARMONIA_API_URL in index.html to the Worker URL.
// This endpoint uses a server-side binding: no provider secret is exposed in browser code.
export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json; charset=utf-8"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return new Response(JSON.stringify({ error: "Use POST" }), { status: 405, headers: cors });
    if (!env.AI) return new Response(JSON.stringify({ error: "Workers AI binding 'AI' is not configured." }), { status: 503, headers: cors });
    try {
      const body = await request.json();
      const message = typeof body.message === "string" ? body.message.trim().slice(0, 4000) : "";
      if (!message) return new Response(JSON.stringify({ error: "Message required." }), { status: 400, headers: cors });
      const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          { role: "system", content: "Tu es l'assistant en français de Harmonia Frequency Studio. Aide pour la navigation, les produits et la création de sites web. Sois honnête sur les limites, n'invente jamais de prix ou de stock. Ne prétends pas diagnostiquer ou traiter des maladies et rappelle que les appareils ne remplacent pas un professionnel de santé." },
          { role: "user", content: message }
        ]
      });
      const reply = result?.response || result?.result?.response || "Je n'ai pas pu générer de réponse.";
      return new Response(JSON.stringify({ reply }), { headers: cors });
    } catch (e) {
      return new Response(JSON.stringify({ error: "AI request failed." }), { status: 500, headers: cors });
    }
  }
};