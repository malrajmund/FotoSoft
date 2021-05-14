const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
var cors = require("cors");

const app = express();
app.use(cors());
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/items", require("./routes/api/items"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serwer postawiony na porcie: ${PORT}`));
