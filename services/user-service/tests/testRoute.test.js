// tests/authRoutes.test.js
const request = require("supertest");
const express = require("express");
const testRoute = require("../src/routes/testRoute");

const app = express();
app.use(express.json());
app.use("/api", testRoute);

describe("GET /api/ping", () => {
  it("should ping and return a success message", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("OK");
  });
});
