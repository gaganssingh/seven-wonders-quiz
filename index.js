const STORE = [
    {
      question: 'When was The Great Wall of China built?',
      answers: [
            '220 B.C. to A.D. 1644',
            '337 B.C. to A.D. 1532',
            '112 B.C. to A.D. 1713',
            '57 B.C. to A.D. 1659'
            ],
      correctAnswer: '220 B.C. to A.D. 1644',
      icon: 'https://image.flaticon.com/icons/png/128/1605/1605907.png',
      alt: 'The Great Wall of China'
    },
    {
      question: 'Who built the Taj Mahal?',
      answers: [
            'Muhammad Azam Shah',
            'Humayun',
            'Shah Jahan',
            'Farrukhsiyar'
            ],
        correctAnswer: 'Shah Jahan',
        icon: 'https://www.shareicon.net/data/256x256/2016/08/03/805957_building_512x512.png',
        alt: 'Taj Mahal'
    },
    {
      question: 'Where is the Nabateans built city Petra located today?',
      answers: [
            'Israel',
            'Jordan',
            'Egypt',
            'Saudi Arabia'
            ],
        correctAnswer: 'Jordan',
        icon: 'https://image.flaticon.com/icons/png/128/809/809410.png',
        alt: 'Petra, Jordan'
    },
    {
      question: 'What was The Colosseum in Italy used for?',
      answers: [
            'Movie Nights',
            'An Amphitheater',
            'Basketball Games (Go Raptors!)',
            'Ice-skating Ring'
            ],
      correctAnswer: 'An Amphitheater',
      icon: 'https://image.flaticon.com/icons/png/128/1792/1792746.png',
      alt: 'The Colosseum, Italy'
    },
    {
      question: 'How tall is Christ the Redeemer statue located in Brazil?',
      answers: [
            '125 feet',
            '139 feet',
            '112 feet',
            '128 feet'
            ],
      correctAnswer: '125 feet',
      icon: 'https://www.inventicons.com/uploads/iconset/501/wm/128/Christ_the_Redeemer-18.png',
      alt: 'Christ the Redeemer'
    },
    {
      question: 'How many steps does The Temple of Kukulkán in Chichén Itzá, Mexico have?',
      answers: [
            '365 steps',
            '359 steps',
            '298 steps',
            '221 steps'
            ],
      correctAnswer: '365 steps',
      icon: 'https://image.flaticon.com/icons/png/128/1711/1711616.png',
      alt: 'Chichén Itzá'
    },
    {
      question: 'When did the Yale professor Hiram Bingham discover the lost city of Machu Picchu?',
      answers: [
            'March 7, 1908',
            'July 24, 1911',
            'June 18, 1912',
            'May 13, 1913'
            ],
      correctAnswer: 'July 24, 1911',
      icon: 'https://image.flaticon.com/icons/png/128/984/984077.png',
      alt: 'Machu Picchu'
    }
];

let questionNum = 0;
let score = 0;

//Start quiz button
function startQuiz() {
  $('.start-quiz').on('click', '.btn-start-quiz', function (event) {
    $('.start-quiz').remove();
    $('.questions').css('display', 'block');
    $('.questionNum').text(1);
});
}

// Show question using DOM
function showQuestion() {
  $('.questions').html(questionHTML());
}

function questionHTML() {
  if (questionNum < STORE.length) {
    return `
        <div class="question-${questionNum}">
            <h2>${STORE[questionNum].question}</h2>
            <form>
                <fieldset>
                    <label class="multiple-choice">
                        <input type="radio" value="${STORE[questionNum].answers[0]}" name="answer" required>
                        <span>${STORE[questionNum].answers[0]}</span>
                    </label>
                    <label class="multiple-choice">
                        <input type="radio" value="${STORE[questionNum].answers[1]}" name="answer" required>
                        <span>${STORE[questionNum].answers[1]}</span>
                    </label>
                    <label class="multiple-choice">
                        <input type="radio" value="${STORE[questionNum].answers[2]}" name="answer" required>
                        <span>${STORE[questionNum].answers[2]}</span>
                    </label>
                    <label class="multiple-choice">
                        <input type="radio" value="${STORE[questionNum].answers[3]}" name="answer" required>
                        <span>${STORE[questionNum].answers[3]}</span>
                    </label>
                    <button class="start-over">Start Over</button>
                    <button type="submit" class="submitButton">Check</button>
                </fieldset>
            </form>   
        </div>`;
} else {
    finalScore();
    startOver();
    $('.questionNum').text(7);
  }
}

//Start Over button
function startOver() {
  $('main').on('click', '.start-over', function (event) {
    event.preventDefault();
    window.location.reload(true);
  });
}

//Check answer button
function userInput() {
  $('form').on('submit', function (event) {
    let checked = $('input:checked');
    let answer = checked.val();
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    if (answer === correctAnswer) {
      onCorrectAnswer();
    } else {
      onIncorrectAnswer();
    }
  });
}

//When answer is correct
function onCorrectAnswer() {
  whenAnswerCorrect();
  newScore();
}

function whenAnswerCorrect () {
  let correctAnswer = `${STORE[questionNum].correctAnswer}`;
  $('.questions').html(`
        <div class="correctFeedback">
            <div class="icon">
                <img src="https://image.flaticon.com/icons/svg/1533/1533913.svg">
            </div>
            <p><strong>You are right!</strong></p>
            <button class="start-over">Start Over</button>
            <button type=button class="next-question">Next</button>
        </div>`);
}

//when answer is incorrect
function onIncorrectAnswer() {
  whenAnswerIncorrect();
}

function whenAnswerIncorrect() {
  let correctAnswer = `${STORE[questionNum].correctAnswer}`;
  $('.questions').html(`
        <div class="correctFeedback">
            <div class="icon">
                <img src="https://image.flaticon.com/icons/svg/1533/1533919.svg">
            </div>
            <p><strong>You were so close!</strong><br>Correct Answer: <span>"${correctAnswer}"</span></p>
            <div class="after-answer-btn">
                <button class="start-over">Start Over</button>
                <button type=button class="next-question">Next</button>
            </div>
        </div>`);
}

//Next question
function nextQuestion() {
  $('main').on('click', '.next-question', function (event) {
    incrementQuestion();
    showQuestion();
    userInput();
  });
}

function incrementQuestion() {
    questionNum ++;
  $('.questionNum').text(questionNum + 1);
}

//Add to score
function newScore() {
  incrementScore();
  $('.score').text(score);
}

function incrementScore() {
  score ++;
}

//Final score page
function finalScore() {
  if (score >= 6) {
    $('.questions').html(`
        <div class="results correctFeedback">
            <h3>Congratulations!<br>You got most of them right.</h3>
            <img src="https://media.giphy.com/media/xeXEpUVvAxCV2/giphy.gif" alt="celebration gif">
            <p>${score} out of 7 correct answers</p>            
            <button class="start-over">Start Over</button>
        </div>`);
  } else if (score < 6 && score >= 2) {
    $('.questions').html(`
        <div class="results correctFeedback">
            <h3>Umm...you did..okay?<br>I guess</h3>
            <img src="https://media.giphy.com/media/duKV1YBPhDtd9efnrR/giphy.gif" alt="elon musk meh gif">
            <p>${score} out of 7 correct answers</p>            
            <button class="start-over">Start Over</button>
        </div>`);
  } else {
    $('.questions').html(`
        <div class="results correctFeedback">
        <h3>Welcome to the League of Losers!</h3>
        <img src="https://media.giphy.com/media/rKj0oXtnMQNwY/giphy.gif" alt="spongebob loder gif"/>
        <p>${score} out of 7 correct answers</p>
        <button class="start-over">Start Over</button>
        </div>`);
  }
}

//initialize quiz
function runQuizApp() {
    startQuiz();
    showQuestion();
    userInput();
    startOver();
    nextQuestion();
}

$(runQuizApp);
