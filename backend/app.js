const http = require("http");
const parser = require("querystring");
const helper = require("./helper.js");

function handle(req, res) {
  console.log(req.method, req.url);
  if (req.url === "/create" && req.method === "POST") {
    let body = "";
    req.on("data", (piece) => {
      body += piece;
    });

    req.on("end", () => {
      const formData = parser.parse(body);
      console.log(formData);

      const escapeHtml = (value) => String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

      const rows = [
        ["Model ID", formData.modelId],
        ["Model Name", formData.modelName],
        ["Developer", formData.developer],
        ["Release Year", formData.releaseYear],
      ]
        .map(
          ([label, value]) => `
            <tr>
              <th>${escapeHtml(label)}</th>
              <td>${escapeHtml(value)}</td>
            </tr>`
        )
        .join("");

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Data Received</title>
          <style>
            * { box-sizing: border-box; }

            body {
              margin: 0;
              min-height: 100vh;
              padding: 40px 20px;
              background:
                radial-gradient(circle at top, rgba(88, 101, 242, 0.18), transparent 35%),
                linear-gradient(180deg, #0b1020 0%, #090d18 55%, #060912 100%);
              color: #e5ebff;
              font-family: "Segoe UI", "SF Pro Display", sans-serif;
            }

            .page {
              width: min(900px, 100%);
              margin: 0 auto;
            }

            .hero {
              margin-bottom: 24px;
              padding: 24px 22px;
              border: 1px solid rgba(143, 156, 255, 0.18);
              border-radius: 22px;
              background: rgba(10, 15, 29, 0.82);
              box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
              backdrop-filter: blur(18px);
            }

            .eyebrow {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 12px;
              padding: 8px 12px;
              border-radius: 999px;
              background: rgba(102, 118, 255, 0.14);
              color: #d9e1ff;
              font-size: 0.78rem;
              font-weight: 700;
              letter-spacing: 0.12em;
              text-transform: uppercase;
            }

            h1 {
              margin: 0;
              font-size: clamp(2rem, 4vw, 3rem);
              color: #f4f7ff;
            }

            .subtitle {
              margin: 10px 0 0;
              color: #b8c2e8;
              line-height: 1.6;
            }

            .panel {
              margin-top: 20px;
              padding: 22px;
              border: 1px solid rgba(143, 156, 255, 0.18);
              border-radius: 20px;
              background: rgba(10, 15, 29, 0.72);
              box-shadow: 0 20px 44px rgba(0, 0, 0, 0.26);
            }

            .panel h2 {
              margin: 0 0 16px;
              font-size: 1.05rem;
              color: #d9e1ff;
              letter-spacing: 0.06em;
              text-transform: uppercase;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              overflow: hidden;
            }

            th,
            td {
              padding: 14px 16px;
              border-bottom: 1px solid rgba(143, 156, 255, 0.12);
              text-align: left;
            }

            th {
              width: 34%;
              font-size: 0.84rem;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: #d9e1ff;
              background: rgba(255, 255, 255, 0.03);
            }

            td {
              color: #eef2ff;
              word-break: break-word;
            }

            tr:last-child th,
            tr:last-child td {
              border-bottom: 0;
            }

            .raw {
              margin-top: 16px;
              padding: 16px;
              border-radius: 16px;
              background: rgba(255, 255, 255, 0.04);
              border: 1px solid rgba(143, 156, 255, 0.14);
              color: #cdd6f7;
              overflow-x: auto;
              white-space: pre-wrap;
              word-break: break-word;
            }

            .actions {
              margin-top: 20px;
              display: flex;
              gap: 12px;
              flex-wrap: wrap;
            }

            .button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              padding: 12px 18px;
              border-radius: 12px;
              text-decoration: none;
              font-weight: 700;
              background: linear-gradient(135deg, #6676ff 0%, #3aa7ff 100%);
              color: #f8fbff;
              box-shadow: 0 12px 28px rgba(62, 116, 255, 0.26);
            }

            .button.secondary {
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(143, 156, 255, 0.18);
              color: #e5ebff;
              box-shadow: none;
            }

            @media (max-width: 640px) {
              body {
                padding: 24px 14px 32px;
              }

              .hero,
              .panel {
                padding: 18px;
                border-radius: 18px;
              }

              th {
                width: 42%;
              }

              .actions {
                flex-direction: column;
              }

              .button {
                width: 100%;
              }
            }
          </style>
        </head>
        <body>
          <main class="page">
            <section class="hero">
              <span class="eyebrow">Data Received</span>
              <h1>Model saved successfully</h1>
              <p class="subtitle">The form submission has been captured and the submitted values are shown below for quick review.</p>
            </section>

            <section class="panel">
              <h2>Submitted Data</h2>
              <table>
                <tbody>
                  ${rows}
                </tbody>
              </table>

              <h2 style="margin-top: 22px;">Raw Body</h2>
              <div class="raw">${escapeHtml(body)}</div>

              <div class="actions">
                <a class="button" href="http://127.0.0.1:5500/frontend/index.html">Back to Form</a>
                <a class="button secondary" href="http://localhost:3000/read/101">Try Search API</a>
              </div>
            </section>
          </main>
        </body>
        </html>`;

      helper.endResponseWithHTML(res, html, 200);
    });
    return;
  }

  const data = [
    {
      modelId: "101",
      modelName: "ChatGPT",
      developer: "OpenAI",
      releaseYear: "2020"
    },
    {
      modelId: "102",
      modelName: "Gemini",
      developer: "Google",
      releaseYear: "2023"
    },
    {
      modelId: "103",
      modelName: "Claude",
      developer: "Anthropic",
      releaseYear: "2023"
    }
  ];

  const id = req.url.split("/")[2];
  
  if (req.method === "GET" && req.url.startsWith("/read/")) {
    const record = data.find((item) => item.modelId === id);

    if (record) {
      helper.endResponseWithJSON(res, record, 200);
      return;
    }

    helper.endResponseWithJSON(res, { message: "Not Found" }, 404);
    return;
  }

  helper.endResponseWithJSON(res, { message: "Not Found" }, 404);
}

function consoleMessage() {
  console.log("The server is running on http://localhost:3000");
}

const server = http.createServer(handle);
server.listen(3000, consoleMessage);
