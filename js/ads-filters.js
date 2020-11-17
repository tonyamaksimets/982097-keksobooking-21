'use strict';

(() => {
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

  const filtersForm = document.querySelector(`.map__filters`);
  const typeFilter = filtersForm.querySelector(`#housing-type`);
  const priceFilter = filtersForm.querySelector(`#housing-price`);
  const roomsFilter = filtersForm.querySelector(`#housing-rooms`);
  const guestsFilter = filtersForm.querySelector(`#housing-guests`);

  const filterByType = (array, typeValue) => {
    let filteredArray = [];

    if (typeValue !== `any`) {
      array.forEach((item) => {
        if (item.offer.type === typeValue) {
          filteredArray.push(item);
        }
      });
    } else {
      filteredArray = array;
    }

    return filteredArray;
  };


  const filterByPrice = (array, priceValue) => {
    let filteredArray = [];

    if (priceValue !== `any`) {
      array.forEach((item) => {
        if (item.offer.price >= PRICE_FILTERS[priceValue].min && item.offer.price <= PRICE_FILTERS[priceValue].max) {
          filteredArray.push(item);
        }
      });
    } else {
      filteredArray = array;
    }

    return filteredArray;
  };

  const filterByRooms = (array, roomsValue) => {
    let filteredArray = [];

    if (roomsValue !== `any`) {
      array.forEach((item) => {
        if (item.offer.rooms === +roomsValue) {
          filteredArray.push(item);
        }
      });
    } else {
      filteredArray = array;
    }

    return filteredArray;
  };

  const filterByGuests = (array, guestsValue) => {
    let filteredArray = [];

    if (guestsValue !== `any`) {
      array.forEach((item) => {
        if (item.offer.guests === +guestsValue) {
          filteredArray.push(item);
        }
      });
    } else {
      filteredArray = array;
    }

    return filteredArray;
  };

  const filterByFeatures = (array, featuresValue) => {
    let filteredArray = [];

    if (featuresValue) {
      filteredArray = array.slice();
      let auxiliaryArray = [];
      featuresValue.forEach((feature) => {
        filteredArray.forEach((item) => {
          if (item.offer.features.includes(feature.value, 0)) {
            auxiliaryArray.push(item);
          }
        });
        filteredArray = auxiliaryArray.slice();
        auxiliaryArray = [];
      });
    } else {
      filteredArray = array;
    }

    return filteredArray;
  };

  const getFilteredAds = (ads, typeValue, priceValue, roomsValue, guestsValue, featuresValue) => {
    let filteredAds = filterByType(ads, typeValue);
    filteredAds = filterByPrice(filteredAds, priceValue);
    filteredAds = filterByRooms(filteredAds, roomsValue);
    filteredAds = filterByGuests(filteredAds, guestsValue);
    filteredAds = filterByFeatures(filteredAds, featuresValue);
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
})();

