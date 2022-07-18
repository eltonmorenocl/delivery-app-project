const chai = require("chai");
const sinon = require("sinon");
const chaiHttp = require("chai-http");

const server = require("../api/app");

const { User } = require("../database/models"); // importar USER

const auth = require("../shared/utils/auth");

const { users } = require("./mocks");

chai.use(chaiHttp);

const { expect } = chai;

const MOCK_UNAUTHORIZED_ERROR = Object.assign(new Error("Invalid token"), {
  statusCode: 401,
});

describe("Rota GET /user", () => {
  let userModelStub;
  let tokenStub;

  before(() => {
    tokenStub = sinon.stub(auth, "verifyToken");
    userModelStub = sinon.stub(User, "findAll");

    tokenStub.onFirstCall().throws(MOCK_UNAUTHORIZED_ERROR);
    tokenStub.returns({ id: 3, role: "customer" });

    userModelStub.onFirstCall().resolves(users); // retorna todos os usuários
    userModelStub.onSecondCall().resolves([users[1]]); // retorna apenas o vendedor
    userModelStub.onThirdCall().resolves([users[2]]); // retorna apenas o cliente
  });

  after(() => {
    User.findAll.restore();
    auth.verifyToken.restore();
  });

  it("Não deve retornar os usuários sem token", async () => {
    const response = await chai.request(server).get("/user");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Token not provided");
  });

  it("Não deve retornar os usuários com token inválido", async () => {
    const response = await chai
      .request(server)
      .get("/user")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.an("object");

    expect(response.body).to.have.property("message");
    expect(response.body.message).to.be.equal("Invalid token");
  });

  it("Deve retornar todos os usuários", async () => {
    const response = await chai
      .request(server)
      .get("/user")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.be.an("object");

    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("name");
    expect(response.body[0]).to.have.property("role");
  });

  it("Deve retornar apenas o vendedor", async () => {
    const response = await chai
      .request(server)
      .get("/user?r=seller")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.be.an("object");

    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("name");
    expect(response.body[0]).to.have.property("role");

    expect(response.body[0].role).to.be.equal("seller");
  });

  it("Deve retornar apenas o cliente", async () => {
    const response = await chai
      .request(server)
      .get("/user?r=customer")
      .set("Authorization", "token123");

    expect(response.status).to.be.equal(200);

    expect(response.body).to.be.an("array");
    expect(response.body[0]).to.be.an("object");

    expect(response.body[0]).to.have.property("id");
    expect(response.body[0]).to.have.property("name");
    expect(response.body[0]).to.have.property("role");

    expect(response.body[0].role).to.be.equal("customer");
  });
});
