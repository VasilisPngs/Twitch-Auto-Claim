(() => {
  "use strict";

  const CLAIM_ICON_SELECTOR = "button .claimable-bonus__icon";
  const POLL_INTERVAL_MS = 5000;
  const RETRY_DELAY_MS = 3000;

  const claim = () => {
    const target = document.querySelector(CLAIM_ICON_SELECTOR)?.closest("button");

    if (!target || target.disabled) return;

    const now = performance.now();
    const lastAttempt = Number(target.dataset.claimedAt);

    if (lastAttempt && now - lastAttempt < RETRY_DELAY_MS) return;

    target.dataset.claimedAt = now;
    target.click();
  };

  chrome.runtime.onMessage.addListener(() => {
    claim();
  });

  claim();
  setInterval(claim, POLL_INTERVAL_MS);
})();
