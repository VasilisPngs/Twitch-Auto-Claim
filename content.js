(() => {
  "use strict";

  const CLAIM_SELECTOR = 'button[data-a-target="chat-claim-bonus-button"], button:has(.claimable-bonus__icon)';
  const POLL_INTERVAL = 5000;

  const claim = () => {
    const button = document.querySelector(CLAIM_SELECTOR);

    if (button) button.click();
  };

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) {
          if (node.matches(CLAIM_SELECTOR)) {
            node.click();
            return;
          }

          const nestedButton = node.querySelector(CLAIM_SELECTOR);

          if (nestedButton) {
            nestedButton.click();
            return;
          }
        }
      }
    }
  });

  claim();
  observer.observe(document.body, { childList: true, subtree: true });
  setInterval(claim, POLL_INTERVAL);
})();