// src/routes/api/speak/+server.js
export async function POST({ request }) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Call the ElevenLabs API directly instead of using the client library
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/Rni4NyZRvnv6RI6vRMqC/stream', {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': 'XX' // Make sure to set this in your .env file
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        output_format: 'mp3'
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: `HTTP error ${response.status}` }));
      throw new Error(errorData.detail || `ElevenLabs API returned ${response.status}`);
    }

    // Return the audio stream
    return new Response(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg'
      }
    });
  } catch (error) {
    console.error('ElevenLabs API error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}