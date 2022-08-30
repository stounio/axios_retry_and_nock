const axios = require('axios');

const greetings = async () => {
  const config = {
    timeout: 100,
    headers: { 'User-Agent': 'NewbieToAxiosAndNock' },
  };
  return axios.get(`${process.env.HELLO_WORLD_DOMAIN}/greetings`, config)
};

module.exports = { greetings };
