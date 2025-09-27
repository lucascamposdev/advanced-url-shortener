import express from "express";
import cors from "cors";
import http from "http";
import routes from "./routes/index.routes";

const app = express();
const server = http.createServer(app); 

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

server.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});

export default app;