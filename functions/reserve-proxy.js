const fetch = require("node-fetch"); // utile en local, géré automatiquement par Netlify en ligne

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Méthode non autorisée",
    };
  }

  const params = new URLSearchParams(event.body);

  const response = await fetch("https://script.google.com/macros/s/AKfycbxTVILLMito4TMwJqrXawujwma23kJpAB0hJ9yKI5F-f7xxhJnH0-l76rj0FukWLwDqVg/exec", {
    method: "POST",
    body: params,
  });

  const text = await response.text();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: text,
  };
};
