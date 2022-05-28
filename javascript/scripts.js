window.onload = function() {

let firstTrafficLight = document.querySelector(".light__bulb-first")
let secondTrafficLight = document.querySelector(".light__bulb-second")
let thirdTrafficLight = document.querySelector(".light__bulb-third")
let fourthTrafficLight = document.querySelector(".light__bulb-fourth")

// lamp a and lamp b
let lamp_a = document.querySelector(".section-a")
let lamp_b = document.querySelector(".section-b")

let close = document.querySelector(".first__section-close > button")
let open = document.querySelector(".third__section-discovery > button")

let trainObject = document.querySelector(".train");

// output of all actions on the remote
let logs = document.querySelector(".window__logs-info")

// time exposure
let timeExposure = document.querySelector(".timeexposure")

let firstContactRail = document.querySelector(".shield__approximation-red");
let secondContactRail = document.querySelector(".shield__transfer-right");
let thirdContactRail = document.querySelector(".shield__transfer-left");

// block way run train
let blockMapsOfTrain = document.querySelector(".maps__train")

// bool values
let opening = false;
let isFlags = false;
let isFlagTrain = false;

close.addEventListener("click", function() {
    if (isFlags == false) {
        if (opening && isFlagTrain == false) {
            lamp_a.classList.remove("light_stop");
            lamp_b.classList.remove("light_stop");
            logs.innerHTML += "<br>Переезд открыт..."
            opening = false;
        } else {
            lamp_a.classList.add("light_stop");
            lamp_b.classList.add("light_stop");
            if (isFlagTrain) {
                logs.innerHTML += "<br>Переезд закрыт. Едет поезд."
            } else {
                logs.innerHTML += "<br>Переезд закрыт..."
                opening = true;
            }
        }
    } else {
        logs.innerHTML += "<br>При включенной заградительной сигнализации, переезд открыть нельзя..."
    }
});

let isTurningOnTheBarrier = false;

let barrier = document.querySelector(".fourth__section-barrier > button")

barrier.addEventListener("click", function() {

    thirdTrafficLight.classList.toggle("light_stop")
    secondTrafficLight.classList.toggle("light_stop")
    firstTrafficLight.classList.toggle("light_stop")
    fourthTrafficLight.classList.toggle("light_stop")

    // remove light_stop when clicked on barrier button
    secondContactRail.classList.remove("light_stop")
    thirdContactRail.classList.remove("light_stop")
    
    if (isFlags == false) {
        lamp_a.classList.add("light_stop")
        lamp_b.classList.add("light_stop")
    } else {
        lamp_a.classList.remove("light_stop")
        lamp_b.classList.remove("light_stop")
    }

    isFlags = true; // if the barrier is turned on, then we will not be able to close the crossing and open it.

    doMove()
    outputInformation()

    setTimeout(() => {
        isTurningOnTheBarrier = true;
        timeExposure.classList.toggle("light_stop");
        logs.innerHTML += "<br>Время выдержки вышло...";
    }, 18000);  // time exposure

}, {once: true})

function doMove() {
    let pos = 600;
    let time = setInterval(frame, 20);
    function frame() {
        if (pos == 370) {
            clearInterval(time)
        } else {
            pos--;
            trainObject.style.left = pos + 'px';
        }

        if (pos == 550) {
            let approximation = document.querySelector(".shield__approximation-red");
            approximation.classList.add("light_stop")
        }

    }
}

function move() {
    let pos = blockMapsOfTrain.offsetWidth  - 140;
    // position when add class ligth_stop
    let firstPos = pos - 50;
    let secondPos = pos - 250;
    let threePos = pos - 350;
    let time = setInterval(frame, 20);
    function frame() {
        if (isFlags) {
            return false;
        } else {
            if (pos == firstPos) {
                firstContactRail.classList.add("light_stop");
                
                isFlagTrain = true;

                lamp_a.classList.add("light_stop")
                lamp_b.classList.add("light_stop")

            } else if (pos == secondPos) {
                secondContactRail.classList.add("light_stop");
                thirdContactRail.classList.add("light_stop");
            } else if (pos == threePos) {
                secondContactRail.classList.remove("light_stop");
                thirdContactRail.classList.remove("light_stop");

                isFlagTrain = false;

                lamp_a.classList.remove("light_stop")
                lamp_b.classList.remove("light_stop")
                

            } else if (pos == 100) {
                firstContactRail.classList.remove("light_stop");
            }

            if (pos == 50) {
                clearInterval(time)
                move()
            } else {
                pos--;
                trainObject.style.left = pos + 'px';
            }
        }
    }
}

// start animation
move()

open.addEventListener("click", emergencyOpening, {once: false})

function emergencyOpening() {

    if (isTurningOnTheBarrier) {
        logs.innerHTML += "<br>Шлагбаумы подняты...";
    } else {
        logs.innerHTML += "<br>Перед нажатием этой кнопки необходимо нажать. 'Включение заграждения' и выждать 180 секунд...";
    }

}

function outputInformation() {
    logs.innerHTML = "<br>Заградительные устройства включены...";
    logs.innerHTML += "<br>Поезд остановлен...";
    setTimeout(() => {
        logs.innerHTML += "<br>Вы предотвратили аварию или же лишились премии..."
    }, 4000);
}

let resetAll = document.querySelector(".reset");

resetAll.addEventListener('click', reset);

function reset() {
    window.location.href = "/";
}

let supports = document.querySelector(".first__section-open > button");

supports.addEventListener("click", openSupports);

function openSupports() {
    if (opening || isFlags) {
        logs.innerHTML += "<br>Переезд закрыт. Поддержание шлагбаумов не сработало...."
    } else {
        logs.innerHTML += "<br>Сработало поддержание шлагбаумов...";
    }
}

let offCalls = document.querySelector(".second__section-bell");
let calls = false;

offCalls.addEventListener("click", getInfoOffCalls);

function getInfoOffCalls() {
    if (calls) {
        logs.innerHTML += "<br>Звонки включены..."
        calls = false;
    } else {
        logs.innerHTML += "<br>Выключены звонки.. переезд затих..."
        calls = true;
    }
}

let buttonControl = document.querySelector(".first__section-counter > button");
 
buttonControl.addEventListener("click", control);

function control() {
    let countControl = document.querySelector(".count");
    let array = ["10000", "9900", "8000", "3000", "700", "100", "10", "1"]
    let pos = 0
    let time = setInterval(controlFrame, 180);

    function controlFrame() {
        if (pos == array.length) {
            clearInterval(time)
        } else {
            pos++;
            for (let index = 0; index < pos; index++) {
                countControl.textContent = array[index];
            }
        }
    }
}

// clear logs 
(function loop() {
    if (getComputedStyle(logs).height > 430 + "px") {
        logs.innerHTML = "";
    }
    requestAnimationFrame(loop);
})();


let departureFromMove = document.querySelector(".fifth__section-exit > button");
let departureFromMoveSecond = document.querySelector(".fifth__section-exits > button");
let controlOfCovers = document.querySelector(".fifth__section-control > button");

departureFromMove.addEventListener("click", departureFromMoveFunc);
departureFromMoveSecond.addEventListener("click", departureFromMoveSecondFunc);
controlOfCovers.addEventListener("click", controlOfCoversFunc);

function departureFromMoveFunc() {
    logs.innerHTML += "<br>Крышака УЗП номер 1 была опущена...";
}

function departureFromMoveSecondFunc() {
    logs.innerHTML += "<br>Крышка УЗП номер 3 была опущена...";
}

function controlOfCoversFunc() {
    logs.innerHTML += "<br>Был произведен контроль КЗК на переезда..."
}

let normalization = document.querySelector(".fifth__section-normalize > button");

normalization.addEventListener("click", normalizationFunc)

function normalizationFunc() {
    logs.innerHTML += "<br>Все крышки УЗП были опущены..."
}

}