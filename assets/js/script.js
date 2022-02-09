//Array of objects for medium level questions*/

const mediumQuestions= [
    {
        Question: "What animal did Queen Pasiphae sleep with before she gave birth to the minotaur?",
        Options:['A white bull','A black cow', 'A golden ram','A brown goat' ],    
        correctAnswer: 0
    },
    {
        Question: "Maui is a god",
        Options:['True', 'False'],      
        correctAnswer: 1
    },
    {
        Question: "Who is the snake-like river god of Zambezi?",
        Options:['Orisha','Eshu','Anansi','Nyami Nyami'],      
        correctAnswer: 3
    },
    {
        Question: "Which of these is not a god or goddess in Norse mythology?",
        Options: ['Freya', 'Frigg', 'Balder', 'Brigid'],
        correctAnswer: 3
    },
    {
        Question: "In Norse Mythology, what is the name of the serpent that eats the roots of the ash tree, Yggdrasil?",
        Options: ['Nidhogg', 'Drasil', 'Cantaun', 'Beowulf'],
        correctAnswer:0
    },
    {
        Question: "Hercules is from which mythological era?",
        Options: ['Greek', 'Egyptian', 'Roman', 'Celtic'],
        correctAnswer:2
    },
    {
        Question: "Who is the God of War in Polynesian mythology?",
        Options: ['Ares','Ku','Zeus','Kratos'],    
        correctAnswer: 1
    },
    {
        Question: "In African mythology, Anansi is a trickster and storyteller who takes the shape of which animal?",
        Options: ['Spider','Rabbit','Lizard','Dog'],
        correctAnswer: 0
    },
    {
        Question: "In Greek mythology, who killed Achilles?",
        Options: ['Troy','Hera','Paris', 'Hermes'] ,     
        correctAnswer: 2
    },
    {
        Question: "Which of these Roman gods or goddesses doesn't have a Greek counterpart?",
        Options: ['Venus','Mars','Jupiter','Janus'],
        correctAnswer: 3
    },
    {
        Question: "Hodur is blind",
        Options: ['True', 'False'],
        correctAnswer: 0
    },
    {
        Question: "Hel was the daughter of which Norse god?",
        Options:['Odin','Loki','Thor','Tyr'],      
        correctAnswer: 1
    },
    {
        Question: "What are the names of the first humans in Norse mythology?",
        Options: ['Adam & Eve','Shu & Tefnut','Askr & Embla','Prometheus & Athena'],      
        correctAnswer: 2
    }, 
    {
        Question: "According to the Egyptian myth of Osiris, who murdered Osiris?",
        Options: ['Anubis','Mina','Sekmet','Seth'],
        correctAnswer: 3
    },
    {
        Question: "Which of these is Hera goddess of?",
        Options: ['Rivers','Fishing','Women','Children'],
        correctAnswer: 2
    },
    {
        Question: "Nike is the Greek goddess of family",
        Options: ['True','False'],
        correctAnswer: 1
    },
    {
        Question: "In Chinese mythology, Changxi is the mother of what?",
        Options: ['Twelve moons', 'Twelve stars','Twelve planets','Twelve meteors'],
        correctAnswer: 0
    },
    {
        Question: "Which of these is not a Hawaiian deity?",
        Options:['Pele','Laka','Lono','Maui'],      
        correctAnswer: 3
    },
    {
        Question: "Dagda is a Celtic god",
        Options:['True', 'False'],      
        correctAnswer: 0
    },
    {
        Question: "Sekmhet is the Egyptian goddess of war",
        Options:['True', 'False'],
        correctAnswer:0
    }
    ]


/*Extracting IDs from medium level game*/

const updateQuestionNumber = document.getElementById('questionNumber');
const question=document.getElementById('question');
const answers=document.getElementById('answer-container');
const finalScore=document.getElementById('finalScore')

//Quiz features

let questionCounter=0;
let numberOfQuestions=15;
let currentQuestion;
let availableQuestions=[];
let availableAnswers=[];
let score=0;

/* https://www.youtube.com/watch?v=QU6z69P5BrU&t=0s I used this video to help with having varying 
numbers of answer boxes to allow for a variety of question responses*/

function setAvailableQuestions () {

   
    const allQuestions=mediumQuestions.length;
    for (let i=0; i<allQuestions; i++){
        availableQuestions.push(mediumQuestions[i]);
        } 
}

function newQuestion () {
//send user to end page when number of questions are reached
    if (questionCounter == numberOfQuestions){
        return window.location.assign('endgame.html')
    }
//randomized questions and entering into HTML
    const questionIndex=availableQuestions[Math.floor(Math.random()*availableQuestions.length)];
    currentQuestion=questionIndex;
    question.innerHTML=currentQuestion.Question;
    const index=availableQuestions.indexOf(questionIndex)
    availableQuestions.splice(index, 1);

//randomized answers and entering into HTML
    const allOptions=currentQuestion.Options.length;
    for (let i=0; i<allOptions; i++){
        availableAnswers.push(i);
    }

    answers.innerHTML='';
    for(let i=0; i<allOptions; i++){
        const optionIndex=availableAnswers[Math.floor(Math.random()*availableAnswers.length)];
        
        const index2=availableAnswers.indexOf(optionIndex);
        availableAnswers.splice(index2,1);
        const option=document.createElement('div');
        option.innerHTML=currentQuestion.Options[optionIndex]; 
        option.id=optionIndex;
        option.className='btn';
        answers.appendChild(option);
        option.setAttribute('onclick', 'checkResult(this)');
    }
    questionCounter++;
    updateQuestionNumber.innerText = `${questionCounter} / ${numberOfQuestions}`;
}

//Check answers and add class to increase the score
function checkResult (element){
    const userAnswer=element.id;
    if (userAnswer==currentQuestion.correctAnswer){
        element.classList.add('correct')
        score++;
//local storage to access score on end page and also for a leaderboard
        localStorage.setItem('highscore',score)
    } 
    else {
        element.classList.add('incorrect')
    }
//move on to new question after a set time so user doesn't need to click next
    setTimeout(function() {
        newQuestion()
    }, 900)
}

setAvailableQuestions();
newQuestion();

