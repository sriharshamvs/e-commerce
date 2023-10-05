const request = require("supertest");
const express = require("express");
const authRoutes = require("../src/routes/authRoutes");

jest.mock("../src/models/userModel");
jest.mock("../src/services/jwtService");

const { createUser } = require("../src/models/userModel");
const { verifyToken, generateTokens } = require("../src/services/jwtService");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

describe("Auth Controller", () => {
  describe("POST /auth/register", () => {
    it("should register a new user and return a success message", async () => {
      createUser.mockResolvedValue({
        id: 1,
        email: "sriharshamvs@gmail.com",
        firstname: "Sriharsha",
        lastname: "Mopidevi",
        password: "password",
      });

      const response = await request(app).post("/auth/register").send({
        email: "sriharshamvs@gmail.com",
        firstname: "Sriharsha",
        lastname: "Mopidevi",
        password: "password",
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.message).toBe("Created");
    });

    it("should return an error message for invalid email", async () => {
      createUser.mockResolvedValue({
        id: 1,
        email: "dfasdf@gmail.com",
        firstname: "Sriharsha",
        lastname: "Mopidevi",
        password: "pass",
      });

      const response = await request(app).post("/auth/register").send({
        email: "dfasdf@",
        firstname: "Sriharsha",
        lastname: "Mopidevi",
        password: "pass",
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe("POST /auth/refresh", () => {
    it("should return a new access token", async () => {
      verifyToken.mockReturnValueOnce({ email: "test@example.com" });
      generateTokens.mockReturnValueOnce({
        accessToken: "newMockAccessToken",
        refreshToken: "newMockRefreshToken",
      });

      const response = await request(app).post("/auth/refresh").send({
        refreshToken: "validRefreshToken",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("accessToken", "newMockAccessToken");
      expect(response.body).toHaveProperty(
        "refreshToken",
        "newMockRefreshToken"
      );
    });

    it("should return 400 for invalid refresh token", async () => {
      verifyToken.mockImplementationOnce(() => {
        throw new Error("Invalid token");
      });

      const response = await request(app).post("/auth/refresh").send({
        refreshToken: "invalidRefreshToken",
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
