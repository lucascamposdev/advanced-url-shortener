import express from "express";
import cors from "cors";
import http from "http";
import routes from "./routes/routes";

const app = express();
const server = http.createServer(app); 

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use(routes);

server.listen(3001, () => {
  console.log("🚀 Servidor rodando em http://localhost:3001");
});

export default app;