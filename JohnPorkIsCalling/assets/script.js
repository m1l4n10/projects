const statusText = document.getElementById('status-text');
const porkImage = document.getElementById('pork-image');
const declineBtn = document.getElementById('decline-btn');
const ringtone = document.getElementById('ringtone');
const overlay = document.getElementById('overlay');
const endScreen = document.getElementById('end-screen');
const closeBtn = document.getElementById('close-btn');

const imageList = ["assets/johnpork/1.jpg", "assets/johnpork/2.jpg", "assets/johnpork/3.jpg", "assets/johnpork/4.jpg", "assets/johnpork/5.jpg", "assets/johnpork/6.jpg", "assets/johnpork/7.jpg", "assets/johnpork/8.jpg", "assets/johnpork/9.jpg", "assets/johnpork/10.jpg", "assets/johnpork/11.jpg", "assets/johnpork/12.jpg", "assets/johnpork/13.jpg", "assets/johnpork/14.jpg"];
let currentImageIndex = 0;

let dotCount = 0;
setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    if (statusText.innerText.includes("calling")) {
        statusText.innerText = "John Pork is calling" + ".".repeat(dotCount);
    }
}, 1000);

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % imageList.length;
    porkImage.src = imageList[currentImageIndex];
}

function restartCall() {
    endScreen.style.display = 'none';
    statusText.innerText = "John Pork is calling";
    ringtone.currentTime = 0;
    ringtone.play();
    changeImage();
}

declineBtn.addEventListener('click', () => {
    ringtone.pause();
    endScreen.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    restartCall();
});

overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    ringtone.play();
});