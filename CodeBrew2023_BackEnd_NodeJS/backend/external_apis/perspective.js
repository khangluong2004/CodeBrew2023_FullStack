// const dotenv = require("dotenv");
// dotenv.config();


const Perspective = require('perspective-api-client');
const perspective = new Perspective({apiKey: process.env.PERSPECTIVE_API_KEY});

const check_toxic = async (text) => {
  const result = await perspective.analyze(text);
  return(result.attributeScores["TOXICITY"]["summaryScore"]["value"])
};

module.exports = {check_toxic};