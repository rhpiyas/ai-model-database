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
      console.log(parser.parse(body));
      res.writeHead(200, {
        "content-type": "text/plain",
      });
      res.end("Data received" + body);
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
