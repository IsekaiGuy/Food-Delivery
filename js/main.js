"use strict";

document.addEventListener("DOMContentLoaded", () => {

const tabsParent = document.querySelector(".tabheader__items"),
      tabs = document.querySelectorAll(".tabheader__item"),
      tabsContent = document.querySelectorAll(".tabcontent"),
      modal = document.querySelector('.modal'),
      modalClose = modal.querySelector('.modal__close'),
      btns = document.querySelectorAll('[data-modal]');



function hideTabContent() {
    tabsContent.forEach(tab => {
        tab.classList.add('hide');
        tab.classList.remove('show', 'fade');
    });

    tabs.forEach(tab => {
        tab.classList.remove('tabheader__item_active');
    });
}


function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();


tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

//Enable modal
function openModal() {
    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    clearInterval(timerId);
}

const timerId = setTimeout(openModal, 8000);

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        openModal();
    });
});

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

//Disable modal

function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = 'visible';
}

modal.addEventListener('click', e => {
    const target = e.target;
    if (target == modalClose) {
        closeModal();
    } else if (target == modal) {
        closeModal();
    }
});

document.addEventListener("keydown", e => {
    if(e.code == "Escape" && modal.classList.contains('show')) {
        closeModal();
    }
});


//Timer

const deadline = '2020-12-05';

function getTimeRemaining(endtime) {
    
  const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
            
const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
          const t = getTimeRemaining(endtime);

          days.innerHTML = getZero(t.days);
          hours.innerHTML = getZero(t.hours);
          minutes.innerHTML = getZero(t.minutes);
          seconds.innerHTML = getZero(t.seconds);

          if(t.total <= 0) {
              clearInterval(timeInterval);
          }
      }
}

setClock('.timer', deadline);

//Используем классы для карточек

class Menu {
    constructor(img, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
    }

    changeToUAH() {
        this.price = this.price * this.transfer;
    }

    render() {
        const div = document.createElement('div');
        if(this.classes.length === 0) {
            this.div = 'menu__item';
            div.classList.add(this.div);
        } else {
            this.classes.forEach(className => div.classList.add(className));
        }

        div.innerHTML = `
                <img src="${this.img}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
        this.parent.append(div);
    }
}

new Menu(
    'img/tabs/vegy.jpg', 
    'vegy', 
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
     9, 
     '.menu .container', 
     'menu__item').render();
new Menu(
    'img/tabs/elite.jpg',
    'elite', 
    'Меню “Премиум”', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    14, 
    '.menu .container', 
    'menu__item').render();
new Menu(
    'img/tabs/post.jpg', 
    'post', 
    'Меню "Постное"', 
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    21, 
    '.menu .container', 
    'menu__item').render();

});