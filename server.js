const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/items", require("./routes/api/items"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serwer postawiony na porcie: ${PORT}`));
