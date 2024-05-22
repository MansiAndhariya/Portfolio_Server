const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// var dbCollation = require("./utils/db");
// var ContactMailRouter = require("./routes/ContactMail");

app.use(cors()); // Add this line to enable CORS for all routes
app.use(express.json());
app.use("/api/contact_mail", ContactMailRouter);

app.get("/", (req, res) => res.send("Connection Success!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
