"use strict";

const INJECTED_FILES = ["content.js"];

const injectIntoTab = async (tab) => {
  if (tab.id == null || tab.discarded) return;

  try {
    await chrome.tabs.sendMessage(tab.id, { type: "claim" });
  } catch {
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: INJECTED_FILES
      });
    } catch {
      return;
    }
  }
};

const initializeOpenTabs = async () => {
  let tabs;

  try {
    tabs = await chrome.tabs.query({ url: "https://www.twitch.tv/*" });
  } catch {
    return;
  }

  await Promise.all(tabs.map(injectIntoTab));
};

chrome.runtime.onInstalled.addListener(initializeOpenTabs);
chrome.runtime.onStartup.addListener(initializeOpenTabs);
