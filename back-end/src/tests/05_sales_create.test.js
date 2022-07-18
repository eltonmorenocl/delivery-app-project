const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const server = require("../api/app");

const { Sale, SaleProduct } = require("../database/models"); // importar USER

const auth = require("../shared/utils/auth");

const { newSale } = require("./mocks");

chai.use(chaiHttp);

const { expect } = chai;

const MOCK_UNAUTHORIZED_ERROR = Object.assign(new Error("Invalid token"), {
  statusCode: 401,
});

describe("Rota POST /sales", () => {
  let saleModelStub;
  let saleProductModelStub;
  let tokenStub;

  before(() => {
    tokenStub = sinon.stub(auth, "verifyToken");
    saleModelStub = sinon.stub(Sale, "create");
    saleProductModelStub = sinon.stub(SaleProduct, "create");

    tokenStub.onFirstCall().returns({ id: 3, role: "customer" });
    tokenStub.onSecondCall().returns({ id: 2, role: "seller" });
    tokenStub.onThirdCall().throws(MOCK_UNAUTHORIZED_ERROR);
    tokenStub.returns({ id: 3, role: "customer" });

    saleModelStub.onFirstCall().resolves({ saleId: 1 });
  });

  after(() => {
    auth.verifyToken.restore();
    Sale.create.restore();
    SaleProduct.create.restore();
  });

  it("Deve criar uma venda com sucesso para o cliente", async () => {
    const response = await chai
      .request(server)
      .post("/sales")
      .set("Authorization", "token123")
      .send(newSale);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.empty;
  });

  it("Não deve criar uma venda para o vendedor", async () => {
    const response = await chai
      .request(server)
      .post("/sales")
      .set("Authorization", "token456")
      .send(newSale);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal(
      "You are not authorized to access this resource"
    );
  });

  it("Não deve criar uma venda sem token", async () => {
    const response = await chai.request(server).post("/sales").send(newSale);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Token not provided");
  });

  it("Não deve criar uma venda com token inválido", async () => {
    const response = await chai
      .request(server)
      .post("/sales")
      .set("Authorization", "token")
      .send(newSale);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Invalid token");
  });

  it("Não deve criar uma venda sem o id do vendedor", async () => {
    const response = await chai
      .request(server)
      .post("/sales")
      .set("Authorization", "token123")
      .send({ ...newSale, sellerId: undefined });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal('"sellerId" is required');
  });

  it("Não deve criar uma venda sem o valor total", async () => {
    const response = await chai
      .request(server)
      .post("/sales")
      .set("Authorization", "token123")
      .send({ ...newSale, totalPrice: undefined });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal('"totalPrice" is required');
  });

  it("Não deve criar uma venda sem o endereço", async () => {
    const response = await chai
      .request(server)
      .post("/sales")
      .set("Authorization", "token123")
      .send({ ...newSale, address: undefined });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal('"address" is required');
  });

  it("Não deve criar uma venda sem produtos", async () => {
    const response = await chai
      .request(server)
      .post("/sales")
      .set("Authorization", "token123")
      .send({ ...newSale, orders: undefined });

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal('"orders" is required');
  });
});
