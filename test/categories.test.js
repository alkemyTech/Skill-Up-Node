var chai = require("chai");
let chaiHttp = require("chai-http");
var expect = require("chai").expect;

let app = require("../app");

chai.use(chaiHttp);

const categories = {
  name: "Egreso",
  description: "An amount of money a user receives into the account",
};

// parent block
describe("Test endpoints categories", () => {
  describe("GET /categories", () => {
    it("It should give all categories information", async () => {
      const response = await chai.request(app).get("/api/categories");
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal(
        "Found all categories successfully"
      );
      expect(response).to.have.property("body");
    });
    it("get category by id", async () => {
      const id = 1;
      const response = await chai.request(app).get(`/api/categories/${id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("Category retrieved successfully");
    });
    it("It should not get any information if there is no id", async () => {
      const response = await chai.request(app).get(`/api/categories/0`);
      expect(response.statusCode).to.equal(401);
    });
  });

  describe("POST /categories", () => {
    it("should create transaction", async () => {
      const response = await chai
        .request(app)
        .post(`/api/categories`)
        .send(categories);
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal("Categories created successfully");
    });
    it("should not create transaction without name and description fields", async () => {
      const response = await chai.request(app).post(`/api/categories`).send({});
      expect(response.status).to.equal(400);
    });
  });

  describe("DELETE /categories", () => {
    it("you must delete category with id", async () => {
      const id = 3;
      const response = await chai.request(app).delete(`/api/categories/${id}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("Categories deleted successfully");
    });
    it("should respond error for not finding Id to delete", async () => {
      const response = await chai.request(app).delete(`/api/categories/0`);
      expect(response.statusCode).to.equal(401);
    });
  });

  describe("PUT /categories", () => {
    it("must edit transaction with id if contain name and description fields", async () => {
      const id = 4;
      const response = await chai
        .request(app)
        .put(`/api/categories/${id}`)
        .send(categories);
      expect(response.statusCode).to.equal(200);
      expect(response.body.message).to.equal("Categories update successfully");
    });
    it("must respond error due to missing fields", async () => {
      const id = 4;
      const response = await chai
        .request(app)
        .put(`/api/categories/${id}`)
        .send({});
      expect(response.statusCode).to.equal(400);
      // expect(response.body.message).to.equal("Categories update successfully");
    });
  });
});
