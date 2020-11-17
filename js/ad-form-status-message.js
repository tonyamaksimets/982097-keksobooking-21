'use strict';

(() => {
  const main = document.querySelector(`main`);

  const successMessageTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);

  const errorMessageTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);

  let messageElement;

  const closeStatusMessage = () => {
    messageElement.remove();
    document.removeEventListener(`keydown`, onStatusMessageEscPress);
    document.removeEventListener(`click`, onStatusMessageClick);
  };

  const onStatusMessageEscPress = (evt) => {
    window.util.isEscEvent(evt, closeStatusMessage);
  };

  const onStatusMessageClick = (evt) => {
    evt.preventDefault();
    closeStatusMessage();
  };

  const onStatusButtonClick = () => {
    closeStatusMessage();
  };

  const openStatusMessage = (status) => {
    if (status === `success`) {
      messageElement = successMessageTemplate.cloneNode(true);
    } else if (status === `error`) {
      messageElement = errorMessageTemplate.cloneNode(true);
      messageElement.querySelector(`.error__button`).addEventListener(`click`, onStatusButtonClick);
    }

    document.addEventListener(`keydown`, onStatusMessageEscPress);
    document.addEventListener(`click`, onStatusMessageClick);
    main.appendChild(messageElement);
  };

  window.adFormStatusMessage = {
    open: openStatusMessage,
  };
})();
