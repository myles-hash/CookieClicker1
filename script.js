let counter = 0,
    pointsPerSecond = 1,
    interval,
    shopItemsArr = [0, 0, 0, 0, 0];

const timBtn = document.getElementById("timBtn"),
    animation = document.getElementById("animation"),
    counterElement = document.getElementById("counter"),
    pointsPerSecondElement = document.getElementById("pointsPerSecond"),
    buyAudio = new Audio('./Audio/Cash.mp3'),
    buyButtons = document.querySelectorAll('.buyButtons'),
    angelAudio = new Audio('./Audio/Angel.mp3'),
    buyJezBtn = document.getElementById('buyJezBtn'),
    upAudio = new Audio('./Audio/Up.mp3'),
    downAudio = new Audio('./Audio/Down.mp3'),
    jezFace = document.getElementById('jez'),
    poopAudio = new Audio('./Audio/poop.mp3'),
    resetBtn = document.getElementById('resetButton'),
    awwAudio = new Audio('./Audio/Aww.mp3'),
    shopItemsCosts = [10, 100, 1000, 10000, 100000],
    shopItemsPPS = [1, 10, 100, 1000, 10000],
    shopItemCounters = document.querySelectorAll('.shopItemCount'),
    nopeAudio = new Audio('./Audio/Nope.mp3')

function incrementCounter() {
    counter++;
    counterElement.innerText = counter;
    animate("+1");
}

function animate(text) {
    animation.innerText = text;
    animation.style.display = "block";
    setTimeout(() => (animation.style.display = "none"), 300);
}

function transformImage() {
    timBtn.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
}

function incrementPointsPerSecond() {
    counter += pointsPerSecond;
    counterElement.innerText = counter;
    localStorage.setItem('counter', counter);
}

function playPoop() {
    poopAudio.currentTime = 0;
    poopAudio.play();
}

function updatePointsPerSecondDisplay() {
    pointsPerSecondElement.innerText = `Tim points per second: ${pointsPerSecond}`;
    localStorage.setItem('pointsPerSecond', pointsPerSecond);
}

interval = setInterval(() => {
    incrementPointsPerSecond();
    updatePointsPerSecondDisplay();
}, 1000);

timBtn.addEventListener("click", () => {
    incrementCounter();
    transformImage();
    playPoop();
});

buyJezBtn.addEventListener('mouseenter', () => {
    angelAudio.currentTime = 1;
    angelAudio.play();
});

buyJezBtn.addEventListener('mouseleave', () => {
    angelAudio.pause();
    angelAudio.currentTime = 0;
});

jezFace.addEventListener('mouseenter', () => {
    downAudio.pause();
    upAudio.play();
});

jezFace.addEventListener('mouseleave', () => {
    upAudio.pause();
    upAudio.currentTime = 0;
    downAudio.currentTime = 0.3;
    downAudio.play();
});

resetBtn.addEventListener('click', () => {
    awwAudio.play();
    document.getElementById('resetText').style.display = 'block';
    setTimeout(() => {
        localStorage.clear();
        location.reload();}
        , 2000);
});

function buyShopItem(index) {
    if (counter >= shopItemsCosts[index]) {
        counter -= shopItemsCosts[index];
        pointsPerSecond += shopItemsPPS[index];
        updatePointsPerSecondDisplay();
        shopItemCounters[index].innerText = ++shopItemsArr[index];
        buyAudio.currentTime = 0;
        buyAudio.play();
        localStorage.setItem('shopItemsArr', JSON.stringify(shopItemsArr));
    } else {
        angelAudio.pause();
        nopeAudio.currentTime = 1.7;
        nopeAudio.play();

        alert('NOT ENOUGH TIM POINTS ;(')  ;
    }
}

buyButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        buyShopItem(index)});
    
});




function loadFromLocalStorage() {
    const savedCounter = localStorage.getItem('counter');
    const savedPPS = localStorage.getItem('pointsPerSecond');
    const savedShopItemsArr = localStorage.getItem('shopItemsArr');

    if (savedCounter) {
        counter = parseInt(savedCounter);
        counterElement.innerText = counter;
    }

    if (savedPPS) {
        pointsPerSecond = parseInt(savedPPS);
        updatePointsPerSecondDisplay();
    }

    if (savedShopItemsArr) {
        shopItemsArr = JSON.parse(savedShopItemsArr);
        updateShopItemCounters();
    }
}

function updateShopItemCounters() {
    shopItemsArr.forEach((count, index) => {
        shopItemCounters[index].innerText = count;
    });
}

// // Load data from local storage on page load
loadFromLocalStorage();

// // ... (Previous code remains unchanged)

// Event listeners for shop item buttons
shopItemButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        buyShopItem(index);
        saveToLocalStorage();
    });
});