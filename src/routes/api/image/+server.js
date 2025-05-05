import OpenAI from "openai";
import { json } from '@sveltejs/kit';

// POST handler for image generation
export async function POST({ request }) {
  try {
    // Create OpenAI client with API key from environment variable
    const openai = new OpenAI({
      apiKey: 'XX',
    });

    // Parse the request body to get the prompt
    const { prompt } = await request.json();

    console.log('Received prompt:', prompt);
    
    if (!prompt) {
      return json({
        error: 'No prompt provided'
      }, { status: 400 });
    }

    // Generate the image
    const result = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
    });

    // Return the base64 image data directly
    return json({
      image: result.data[0].b64_json,
      // Include any other metadata you might need
      created: result.created,
      model: "gpt-image-1"
    });
    
  } catch (error) {
    console.error('Error generating image:', error);
    return json({
      error: error.message || 'Failed to generate image'
    }, { status: 500 });
  }
}