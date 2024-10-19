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
      console.log("Server ON!");
      console.log("Database successfully connected!");
    });
  })
  .catch((error) => {
    console.log("Failed on connecting database!");
    console.log(error);
  });
