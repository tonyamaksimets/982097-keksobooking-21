'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const serverUploadURL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 10000;
  const adFormButtonReset = adForm.querySelector(`.ad-form__reset`);

  const onSuccess = () => {
    window.adFormStatusMessage.open(`success`);
    window.activeMode.turnOff();
    window.ads.removePins();
  };

  const onError = () => {
    window.adFormStatusMessage.open(`error`);
  };

  const onAdFormSubmit = (evt) => {
    evt.preventDefault();
    window.load(serverUploadURL, `POST`, onSuccess, onError, TIMEOUT_IN_MS, new FormData(adForm));
  };

  const onAdFormButtonResetClick = (evt) => {
    evt.preventDefault();
    window.activeMode.turnOff();
    window.ads.removePins();
  };

  adForm.addEventListener(`submit`, onAdFormSubmit);
  adFormButtonReset.addEventListener(`click`, onAdFormButtonResetClick);

})();
