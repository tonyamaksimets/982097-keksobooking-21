'use strict';

const DEBOUNCE_INTERVAL = 500;
const PRICE_FILTERS = {
  middle: {
    min: 10000,
    max: 50000,
  },

  low: {
    min: 0,
    max: 10000,
  },

  high: {
    min: 50000,
    max: Infinity,
  },
};

const FILTERED_ADS_QUANTITY = 5;

const filtersForm = document.querySelector(`.map__filters`);
const typeFilter = filtersForm.querySelector(`#housing-type`);
const priceFilter = filtersForm.querySelector(`#housing-price`);
const roomsFilter = filtersForm.querySelector(`#housing-rooms`);
const guestsFilter = filtersForm.querySelector(`#housing-guests`);

const isFitToFilters = (ad, typeValue, priceValue, roomsValue, guestsValue, featuresValue) => {
  const isFitToType = typeValue === `any` || ad.offer.type === typeValue;

  const isFitToPrice = (priceValue === `any` || ad.offer.price >= PRICE_FILTERS[priceValue].min && ad.offer.price <= PRICE_FILTERS[priceValue].max);

  const isFitToRooms = roomsValue === `any` || +ad.offer.rooms === +roomsValue;

  const isFitToGuests = guestsValue === `any` || +ad.offer.guests === +guestsValue;

  let isFitToFeatures = true;

  for (let j = 0; j < featuresValue.length; j++) {
    if (!ad.offer.features.includes(featuresValue[j].value, 0)) {
      isFitToFeatures = false;
      break;
    }
  }

  return isFitToType && isFitToPrice && isFitToRooms && isFitToGuests && isFitToFeatures;
};

const getFilteredAds = (ads, typeValue, priceValue, roomsValue, guestsValue, featuresValue) => {
  let array = ads.slice();
  let filteredAds = [];

  for (let i = 0; i < ads.length; i++) {
    if (isFitToFilters(ads[i], typeValue, priceValue, roomsValue, guestsValue, featuresValue)) {
      filteredAds.push(array[i]);
      if (filteredAds.length === FILTERED_ADS_QUANTITY) {
        break;
      }
    }
  }

  return filteredAds;
};


const onFilterChange = (ads) => {
  return window.util.debounce(() => {
    window.ads.removePins();
    const checkedFeatures = filtersForm.querySelectorAll(`.map__checkbox:checked`);
    window.ads.renderPins(getFilteredAds(ads, typeFilter.value, priceFilter.value, roomsFilter.value, guestsFilter.value, checkedFeatures));
  }, DEBOUNCE_INTERVAL);
};

const activateFilters = (ads) => {
  filtersForm.addEventListener(`change`, onFilterChange(ads));
};

const deactivateFilters = (ads) => {
  filtersForm.removeEventListener(`change`, onFilterChange(ads));
};

window.adsFilters = {
  activate: activateFilters,
  deactivate: deactivateFilters,
};
