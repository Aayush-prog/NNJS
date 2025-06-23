const express = require("express");
const auth = require("../../middleware/auth");
const entry = require("./controllers/entry");
const multer = require("multer");
const upload = multer();
const programRouter = express.Router();
programRouter.post("/entry", upload.single("photo"), entry);
module.exports = programRouter;
