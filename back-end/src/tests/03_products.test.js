const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const server = require("../api/app");

const { Product } = require("../database/models"); // importar USER

chai.use(chaiHttp);

const { expect } = chai;

describe("Rota GET /products", () => {
  before(() => {
    sinon.stub(Product, "findAll").resolves([
      {
        id: 1,
        name: "Café",
        price: 1.99,
        url_image: "",
      },
    ]);
  });

  after(() => {
    Product.findAll.restore();
  });

  it("Deve retornar todos os produtos cadastrados", async () => {
    const response = await chai.request(server).get("/products");

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.be.an("object");

    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("name");
    expect(response.body[0]).to.have.property("price");
    expect(response.body[0]).to.have.property("url_image");
  });
});
