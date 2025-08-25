const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Méthode non autorisée' })
    };
  }

  try {
    // On relaie vers ton script Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbxTVILLMito4TMwJqrXawujwma23kJpAB0hJ9yKI5F-f7xxhJnH0-l76rj0FukWLwDqVg/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"  // Important : le garder JSON
      },
      body: event.body  // On transmet le JSON brut du client
    });

    const result = await response.text();

    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json' },
      body: result
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
