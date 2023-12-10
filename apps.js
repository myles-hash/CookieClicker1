//Lets
let counter = 0;
let pointsPerSecond = 1; 
let interval;
//Consts
const timBtn = document.getElementById("timBtn");
const animation = document.getElementById("animation");
const counterElement = document.getElementById("counter");
let pointsPerSecondElement = document.getElementById("pointsPerSecond");
const buyAudio = new Audio('./Audio/Cash.mp3');
const buyButtons = document.querySelectorAll('.buyButtons');
const angelAudio = new Audio('./Audio/Angel.mp3');
const buyJezBtn = document.getElementById('buyJezBtn');
const upAudio = new Audio('./Audio/Up.mp3');
const downAudio = new Audio('./Audio/Down.mp3');
const jezFace = document.getElementById('jez');
const poopAudio = new Audio('./Audio/poop.mp3');
const resetBtn = document.getElementById('resetButton');
const awwAudio = new Audio('./Audio/Aww.mp3');


//Functions
function incrementCounter() {
    counter++;
    document.getElementById("counter").innerText = counter;
    
    
    animation.innerText = "+1";
    animation.style.display = "block";

    setTimeout(() => {
        animation.style.display = "none";
    }, 300); 

}

function transformImage() {
    const rotationValue = Math.floor(Math.random() * 360); 
    timBtn.style.transform = `rotate(${rotationValue}deg)`;
}

function incrementPointsPerSecond() {
    counter += pointsPerSecond;
    document.getElementById("counter").innerText = counter;
    localStorage.setItem('counter',counter);
}

function playPoop(){
    poopAudio.currentTime = 0;
    poopAudio.play();
}

function updatePointsPerSecondDisplay() {
    pointsPerSecondElement.innerText = `Tim points per second: ${pointsPerSecond}`;
}

interval = setInterval(function () {
    incrementPointsPerSecond();
    updatePointsPerSecondDisplay();
}, 1000);



//Event Listeners
timBtn.addEventListener("click", function(){
    incrementCounter();
    transformImage();
    playPoop();
});



buyJezBtn.addEventListener('mouseenter', function() {
    angelAudio.currentTime = 1;
    angelAudio.play();
});


buyJezBtn.addEventListener('mouseleave', function() {
    angelAudio.pause();
    angelAudio.currentTime = 0;
});



jezFace.addEventListener('mouseenter', function() {
    downAudio.pause();
    upAudio.play();
});


jezFace.addEventListener('mouseleave', function() {
    upAudio.pause();
    upAudio.currentTime = 0;
    downAudio.currentTime = 0.3;
    downAudio.play();
});

resetBtn.addEventListener('click',function(){
    awwAudio.play();
    document.getElementById('resetText').style.display = 'block';
    setTimeout(function() {
        location.reload();
      }, 2000);
})




