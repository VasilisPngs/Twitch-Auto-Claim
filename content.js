(() => {
  "use strict";

  const CLAIM_SELECTOR = 'button[data-a-target="chat-claim-bonus-button"], button:has(.claimable-bonus__icon)';
  const POLL_INTERVAL = 5000;
  const RETRY_DELAY = 3000;

  const claim = () => {
    const target = document.querySelector(CLAIM_SELECTOR);

    if (!target || target.disabled) return;

    const now = performance.now();
    const lastAttempt = Number(target.dataset.claimedAt);

    if (lastAttempt && now - lastAttempt < RETRY_DELAY) return;

    target.dataset.claimedAt = now;
    target.click();
  };

  chrome.runtime.onMessage.addListener(() => {
    claim();
  });

  claim();
  setInterval(claim, POLL_INTERVAL);
})();
