"use strict";

(() => {
  const SELECTORS = [
    ".claimable-bonus__icon",
    'button[data-a-target="chat-claim-bonus-button"]'
  ];

  const POLL_INTERVAL = 2000;

  const claim = () => {
    for (const selector of SELECTORS) {
      const button = document.querySelector(selector)?.closest("button");
      if (button && !button.disabled) {
        button.click();
        return;
      }
    }
  };

  setInterval(claim, POLL_INTERVAL);
})();
