const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Routes
const bankRouter = require("./modules/bank/bank.routes.js");
const mediaRouter = require("./modules/blogs/media.routes.js");
const branchesRouter = require("./modules/branches/branches.routes.js");
const commitmentRouter = require("./modules/commitments/commitments.routes.js");
const contactRouter = require("./modules/contact/contact.routes.js");
const eyeCareCenterRouter = require("./modules/eyeCareCenters/eyeCareCenter.routes.js");
const eyeHospitalsRouter = require("./modules/eyeHospitals/eyeHospital.routes.js");
const heroRouter = require("./modules/hero/hero.routes.js");
const impactRouter = require("./modules/impacts/impacts.routes.js");
const missionRouter = require("./modules/mission/mission.routes.js");
const pageRouter = require("./modules/pages/pages.routes.js");
const partnersRouter = require("./modules/partners/partners.routes.js");
const personRouter = require("./modules/person/person.routes.js");
const resourceRouter = require("./modules/resource/resource.routes.js");
const specificObjectivesRouter = require("./modules/specificObjectives/specificObjectives.routes.js");
const storyRouter = require("./modules/story/story.routes.js");
const strategicObjectivesRouter = require("./modules/strategicObjectives/strategicObjective.routes.js");
const subSectionRouter = require("./modules/subSection/subSection.routes.js");
const timestoneRouter = require("./modules/timeStone/timeStone.routes.js");
const valueRouter = require("./modules/value/values.routes.js");
// Models
require("./models/bankModel");
require("./models/mediaModel.js");
require("./models/branchesModel");
require("./models/commitmentModel");
require("./models/contactModel");
require("./models/eyeCareCenterModel");
require("./models/eyeHospitals");
require("./models/heroModel");
require("./models/impactModel");
require("./models/missionModel");
require("./models/PageModel");
require("./models/partnersModel");
require("./models/personModel");
require("./models/resourceModel");
require("./models/specificObjectivesModel");
require("./models/storyModel");
require("./models/strategicObjectivesModel");
require("./models/subSection");
require("./models/timestoneModel");
require("./models/valueModel");
// Initialize Express
const app = express();

// Middleware
app.use(cors("*"));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/files", express.static(path.join(__dirname, "public/files")));
// Database Connection
mongoose
  .connect(process.env.mongo_connect, {})
  .then(() => console.log("mongo connected"))
  .catch((e) => console.log(e));

// Routes
app.use("/bank", bankRouter);
app.use("/media", mediaRouter);
app.use("/branches", branchesRouter);
app.use("/commitments", commitmentRouter);
app.use("/contact", contactRouter);
app.use("/eyeCareCenters", eyeCareCenterRouter);
app.use("/eyeHospitals", eyeHospitalsRouter);
app.use("/hero", heroRouter);
app.use("/impacts", impactRouter);
app.use("/mission", missionRouter);
app.use("/pages", pageRouter);
app.use("/partners", partnersRouter);
app.use("/person", personRouter);
app.use("/resource", resourceRouter);
app.use("/specificObjectives", specificObjectivesRouter);
app.use("/story", storyRouter);
app.use("/strategicObjectives", strategicObjectivesRouter);
app.use("/subSection", subSectionRouter);
app.use("/timeStone", timestoneRouter);
app.use("/values", valueRouter);
// Start the server
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
