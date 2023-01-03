let color = "red";

chrome.runtime.onInstalled.addListener(() => {
  // sending data from this worker here then use storage api
  chrome.storage.sync.set({ color });
});
