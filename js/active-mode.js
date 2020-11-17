'use strict';

const LEFT_MOUSE_BUTTON_CODE = 0;
const TIMEOUT_IN_MS = 10000;
const SERVER_DOWNLOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;

const map = document.querySelector(`.map`);
const adForm = document.querySelector(`.ad-form`);
const filtersForm = document.querySelector(`.map__filters`);

const mainPin = map.querySelector(`.map__pin--main`);
const DEFAULT_MAIN_PIN_LEFT = 570;
const DEFAULT_MAIN_PIN_TOP = 375;

const onNoActiveMainPinMouseDown = (evt) => {
  if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
    turnOnActiveMode(evt);
  }
};

const onNoActiveMainPinKeydown = (evt) => {
  window.util.isEnterEvent(evt, turnOnActiveMode);
};


const turnOffActiveMode = () => {
  map.classList.add(`map--faded`);

  window.util.toggleFormDisability(adForm, true);
  adForm.reset();
  adForm.classList.add(`ad-form--disabled`);
  window.adFormValidity.deactivate();
  window.util.toggleFormDisability(filtersForm, true);
  filtersForm.reset();
  window.adsFilters.deactivate();

  mainPin.style.left = `${DEFAULT_MAIN_PIN_LEFT}px`;
  mainPin.style.top = `${DEFAULT_MAIN_PIN_TOP}px`;
  window.pin.changeAddress(DEFAULT_MAIN_PIN_LEFT, DEFAULT_MAIN_PIN_TOP);

  mainPin.removeEventListener(`mousedown`, window.pin.onMainPinMouseDown);
  mainPin.removeEventListener(`keydown`, window.pin.onMainPinKeydown);

  mainPin.addEventListener(`mousedown`, onNoActiveMainPinMouseDown);
  mainPin.addEventListener(`keydown`, onNoActiveMainPinKeydown);
};

const turnOnActiveMode = (evt) => {
  window.load(SERVER_DOWNLOAD_URL, `GET`, window.ads.load, window.ads.errorLoad, TIMEOUT_IN_MS);

  map.classList.remove(`map--faded`);

  window.util.toggleFormDisability(adForm, false);
  adForm.classList.remove(`ad-form--disabled`);
  window.adFormValidity.activate();
  window.util.toggleFormDisability(filtersForm, false);

  if (evt.type === `mousedown`) {
    window.pin.onMainPinMouseDown(evt);
  }

  mainPin.addEventListener(`mousedown`, window.pin.onMainPinMouseDown);
  mainPin.addEventListener(`keydown`, window.pin.onMainPinKeydown);
  mainPin.removeEventListener(`mousedown`, onNoActiveMainPinMouseDown);
  mainPin.removeEventListener(`keydown`, onNoActiveMainPinKeydown);

};

turnOffActiveMode();

window.activeMode = {
  turnOff: turnOffActiveMode,
};
