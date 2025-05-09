<!-- App.svelte -->
<script>
  import { onMount } from "svelte";

  // Sample edges (connections between nodes)


  let width = $state(200);
  let selectedChoice = $state("");

  let finalScene = $state(false);
  let backgroundAudio = $state(null);
  let narration = $state(null);
  let playPromise = $state(null);

  let isLoading = $state(false);
  let error = $state("");

  let charsData = $state("");
  let scenesData = $state("");
  let textData = $state("");

  let sceneNumber = $state(1);
  let scenario = $state(".0");

  let sceneScript = $state("");
  let voiceText = $state([]);

  let generatedImage = $state(null);
  let clicked = $state(false);

  let textContentRef = $state(null);

  let storyNumber = $state(0);

  let sceneText = $derived.by(() => {
    if (textData) {
      return textData.filter(
        (item) =>
          item.story === storyNumber &&
          item.scene === sceneNumber &&
          item.scenario === scenario,
      );
    }
  });

  let idx = $derived.by(() => {
    if (textData) {
      console.log("storyNumber", storyNumber);
      console.log("sceneNumber", sceneNumber);
      console.log("scenario", scenario);

      return textData.findIndex(
        (item) =>
          item.story === storyNumber &&
          item.scene === sceneNumber &&
          item.scenario === scenario,
      );
    }
  });

  let choices = $derived.by(() => {
    if (scenesData && sceneNumber < 4) {
      return scenesData[(storyNumber)].scenes[sceneNumber - 1].choices;
    }
  });

  let image_index = $derived.by(() => {
    if (scenesData) {
      return storyNumber + "-" + (sceneNumber < 4 ? sceneNumber : 3);
    }
  });

  async function loadJsonData(file) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error loading JSON:", error);
    }
}

  onMount(async () => {
    scenesData = await loadJsonData("final-scenes.json");
    charsData = await loadJsonData("final-characters.json");
    textData = await loadJsonData("scene-text.json");

    console.log(scenesData.length)

    storyNumber = Math.floor(Math.random() * scenesData.length+1)

    const updateWidth = () => {
      width = window.innerWidth;
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    setupBackgroundMusic();

    return () => {
      window.removeEventListener("resize", updateWidth);
      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio = null;
      }
    };
  });

  function selectChoice(index) {
    if (sceneNumber === 3) {
      finalScene = true;
    }

    selectedChoice = index;
    scenario = "." + (index + 1);
    sceneNumber += 1;

    narrate(idx);

    // Scroll the right page back to the top
    if (textContentRef) {
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  }

  function resetSeanchai() {
            scrollToTop();

  function getNewStoryNumber() {
    // Store the current story number
    const currentStory = storyNumber;
    
    // Initialize the new story number to the current one (to enter the loop)
    let newStoryNumber = currentStory;
    
    // Keep generating new random numbers until we get one different from the current
    while (newStoryNumber === currentStory) {
      newStoryNumber = Math.floor(Math.random() * scenesData.length);
    }
  
  return newStoryNumber;
}

// Then replace your random assignment with:



    // Reset the state variables
    finalScene = false;
    selectedChoice = 0;
    scenario = ".0";
    sceneNumber = 1;
storyNumber = getNewStoryNumber();
    console.log("New story number:", storyNumber);
    isLoading = false;
    error = "";

    // Reset the text content reference
    if (textContentRef) {
      textContentRef.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Reset the narration
    if (narration) {
      narration.pause();
      narration.currentTime = 0;
      narration = null;
    }

        narrate(idx);



  }

function scrollToTop() {
  if (textContentRef) {
    // For desktop view
    textContentRef.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    // For mobile view - find the closest scrollable container
    if (width <= 600) {
      // Check if we're in mobile view
      const mobileContainer = textContentRef.closest('.book-content-mobile');
      if (mobileContainer) {
        mobileContainer.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }
}

  async function narrate(idx) {
    if (narration) {
      // If we have an ongoing play operation, we need to wait for it to resolve
      // before we can pause it to avoid the AbortError
      if (playPromise) {
        try {
          // Wait for the previous play() to resolve
          await playPromise;
          // Now it's safe to pause
          narration.pause();
        } catch (error) {
          // Previous play failed, but we can still continue
          console.error("Previous audio play failed:", error);
        }
      } else {
        // No active promise, safe to pause
        narration.pause();
      }
      narration.currentTime = 0;
    }

    // Create new narration audio

    console.log(idx)
    narration = new Audio(
      `https://res.cloudinary.com/dkp2zsjlg/video/upload/output-${idx}.mp3`,
    );
    narration.loop = false;
    narration.volume = 1;

    // Only play if we're past the intro scene
    if (sceneNumber > 0) {
      try {
        // Store the promise so we can track its completion
        playPromise = narration.play();
        // Wait for it to complete
        await playPromise;
      } catch (error) {
        console.error("Narration playback failed:", error);
      } finally {
        // Clear the promise reference when done, whether successful or not
        playPromise = null;
      }
    }

    // Reset playState after narration ends
    narration.onended = () => {
      playPromise = null;
    };
  }
  function setupBackgroundMusic() {
    // Properly clean up existing audio if it exists
    if (backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    }

    // Initialize background audio
    backgroundAudio = new Audio("/new-rain.mp3");
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.5; // Lowered volume to avoid competing with narration

    // Set up event listeners for user interaction
  }

  async function startAudio() {
    if (backgroundAudio) {
      try {
        if (selectedChoice == "") {
              clicked = true

          narrate(idx);
        }
        // Attempt to play the audio
        await backgroundAudio.play();
      } catch (error) {
        console.error("Background audio playback failed:", error);
      }
    }
  }
</script>

<svelte:head>
  <!-- Import the Uncial Antiqua font from Google Fonts -->
  <link
    href="https://fonts.googleapis.com/css2?family=Eagle+Lake&family=Uncial+Antiqua&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<main>
  {#if scenesData}
    <div class="book-container opened">
      {#if width > 600}
        <!-- Desktop layout: Left page for image, right page for text -->
        <div class="book">
          <div class="page left-page">
            <div class="page-content image-container">
              <div class="img">
                {#if clicked}
                  <img
                    src={"https://res.cloudinary.com/dkp2zsjlg/image/upload/image_" +
                      image_index +
                      ".png"}
                  />
                {:else}
                  <img src="/seanchai.png" alt="Story Cover" />
                {/if}
              </div>
            </div>
          </div>
          <div class="book-spine"></div>
          <div class="page right-page">
            {#if clicked}
              <h2>{scenesData[storyNumber].irish_name}</h2>
              <a>{"(" + scenesData[storyNumber].name + ")"}</a>
              <div class="page-content text-content" bind:this={textContentRef}>
                {#if sceneText}
                  {#each sceneText[0]["text-content"].split("XXX") as paragraph, i}
                    <p class={"p" + i}>{paragraph}</p>
                  {/each}
                {/if}

                {#if !isLoading && !finalScene}
                  <div class="choices-container">
                    <h2>What will you do?</h2>
                    <ul class="choices">
                      {#each choices as choice, i}
                        <li
                          class={selectedChoice === i ? "" : ""}
                          on:click={() => selectChoice(i)}
                        >
                          {choice}
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}

                {#if finalScene}
                  <div class="choices-container">
                    <ul class="choices">
                      <li on:click={() => resetSeanchai()}>
                        <h2>Choose a new story</h2>
                      </li>
                    </ul>
                  </div>
                {/if}

                {#if error}
                  <p class="error">{error}</p>
                {/if}
              </div>
            {:else}
              <div class="start-screen">
                <h2>An Seanchaí Saorga</h2>
                <p>(The artifical storyteller)</p>
                <button class="start-button" on:click={() => startAudio()}>
                 Tell me a story
                </button>
             <div class = 'ack'>
                <p style='font-size:1rem'>Created by Rudi O'Reilly Meehan, <a href="https://www.dataanddesign.ie" target="_blank">Data&Design</a></p>
</div>
              </div>
            {/if}
          </div>
        </div>
      {:else}
        <!-- Mobile layout: Single page with book appearance -->
        <div class="book-wrapper-mobile">
          <div class="book-mobile">
            <div class="book-content-mobile">
              {#if clicked}
                <h2 class="mobile-title">{scenesData[storyNumber].irish_name}</h2>
                <a>{"(" + scenesData[storyNumber].name + ")"}</a>
                
                <div class="image-container-mobile">
                  <img
                    src={"https://res.cloudinary.com/dkp2zsjlg/image/upload/image_" +
                      image_index +
                      ".png"}
                  />
                </div>
                
                <div class="text-content-mobile" bind:this={textContentRef}>
                  {#if sceneText}
                    {#each sceneText[0]["text-content"].split("XXX") as paragraph, i}
                      <p class={"p" + i}>{paragraph}</p>
                    {/each}
                  {/if}

                  {#if !isLoading && !finalScene}
                    <div class="choices-container-mobile">
                      <h2>What will you do?</h2>
                      <ul class="choices-mobile">
                        {#each choices as choice, i}
                          <li
                            class={selectedChoice === i ? "selected-mobile" : ""}
                            on:click={() => selectChoice(i)}
                          >
                            {choice}
                          </li>
                        {/each}
                      </ul>
                    </div>
                  {/if}

                  {#if finalScene}
                    <div class="choices-container-mobile">
                      <ul class="choices-mobile">
                        <li on:click={() => resetSeanchai()}>
                          <h2>Choose a new story</h2>
                        </li>
                      </ul>
                    </div>
                  {/if}

                  {#if error}
                    <p class="error">{error}</p>
                  {/if}
                </div>
              {:else}
                <div class="start-screen-mobile">


                  
    <h2>An Seanchaí Saorga</h2>
                <p>(The artifical storyteller)</p>
                  <div class="image-container-mobile">
                    <img src="/seanchai.png" alt="Story Cover" style="max-height: 320px" />
                  </div>
                  <button class="start-button-mobile" on:click={() => startAudio()}>
                    Tell me a story
                  </button>
                  <br>
                <p style='font-size:1rem'>Created by Rudi O'Reilly Meehan, <a href="https://www.dataanddesign.ie" target="_blank">Data&Design</a></p>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</main>


<style>
  :global(body) {
  margin: 0;
  padding: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("/backg2.png");
  background-size: cover;
  background-repeat: no-repeat;
  font-family: "Eagle Lake", cursive;
}

a {
  color: #5c3117;
}

main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-container {
  max-width: 942px;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Desktop Book Styles */
.book {
  display: flex;
  width: 942px;
  height: 723px;
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
  position: relative;
  justify-content: center;
  align-items: center;
  background-image: url("/bookg2.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.page {
  box-sizing: border-box;
  position: relative;
  border: 0px solid #a89070;
}

.diagram-container {
  margin: 0 auto;
  margin-left: 60px;
}

.left-page,
.right-page {
  width: 50%;
}

.ack{
  position: absolute;
  bottom: 10px;
  color: #5c3117;
}

.left-page {
  border-right: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.right-page {
  border-left: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding-left: 20px;
  padding-right: 85px;
  margin-top: 20px;
  margin-bottom: 20px;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column; /* Stack children vertically */
}

.book-spine {
  width: 0px;
  background-color: #8b4513;
  z-index: 10;
}

.page-content {
  flex: 1; /* Take up remaining space */
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scrollbar-color: none;
  scrollbar-track-color: none;
  padding: 0px;
  margin-top: 20px;
  max-height: calc(100% - 100px); /* Maximum height accounting for title area */
}

.text-content {
  color: #3c2415;
  line-height: 1.6;
  font-size: 18px;
  text-align: justify;
}

.text-content h1 {
  font-size: 26px;
  text-align: center;
  margin-bottom: 20px;
  color: #5c3117;
  border-bottom: 2px solid #8b451380;
  padding-bottom: 10px;
}

.text-content p {
  margin-bottom: 16px;
}

.p0::first-letter {
  font-family: "Uncial Antiqua";
  font-size: 38px;
  line-height: normal;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  max-width: calc(90% - 100px);
  max-height: 85%;
  padding-left: 100px;
  padding-right: 20px;
  border-radius: 10px;
}

.choices-container {
  margin-top: 30px;
  padding: 15px;
  border-radius: 5px;
  border: 0px solid #8b451350;
}

.choices-container h2 {
  text-align: center;
  margin-bottom: 15px;
  font-size: 22px;
  color: #5c3117;
  font-family: "Uncial Antiqua";
}

h2 {
  font-family: "Uncial Antiqua";
  color: #5c3117;
}

.choices {
  list-style-type: none;
  padding: 0;
}

.choices li {
  padding: 10px 15px;
  margin-bottom: 10px;
  border: 1px solid #ab804c;
  border-radius: 10px;
  cursor: pointer;
  background-color: #ab804c66;
  transition: all 0.3s ease;
}

.choices li:hover {
  background-color: #ab804cbb;
  transform: translateX(5px);
}

.choices li.selected {
  background-color: rgba(139, 69, 19, 0.2);
  border-color: #8b4513;
  transform: translateX(10px);
}

.loading-indicator {
  text-align: center;
  margin: 20px 0;
}

.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;
  text-align: center;
}

.start-screen h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.start-screen p {
  font-size: 20px;
  margin-bottom: 40px;
  color: #5c3117;
}

.start-button {
  background-color: #ab804c66;
  color: #3c2415;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-family: "Eagle Lake", cursive;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}





.start-button:hover {
  background-color: #ab804cbb;
}

/* Start screen styles for mobile */
.start-screen-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  padding: 20px;
  text-align: center;
}

.start-screen-mobile h2 {
  font-size: 30px;
  margin-bottom: 15px;
}

.start-screen-mobile p {
  font-size: 18px;
  margin-bottom: 30px;
  color: #5c3117;
}

.start-button-mobile {
  background-color: #ab804c66;
  color: #3c2415;
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  font-family: "Eagle Lake", cursive;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.start-button-mobile:hover {
  background-color: #ab804cbb;
}

.spinner {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 3px solid rgba(139, 69, 19, 0.2);
  border-radius: 50%;
  border-top-color: #8b4513;
  animation: spin 1s linear infinite;
  margin-top: 10px;
}

.error {
  color: #8b2500;
  background-color: rgba(139, 37, 0, 0.1);
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Mobile Specific Styles */
@media (max-width: 600px) {
  .book-wrapper-mobile {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  .book-mobile {
    width: 100%;
    height: 100vh;
    background-image: url("/right.png");
  background-size: 100% 100%; /* Make sure it covers exactly 100% height */
    background-position: center right;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    overflow: hidden; /* Change from overflow-y: auto to hidden */
    position: relative;
    box-sizing: border-box;
    padding: 20px;
  }
  
  .book-content-mobile {
    width: 90%;
    margin-right: min(60px, calc(100vw / 6)); 
 height: 100%;
 margin-left: 20px;
  overflow-y: auto; /* Add this to make the content scrollable */
  padding-bottom: 40px;
  position: relative;
  box-sizing: border-box; 
   -webkit-scrollbar: none;
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
 }

 .book-content-mobile::-webkit-scrollbar {
  display: none;
}
  
  .mobile-title {
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 24px;
  }
  
  .image-container-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
    width: 100%;
  }
  
  .image-container-mobile img {
    max-width: 90%;
    height: auto;
    border-radius: 0px;

    display: block;
    margin: 0 auto;
  }
  
  .text-content-mobile {
    color: #3c2415;
    line-height: 1.6;
    font-size: 16px;
    text-align: left;
    padding-right: 5px;
  }
  
  .text-content-mobile p {
    margin-bottom: 16px;
  }
  
  .choices-container-mobile {
    margin-top: 20px;
    padding: 10px;
    border-radius: 0px;
  }
  
  .choices-container-mobile h2 {
    text-align: center;
    margin-bottom: 15px;
    font-size: 20px;
  }
  
  .choices-mobile {
    list-style-type: none;
    padding: 0;
  }
  
  .choices-mobile li {
    padding: 10px 15px;
    margin-bottom: 10px;
    border: 1px solid #ab804c;
    border-radius: 10px;
    cursor: pointer;
    background-color: #ab804c66;
  }
  
  .choices-mobile li:hover {
    background-color: #ab804cbb;
  }
  
  .choices-mobile li.selected-mobile {
    background-color: #ab804cdd;
    border-color: #8b4513;
  }
}
</style>
