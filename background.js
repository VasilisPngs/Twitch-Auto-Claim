const ALARM_NAME = "claim-sweep";
const PERIOD_IN_MINUTES = 1;
const TAB_QUERY = { url: ["https://*.twitch.tv/*"] };
const SWEEP_MESSAGE = "claim";

const sweep = async () => {
  const tabs = await chrome.tabs.query(TAB_QUERY);

  await Promise.all(tabs.map(async (tab) => {
    try {
      await chrome.tabs.sendMessage(tab.id, SWEEP_MESSAGE);
    } catch {
    }
  }));
};

const createAlarm = () => chrome.alarms.create(ALARM_NAME, { periodInMinutes: PERIOD_IN_MINUTES });

chrome.runtime.onInstalled.addListener(createAlarm);
chrome.runtime.onStartup.addListener(createAlarm);
chrome.alarms.onAlarm.addListener(sweep);
