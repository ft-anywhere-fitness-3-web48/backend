exports.seed = async function (knex) {
  await knex("classes").insert([
    {
      name: "Example Class 1",
      type: "aerobics",
      start_time: "3:00PM",
      duration: "3 hours",
      intensity_level: 10,
      location: "Gym",
      registered_attendees: 5,
      max_size: 10,
    },
    {
      name: "Example Class 2",
      type: "rowing",
      start_time: "1:00AM",
      duration: "45 hours",
      intensity_level: 1000,
      location: "Middle Of The Ocean",
      registered_attendees: 5,
      max_size: 10,
    },
  ]);
};
