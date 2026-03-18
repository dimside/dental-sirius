export const initPrivacyModal = (
  openButtonSelector: string,
  overlaySelector = '.privacy-overlay',
  closeBtnSelector = '.privacy-close'
) => {
  const privacyButton = document.querySelector(openButtonSelector) as HTMLElement;
  const privacyModal = document.querySelector(overlaySelector) as HTMLElement;
  const privacyCloseBtn = document.querySelector(closeBtnSelector) as HTMLElement;
  let lastFocused: HTMLElement | null = null;

  if (!privacyButton || !privacyModal || !privacyCloseBtn) return;

  const closeHandler = () => {
    document.body.classList.remove('no-scroll');
    privacyModal.classList.add('is-hidden');
    lastFocused?.focus();
  };

  privacyButton.addEventListener('click', () => {
    lastFocused = document.activeElement as HTMLElement;
    privacyModal.classList.remove('is-hidden');
    document.body.classList.add('no-scroll');
    privacyCloseBtn.focus();
  });

  privacyCloseBtn.addEventListener('click', closeHandler);

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') closeHandler();
  });

  privacyModal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeHandler();
  });

  return { closeHandler };
};
