const db = require("../data/db-config");
const Classes = require("./classes-model");

const checkClassId = async (req, res, next) => {
  try {
    const checkClass = await Classes.findById(req.params.id);
    if (!checkClass) {
      next({ message: "Class not found" });
    } else {
      req.class = checkClass;
      next();
    }
  } catch (error) {
    next(error);
  }
  return db("classes");
};

const validateClasses = (req, res, next) => {
  return db("classes");
};

module.exports = {
  checkClassId,
  validateClasses,
};
