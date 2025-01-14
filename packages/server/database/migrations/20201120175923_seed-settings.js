// utils
const logger = require("../../utils/logger");

exports.up = (knex) => {
  return knex("settings")
    .insert([
      {
        title: "FeedbackHub",
        description: "Track developer feedback to build better products",
        accentColor: "0b1320",
        logo: "/freshworks.svg",
        icon: "/freshworks.svg",
        isPoweredBy: true,
      },
    ])
    .then(() => {
      logger.info({
        code: "DATABASE_SEEDS",
        message: "Insert data: settings",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_SEEDS",
        err,
      });
    });
};

exports.down = (knex) => {
  return knex("settings")
    .delete()
    .then(() => {
      logger.info({
        message: "Drop data: settings",
      });
    })
    .catch((err) => {
      logger.error({
        code: "DATABASE_SEEDS",
        err,
      });
    });
};
