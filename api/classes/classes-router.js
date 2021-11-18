const express = require("express");
const {
  checkClassId,
  checkClassTypeUnique,
  addNewClassType,
} = require("./classes-middleware");
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

router.post(
  "/",
  checkClassTypeUnique,

  async (req, res, next) => {
    let {
      name,
      start_time,
      duration,
      intensity_level,
      location,
      registered_attendees,
      max_size,
    } = req.body;
    // const class_type_id = req.classType[0].class_type_id;
    try {
      const newClass = await Classes.addClass({
        name,
        class_type_id: req.classType[0].class_type_id,
        start_time,
        duration,
        intensity_level,
        location,
        registered_attendees,
        max_size,
      });
      res.status(201).json(newClass);
    } catch (error) {
      next(error);
    }
  }
);

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
  res.status(err.status || 500).json({
    customMessage: "something went wrong inside the  class routers",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
