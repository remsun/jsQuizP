/* ***************************
  JWD JavaScript Assessment
  Due is today: 12/november/2024

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */



window.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector('#start');
    start.addEventListener('click', function (e) {
      document.querySelector('#quizBlock').style.display = 'block';
      start.style.display = 'none';
      startTimer(); // Start the timer when quiz starts
    });
  
    // Quiz questions and answers
    const quizArray = [
      {
        q: 'Which is the third planet from the sun?',
        o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
        a: 1, // Earth is the correct answer (index 1)
      },
      {
        q: 'Which is the largest ocean on Earth?',
        o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        a: 3, // Pacific Ocean is the correct answer (index 3)
      },
      {
        q: 'What is the capital of Australia?',
        o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
        a: 1, // Canberra is the correct answer (index 1)
      },
    ];
  
    // Function to display the quiz questions and answers
    const displayQuiz = () => {
      const quizWrap = document.querySelector('#quizWrap');
      let quizDisplay = '';
      quizArray.map((quizItem, index) => {
        quizDisplay += `<ul class="list-group">
                     Q - ${quizItem.q}
                      <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                      <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                      <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                      <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                      </ul>
                      <div>&nbsp;</div>`;
        quizWrap.innerHTML = quizDisplay;
      });
    };
  
    // Timer function to start countdown
    let timer;
    let timeLeft = 60; // 1 minute timer
  
    const startTimer = () => {
      timer = setInterval(() => {
        timeLeft--;
        document.querySelector('#time').textContent = formatTime(timeLeft);
  
        if (timeLeft <= 0) {
          clearInterval(timer);
          submitQuiz(); // Automatically submit the quiz when time is up
        }
      }, 1000);
    };
  
    // Function to format time in MM:SS
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
  
    // Calculate the score
    const calculateScore = () => {
      let score = 0;
      quizArray.map((quizItem, index) => {
        for (let i = 0; i < 4; i++) {
          let li = `li_${index}_${i}`;
          let r = `radio_${index}_${i}`;
          let liElement = document.querySelector('#' + li);
          let radioElement = document.querySelector('#' + r);
  
          if (quizItem.a === i) {
            // Highlight the correct answer
            liElement.style.backgroundColor = '#d4edda'; // Green background for correct answers
          }
  
          if (radioElement.checked && quizItem.a === i) {
            score++; // Increase score for correct answers
          }
        }
      });
      return score;
    };
  
    // Display score and highlight correct answers when submit button is clicked
    const submitQuiz = () => {
      const score = calculateScore();
      const scoreElement = document.querySelector('#score');
      scoreElement.textContent = `Your score is: ${score} out of ${quizArray.length}`;
    };
  
    // Reset the quiz
    const resetQuiz = () => {
      window.location.reload(); // Reload the page to reset the quiz
    };
  
    // Event listener for submit button
    document.querySelector('#btnSubmit').addEventListener('click', submitQuiz);
  
    // Event listener for reset button
    document.querySelector('#btnReset').addEventListener('click', resetQuiz);
  
    // Call the displayQuiz function
    displayQuiz();
  });