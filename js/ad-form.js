'use strict';

const SERVER_UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;

const adForm = document.querySelector(`.ad-form`);
const adFormButtonReset = adForm.querySelector(`.ad-form__reset`);
const adFormInputs = adForm.querySelectorAll(`input`);
const adFormSelects = adForm.querySelectorAll(`select`);
const avatarImage = adForm.querySelector(`.ad-form-header__preview img`);
const photoImage = adForm.querySelector(`.ad-form__photo`);

const clearPreviews = () => {
  avatarImage.src = `img/muffin-grey.svg`;
  photoImage.style.backgroundImage = `none`;
};

const onSuccess = () => {
  window.adFormStatusMessage.open(`success`);
  window.activeMode.turnOff();
  window.ads.removePins();
  clearPreviews();
};

const onError = () => {
  window.adFormStatusMessage.open(`error`);
};

const onAdFormSubmit = (evt) => {
  evt.preventDefault();
  window.load(SERVER_UPLOAD_URL, `POST`, onSuccess, onError, TIMEOUT_IN_MS, new FormData(adForm));
};

const onAdFormButtonResetClick = (evt) => {
  evt.preventDefault();
  window.activeMode.turnOff();
  window.ads.removePins();

  adFormInputs.forEach((item) => {
    item.style.boxShadow = `none`;
  });

  adFormSelects.forEach((item) => {
    item.style.boxShadow = `none`;
  });

  clearPreviews();
};

adForm.addEventListener(`submit`, onAdFormSubmit);
adFormButtonReset.addEventListener(`click`, onAdFormButtonResetClick);
