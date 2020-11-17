'use strict';

const clearElement = (element, exceptionsArray) => {
  const children = element.children;

  for (let i = children.length - 1; i >= 0; i--) {
    let isDelete = true;

    if (exceptionsArray) {
      for (let j = 0; j < exceptionsArray.length; j++) {
        if (children[i].matches(exceptionsArray[j])) {
          isDelete = false;
          break;
        }
      }
    }

    if (isDelete) {
      element.removeChild(children[i]);
    }
  }
};

const interactiveElements = [`button`, `input`, `select`, `textarea`, `[tabindex]`];

const toggleFormDisability = (form, boolean) => {
  let interactiveChildren = [];

  interactiveElements.forEach((item) => {
    interactiveChildren = interactiveChildren.concat(Array.from(form.querySelectorAll(`${item}`)));
  });

  if (boolean) {
    interactiveChildren.forEach((item) => {
      item.setAttribute(`disabled`, ``);
    });
  } else {
    interactiveChildren.forEach((item) => {
      item.removeAttribute(`disabled`);
    });
  }
};

const isEscEvent = (evt, action) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    action();
  }
};

const isEnterEvent = (evt, action) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    action(evt);
  }
};

const fitToRange = (value, min, max) => {
  let transformedValue;

  if (value < min) {
    transformedValue = min;
  } else if (value > max) {
    transformedValue = max;
  } else {
    transformedValue = value;
  }

  return transformedValue;
};

const debounce = (cb, debounceInterval) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, debounceInterval);
  };
};

const getNoun = (number, zero, one, two, five) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  if (n === 0) {
    return zero;
  }
  return five;
};

window.util = {
  clearElement,
  toggleFormDisability,
  isEnterEvent,
  isEscEvent,
  fitToRange,
  debounce,
  getNoun,
};
