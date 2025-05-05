// src/routes/api/claude/+server.js
import { error } from '@sveltejs/kit';

export async function POST({ request }) {
  try {
    const { characters, sceneDetails, prevChoice, finalScene } = await request.json();

    console.log('Characters:', characters);

    const characterDescriptions = characters.map(char => `${char.name}: ${char.description}`).join('\n\n');

    let prompt

     prompt = `I will give you a scene involving Fionn and na Fianna.

Write the scene in the style of early Irish authors like James Stephens - direct language with minimal but vivid imagery. Use extremely sparse descriptions. Avoid Irish clichés. Keep it VERY concise: 2-3 short sentences per paragraph, with no more than 2 paragraphs total. Include dialogue wherever you can.


Characters involved:
${characterDescriptions}

Setting:
${sceneDetails.setting}

${prevChoice?'Previous situation: '+prevChoice:''}

Action:
${sceneDetails.action}

Later user choices (do not reference these in your scene but your scene will end with one of these):
${sceneDetails.choices}

Important formatting:
1. Mark character names with "~" before and after each full name (e.g., ~Fionn mac Cumhaill~). Always use complete names exactly as provided above.
2. Do not include a title - begin the scene immediately.
3. Separate paragraphs with "XXX".
4. Match the emotional tone to the scene - solemn for serious moments, energetic for action.
5. Use period-appropriate terms for weapons, nature, and daily objects.

CRUCIAL: Your scene MUST begin by directly addressing the previous situation (if any) and then the action. Incorporate ALL key elements from the action description, especially:
- Any previous decisions the characters made
- The current state/condition of the characters 
- The specific dynamics between characters mentioned
- The exact challenge or opportunity they're facing

Maintain historical authenticity while creating a vivid, engaging scene that flows naturally from the previous context, but with extreme brevity.`;

if(sceneDetails.scene_number==1) {
      prompt += `\n\nThis is the first scene so start by briefy describing the setting. `;
  
    }
    
if(finalScene) {
      prompt += `\n\nThis is the final scene so wrap up the story. `;
  
    }
    console.log('Prompt:', prompt);

    // Call to Claude API with streaming
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'XX',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-7-sonnet-20250219',
        max_tokens: 5000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: true  // Enable streaming
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Claude API error:', errorData);
      throw error(response.status, 'Error from Claude API');
    }

    // Set up server-sent events stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Process the response as a stream
        const reader = response.body.getReader();
        
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.close();
              break;
            }

            // Parse the SSE data
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                
                // Handle event stream completion marker
                if (data === '[DONE]') {
                  continue;
                }
                
                try {
                  const parsedData = JSON.parse(data);
                  
                  // Extract content delta if it exists
                  if (parsedData.type === 'content_block_delta' && 
                      parsedData.delta && 
                      parsedData.delta.text) {
                    // Send the text delta to the client
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: parsedData.delta.text })}\n\n`));
                  }
                } catch (e) {
                  console.error('Error parsing SSE data:', e);
                }
              }
            }
          }
        } catch (e) {
          console.error('Error reading stream:', e);
          controller.error(e);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
    
  } catch (error) {
    console.error('Server error:', error);
    throw error(500, 'Internal server error');
  }
}