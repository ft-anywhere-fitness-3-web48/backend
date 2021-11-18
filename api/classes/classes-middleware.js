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

const checkClassTypeUnique = async (req, res, next) => {
  try {
    const classType = await db("class_types").where(
      "class_type_name",
      req.body.class_type_name
    );
    console.log(classType);
    if (classType.length > 0) {
      req.classType = classType;
      next();
    } else if (!classType.length) {
      const newClassType = await Classes.addClassType({
        class_type_name: req.body.class_type_name,
      });
      console.log(newClassType);
      req.classType = newClassType;
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const addNewClassType = async (req, res, next) => {
  next();
  // try {
  //   if (!req.classType) {
  //     const newClassType = await Classes.addClassType(req.body.class_type_name);
  //     console.log(newClassType);
  //     req.classType = newClassType;
  //     next();
  //   } else {
  //     next();
  //   }
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = {
  checkClassId,
  checkClassTypeUnique,
  addNewClassType,
};
