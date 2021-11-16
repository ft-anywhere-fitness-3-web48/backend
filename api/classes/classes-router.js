const express = require("express");
const { checkClassId, validateClasses } = require("./classes-middleware");
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

router.post("/", async (req, res, next) => {
  try {
    const newClass = await Classes.addClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", checkClassId, async (req, res, next) => {
  try {
    const updatedClass = await Classes.updateClass(req.params.id, req.body);
    res.status(200).json(updatedClass);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", checkClassId, async (req, res, next) => {
  try {
    const deletedClass = await Classes.deleteClass(req.params.id);
    res.status(200).json(deletedClass);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: "something went wrong inside the  class routers",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
