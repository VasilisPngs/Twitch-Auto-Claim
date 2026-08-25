"use strict";

const ALARM_NAME = "claim-sweep";
const PERIOD_MINUTES = 0.5;
const TWITCH_TABS = { url: "https://www.twitch.tv/*" };
const INJECTED_FILES = ["content.js"];

const ensureAlarm = async () => {
  if (await chrome.alarms.get(ALARM_NAME)) return;

  await chrome.alarms.create(ALARM_NAME, { periodInMinutes: PERIOD_MINUTES });
};

const poke = async (tab) => {
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

const sweep = async () => {
  let tabs;

  try {
    tabs = await chrome.tabs.query(TWITCH_TABS);
  } catch {
    return;
  }

  if (!tabs.length) {
    await chrome.alarms.clear(ALARM_NAME);
    return;
  }

  await Promise.all(tabs.map(poke));
};

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== ALARM_NAME) return;

  sweep().catch(() => {});
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "twitch-open") return undefined;

  ensureAlarm();
  sendResponse({ ok: true });

  return false;
});

ensureAlarm();
