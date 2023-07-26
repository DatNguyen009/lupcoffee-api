const express = require("express");
const cors = require("cors");
const indexRouter = require("./routers/indexRouter");
const app = express();
const PORT = process.env.PORT || 3030;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
