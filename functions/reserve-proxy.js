const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  const url = "https://script.google.com/macros/s/AKfycbxcp3fo9r_f-mYgPZgPSuM2i1phzqeqgWrsb0QfMnRIQpERtn3fx8W0TlejTSbHjtDA2A/exec"; // <-- mets bien ton URL ici

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(event.httpMethod === 'POST' ? { body: event.body } : {})
    });

    const data = await response.text(); // NE PAS faire .json() ici

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: data, // la réponse brute du Apps Script
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
