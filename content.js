"use strict";

(() => {
  const CLAIM_ICON_SELECTOR = '[data-a-target="claimable-bonus__icon"]';
  const CLICK_DELAY = 1000;

  let isScheduled = false;
  let lastClickTime = 0;

  const getClaimButton = () => {
    const target = document.querySelector(CLAIM_ICON_SELECTOR);
    const button = target?.closest("button");

    return button instanceof HTMLButtonElement && !button.disabled ? button : null;
  };

  const claim = () => {
    isScheduled = false;

    const button = getClaimButton();
    const now = performance.now();

    if (!button || now - lastClickTime < CLICK_DELAY) return;

    lastClickTime = now;
    button.click();
  };

  const schedule = () => {
    if (isScheduled) return;

    isScheduled = true;
    requestAnimationFrame(claim);
  };

  schedule();

  new MutationObserver(schedule).observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["disabled", "data-a-target"]
  });
})();
