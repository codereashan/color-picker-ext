const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");

btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
	// getting a data from storage api
	const color = chrome.storage.sync.get("color", ({ color }) => {
		// console.log('Color: ',color)
	});
  
	// to inject any script inside a web page
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (injectionResult) => {
      // we get returned color here from a callback
      const [data] = injectionResult;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValue.innerText = color;
        try {
          await navigator.clipboard.writeText(color);
        } catch (err) {
          console.error(err);
        }
      }
    }
  );
});

async function pickColor() {
  try {
    const eyeDroper = new EyeDropper();

    // activating eye dropper and it retuns color
    return await eyeDroper.open();
  } catch (err) {
    console.error(err);
  }
}
