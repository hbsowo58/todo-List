const ajax = (() => {
  const req = (method, url, callback, payLoad) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(payLoad));
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        callback(JSON.parse(xhr.response));
      } else {
        console.error(xhr.status);
      }
    };
  };
  return {
    get(url, callback) {
      req("GET", url, callback);
    },
    post(url, payLoad, callback) {
      req("POST", url, callback, payLoad);
    },
    patch(url, payLoad, callback) {
      req("PATCH", url, callback, payLoad);
    },
    delete(url, callback) {
      req("DELETE", url, callback);
    },
  };
})();

export default ajax;
