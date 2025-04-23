const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL; // Discord webhook URL'sini çevre değişkenlerinden alın

  if (!webhookUrl) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook URL is not configured.' })
    };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: event.body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}; 