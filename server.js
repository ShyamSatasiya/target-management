const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000; // Azure provides a PORT dynamically
const app = next({ dev: false }); // Set dev to false for production
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
