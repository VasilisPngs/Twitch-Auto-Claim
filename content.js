"use strict";

const SELECTOR = '.claimable-bonus__icon, button[data-a-target="chat-claim-bonus-button"]';

const POLL_INTERVAL = 5000;

const claim = () => {
  const button = document.querySelector(SELECTOR)?.closest("button");
  if (button && !button.disabled) {
    button.click();
  }
};

setInterval(claim, POLL_INTERVAL);
