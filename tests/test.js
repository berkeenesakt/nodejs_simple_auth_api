const request = require("supertest");
const app = require("../index");
const faker = require("@faker-js/faker");
beforeAll(async () => {
  // do something before anything else runs
  console.log("Jest starting!");
  app.closeServer();
});

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  app.closeServer();
});

const email = faker.faker.internet.email();
describe("POST /register", () => {
  test("should register", async () => {
    const res = await request(app).post("/register").send({
      name: "test",
      email: email,
      password: "test1234",
    });
    console.log(res.body);
    expect(res.statusCode).toBe(200);
  }, 100000000);
  test("shouldn't register, this user is already created.", async () => {
    const res = await request(app).post("/register").send({
      name: "test",
      email: "test@test.com",
      password: "test1234",
    });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
  }, 100000000);
  test("shouldn't register, email is required.", async () => {
    const res = await request(app).post("/register").send({
      name: "test",
      password: "test1234",
    });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
  }, 100000000);
  test("shouldn't register, password is required.", async () => {
    const res = await request(app).post("/register").send({
      name: "test",
      email: email,
    });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
  }, 100000000);
  test("shouldn't register, name is required.", async () => {
    const res = await request(app).post("/register").send({
      email: email,
      password: "test1234",
    });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
  }, 100000000);
});

describe("GET /login", () => {
  test("should login", async () => {
    const res = await request(app).post("/login").send({
      email: email,
      password: "test1234",
    });
    expect(res.statusCode).toBe(200);
  });
  test("shouldn't login, email is required.", async () => {
    const res = await request(app).post("/login").send({
      password: "test1234",
    });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
  });
  test("shouldn't login, password is required.", async () => {
    const res = await request(app).post("/login").send({
      email: email,
    });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
  });
  test("shouldn't login, password is incorrect.", async () => {
    const res = await request(app).post("/login").send({
      email: email,
      password: "test12345",
    });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
  });
});

describe("GET /get-user-details", () => {
  test("should get user details", async () => {
    const token = await request(app).post("/login").send({
      email: "test@test.com",
      password: "test1234",
    });
    const res = await request(app)
      .get("/get-user-details")
      .set("Authorization", "Bearer " + token.body.token)
      .send();
    console.log(res.body);
    expect(res.statusCode).toBe(200);
  });
  test("shouldn't get user details, token is required.", async () => {
    const res = await request(app).get("/get-user-details").send();
    console.log(res.body);
    expect(res.statusCode).toBe(401);
  });
  test("shouldn't get user details, token is invalid.", async () => {
    const res = await request(app)
      .get("/get-user-details")
      .set("Authorization", "Bearer " + "a")
      .send();
    console.log(res.body);
    expect(res.statusCode).toBe(400);
  });
});
