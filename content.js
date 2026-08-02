"use strict";

const SELECTOR = '.claimable-bonus__icon, button[data-a-target="chat-claim-bonus-button"]';

const POLL_INTERVAL = 5000;

const claim = () => {
  document.querySelector(SELECTOR)?.closest("button")?.click();
};

setInterval(claim, POLL_INTERVAL);
