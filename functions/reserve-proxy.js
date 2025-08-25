const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async (event) => {
  const url = "https://script.google.com/macros/s/AKfycbxTVILLMito4TMwJqrXawujwma23kJpAB0hJ9yKI5F-f7xxhJnH0-l76rj0FukWLwDqVg/exec";

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
      },
      ...(event.httpMethod === 'POST' ? { body: event.body } : {})
    });

    const data = await response.text(); // <-- important

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
