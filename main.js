//Nav Toggle Btn
const navbarBtn = document.querySelector('.btn__navbar');
const navDropDownBtn = document.querySelector('.dropdown__toggle');
const navbar = document.querySelector('.navbar');
const navbarSub = document.querySelector('.navbarSub');
const nav = document.querySelector('.nav');

navbarBtn.addEventListener('click', () => {
  navbar.classList.remove('open');
  navbar.classList.toggle('active');
});

navDropDownBtn.addEventListener('click', () => {
  navbar.classList.toggle('open');
})


// Slider
window.addEventListener('load', () => {
  const slide = document.querySelector('.slide');
  const pagination = document.querySelector('.pagination');

  //controls
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  const firstChild = slide.firstElementChild;
  const lastChild = slide.lastElementChild;

  const firstClone = firstChild.cloneNode(true);
  const lastClone = lastChild.cloneNode(true);

  firstClone.className = 'firstClone';
  lastClone.className = "lastClone";

  slide.appendChild(firstClone);
  slide.insertBefore(lastClone, firstChild);

  let images = document.querySelectorAll('.slide img');
  let size = images[3].clientHeight;

  // load 안에서 변경되는 resize 될 때 변경되는 것만 변수로 놓고
  // 바꿔주면 나머지는 알아서 된다.
  window.addEventListener('resize', () => {
    images = document.querySelectorAll('.slide img');
    size = images[3].clientHeight;
  });

  let index = 1;

  slide.style.transform = `translateY(-${size * index}px)`;

  function makePageList() {
    for (let i = 0; i < images.length; i++) {
      const li = document.createElement('li');
      li.id = i + 1;
      // li.setAttribute('onClick', 'indicateSlide(this)');
      li.addEventListener('click', indicateSlide);
      if (i === 0) {
        li.className = 'active';
      }
      pagination.appendChild(li);
    }
  };
  makePageList();

  function changeSlide() {
    slide.style.transition = `transform 300ms linear`;
    slide.style.transform = `translateY(-${size * index}px)`;
  };

  nextBtn.addEventListener('click', () => {
    next();
  });

  prevBtn.addEventListener('click', () => {
    prev();
  });

  function next() {
    if (index === images.length - 1) return;
    index++;
    changeSlide();
    updateCirclrIndicator();
    resetTimer();
  }

  function prev() {
    if (index === 0) return;
    index--;
    changeSlide();
    updateCirclrIndicator();
    resetTimer();
  };

  function indicateSlide(event) {
    const element = event.target;
    index = parseInt(element.id - 1);
    changeSlide();
    updateCirclrIndicator();
    resetTimer();
  }

  function updateCirclrIndicator() {
    for (let i = 0; i < pagination.children.length; i++) {
      pagination.children[i].classList.remove('active');
      if (i === 0 || i === 5) {
        pagination.children[i].style.opacity = '0';
      }
    }
    pagination.children[index].classList.add('active');
  };

  slide.addEventListener('transitionend', () => {
    if (images[index].className === 'firstClone') {
      index = images.length - index;
      slide.style.transition = 'none';
      slide.style.transform = `translateY(-${size * index}px)`;
      updateCirclrIndicator();
    }
    if (images[index].className === 'lastClone') {
      index = images.length - 2;
      slide.style.transition = "none";
      slide.style.transform = `translateY(-${size * index}px)`;
      updateCirclrIndicator();
    }
  })

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoPlay, 3000);
  }

  function autoPlay() {
    next();
  }

  let timer = setInterval(autoPlay, 3000);
});


// css 요소 (direction caption hover)
const directionCaption = document.querySelectorAll('.caption');

function makeEffect() {
  for (let i = 0; i < directionCaption.length; i++) {
    directionCaption[i].setAttribute('onmouseenter', 'effect(this)')
    directionCaption[i].setAttribute('onmouseleave', 'noEffect(this)')
  }
};
makeEffect();

function effect(element) {
  const selected = element.parentNode.children[0].children[1];
  selected.style.backgroundColor = 'black';
  selected.style.color = 'white';
};

function noEffect(element) {
  const selected = element.parentNode.children[0].children[1];
  selected.style.backgroundColor = '#C7E844';
  selected.style.color = 'black';
  selected.style.transition = 'all 200ms linear';
};

//MENU
const menu = document.querySelector('.menu');
const menuLi = document.querySelectorAll('.menu>li');
const subMenu = document.querySelector('.submenu');
const lastMenu = document.querySelector('lastMenu');

menuLi[0].classList.add('active');

function menuActiveControl() {
  for (i = 1; i < menuLi.length; i++) {
    menuLi[i].classList.remove('active');
    menuLi[i].setAttribute('onmouseover', 'setActive(this)');
    menuLi[i].setAttribute('onmouseleave', 'removeActive(this)');
  }
}
function setActive(element) {
  element.classList.add('active');
}

function removeActive(element) {
  if (element === menuLi[1]) {
    setTimeout(() => { element.classList.remove('active') }, 1500);
  } else {
    element.classList.remove('active');
  }
}

function init() {
  menuActiveControl();
}

init();

//Scroll to Top & Show NavBtn
const goToTop = document.querySelector('.goToTop');
const navHeight = nav.offsetHeight;
const showNavBtn = document.querySelector('.showNav');

const documentElement = document.documentElement;
const docHeight = Math.max(documentElement.offsetHeight, documentElement.scrollHeight);

let offset;
let scrollPos;

if (docHeight !== undefined) {
  offset = docHeight * (1 / 3);
};

window.addEventListener('scroll', () => {
  scrollPos = documentElement.scrollTop;
  // goToTop.className += (scrollPos > offset) ? " visible" : "";
  if (scrollPos > offset) {
    goToTop.classList.add('visible');
  }
  else {
    goToTop.classList.remove('visible');
  }
  if (scrollPos > navHeight) {
    showNavBtn.classList.add('hidden');
  } else {
    showNavBtn.classList.remove('hidden');
  }
})

goToTop.addEventListener('click', () => {
  const Top = setInterval(() => {
    if (scrollPos > navHeight) {
      window.scrollBy(0, -50)
    } else {
      clearInterval(Top);
    };
  }, 15);
});

showNavBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
})