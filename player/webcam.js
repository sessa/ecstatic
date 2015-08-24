console.log("ANything");
console.log("window.nav.cookieenabled + " + window.navigator.cookieEnabled);
var video = document.querySelector("#videoElement");
window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia || window.navigator.oGetUserMedia;
if(window.navigator.getUserMedia){
      window.navigator.getUserMedia({video: true}, handleVideo, videoError);
}
function handleVideo(stream) {
      video.src = window.URL.createObjectURL(stream);
}
function videoError(e) {

}