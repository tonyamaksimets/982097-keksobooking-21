'use strict';

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

const adCardTemplate = document.querySelector(`#card`)
.content
.querySelector(`.map__card`);

const filtersContainer = document.querySelector(`.map__filters-container`);

const priceSpan = document.createElement(`span`);
priceSpan.textContent = `/ночь`;


const createAdCard = () => {
  const adCardElement = adCardTemplate.cloneNode(true);

  adCardElement.querySelector(`.popup__title`).textContent = ``;
  adCardElement.querySelector(`.popup__text--address`).textContent = ``;
  adCardElement.querySelector(`.popup__text--price`).textContent = ``;
  adCardElement.querySelector(`.popup__text--capacity`).textContent = ``;
  adCardElement.querySelector(`.popup__text--time`).textContent = ``;
  adCardElement.querySelector(`.popup__description`).textContent = ``;
  adCardElement.classList.add(`hidden`);
  filtersContainer.before(adCardElement);

  return adCardElement;
};

const adCard = createAdCard();
const adCardCloseButton = adCard.querySelector(`.popup__close`);
const photoTemplate = adCard.querySelector(`.popup__photo`);


const renderCapacity = (ad) => {
  const capacity = adCard.querySelector(`.popup__text--capacity`);

  const roomsText = (ad.offer.rooms || ad.offer.rooms === 0) ? window.util.getNoun(ad.offer.rooms, `Без комнат`, `${ad.offer.rooms} комната`, `${ad.offer.rooms} комнаты`, `${ad.offer.rooms} комнат`) : ``;

  let guestsText;
  if (roomsText) {
    guestsText = (ad.offer.guests || ad.offer.guests === 0) ? window.util.getNoun(ad.offer.guests, `, не для гостей`, ` для ${ad.offer.guests} гостя`, ` для ${ad.offer.guests} гостей`, ` для ${ad.offer.guests} гостей`) : ``;
  } else {
    guestsText = (ad.offer.guests || ad.offer.guests === 0) ? window.util.getNoun(ad.offer.guests, `Не для гостей`, `Для ${ad.offer.guests} гостя`, `Для ${ad.offer.guests} гостей`, `Для ${ad.offer.guests} гостей`) : ``;
  }

  capacity.textContent = `${roomsText}${guestsText}`;

  if (!capacity.textContent) {
    capacity.classList.add(`hidden`);
  } else {
    capacity.classList.remove(`hidden`);
  }
};


const renderCheckTime = (ad) => {
  const time = adCard.querySelector(`.popup__text--time`);

  let timeText = ``;

  if (ad.offer.checkout && ad.offer.checkin) {
    timeText = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else if (!ad.offer.checkin && ad.offer.checkin) {
    timeText = `Выезд до ${ad.offer.checkout}`;
  } else if (ad.offer.checkin && !ad.offer.checkin) {
    timeText = `Заезд после ${ad.offer.checkin}`;
  }

  time.textContent = timeText;

  if (timeText) {
    time.classList.add(`hidden`);
  } else {
    time.classList.remove(`hidden`);
  }
};

const isAdFieldExist = (adField, cardField, action) => {
  if (adField) {
    cardField.classList.remove(`hidden`);
    action();
  } else {
    cardField.classList.add(`hidden`);
  }
};

const renderFeatures = (ad, cardField) => {
  return () => {
    const featureItems = cardField.querySelectorAll(`.popup__feature`);

    featureItems.forEach((item) => {
      item.classList.add(`hidden`);
    });

    ad.offer.features.forEach((item) => {
      adCard.querySelector(`.popup__feature--${item}`).classList.remove(`hidden`);
    });
  };
};

const renderPhotos = (ad, cardField) => {
  return () => {
    window.util.clearElement(cardField);

    const fragment = document.createDocumentFragment();

    ad.offer.photos.forEach((item) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = item;
      fragment.append(photoElement);
    });

    cardField.append(fragment);
  };
};

const renderAdCard = (ad) => {
  const title = adCard.querySelector(`.popup__title`);
  isAdFieldExist(ad.offer.title, title, () => {
    title.textContent = ad.offer.title;
  });

  const address = adCard.querySelector(`.popup__text--address`);
  isAdFieldExist(ad.offer.address, address, () => {
    address.textContent = ad.offer.address;
  });

  const price = adCard.querySelector(`.popup__text--price`);
  isAdFieldExist(ad.offer.price, price, () => {
    price.textContent = `${ad.offer.price}₽`;
    price.append(priceSpan);
  });

  const type = adCard.querySelector(`.popup__type`);
  isAdFieldExist(ad.offer.type, type, () => {
    type.textContent = HOTEL_TYPES[ad.offer.type].name;
  });

  const description = adCard.querySelector(`.popup__description`);
  isAdFieldExist(ad.offer.description, description, () => {
    description.textContent = ad.offer.description;
  });

  const avatar = adCard.querySelector(`.popup__avatar`);
  isAdFieldExist(ad.author.avatar, avatar, () => {
    avatar.src = ad.author.avatar;
  });

  const features = adCard.querySelector(`.popup__features`);
  isAdFieldExist(ad.offer.features, features, renderFeatures(ad, features));

  const photos = adCard.querySelector(`.popup__photos`);
  isAdFieldExist(ad.offer.photos, photos, renderPhotos(ad, photos));

  renderCapacity(ad);
  renderCheckTime(ad);
};

const toggleActiveAdPin = (currentAdPin) => {
  const adPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  adPins.forEach((item) => {
    item.classList.remove(`map__pin--active`);
  });

  currentAdPin.classList.add(`map__pin--active`);
};

const onAdCardEscPress = (evt) => {
  window.util.isEscEvent(evt, closeAdCard);
};

const onAdCardCloseButtonClick = () => {
  closeAdCard();
};

const openAdCard = (currentAdPin) => {
  adCard.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onAdCardEscPress);
  adCardCloseButton.addEventListener(`click`, onAdCardCloseButtonClick);

  toggleActiveAdPin(currentAdPin);
};

const closeAdCard = () => {
  adCard.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onAdCardEscPress);
  adCardCloseButton.removeEventListener(`click`, onAdCardCloseButtonClick);

  const currentAdPin = document.querySelector(`.map__pin--active`);
  currentAdPin.classList.remove(`map__pin--active`);
};

window.adCard = {
  render: renderAdCard,
  open: openAdCard,
  close: closeAdCard,
};
