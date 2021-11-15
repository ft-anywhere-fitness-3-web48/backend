exports.seed = async function (knex) {
  await knex("user_classes").insert([
    {
      user_id: 1,
      class_id: 2,
    },
    {
      user_id: 2,
      class_id: 1,
    },
    {
      user_id: 3,
      class_id: 2,
    },
    {
      user_id: 4,
      class_id: 1,
    },
  ]);
};
