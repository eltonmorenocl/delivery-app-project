const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const server = require("../api/app");

const { Sale } = require("../database/models"); // importar USER

const auth = require("../shared/utils/auth");

chai.use(chaiHttp);

const { expect } = chai;

const MOCK_UNAUTHORIZED_ERROR = Object.assign(new Error("Invalid token"), {
  statusCode: 401,
});

describe("Rota PATCH /pending/:id", () => {
  let findSaleStub;
  let updateSaleStub;
  let tokenStub;

  before(() => {
    tokenStub = sinon.stub(auth, "verifyToken");
    findSaleStub = sinon.stub(Sale, "findOne");
    updateSaleStub = sinon.stub(Sale, "update");

    tokenStub.onFirstCall().returns({ id: 2, role: "seller" });
    tokenStub.onSecondCall().returns({ id: 3, role: "customer" });
    tokenStub.onThirdCall().throws(MOCK_UNAUTHORIZED_ERROR);
    tokenStub.returns({ id: 2, role: "seller" });

    findSaleStub.onFirstCall().resolves(true);
    findSaleStub.onSecondCall().resolves(null);
  });

  after(() => {
    auth.verifyToken.restore();
    Sale.findOne.restore();
    Sale.update.restore();
  });

  it("Deve atualizar a venda para pendente", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/pending/1")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.empty;
  });

  it("Não deve atualizar uma venda para o cliente", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/pending/1")
      .set("Authorization", "token456");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.empty;
  });

  it("Não deve atualizar uma venda sem token", async () => {
    const response = await chai.request(server).patch("/sales/pending/1");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Token not provided");
  });

  it("Não deve atualizar uma venda com token inválido", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/pending/1")
      .set("Authorization", "token456");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Invalid token");
  });

  it("Não deve atualizar uma venda inexistent", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/pending/2")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Sale not found");
  });
});

describe("Rota PATCH /preparing/:id", () => {
  let findSaleStub;
  let updateSaleStub;
  let tokenStub;

  before(() => {
    tokenStub = sinon.stub(auth, "verifyToken");
    findSaleStub = sinon.stub(Sale, "findOne");
    updateSaleStub = sinon.stub(Sale, "update");

    tokenStub.onFirstCall().returns({ id: 2, role: "seller" });
    tokenStub.onSecondCall().returns({ id: 3, role: "customer" });
    tokenStub.onThirdCall().throws(MOCK_UNAUTHORIZED_ERROR);
    tokenStub.returns({ id: 2, role: "seller" });

    findSaleStub.onFirstCall().resolves(true);
    findSaleStub.onSecondCall().resolves(null);
  });

  after(() => {
    auth.verifyToken.restore();
    Sale.findOne.restore();
    Sale.update.restore();
  });

  it("Deve atualizar a venda para preparando", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/preparing/1")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.empty;
  });

  it("Não deve atualizar uma venda para o cliente", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/preparing/1")
      .set("Authorization", "token456");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.empty;
  });

  it("Não deve atualizar uma venda sem token", async () => {
    const response = await chai.request(server).patch("/sales/preparing/1");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Token not provided");
  });

  it("Não deve atualizar uma venda com token inválido", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/preparing/1")
      .set("Authorization", "token456");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Invalid token");
  });

  it("Não deve atualizar uma venda inexistent", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/preparing/2")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Sale not found");
  });
});

describe("Rota PATCH /delivering/:id", () => {
  let findSaleStub;
  let updateSaleStub;
  let tokenStub;

  before(() => {
    tokenStub = sinon.stub(auth, "verifyToken");
    findSaleStub = sinon.stub(Sale, "findOne");
    updateSaleStub = sinon.stub(Sale, "update");

    tokenStub.onFirstCall().returns({ id: 2, role: "seller" });
    tokenStub.onSecondCall().returns({ id: 3, role: "customer" });
    tokenStub.onThirdCall().throws(MOCK_UNAUTHORIZED_ERROR);
    tokenStub.returns({ id: 2, role: "seller" });

    findSaleStub.onFirstCall().resolves(true);
    findSaleStub.onSecondCall().resolves(null);
  });

  after(() => {
    auth.verifyToken.restore();
    Sale.findOne.restore();
    Sale.update.restore();
  });

  it("Deve atualizar a venda para em transito", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/delivering/1")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.empty;
  });

  it("Não deve atualizar uma venda para o cliente", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/delivering/1")
      .set("Authorization", "token456");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.empty;
  });

  it("Não deve atualizar uma venda sem token", async () => {
    const response = await chai.request(server).patch("/sales/delivering/1");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Token not provided");
  });

  it("Não deve atualizar uma venda com token inválido", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/delivering/1")
      .set("Authorization", "token456");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Invalid token");
  });

  it("Não deve atualizar uma venda inexistent", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/delivering/2")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Sale not found");
  });
});

describe("Rota PATCH /delivered/:id", () => {
  let findSaleStub;
  let updateSaleStub;
  let tokenStub;

  before(() => {
    tokenStub = sinon.stub(auth, "verifyToken");
    findSaleStub = sinon.stub(Sale, "findOne");
    updateSaleStub = sinon.stub(Sale, "update");

    tokenStub.onFirstCall().returns({ id: 3, role: "customer" });
    tokenStub.onSecondCall().returns({ id: 2, role: "seller" });
    tokenStub.onThirdCall().throws(MOCK_UNAUTHORIZED_ERROR);
    tokenStub.returns({ id: 3, role: "customer" });

    findSaleStub.onFirstCall().resolves(true);
    findSaleStub.onSecondCall().resolves(null);
  });

  after(() => {
    auth.verifyToken.restore();
    Sale.findOne.restore();
    Sale.update.restore();
  });

  it("Deve atualizar a venda para entregue", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/delivered/1")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.empty;
  });

  it("Não deve atualizar uma venda para o vendedor", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/delivered/1")
      .set("Authorization", "token456");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.empty;
  });

  it("Não deve atualizar uma venda sem token", async () => {
    const response = await chai.request(server).patch("/sales/delivered/1");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Token not provided");
  });

  it("Não deve atualizar uma venda com token inválido", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/delivered/1")
      .set("Authorization", "token456");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Invalid token");
  });

  it("Não deve atualizar uma venda inexistent", async () => {
    const response = await chai
      .request(server)
      .patch("/sales/delivered/2")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Sale not found");
  });
});
