const express = require("express");
const { checkClassId, validateClasses } = require("./classes-middleware");
const {} = require("../auth/auth-middleware");
const router = express.Router();
const Classes = require("./classes-model");

router.get("/", async (req, res, next) => {
  try {
    const classes = await Classes.find();
    res.status(200).json(classes);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkClassId, (req, res, next) => {
  try {
    res.json(req.class);
  } catch (error) {
    next(error);
  }
});

router.post("/", checkClassId, (req, res, next) => {});

router.put("/:id", checkClassId, (req, res, next) => {});

router.delete("/:id", (req, res, next) => {});

router.use((err, req, res, next) => {
  //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "something went wrong inside the  class routers",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
