'use strict';

(() => {
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;
  const PINS_MAX_QUANTITY = 5;


  const mapPinsContainer = document.querySelector(`.map__pins`);
  const filtersForm = document.querySelector(`.map__filters`);
  const adCard = document.querySelector(`.map__card`);

  const mapPinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

  const renderAdPin = (ad) => {
    const mapPinElement = mapPinTemplate.cloneNode(true);
    const img = mapPinElement.querySelector(`img`);

    mapPinElement.style = `left: ${ad.location.x - PIN_WIDTH / 2}px; top: ${ad.location.y - PIN_HEIGHT}px;`;
    img.src = ad.author.avatar;
    img.alt = ad.offer.title;

    mapPinElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      window.adCard.render(ad);
      window.adCard.open(mapPinElement);
    });

    return mapPinElement;
  };

  const renderAdsPins = (ads) => {
    const fragment = document.createDocumentFragment();

    const pinsQuantity = (ads.length <= PINS_MAX_QUANTITY) ? ads.length : PINS_MAX_QUANTITY;

    for (let i = 0; i < pinsQuantity; i++) {
      if (ads[i].offer) {
        fragment.append(renderAdPin(ads[i]));
      } else {
        pinsQuantity = (ads.length <= pinsQuantity + 1) ? ads.length : pinsQuantity + 1;
      }
    }

    mapPinsContainer.append(fragment);
  };

  const removeAdsPins = () => {
    if (!adCard.classList.contains(`hidden`)) {
      window.adCard.close();
    }

    window.util.clearElement(mapPinsContainer, [`.map__overlay`, `.map__pin--main`]);
  };


  const loadAds = (ads) => {
    renderAdsPins(ads);
    window.adsFilters.activate(ads);
  };

  const errorLoadAds = (errorMessageText) => {
    const errorMessage = document.createElement(`div`);
    const errorText = document.createElement(`span`);

    errorText.textContent = `${errorMessageText}. Не удалось загрузить похожие объявления`;
    errorMessage.style = `position: absolute; top: 20px; left: 20px; padding: 14px; max-width: 400px; text-align: center; font-weight: 700; font-size: 18px; color: #ffffff; background-color: #ff5635; border-radius: 8px;`;
    errorMessage.appendChild(errorText);

    mapPinsContainer.appendChild(errorMessage);

    filtersForm.classList.add(`hidden`);
  };

  window.ads = {
    load: loadAds,
    errorLoad: errorLoadAds,
    renderPins: renderAdsPins,
    removePins: removeAdsPins,
  };
})();
