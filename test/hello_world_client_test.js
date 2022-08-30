const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const nock = require("nock");
const axios = require("axios");
axios.defaults.adapter = require("axios/lib/adapters/http");

const { expect } = chai;
chai.use(chaiAsPromised);

const { greetings } = require("../src/hello_world_client");

const TEST_DOMAIN = "https://hello.world.local";

beforeEach(() => {
  process.env.HELLO_WORLD_DOMAIN = TEST_DOMAIN;
});

describe("Axios client", async () => {
  it("should greet the world with hello", async () => {
    const scope = nock(TEST_DOMAIN)
      .get(/greetings/)
      .reply(200, { message: "Hello World" });

    const response = await greetings();

    expect(response.status).to.equal(200);
    expect(response.data).to.deep.equal({ message: "Hello World" });
    scope.done();
  });

  it("should retry greetings when the world experienced has system issue", async () => {
    const scope = nock(TEST_DOMAIN)
      .get(/greetings/)
      .reply(500, { message: "The world is having some difficulties" })
      .get(/greetings/)
      .reply(200, { message: "Hello World" });

    const response = await greetings();

    expect(response.status).to.equal(200);
    expect(response.data).to.deep.equal({ message: "Hello World" });
    scope.done();
  });

  it("should retry greetings when the world failed to be reached over the network", async () => {
    const scope = nock(TEST_DOMAIN)
      .get(/greetings/)
      .delay(200)
      .reply(200, { message: "Hello World" })
      .get(/greetings/)
      .reply(200, { message: "Hello World" });
    const response = await greetings();

    expect(response.status).to.equal(200);
    expect(response.data).to.deep.equal({ message: "Hello World" });
    scope.done();
  });
});
