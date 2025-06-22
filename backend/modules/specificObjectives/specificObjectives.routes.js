const express = require("express");
const auth = require("../../middleware/auth");
const createSpecificObjective = require("./controllers/createSpecificObjective");
const getSpecificObjectives = require("./controllers/getSpecificObjectives");
const getSpecificObjectiveById = require("./controllers/getSpecificObjectiveById");
const delSpecificObjective = require("./controllers/delSpecificObjective");
const editSpecificObjective = require("./controllers/editSpecificObjective");
const specificObjectiveRouter = express.Router();
specificObjectiveRouter.get("/", getSpecificObjectives);
specificObjectiveRouter.get("/:specificObjectiveId", getSpecificObjectiveById);
specificObjectiveRouter.use(auth);
specificObjectiveRouter.post("/create", createSpecificObjective);
specificObjectiveRouter.delete(
  "/del/:specificObjectiveId",
  delSpecificObjective
);
specificObjectiveRouter.patch(
  "/edit/:specificObjectiveId",
  editSpecificObjective
);
module.exports = specificObjectiveRouter;
