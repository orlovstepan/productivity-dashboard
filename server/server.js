const express = require("express");
const cors = require("cors");
const goalsRouter = require("./routes/goals");

const app = express();

app.use(cors());

app.use(express.json());

const port = process.env.PORT || 5005;

app.use("/goals", goalsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
