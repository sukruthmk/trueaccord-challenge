//import dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import debtsRoute from "./src/routes/debts.route";

// define the Express app
const app = express();

// enhance the app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan("combined"));

app.use("/debts", debtsRoute);
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up and running on localhost:" + port);
});
