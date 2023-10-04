var Hour = document.getElementById('hour');
var Dots = document.getElementById('dots');
var Minutes = document.getElementById('minute');
var Seconds = document.getElementById('second');

var Day = document.getElementById('day');
var Month = document.getElementById('month');
var Year = document.getElementById('year');

setInterval(function() {
    var D = new Date();
    var Saat = D.getHours();
    var Dakika = D.getMinutes();
    var Saniye = D.getSeconds();

    Hour.innerHTML = Saat < 10 ? '0' + Saat : Saat;
    Minutes.innerHTML = Dakika < 10 ? '0' + Dakika : Dakika;
    Seconds.innerHTML = Saniye < 10 ? '0' + Saniye : Saniye;

    var Gun = D.getDate();
    var Ay = D.getMonth();
    var Yil = D.getFullYear();

    var Months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    Day.innerHTML = Gun;
    Month.innerHTML = Months[Ay];
    Year.innerHTML = Yil;
    Dots.classList.toggle('color');
}, 1000);

const dakika = document.getElementById("dakika");
const saniye = document.getElementById("saniye");

// Kutucuklar
const secilenDk = document.getElementById("secilen-dk");
const secilenSn = document.getElementById("secilen-sn");

// Butonlar
const baslatButonu = document.getElementById("baslat");
const sıfırlaButonu = document.getElementById("sıfırla");

let dur = false;
let interval;

secilenDk.addEventListener("change", () => {
  dakika.textContent = secilenDk.value;
});

secilenSn.addEventListener("change", () => {
  saniye.textContent =
    secilenSn.value < 10 ? "0" + secilenSn.value : secilenSn.value;
});

baslatButonu.addEventListener("click", startTimer);

sıfırlaButonu.addEventListener("click", () => {
  dur = true;
  clearInterval(interval);
  dakika.textContent = "00";
  saniye.textContent = "00";
  secilenDk.value = "00";
  secilenSn.value = "00";
});

function startTimer() {
  let dk = parseInt(dakika.textContent);
  let sn = parseInt(saniye.textContent);

  interval = setInterval(() => {
    if (sn === 0) {
      if (dk === 0) {
        clearInterval(interval);
        window.alert("Süre doldu");
        secilenDk.value = "00";
        secilenSn.value = "00";
        return;
      }
      dk--;
      sn = 59;
    } else {
      sn--;
    }

    dakika.textContent = dk < 10 ? "0" + dk : dk;
    saniye.textContent = sn < 10 ? "0" + sn : sn;
  }, 1000);
}

let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = new Audio("https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3");

let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;

const appendZero = (value) => (value < 10 ? "0" + value : value);

const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};


function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];


  timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;

  //Alarm
  alarmsArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
        alarmSound.play();
        alarmSound.loop = true;
      }
    }
  });
}

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});



const createAlarm = (alarmObj) => {
 
  const { id, alarmHour, alarmMinute } = alarmObj;
 
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;

 
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
 
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
};


setAlarm.addEventListener("click", () => {
  alarmIndex += 1;

 
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
});


const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
  }
};

const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
  }
};

const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
  }
};

window.onload = () => {
  setInterval(displayTimer);
  initialHour = 0;
  initialMinute = 0;
  alarmIndex = 0;
  alarmsArray = [];
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
};

const dakika = document.getElementById("dakika");
const saniye = document.getElementById("saniye");


const secilenDk = document.getElementById("secilen-dk");
const secilenSn = document.getElementById("secilen-sn");


const baslatButonu = document.getElementById("baslat");
const sıfırlaButonu = document.getElementById("sıfırla");

let dur = false;

secilenDk.addEventListener("change", () => {
  dakika.textContent = secilenDk.value;
});

secilenSn.addEventListener("change", () => {
  saniye.textContent =
    secilenSn.value < 10 ? "0" + secilenSn.value : secilenSn.value;
});

baslatButonu.addEventListener("click", startTimer);

sıfırlaButonu.addEventListener("click", () => {
  dur = true;
  dakika.textContent = "00";
  saniye.textContent = "00";
  secilenDk.value = "00";
  secilenSn.value = "00";
});

function startTimer() {
  let dk = dakika.textContent;
  let sn = saniye.textContent;

  const interval = setInterval(() => {
    sn--;
    sn = sn < 10 ? "0" + sn : sn;
    if (sn == "0-1") {
      dk--;
      sn = 59;
    }
    if ((dk == 00 && sn == 00) || (dk == 0 && sn == 0)) {
      clearInterval(interval);
      window.alert("Süre doldu");
      secilenDk.value = "00";
      secilenSn.value = "00";
    }
    if (dur) {
      clearInterval(interval);
      return;
    }

    dakika.textContent = dk;
    saniye.textContent = sn;
  }, 1000);
}

let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector("activeAlarms");
const setAlarm = document.getElementById("setAlarm");
let alarmsArray = [];
let alarmSound = new Audio("alarm.mp3");

let intialHour= 0,
intialMinute= 0,
alarmIndex= 0 ;

const appendZero = (value) => (value < 10 ? "0" + value : value);

//saat

function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];

 timerRef.innerHTML = `${hours}:${minutes}:${seconds}`;
  //Alarm
  alarmsArray.forEach((alarm, index) => {
    if (alarm.isActive) {
      if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${hours}:${minutes}`) {
        alarmSound.play();
        alarmSound.loop = true;
  
  const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});
minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});
