const express = require("express");
const auth = require("../../middleware/auth");
const getIrcObjective = require("./controllers/getIrcObjectives");
const getIrcObjectiveById = require("./controllers/getIrcObjectivesbyId");
const createIrcObjectives = require("./controllers/createIrcObjectives");
const delIrcObjective = require("./controllers/delIrcObjectives");
const editBank = require("../bank/controllers/editBank");
const editIrcObjectives = require("./controllers/editIrcObjectives");

const ircObjectiveRouter = express.Router();
ircObjectiveRouter.get("/", getIrcObjective);
ircObjectiveRouter.get("/:ircObjectiveId", getIrcObjectiveById);
ircObjectiveRouter.use(auth);
ircObjectiveRouter.post("/create", createIrcObjectives);
ircObjectiveRouter.delete("/del/:ircObjectiveId", delIrcObjective);
ircObjectiveRouter.patch("/edit/:ircObjectiveId", editIrcObjectives);
module.exports = ircObjectiveRouter;
