window.x = "a";

function sendImage(url, callback) {
  var imageElement = document.createElement("img");
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

(function() {
  sendImage("http://localhost:9998/record");
})();
