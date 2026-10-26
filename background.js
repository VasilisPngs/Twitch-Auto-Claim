const ALARM_NAME = "claim-sweep";
const PERIOD_IN_MINUTES = 1;
const TAB_QUERY = { url: ["https://*.twitch.tv/*"] };
const SWEEP_MESSAGE = "claim";

const sweep = async () => {
  const tabs = await browser.tabs.query(TAB_QUERY);

  await Promise.allSettled(tabs.map((tab) => browser.tabs.sendMessage(tab.id, SWEEP_MESSAGE)));
};

const ensureAlarm = async () => {
  if (await browser.alarms.get(ALARM_NAME)) return;

  await browser.alarms.create(ALARM_NAME, { periodInMinutes: PERIOD_IN_MINUTES });
};

browser.runtime.onInstalled.addListener(ensureAlarm);
browser.runtime.onStartup.addListener(ensureAlarm);
browser.alarms.onAlarm.addListener(sweep);

ensureAlarm();
