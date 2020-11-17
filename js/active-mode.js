'use strict';

(() => {
  const TIMEOUT_IN_MS = 10000;
  const serverDownloadURL = `https://21.javascript.pages.academy/keksobooking/data`;

  const map = document.querySelector(`.map`);
  const adForm = document.querySelector(`.ad-form`);
  const filtersForm = document.querySelector(`.map__filters`);

  const mainPin = map.querySelector(`.map__pin--main`);
  const defaultMainPinLeft = 570;
  const defaultMainPinTop = 375;

  const onNoActiveMainPinMouseDown = (evt) => {
    if (evt.button === 0) {
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

    mainPin.style.left = `${defaultMainPinLeft}px`;
    mainPin.style.top = `${defaultMainPinTop}px`;
    window.pin.changeAddress(defaultMainPinLeft, defaultMainPinTop);

    mainPin.removeEventListener(`mousedown`, window.pin.onMainPinMouseDown);
    mainPin.removeEventListener(`keydown`, window.pin.onMainPinKeydown);

    mainPin.addEventListener(`mousedown`, onNoActiveMainPinMouseDown);
    mainPin.addEventListener(`keydown`, onNoActiveMainPinKeydown);


  };

  const turnOnActiveMode = (evt) => {
    window.load(serverDownloadURL, `GET`, window.ads.load, window.ads.errorLoad, TIMEOUT_IN_MS);

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

  window.activeMode = {
    turnOff: turnOffActiveMode,
  };
})();
