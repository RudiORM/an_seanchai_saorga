# An Seanchaí Saorga (The artificial storyteller).

Full python code coming end of May! 

# Prompts

## 1. Named entity extraction
**Description:** from the stories, pull out all named entities

**Prompt:**
Extract all named characters and specific geographic locations from the following short Irish mythological story and return the results in JSON format.

For CHARACTERS: Only include individuals who are explicitly named, not groups.
For PLACES: Only include specific named geographical locations within Ireland where events in the narrative actually occur (exclude generic mentions like "Ireland" or "Fionn's house" and exclude locations mentioned only as places where the story was collected or recorded).

Return your answer in this exact JSON format:
{
  "CHARACTERS": ["character1", "character2"],
  "PLACES": ["place1", "place2"]
}

If no places are found, return an empty array for PLACES.

Text to analyze:
The Ugly Hag
A' Chailleach Ghrannda (The Ugly Hag)
A ferocious, hideous hag came to Ireland at night. She is described as having one eye, scabbed hands and huge teeth, bearing a sword and a poisonous spear. In some versions she came to Fionn's house in the guise of a poor woman seeking hospitality for the night, while in others, she sought battle with the Fianna. In either case they were unwilling to give her either lodgings or battle. She stole Fionn's quaich (cup) and fled from them. Fionn, Caoilte and Fear Sraoinidh nan Ràmh (Clumsy Oarsman[?]) gave chase. At the end of the lay they caught up with her at the waterfall of Eas Ruaidh (Assaroe, Co. Donegal), where they slew her and recovered the quaich.
 There are versions of this lay from Argyllshire and Sutherland.

## 2. Story suitability
**Description:** Not all stories are suited to being broken into scenes. Find a list of suitable ones.

**Prompt:**
I want to create a multi-scene story based in Irish mythology (Fionn and Na Fianna). I have a story and want to see if it is suitable. Analyse whether this narrative is suitable for a story format. A suitable story should have elements like multiple scenes, conflict, characters and narrative arc An unsuitable story would be one that is just a single scene, characters talking, or a very short description without specifics. Here is the story The Ugly Hag A' Chailleach Ghrannda (The Ugly Hag) A ferocious, hideous hag came to Ireland at night. She is described as having one eye, scabbed hands and huge teeth, bearing a sword and a poisonous spear. In some versions she came to Fionn's house in the guise of a poor woman seeking hospitality for the night, while in others, she sought battle with the Fianna. In either case they were unwilling to give her either lodgings or battle. She stole Fionn's quaich (cup) and fled from them. Fionn, Caoilte and Fear Sraoinidh nan Ràmh (Clumsy Oarsman[?]) gave chase. At the end of the lay they caught up with her at the waterfall of Eas Ruaidh (Assaroe, Co. Donegal), where they slew her and recovered the quaich. There are versions of this lay from Argyllshire and Sutherland. The characters in this story are: ['Cailleach', 'Fionn mac cumhaill', 'Caoilte', 'Fear sraoinidh nan ràmh'] Is this suitable? You should just respond with YES or NO.

## 3. Scriptwriter 1: write scenes
**Description:** Turns story into scenes with multiple choices and triggers

**Prompt:**
Create an interactive story based on the following narrative: The Ugly Hag
A' Chailleach Ghrannda (The Ugly Hag)
A ferocious, hideous hag came to Ireland at night. She is described as having one eye, scabbed hands and huge teeth, bearing a sword and a poisonous spear. In some versions she came to Fionn's house in the guise of a poor woman seeking hospitality for the night, while in others, she sought battle with the Fianna. In either case they were unwilling to give her either lodgings or battle. She stole Fionn's quaich (cup) and fled from them. Fionn, Caoilte and Fear Sraoinidh nan Ràmh (Clumsy Oarsman[?]) gave chase. At the end of the lay they caught up with her at the waterfall of Eas Ruaidh (Assaroe, Co. Donegal), where they slew her and recovered the quaich.
 There are versions of this lay from Argyllshire and Sutherland.
 

The characters in this story are: ['Cailleach', 'Fionn mac cumhaill', 'Caoilte', 'Fear sraoinidh nan ràmh']

Use your knowledge of Irish mythology, particularly stories involving Fionn Mac Cumhaill and the Fianna, 
as well as traditional Irish storytelling techniques when crafting these scenes.

You need to decide to break this into 2 OR 3 key scenes that would work well for an interactive narrative. 
IMPORTANT: Each scene must be distinct and include at least one meaningful CHOICE for the player to make.

Generate a JSON response with the following structure:
{
  "suitable": true,
  "scenes": [
    {
      "scene_number": 1,
      "setting": "Brief description of the scene location",
      "action": "Brief description of the key action in this scene",
      "choices": [
        "First possible choice the player can make",
        "Second possible choice the player can make",
        "Third possible choice (if applicable)"
      ],
      "trigger": "Brief description of how each choice leads to the next scene"
    },
    {
      "scene_number": 2,
      "setting": "Brief description for scene 2",
      "action": "Brief description of key action",
      "choices": [
        "First possible choice for scene 2",
        "Second possible choice for scene 2"
      ],
      "trigger": "Brief description of how choices in scene 2 lead to scene 3"
    }
    ... scene 3 if applicable
  ]
}

For the setting, be concise and factual - just describe where the scene takes place.
For the action, briefly describe what's happening WITHOUT including the choices or decisions.
For the choices, list 2-3 distinct meaningful options the player could select that do not deviate from the original story too much.
For the trigger, explain how the different choices affect the transition to the next scene.

STICK STRICTLY TO THE ORIGINAL STORY ELEMENTS - do not invent new plot points that contradict the source material.

## 4. Scriptwriter 2: bridge scene
**Description:** Combine triggers and choices to expand out scenes above.

**Prompt:**
You are a narrative structure expert working with irish interactive fiction from the time of fionn and na fianna. I need you to transform a basic story outline into a branching narrative structure. Let's approach this step by step. First, here is the overall story.The Chess Game beneath the Yew Tree
An Cluiche Fichille faoin gCrann Iúir (The Chess Game beneath the Yew Tree)
Also known as
Cumain liom an imirt (I recall the game-playing)
Further Information
Duanaire Finn no. 69
One day during the elopement of Diarmaid and Gràinne they were gathering berries in a yew tree. The Fianna were in pursuit of them and came to the place where the exiles were. The Fianna took a rest, and Fionn and Oscar sat right under the tree Diarmaid and Gràinne were in and began to play ficheall (a board game – sometimes translated as "chess"). Diarmaid watched them from above, and when he saw Oscar make a bad move he dropped a berry onto the board, as if to indicate where he should move, and Oscar followed his advice. Fionn noticed this, and looking up, he saw Diarmaid in the tree. He wanted to have him killed straight away but Oscar wanted to let him go, and there arose a dispute among the Fianna. It came to a battle between Fionn's faction and Oscar's. Men were killed on each side, but in the end they came to terms and Diarmaid and Gràinne were allowed to leave in safety.
 There are versions of this lay from Argyllshire.
 Note: Tóraíocht Dhiarmada agus Ghráinne (The Pursuit of Diarmaid and Gráinne) and Diarmaid, Gráinne, agus Ciuthach (Diarmaid, Gráinne, and Ciuthach) also concern the elopement of Diarmaid and Gráinne.
 

Now here is the previous scene from the story:

{'scene_number': 3, 'setting': 'The forest clearing, tension-filled as the Fianna must decide Diarmaid and Gráinne's fate', 'action': 'The Fianna must reach a decision after skirmishes cause casualties on both sides.', 'choices': ['A cease-fire is proposed, allowing Diarmaid and Gráinne safe passage.', 'Fionn presses for Diarmaid's capture despite the losses, reigniting hostilities.'], 'trigger': 'A cease-fire allows resolution and peaceful departure for Diarmaid and Gráinne. If hostilities reignite, the Fianna are deeply divided, possibly altering their future.'}

and the choice the user took: Fionn presses for Diarmaid's capture despite the losses, reigniting hostilities.

 Now briefly resolve the story in one sentence.

## 5. Scriptwriter 3: expand characters
**Description:** From a list of characters, get their motivations

**Prompt:**
 I am going to give you a character from irish mythology and some information about them. 

Using the information i give you and your own knowledge, describe the character and their motivation in 1 sentence.

If you do not have any information about this character, just respond with XXX.

I will be using this to create dialogue so i am most interested in the character's personality and motivations.

## 6. Director
**Description:** Write the current scene

**Prompt:**
I will give you a scene involving Fionn and na Fianna.

Write the scene in the style of early Irish authors like James Stephens - direct language with minimal but vivid imagery. Use extremely sparse descriptions. Avoid Irish clichés. Keep it VERY concise: 2-3 short sentences per paragraph, with no more than 2 paragraphs total. Include dialogue wherever you can.

Characters involved:
Fionn mac cumhaill: Fionn mac Cumhaill, the formidable leader of the Fianna and Clan Baoiscne, is a wise and valiant warrior whose magical insight often guides his decisions; however, his assertive leadership can occasionally lead to friction and discord within his ranks, particularly with figures like Diarmaid and Goll.

Lon mac liobhain: Lon mac Liobhain is a fearsome and masterful blacksmith whose sinister ambitions drive him to forge powerful weapons for the warriors of Lochlann, wielding his monstrous appearance and unparalleled skill to shape the destiny of battles through his creations.

Dubhan's daughter: daughter of Dubhan



Setting:
On board a ship in the midst of a fierce storm at sea.

Action:
The ship is caught in a violent storm, and the crew fears it will sink unless the ship is lightened.

Later user choices (do not reference these in your scene but your scene will end with one of these) ["Agree to follow Dubhan's daughter's suggestion to throw overboard every ninth man.", 'Propose an alternate solution to avoid losing any men.', "Refuse to sacrifice anyone, risking the ship's fate"]

Important formatting:
1. Mark character names with "~" before and after each full name (e.g., ~Fionn mac Cumhaill~). Always use complete names exactly as provided above.
2. Do not include a title - begin the scene immediately.
3. Separate paragraphs with "XXX".
4. Match the emotional tone to the scene - solemn for serious moments, energetic for action.
5. Use period-appropriate terms for weapons, nature, and daily objects.

CRUCIAL: Your scene MUST begin by describing the choice made in the previous situation and use the detail provided to advance from that scene to the current one. Incorporate ALL key elements from the action description, especially:
- Any previous decisions the characters made
- The current state/condition of the characters 
- The specific dynamics between characters mentioned
- The exact challenge or opportunity they're facing

Maintain historical authenticity while creating a vivid, engaging scene that flows naturally from the previous context, but with extreme brevity.

This is the first scene so start by briefy describing the setting.
