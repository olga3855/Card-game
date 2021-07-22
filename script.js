const cardsArr = [
  {
    name: 'bee',
    img: 'images/bee.png',
  },
  {
    name: 'butterfly',
    img: 'images/butterfly.png',
  },
  {
    name: 'cat',
    img: 'images/cat.png',
  },
  {
    name: 'chicken',
    img: 'images/chicken.png',
  },
  {
    name: 'cow',
    img: 'images/cow.png',
  },
  {
    name: 'dog',
    img: 'images/dog.png',
  },
  {
    name: 'fish',
    img: 'images/fish.png',
  },
  {
    name: 'fox',
    img: 'images/fox.png',
  },
  {
    name: 'giraffe',
    img: 'images/giraffe.png',
  },
  {
    name: 'horse',
    img: 'images/horse.png',
  },
  {
    name: 'insect',
    img: 'images/insect.png',
  },
  {
    name: 'lion',
    img: 'images/lion.png',
  },
  {
    name: 'lizard',
    img: 'images/lizard.png',
  },
  {
    name: 'mouse',
    img: 'images/mouse.png',
  },
  {
    name: 'pig',
    img: 'images/pig.png',
  },
  {
    name: 'whale',
    img: 'images/whale.png',
  },

];

let firstCard = '';
let secondCard = '';
let count = 0;
let score = 0;
let win = 0;

const time = document.getElementById('time');
const scoreElem = document.getElementById('score');
const game = document.getElementById('game');
const section = document.createElement('section');
const finalElem = document.getElementById('final');
const popup = document.getElementById('popup');
const hidden = document.getElementsByClassName('hidden');
const show = document.getElementsByClassName('show');

section.setAttribute('class', 'section');
game.append(section);

let gameArr = cardsArr.concat(cardsArr);
gameArr.sort(() => 0.5 - Math.random());

gameArr.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item.img})`;

  section.append(card);
  card.append(front);
  card.append(back);
});

const match = () => {
  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
}

const reset = () => {
  firstCard = '';
  secondCard = '';
  count = 0;

  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

const theSameCards = () => {
  if (firstCard !== '' && secondCard !== '') {
    if (firstCard === secondCard) {
      setTimeout(match, 1000);
      win++;
    }
    setTimeout(reset, 1000);
  }
}

const timer = (() => {
  let second = 0;
  let minute = 0;
  let isTimerOn = false;
  let timerId;

  return (shouldTimerOff = false) => {
    if (shouldTimerOff) {
      clearInterval(timerId)
    }
    if (isTimerOn === false) {
      timerId = setInterval(() => {
        time.innerHTML = minute + " mins " + second + " secs";
        second++;
        if (second == 60) {
          minute++;
          second = 0;
        }
      }, 1000);
      isTimerOn = true;
    }
  }
})();

const counter = () => {
  score++;
  scoreElem.innerHTML = score + " points";
}

const gameWinner = () => {
  if (win === 16) {
    timer(true);
    popup.classList.add('show');
    popup.classList.remove('hidden');
    finalElem.innerHTML = "You completed the game in " + scoreElem.innerHTML + "<br> in " + time.innerHTML;
  }
}

section.addEventListener('click', function ({ target }) {
  timer();
  if (target.parentNode.classList.contains('selected') || target.parentNode.classList.contains('match')) {
    return;
  } else if (count < 2) {
    count++;
    if (count === 1) {
      firstCard = target.parentNode.dataset.name;
      target.parentNode.classList.add('selected');
    } else {
      secondCard = target.parentNode.dataset.name;
      target.parentNode.classList.add('selected');
      counter();
    }
    theSameCards();
    gameWinner();
  }
});



