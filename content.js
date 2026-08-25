(() => {
  "use strict";

  const ACTIVE_FLAG = "__twitchAutoClaimActive";

  if (globalThis[ACTIVE_FLAG]) return;

  globalThis[ACTIVE_FLAG] = true;

  const SELECTOR = '.claimable-bonus__icon, button[data-a-target="chat-claim-bonus-button"]';
  const POLL_INTERVAL = 5000;

  const claim = () => {
    const button = document.querySelector(SELECTOR)?.closest("button");

    if (!button || button.disabled) return;

    button.click();
  };

  const tick = () => {
    try {
      claim();
    } catch {
      return;
    }
  };

  try {
    chrome.runtime.sendMessage({ type: "twitch-open" })?.catch?.(() => {});
  } catch {
    return;
  }

  setInterval(tick, POLL_INTERVAL);

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type !== "claim") return undefined;

    tick();
    sendResponse({ ok: true });

    return false;
  });
})();
