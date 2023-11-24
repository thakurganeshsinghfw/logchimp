/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("settings").del();
  await knex("settings").insert([
    {
      title: "Feedback Hub",
      description: "Track developer feedback to build better products",
      accentColor: "0b1320",
      logo: "/freshworks.svg",
      icon: "/freshworks.svg",
      isPoweredBy: true,
    },
  ]);
};
