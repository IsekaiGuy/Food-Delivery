"use strict";

document.addEventListener("DOMContentLoaded", () => {

const tabsParent = document.querySelector(".tabheader__items"),
      tabs = document.querySelectorAll(".tabheader__item"),
      tabsContent = document.querySelectorAll(".tabcontent"),
      modal = document.querySelector('.modal'),
      modalClose = modal.querySelector('.modal__close'),
      btns = document.querySelectorAll('.btn');



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

const timerId = setTimeout(() => {
    modal.classList.add('show');
}, 8000);

btns.forEach(btn => {
    btn.addEventListener("click", () => {
    modal.classList.add('show');
    clearInterval(timerId);
});
});


modal.addEventListener('click', e => {
    const target = e.target;
    if (target == modalClose) {
        modal.classList.remove('show');
        modal.classList.add('hide');
    }
});


});


