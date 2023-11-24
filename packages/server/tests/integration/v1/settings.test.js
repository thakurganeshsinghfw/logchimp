import { describe, it, expect } from "vitest";
const supertest = require("supertest");

import database from "../../../database";
const app = require("../../../app");

describe("GET /api/v1/settings/site", () => {
  it("should get all settings", async () => {
    // set allowSignup to true in settings table
    await database
      .update({
        allowSignup: true,
      })
      .from("settings");

    const response = await supertest(app).get("/api/v1/settings/site");

    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toBe(200);

    const settings = response.body.settings;
    expect(settings.title).toEqual("LogChimp");
    expect(settings.description).toEqual(
      "Track user feedback to build better products",
    );
    expect(settings.logo).toEqual(
      "/freshworks.svg",
    );
    expect(settings.icon).toEqual(
      "/freshworks.svg",
    );
    expect(settings.accentColor).toEqual("0b1320");
    expect(settings.googleAnalyticsId).toBeNull();
    expect(settings.isPoweredBy).toBeTruthy();
    expect(settings.allowSignup).toBeTruthy();
    expect(settings.developer_mode).toBeFalsy();

    // labs
    expect(settings.labs.comments).toBeFalsy();
  });
});
