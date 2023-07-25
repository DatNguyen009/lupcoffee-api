const express = require("express");
const app = express();
const indexRouter = require("./routers/indexRouter");
const PORT = process.env.PORT || 3030;
app.use(express.json());

app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
