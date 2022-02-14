'use strict';
const buttonContainerEl = document.querySelector('.button-container');
const quoteContainerEl = document.querySelector('.container-words');
const buttonEl = document.querySelectorAll('.btn--quote');
const quoteEl = document.querySelector('.quote');

const STOIC_API_ONE_URL = 'https://stoicquotesapi.com/v1/api/quotes/random';
const STOIC_API_TWO_URL = 'https://stoic-server.herokuapp.com/random';
const STOIC_API_THREE_URL = 'https://stoic-quotes.com/api/quotes?num=1';

/////////////////ANIMATIONS LOADING/////////////////////
buttonContainerEl.classList.add('animate__animated', 'animate__fadeInDown');
buttonContainerEl.style.setProperty('--animate-duration', '1s');

quoteContainerEl.classList.add('animate__animated', 'animate__bounceInUp');
quoteContainerEl.style.setProperty('--animate-duration', '1s');
quoteContainerEl.addEventListener('animationend', () => {
  quoteContainerEl.classList.remove('animate__animated', 'animate__bounceInUp');
});

///////////////////////API////////////////////
function reset(element) {
  element.textContent = '';
  element.classList.remove('small');
  element.classList.remove('very--small');
}

async function getStoicQuote(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();

    const quote = data.body;
    const author = data.author;

    createQuote(quote, author);
  } catch (err) {
    console.log(err);
  }
}

async function getStoicQuoteTwo(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();

    let [quoteData] = data;
    const quote = quoteData.body;
    const author = quoteData.author;
    if (quote.length > 250) quoteContainerEl.classList.add('small');
    if (quote.length > 400) quoteContainerEl.classList.add('very--small');
    createQuote(quote, author);
  } catch (err) {
    console.log(err);
  }
}
async function getStoicQuoteThree(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();

    let [quoteData] = data;

    const quote = quoteData.text;
    const author = quoteData.author;

    createQuote(quote, author);
  } catch (err) {
    console.log(err);
  }
}

buttonEl.forEach(btn => {
  btn.addEventListener('click', e => {
    reset(quoteContainerEl);
    if (btn.dataset.button === '1') getStoicQuote(STOIC_API_ONE_URL);
    if (btn.dataset.button === '2') getStoicQuoteTwo(STOIC_API_TWO_URL);
    if (btn.dataset.button === '3') getStoicQuoteThree(STOIC_API_THREE_URL);
  });
});

function createQuote(quote, author) {
  const markup = `<p class="quote">
    "${quote}"
  </p>
  <p class="author">${author}</p>`;
  animateCSS('.container-words', 'backInUp');
  quoteContainerEl.insertAdjacentHTML('afterbegin', markup);
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true });
  });
