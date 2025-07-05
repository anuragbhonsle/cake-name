import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// 🛠️ Tells Express to serve files from the "public" folder
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let cakeName = "";

function cakeNameGenerator(req, res, next) {
  cakeName = req.body.country + req.body.flavour;
  next();
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", cakeNameGenerator, (req, res) => {
  // ✅ Redirect to result page with cake name as a query param
  res.redirect(`/result.html?name=${encodeURIComponent(cakeName)}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
