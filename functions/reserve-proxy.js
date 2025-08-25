const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  let url = "https://script.google.com/macros/s/AKfycbxdVLk_hRi0TElfxzhetZ0WqnzUpxZ_REcCm3dJhlqhwKsDKyv7_8TQ_TGO6tdrL_g-Tw/exec"; // <-- mets bien ton URL ici

  if (event.queryStringParameters) {
  const params = new URLSearchParams(event.queryStringParameters).toString();
  url += `?${params}`;
}


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
