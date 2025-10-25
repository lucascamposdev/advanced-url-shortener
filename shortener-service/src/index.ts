import express from "express";
import cors from "cors";
import http from "http";
import routes from "./routes/routes";

const app = express();
const server = http.createServer(app); 

app.use(cors());
app.use(express.json());

app.use(routes);

server.listen(3000, () => {
  console.log("🚀 Server Running: http://localhost:3000");
});

export default app;