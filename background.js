"use strict";

const CONTENT_SCRIPT = "content.js";
const TWITCH_TABS = { url: "https://www.twitch.tv/*" };

const initializeOpenTabs = async () => {
  let tabs;

  try {
    tabs = await chrome.tabs.query(TWITCH_TABS);
  } catch {
    return;
  }

  await Promise.all(
    tabs
      .filter((tab) => tab.id != null && !tab.discarded)
      .map((tab) =>
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: [CONTENT_SCRIPT]
        }).catch(() => {})
      )
  );
};

chrome.runtime.onInstalled.addListener(initializeOpenTabs);
chrome.runtime.onStartup.addListener(initializeOpenTabs);
