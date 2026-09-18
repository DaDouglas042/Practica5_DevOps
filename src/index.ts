/**
 * Practica 5 - Infraestructura para el Desarrollo Continuo
 * Cloudflare Worker con despliegue continuo (CI/CD) via GitHub Actions
 * Modificado con Inteligencia Artificial (Pasos 10 y 11)
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api/status") {
			const statusData = {
				status: "ok",
				timestamp: new Date().toISOString(),
				student: "Francisco de Jesús Delgado Carrasco",
				course: "Infraestructura para el desarrollo continuo",
				practice: "Práctica 5 - Integrate a Cloudflare App",
				pipeline: "GitHub Actions (CI/CD)",
				worker: "crimson-grass-4362",
				modifiedByAI: true,
			};
			return new Response(JSON.stringify(statusData, null, 2), {
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
					"Access-Control-Allow-Origin": "*",
				},
			});
		}

		const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Práctica 5 - Cloudflare & GitHub Actions | ITESO</title>
  <style>
    :root {
      --bg-primary: #0b0f19;
      --bg-card: #111827;
      --border-card: #1f2937;
      --accent-cf: #f38020;
      --accent-gh: #238636;
      --text-main: #f9fafb;
      --text-muted: #9ca3af;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg-primary);
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem 1rem;
    }
    .container {
      max-width: 720px;
      width: 100%;
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 16px;
      padding: 2.5rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.6);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.825rem;
      font-weight: 600;
      background: rgba(35, 134, 54, 0.15);
      color: #3fb950;
      border: 1px solid rgba(56, 139, 253, 0.2);
      margin-bottom: 1.5rem;
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #3fb950;
      box-shadow: 0 0 10px #3fb950;
    }
    h1 {
      font-size: 1.85rem;
      font-weight: 700;
      line-height: 1.25;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 1rem;
      margin-bottom: 2rem;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
    .card {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border-card);
      border-radius: 10px;
      padding: 1rem;
    }
    .card-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.35rem;
    }
    .card-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text-main);
      word-break: break-all;
    }
    .ai-banner {
      background: linear-gradient(135deg, rgba(243, 128, 32, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
      border: 1px solid rgba(243, 128, 32, 0.3);
      border-radius: 12px;
      padding: 1.25rem;
      margin-top: 1.5rem;
    }
    .ai-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: #fb923c;
      margin-bottom: 0.35rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .ai-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.5;
    }
    footer {
      margin-top: 2rem;
      padding-top: 1rem;
      border-top: 1px solid var(--border-card);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    a { color: #58a6ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">
      <span class="badge-dot"></span>
      CI/CD Pipeline Activo &bull; Despliegue Exitoso
    </div>
    <h1>Práctica 5 - Integración de Cloudflare</h1>
    <p class="subtitle">Infraestructura para el Desarrollo Continuo &bull; ITESO</p>

    <div class="grid">
      <div class="card">
        <div class="card-label">Alumno</div>
        <div class="card-value">Francisco de Jesús Delgado Carrasco</div>
      </div>
      <div class="card">
        <div class="card-label">Cloudflare Worker</div>
        <div class="card-value">crimson-grass-4362</div>
      </div>
      <div class="card">
        <div class="card-label">Pipeline de CI/CD</div>
        <div class="card-value">GitHub Actions (Deploy Worker)</div>
      </div>
      <div class="card">
        <div class="card-label">Repositorio</div>
        <div class="card-value"><a href="https://github.com/DaDouglas042/Practica5_DevOps" target="_blank">DaDouglas042/Practica5_DevOps</a></div>
      </div>
    </div>

    <div class="ai-banner">
      <div class="ai-title">⚡ Modificación con IA completada (Paso 10 y 11)</div>
      <div class="ai-desc">
        Este proyecto fue modificado exitosamente mediante Inteligencia Artificial. Al realizar el merge a la rama principal (main), el pipeline de GitHub Actions se dispara automáticamente, ejecuta los tests unitarios con Vitest y despliega la nueva versión en la red Edge de Cloudflare sin intervención manual.
      </div>
    </div>

    <footer>
      <span>Endpoint API: <a href="/api/status">/api/status</a></span>
      <span>Cloudflare Workers + GitHub Actions</span>
    </footer>
  </div>
</body>
</html>`;

		return new Response(html, {
			headers: {
				"Content-Type": "text/html; charset=UTF-8",
			},
		});
	},
} satisfies ExportedHandler<Env>;
