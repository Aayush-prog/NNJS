const express = require("express");
const auth = require("../../middleware/auth");
const createMission = require("./controllers/createMission");
const getMission = require("./controllers/getMission");
const getMissionById = require("./controllers/getMissionById");
const delMission = require("./controllers/delMission");
const editMission = require("./controllers/editMission");

const missionROuter = express.Router();
missionROuter.get("/", getMission);
missionROuter.get("/:missionId", getMissionById);
missionROuter.use(auth);
missionROuter.post("/create", createMission);
missionROuter.delete("/del/:missionId", delMission);
missionROuter.patch("/edit/:missionId", editMission);
module.exports = missionROuter;
