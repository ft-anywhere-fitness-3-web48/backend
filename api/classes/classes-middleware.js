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
  const { classes } = req.body
  if ( 
    classes === undefined || 
    typeof classes !== 'string' ||
    !classes.trim()
    ) {
      const error = { status: 404, message: 'Invalid Classes'} 
      next(error)
    } else {
      next()
    }
};

module.exports = {
  checkClassId,
  validateClasses,
};
