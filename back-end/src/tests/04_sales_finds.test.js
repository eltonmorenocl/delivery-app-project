const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const server = require("../api/app");

const { Sale } = require("../database/models"); // importar USER

const auth = require("../shared/utils/auth");

const {
  returnAllBySeller,
  returnAllByCustomer,
  returnDetailedSale,
} = require("./mocks");

chai.use(chaiHttp);

const { expect } = chai;

const MOCK_UNAUTHORIZED_ERROR = Object.assign(new Error("Invalid token"), {
  statusCode: 401,
});

describe("Rota GET /sales", () => {
  let saleModelStub;
  let tokenStub;

  before(() => {
    tokenStub = sinon.stub(auth, "verifyToken");
    saleModelStub = sinon.stub(Sale, "findAll");

    tokenStub.onFirstCall().returns({ id: 3, role: "customer" });
    tokenStub.onSecondCall().returns({ id: 2, role: "seller" });
    tokenStub.onThirdCall().throws(MOCK_UNAUTHORIZED_ERROR);

    saleModelStub.onFirstCall().resolves(returnAllByCustomer);
    saleModelStub.onSecondCall().resolves(returnAllBySeller);
  });

  after(() => {
    Sale.findAll.restore();
    auth.verifyToken.restore();
  });

  it("Deve retornar todas as vendas para o cliente", async () => {
    const response = await chai
      .request(server)
      .get("/sales")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.be.an("object");

    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("totalPrice");
    expect(response.body[0]).to.have.property("saleDate");
    expect(response.body[0]).to.have.property("status");

    expect(response.body[0]).to.not.have.property("address");
  });

  it("Deve retornar todas as vendas para o vendedor", async () => {
    const response = await chai
      .request(server)
      .get("/sales")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.be.an("object");

    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("totalPrice");
    expect(response.body[0]).to.have.property("saleDate");
    expect(response.body[0]).to.have.property("status");
    expect(response.body[0]).to.have.property("address");
  });

  it("Não deve retornar as vendas para um usuário sem token", async () => {
    const response = await chai.request(server).get("/sales");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Token not provided");
  });

  it("Não deve retornar as vendas para um usuário com token inválido", async () => {
    const response = await chai
      .request(server)
      .get("/sales")
      .set("Authorization", "token");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Invalid token");
  });
});

describe("Endpoint GET /sales/:id", () => {
  let saleModelStub;
  let tokenStub;

  before(() => {
    saleModelStub = sinon.stub(Sale, "findOne");
    tokenStub = sinon.stub(auth, "verifyToken");

    tokenStub.onFirstCall().returns({ id: 3, role: "customer" });
    tokenStub.onSecondCall().returns({ id: 2, role: "seller" });
    tokenStub.onThirdCall().throws(MOCK_UNAUTHORIZED_ERROR);

    saleModelStub.onFirstCall().resolves(returnDetailedSale);
    saleModelStub.onSecondCall().resolves(returnDetailedSale);
  });

  after(() => {
    Sale.findOne.restore();
    auth.verifyToken.restore();
  });

  it("Deve retornar os detalhes de uma venda para o cliente", async () => {
    const response = await chai
      .request(server)
      .get("/sales/1")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("totalPrice");
    expect(response.body).to.have.property("saleDate");
    expect(response.body).to.have.property("status");

    expect(response.body).to.have.property("seller");
    expect(response.body.seller).to.have.property("id");
    expect(response.body.seller).to.have.property("name");

    expect(response.body).to.have.property("products");
    expect(response.body.products).to.be.an("array");
    expect(response.body.products[0]).to.have.property("id");
    expect(response.body.products[0]).to.have.property("name");
    expect(response.body.products[0]).to.have.property("price");
    expect(response.body.products[0]).to.have.property("quantity");
  });

  it("Deve retornar os detalhes de uma venda para o vendedor", async () => {
    const response = await chai
      .request(server)
      .get("/sales/1")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("id");
    expect(response.body).to.have.property("totalPrice");
    expect(response.body).to.have.property("saleDate");
    expect(response.body).to.have.property("status");

    expect(response.body).to.have.property("seller");
    expect(response.body.seller).to.have.property("id");
    expect(response.body.seller).to.have.property("name");

    expect(response.body).to.have.property("products");
    expect(response.body.products).to.be.an("array");
    expect(response.body.products[0]).to.have.property("id");
    expect(response.body.products[0]).to.have.property("name");
    expect(response.body.products[0]).to.have.property("price");
    expect(response.body.products[0]).to.have.property("quantity");
  });

  it("Não deve retornar as vendas para um usuário sem token", async () => {
    const response = await chai.request(server).get("/sales");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Token not provided");
  });

  it("Não deve retornar as vendas para um usuário com token inválido", async () => {
    const response = await chai
      .request(server)
      .get("/sales")
      .set("Authorization", "token");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Invalid token");
  });
});
