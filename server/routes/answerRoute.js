const express = require("express")
const route = express.Router();
const { createAnswer, getAnswer } = require("../controller/answerController")

route.post("/",   )

route.get("/:questionid", getAnswer)

module.exports = route;