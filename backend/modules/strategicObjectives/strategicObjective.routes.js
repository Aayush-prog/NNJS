const express = require("express");
const auth = require("../../middleware/auth");
const createStrategicObjective = require("./controllers/createStrategicObjective");
const getStrategicObjective = require("./controllers/getStrategicObjective");
const getStrategicObjectiveById = require("./controllers/getStrategicObjectiveById");
const delStrategicObjective = require("./controllers/delStrategicObjective");
const editStrategicObjective = require("./controllers/editStrategicObjective");
const upload = require("../../middleware/upload");
const strategicObjectiveRouter = express.Router();
strategicObjectiveRouter.get("/", getStrategicObjective);
strategicObjectiveRouter.get(
  "/:strategicObjectiveId",
  getStrategicObjectiveById
);
strategicObjectiveRouter.use(auth);
strategicObjectiveRouter.post("/create", upload, createStrategicObjective);
strategicObjectiveRouter.delete(
  "/del/:strategicObjectiveId",
  delStrategicObjective
);
strategicObjectiveRouter.patch(
  "/edit/:strategicObjectiveId",
  upload,
  editStrategicObjective
);
module.exports = strategicObjectiveRouter;
