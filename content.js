(() => {
  "use strict";

  const CLAIM_SELECTOR = 'button[data-a-target="chat-claim-bonus-button"], button:has(.claimable-bonus__icon)';
  const POLL_INTERVAL = 5000;
  const RETRY_DELAY = 3000;

  const claim = (button) => {
    const target = button ?? document.querySelector(CLAIM_SELECTOR);

    if (!target || target.disabled) return;

    const now = performance.now();
    const lastAttempt = Number(target.dataset.claimedAt);

    if (lastAttempt && now - lastAttempt < RETRY_DELAY) return;

    target.dataset.claimedAt = now;
    target.click();
  };

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches(CLAIM_SELECTOR)) {
            claim(node);
            return;
          }

          const nestedButton = node.querySelector(CLAIM_SELECTOR);

          if (nestedButton) {
            claim(nestedButton);
            return;
          }
        }
      }
    }
  });

  chrome.runtime.onMessage.addListener(() => {
    claim();
  });

  claim();
  observer.observe(document.body, { childList: true, subtree: true });
  setInterval(() => claim(), POLL_INTERVAL);
})();