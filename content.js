(() => {
  "use strict";

  const ACTIVE_FLAG = "__twitchAutoClaimActive";
  const POLL_INTERVAL = 5000;

  if (globalThis[ACTIVE_FLAG]) return;

  globalThis[ACTIVE_FLAG] = true;

  const findClaimButton = () =>
    document.querySelector('button[data-a-target="chat-claim-bonus-button"]') ??
    document.querySelector(".claimable-bonus__icon")?.closest("button");

  const claim = () => {
    const button = findClaimButton();

    if (button) button.click();
  };

  setInterval(claim, POLL_INTERVAL);
})();
