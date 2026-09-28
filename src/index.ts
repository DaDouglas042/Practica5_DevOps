type D1Database = any;
type ExecutionContext = any;

export interface Env {
  p6: D1Database;
}

export default {
  async fetch(request: any, env: Env, ctx?: ExecutionContext): Promise<any> {
    const url = new (globalThis as any).URL(request.url);

    let dbResults: any[] = [];
    let dbError: string | null = null;

    try {
      const { results } = await env.p6.prepare("SELECT * FROM users;").all();
      dbResults = results || [];
    } catch (err: any) {
      dbError = err.message || "Error al consultar la base de datos";
    }

    if (url.pathname === "/api/db") {
      return new (globalThis as any).Response(
        JSON.stringify(
          {
            status: dbError ? "error" : "success",
            database: "p6",
            count: dbResults.length,
            data: dbResults,
            error: dbError,
          },
          null,
          2
        ),
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (url.pathname === "/api/status") {
      const statusData = {
        status: "ok",
        timestamp: new Date().toISOString(),
        student: "Francisco de Jesús Delgado Carrasco",
        course: "Infraestructura para el desarrollo continuo",
        practice: "Práctica 6 - Include database",
        databaseBinding: "p6",
        recordsCount: dbResults.length,
      };
      return new (globalThis as any).Response(
        JSON.stringify(statusData, null, 2),
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    let tableRows = "";
    if (dbError) {
      tableRows = `<tr><td colspan="3" style="color: #ef4444; padding: 12px; text-align: center;">Error al leer D1: ${dbError}</td></tr>`;
    } else if (dbResults.length === 0) {
      tableRows = `<tr><td colspan="3" style="color: var(--text-muted); padding: 12px; text-align: center;">No hay registros en la tabla 'users'</td></tr>`;
    } else {
      tableRows = dbResults
        .map(
          (row: any) => `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid var(--border-card);">${row.id ?? "-"}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid var(--border-card);">${row.name ?? "-"}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid var(--border-card);">${row.email ?? "-"}</td>
          </tr>`
        )
        .join("");
    }

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Práctica 6 - Cloudflare D1 Database | ITESO</title>
  <style>
    :root {
      --bg-primary: #0b0f19;
      --bg-card: #111827;
      --border-card: #1f2937;
      --accent-cf: #f38020;
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
      background: rgba(243, 128, 32, 0.15);
      color: #f97316;
      border: 1px solid rgba(243, 128, 32, 0.3);
      margin-bottom: 1.5rem;
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #f97316;
      box-shadow: 0 0 10px #f97316;
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
    .db-section {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border-card);
      border-radius: 12px;
      padding: 1.25rem;
      margin-top: 1.5rem;
    }
    .db-title {
      font-size: 1rem;
      font-weight: 700;
      color: #38bdf8;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      text-align: left;
    }
    th {
      padding: 8px 12px;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border-card);
      font-weight: 600;
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
    a { color: #38bdf8; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">
      <span class="badge-dot"></span>
      Cloudflare D1 Database Conectada
    </div>
    <h1>Práctica 6 - Base de Datos SQLite D1</h1>
    <p class="subtitle">Infraestructura para el Desarrollo Continuo &bull; ITESO</p>

    <div class="grid">
      <div class="card">
        <div class="card-label">Alumno</div>
        <div class="card-value">Francisco de Jesús Delgado Carrasco</div>
      </div>
      <div class="card">
        <div class="card-label">Base de Datos Binding</div>
        <div class="card-value">p6 (Cloudflare D1)</div>
      </div>
    </div>

    <div class="db-section">
      <div class="db-title">🗄️ Registros leídos desde la BD (D1)</div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>

    <footer>
      <span>Endpoints: <a href="/api/db">/api/db</a> &bull; <a href="/api/status">/api/status</a></span>
      <span>Cloudflare Workers + D1</span>
    </footer>
  </div>
</body>
</html>`;

    return new (globalThis as any).Response(html, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    });
  },
};