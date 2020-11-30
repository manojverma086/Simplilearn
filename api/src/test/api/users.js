//to use test db we define env to test
//process.env.NODE_ENV = "test";  ****facing issue with mockgoose right now commenting it. To test please clear db entries manually

const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../app");
const db = require("../../db/db");

const user = {
  name: "test",
  email: "test@gmail.com",
  password: "something",
  password2: "something",
};

describe("POST /register", () => {
  before((done) => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });
  after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("OK, creating new user", (done) => {
    request(app)
      .post("/api/users/register")
      .send(user)
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("name");
        expect(body).to.contain.property("email");
        expect(body).to.contain.property("created_at");
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, Login a user", (done) => {
    request(app)
      .post("/api/users/login")
      .send({ email: user.email, password: user.password })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("success");
        expect(body).to.contain.property("token");
        done();
      })
      .catch((err) => done(err));
  });
});
