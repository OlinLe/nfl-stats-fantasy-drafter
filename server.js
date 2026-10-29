const http = require("http");
const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const envPath = path.join(projectRoot, ".env");

if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
  }
}

const apiKey = process.env.SPORTSDATA_API_KEY;
const port = process.env.PORT || 3000;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

http
  .createServer(async (req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`);

    if (requestUrl.pathname === "/api/player-season-stats") {
      if (!apiKey) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "SPORTSDATA_API_KEY is not configured." }));
        return;
      }

      try {
        const apiResponse = await fetch(
          "https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStats/2025REG",
          { headers: { "Ocp-Apim-Subscription-Key": apiKey } },
        );
        const body = await apiResponse.text();
        res.writeHead(apiResponse.status, {
          "Content-Type": apiResponse.headers.get("content-type") || "application/json",
        });
        res.end(body);
      } catch (error) {
        console.error("SportsData request failed:", error.message);
        res.writeHead(502, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Could not reach the SportsData API." }));
      }
      return;
    }

    const fileName = requestUrl.pathname === "/" ? "index.html" : requestUrl.pathname.slice(1);
    const filePath = path.resolve(projectRoot, fileName);
    if (
      !filePath.startsWith(`${projectRoot}${path.sep}`) ||
      path.basename(filePath).startsWith(".") ||
      !fs.existsSync(filePath)
    ) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  })
  .listen(port, () => console.log(`NFL Fantasy Drafter running at http://localhost:${port}`));
