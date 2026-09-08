(() => {
  "use strict";

  const CLAIM_SELECTOR = 'button[data-a-target="chat-claim-bonus-button"], button:has(.claimable-bonus__icon)';
  const POLL_INTERVAL = 5000;

  const claim = (button) => {
    const target = button ?? document.querySelector(CLAIM_SELECTOR);

    if (!target || target.dataset.claimed) return;

    target.dataset.claimed = "true";
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

  claim();
  observer.observe(document.body, { childList: true, subtree: true });
  setInterval(() => claim(), POLL_INTERVAL);
})();