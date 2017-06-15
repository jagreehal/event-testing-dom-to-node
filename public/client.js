function buildUrl(payload) {
  let o = Object.assign(
    {
      url: "http://localhost:9998/record",
      timestamp: new Date().getTime(),
      name: "UNKNOWN"
    },
    payload || {}
  );

  return `${o.url}/${o.name}/${o.timestamp}`;
}

function sendImage(url, callback) {
  let imageElement = document.createElement("img");
  imageElement.src = url;
  imageElement.style.display = "none";

  imageElement.onload = function() {
    document.body.removeChild(this);
    if (callback) {
      callback();
    }
  };

  document.body.appendChild(imageElement);
}

(function(window) {
  if (window.payload) {
    sendImage(buildUrl(window.payload));
  }
})(window);
