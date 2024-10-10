import express from "express";
import connectDatabase from "./database/db.js";
import routes from "./routes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);



connectDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log("Servidor ON!");
      console.log("Banco de dados conectado com sucesso!");
    });
  })
  .catch((error) => {
    console.log("Falha ao tentar conectar bando de dados!");
    console.log(error);
  });
