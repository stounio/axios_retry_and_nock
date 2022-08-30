const rax = require("retry-axios");
const axios = require("axios");

rax.attach();

const numberOfRetries = process.env.NUMBER_OF_RETRIES || 3;

const greetings = async () => {
  const config = {
    timeout: 100,
    headers: { "User-Agent": "NewbieToAxiosAndNock" },
    raxConfig: {
      retry: numberOfRetries,
      noResponseRetries: 0,
      onRetryAttempt: (error) => {
        console.error(`[HELLO-WORLD-RETRY] Retrying request to Hello World\n${error}`);
      },
    },
  };
  return axios.get(`${process.env.HELLO_WORLD_DOMAIN}/greetings`, config);
};

module.exports = { greetings };
