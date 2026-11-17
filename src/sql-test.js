const express = require("express"); const app = express(); app.get("/p", (req, res) => { const sql = "SELECT * FROM pacientes WHERE cedula = \x27" + req.query.cedula + "\x27"; res.send(sql); });
