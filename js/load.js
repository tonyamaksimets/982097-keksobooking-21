'use strict';

const STATUS_CODE_OK = 200;

window.load = (serverURL, method, onSuccess, onError, timeout, data) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = timeout;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === STATUS_CODE_OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.open(method, serverURL);

  if (data) {
    xhr.send(data);
  } else {
    xhr.send();
  }
};
