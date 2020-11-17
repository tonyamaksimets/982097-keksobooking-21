'use strict';

(() => {
  const ACCERTABLE_FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const TITLE_MAX_LENGTH = 100;
  const TITLE_MIN_LENGTH = 30;
  const MAX_PRICE = 1000000;

  const HOTEL_TYPES = {
    palace: {
      name: `Дворец`,
      minPrice: 10000,
    },
    flat: {
      name: `Квартира`,
      minPrice: 1000,
    },
    house: {
      name: `Дом`,
      minPrice: 5000,
    },
    bungalow: {
      name: `Бунгало`,
      minPrice: 0,
    },
  };

  const adForm = document.querySelector(`.ad-form`);
  const typeSelect = adForm.querySelector(`#type`);
  const titleInput = adForm.querySelector(`#title`);
  const priceInput = adForm.querySelector(`#price`);
  const checkinSelect = adForm.querySelector(`#timein`);
  const checkoutSelect = adForm.querySelector(`#timeout`);
  const guestsSelect = adForm.querySelector(`#capacity`);
  const roomsSelect = adForm.querySelector(`#room_number`);
  const avatarInput = adForm.querySelector(`#avatar`);
  const avatarImage = adForm.querySelector(`.ad-form-header__preview img`);
  const photoInput = adForm.querySelector(`#images`);
  const photoImage = adForm.querySelector(`.ad-form__photo`);


  priceInput.placeholder = HOTEL_TYPES[typeSelect.value].minPrice;
  priceInput.min = HOTEL_TYPES[typeSelect.value].minPrice;

  guestsSelect.querySelector(`[value="${roomsSelect.value}"]`).setAttribute(`selected`, ``);

  const checkValidationMessage = (field) => {
    if (field.validationMessage !== ``) {
      field.style.boxShadow = `0 0 2px 2px #ff0000`;
    } else {
      field.style.boxShadow = `none`;
    }
  };

  const onTitleInputInput = () => {
    const valueLength = titleInput.value.length;

    if (valueLength === 0) {
      titleInput.setCustomValidity(`Обязательное поле`);
    } else if (valueLength > TITLE_MAX_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние ${valueLength - TITLE_MAX_LENGTH} симв.`);
    } else if (valueLength < TITLE_MIN_LENGTH) {
      titleInput.setCustomValidity(`Минимальное количество символов ${TITLE_MIN_LENGTH}. Введите еще ${TITLE_MIN_LENGTH - valueLength} симв.`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();

    checkValidationMessage(titleInput);
  };

  const onTitleInputInvalid = () => {
    checkValidationMessage(titleInput);
  };

  const onPriceInputInput = () => {
    const value = priceInput.value;

    if (value === 0) {
      priceInput.setCustomValidity(`Обязательное поле`);
    } else if (value > MAX_PRICE) {
      priceInput.setCustomValidity(`Стоимость не может превышать ${MAX_PRICE}`);
    } else if (value < priceInput.min) {
      priceInput.setCustomValidity(`${HOTEL_TYPES[typeSelect.value].name} не может стоить меньше ${priceInput.min}`);
    } else {
      priceInput.setCustomValidity(``);
    }

    priceInput.reportValidity();

    checkValidationMessage(priceInput);
  };

  const onPriceInputInvalid = () => {
    checkValidationMessage(priceInput);
  };

  const onTypeSelectChange = () => {
    priceInput.placeholder = HOTEL_TYPES[typeSelect.value].minPrice;
    priceInput.min = HOTEL_TYPES[typeSelect.value].minPrice;
  };

  const onCheckinSelectChange = () => {
    checkoutSelect.value = checkinSelect.value;
  };

  const onCheckoutSelectChange = () => {
    checkinSelect.value = checkoutSelect.value;
  };

  const onGuestsSelectChange = () => {

    const roomsValue = roomsSelect.value;
    const guestsValue = guestsSelect.value;

    if (roomsValue < 100 && +guestsValue !== 0 && guestsValue > roomsValue) {
      guestsSelect.setCustomValidity(`На одного человека должно приходиться не меньше одной комнаты`);
    } else if ((roomsValue < 100 && +guestsValue === 0) || (+roomsValue === 100 && +guestsValue !== 0)) {
      guestsSelect.setCustomValidity(`Невозможный вариант размещения`);
    } else {
      guestsSelect.setCustomValidity(``);
    }

    guestsSelect.reportValidity();

    checkValidationMessage(guestsSelect);
  };

  const onRoomsSelectChange = onGuestsSelectChange;

  const onAvatarInputChange = () => {
    const uploadFile = avatarInput.files[0];
    const uploadFileName = uploadFile.name.toLowerCase();

    const matches = ACCERTABLE_FILE_TYPES.some((it) => uploadFileName.endsWith(it));

    if (matches) {
      const uploadFileURL = URL.createObjectURL(uploadFile);

      avatarImage.src = uploadFileURL;
    }
  };

  const onPhotoInputChange = () => {
    const uploadFile = photoInput.files[0];
    const uploadFileName = uploadFile.name.toLowerCase();

    const matches = ACCERTABLE_FILE_TYPES.some((it) => uploadFileName.endsWith(it));

    if (matches) {
      const uploadFileURL = URL.createObjectURL(uploadFile);

      photoImage.style.backgroundImage = `url(${uploadFileURL})`;
      photoImage.style.backgroundSize = `cover`;
    }
  };

  const activateValidity = () => {
    titleInput.addEventListener(`input`, onTitleInputInput);
    titleInput.addEventListener(`invalid`, onTitleInputInvalid);
    priceInput.addEventListener(`invalid`, onPriceInputInvalid);
    priceInput.addEventListener(`input`, onPriceInputInput);
    typeSelect.addEventListener(`change`, onTypeSelectChange);
    checkinSelect.addEventListener(`change`, onCheckinSelectChange);
    checkoutSelect.addEventListener(`change`, onCheckoutSelectChange);
    guestsSelect.addEventListener(`change`, onGuestsSelectChange);
    roomsSelect.addEventListener(`change`, onRoomsSelectChange);
    avatarInput.addEventListener(`change`, onAvatarInputChange);
    photoInput.addEventListener(`change`, onPhotoInputChange);
  };

  const deactivateValidity = () => {
    titleInput.removeEventListener(`input`, onTitleInputInput);
    titleInput.removeEventListener(`invalid`, onTitleInputInvalid);
    priceInput.removeEventListener(`invalid`, onPriceInputInvalid);
    priceInput.removeEventListener(`input`, onPriceInputInput);
    typeSelect.removeEventListener(`change`, onTypeSelectChange);
    checkinSelect.removeEventListener(`change`, onCheckinSelectChange);
    checkoutSelect.removeEventListener(`change`, onCheckoutSelectChange);
    guestsSelect.removeEventListener(`change`, onGuestsSelectChange);
    roomsSelect.removeEventListener(`change`, onRoomsSelectChange);
    avatarInput.removeEventListener(`change`, onAvatarInputChange);
    photoInput.removeEventListener(`change`, onPhotoInputChange);
  };

  window.adFormValidity = {
    activate: activateValidity,
    deactivate: deactivateValidity,
  };
})();
