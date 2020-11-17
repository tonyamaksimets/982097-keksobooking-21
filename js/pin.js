'use strict';

(() => {
  const MAIN_PIN_HEIGHT = 65;
  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT_ACTIVE = 81;
  const MIN_ADDRESS_X = 0;
  const MAX_ADDRESS_X = 1200;
  const MAX_ADDRESS_Y = 630;
  const MIN_ADDRESS_Y = 130;
  const MIN_PIN_X = MIN_ADDRESS_X - MAIN_PIN_WIDTH / 2;
  const MAX_PIN_X = MAX_ADDRESS_X - MAIN_PIN_WIDTH / 2;
  const MAX_PIN_Y = MAX_ADDRESS_Y - MAIN_PIN_HEIGHT_ACTIVE;
  const MIN_PIN_Y = MIN_ADDRESS_Y - MAIN_PIN_HEIGHT_ACTIVE;
  const SHIFT_STEP = 10;

  const map = document.querySelector(`.map`);

  const addressInput = document.querySelector(`#address`);

  const mapPinsContainer = document.querySelector(`.map__pins`);
  const mainPin = mapPinsContainer.querySelector(`.map__pin--main`);


  const changeAddress = (pinX, pinY) => {
    const addressX = pinX + MAIN_PIN_WIDTH / 2;
    const addressY = (map.classList.contains(`map--faded`)) ? pinY + MAIN_PIN_HEIGHT : pinY + MAIN_PIN_HEIGHT_ACTIVE;

    addressInput.setAttribute(`value`, `${Math.round(addressX)}, ${Math.round(addressY)}`);
  };

  const shiftMainPin = (x, y, shiftX, shiftY) => {
    let mainPinX = window.util.fitToRange(x - shiftX, MIN_PIN_X, MAX_PIN_X);
    let mainPinY = window.util.fitToRange(y - shiftY, MIN_PIN_Y, MAX_PIN_Y);

    mainPin.style.left = `${mainPinX}px`;
    mainPin.style.top = `${mainPinY}px`;

    changeAddress(mainPinX, mainPinY);
  };

  const onMainPinMouseDown = (evt) => {
    let dragged = false;

    const mapPinsCoords = mapPinsContainer.getBoundingClientRect();
    const mainPinCoords = mainPin.getBoundingClientRect();
    const shiftX = evt.clientX - mainPinCoords.left;
    const shiftY = evt.clientY - mainPinCoords.top;

    const onMainPinMouseMove = (moveEvt) => {
      dragged = true;

      const newX = moveEvt.clientX - mapPinsCoords.left;
      const newY = moveEvt.clientY - mapPinsCoords.top;

      shiftMainPin(newX, newY, shiftX, shiftY);
    };

    const onMainPinMouseUp = () => {
      if (!dragged) {
        const newX = evt.clientX - mapPinsCoords.left;
        const newY = evt.clientY - mapPinsCoords.top;
        shiftMainPin(newX, newY, shiftX, shiftY);
      }

      document.removeEventListener(`mousemove`, onMainPinMouseMove);
      document.removeEventListener(`mouseup`, onMainPinMouseUp);
    };

    document.addEventListener(`mousemove`, onMainPinMouseMove);
    document.addEventListener(`mouseup`, onMainPinMouseUp);
  };

  const onMainPinKeydown = (evt) => {
    const mapPinsCoords = mapPinsContainer.getBoundingClientRect();
    const mainPinCoords = mainPin.getBoundingClientRect();
    const mainPinLeft = mainPinCoords.left - mapPinsCoords.left;
    const mainPinTop = mainPinCoords.top - mapPinsCoords.top;

    switch (evt.key) {
      case `ArrowLeft`:
        evt.preventDefault();
        shiftMainPin(mainPinLeft - SHIFT_STEP, mainPinTop, 0, 0);
        break;
      case `ArrowRight`:
        evt.preventDefault();
        shiftMainPin(mainPinLeft + SHIFT_STEP, mainPinTop, 0, 0);
        break;
      case `ArrowUp`:
        evt.preventDefault();
        shiftMainPin(mainPinLeft, mainPinTop - SHIFT_STEP, 0, 0);
        break;
      case `ArrowDown`:
        evt.preventDefault();
        shiftMainPin(mainPinLeft, mainPinTop + SHIFT_STEP, 0, 0);
        break;
    }
  };

  window.pin = {
    onMainPinMouseDown,
    onMainPinKeydown,
    changeAddress,
  };

})();
