exports.seed = async function (knex) {
  await knex("class_types").insert([
    {
      class_type_name: "lifting",
    },
    {
      class_type_name: "rowing",
    },
  ]);
};
