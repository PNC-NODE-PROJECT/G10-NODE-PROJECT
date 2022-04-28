// data =================================
let data = [{0: 'fdae', 1: 'ae', 2: 'da', 3: 'daf', question: 'Where ......', correctAnswer_0: 0, optionAnswers: 'radio', scores: '10'}];


// =============== data validation ========================
function checkAllInput(){
    let condition = true;
    let question = document.querySelector('.question').value;
    if (question.length == 0){
        alert('You need to input Your QUESTION!')
        condition = false;
    } if(question.length !== 0){
        let answers = document.querySelectorAll('.answer-group');
        let chooseAnswers =  document.querySelectorAll('.type-of-input')
        let checkAnswers = 0;
        let checkChooseAnswers = 0;
        for (i=0; i< 4; i++){
            if (answers[i].value.length==0){
                checkAnswers = 1;
            } if (chooseAnswers[i].checked){
                checkChooseAnswers = 1;
            }
        }
        if (checkAnswers == 1){
            alert('You need to input all of your ANSWERS');
            condition = false;
        } else if(checkChooseAnswers==0){
            alert('You need to choose the correct answers!')
            condition = false;
        }
    } if(condition){
        storeData()
    }
}

// ================ Change Option Answers ==================
function optionAnswers(){
    let options = document.querySelector('#list').value;
    let changeOption = document.querySelectorAll('.type-of-input');
    for (i=0; i< 4; i++){
        changeOption[i].type = options;
        // alert("You can change Your option!")
    }
}

// ================ store data =============================
function storeData(){
    let eachData = {};
    eachData['question'] = document.querySelector('.question').value;
    eachData['0'] = document.querySelectorAll('.answer-group')[0].value;
    eachData['1'] = document.querySelectorAll('.answer-group')[1].value;
    eachData['2'] = document.querySelectorAll('.answer-group')[2].value;
    eachData['3'] = document.querySelectorAll('.answer-group')[3].value;
    let changeOption = document.querySelectorAll('.type-of-input');
    for (i=0; i< 4; i++){
        if (changeOption[i].checked){
            eachData['correctAnswer_'+i] = i;
        }
    }
    eachData['optionAnswers']=document.querySelector('#list').value;
    eachData['scores']=document.querySelector('.scores-create').value;
    
    data.splice(0, 0, eachData);
    console.log(data);
    let deleteElement = document.querySelector('.show-quizs');
    if (data.length > 1){
        // deleteElement.parentElement.removeChild()
        console.log(deleteElement);
        
    }
    
    // displayCreatePage();
    showQuiz();
}

// ================ show the question ======================
function showQuiz(){
    let containShowQuiz = document.querySelector('.show-quizs');
    // let removeObj = document.querySelector('#add-question-page');
    let ObjToRemove = document.getElementsByClassName('contain-each-question');
    let comp = ObjToRemove.length;
    let comNum = 0;
    // Check to remove the previous answers
    if (data.length>=0){
        while(comNum<comp){
            containShowQuiz.removeChild(ObjToRemove[0]);
            comNum += 1;
            console.log("Can delete");
        }
    }
    
    for (index=0; index<data.length; index++){
        let containEachQuiz = document.createElement('div');
        containEachQuiz.className='contain-each-question';
        containEachQuiz.id=index;
        containShowQuiz.appendChild(containEachQuiz);
        
        let question = document.createElement('div');
        question.className='questions';
        question.textContent = data[index]['question'];
        containEachQuiz.appendChild(question);

        for (i=0; i<4; i++){
            let containAnswers = document.createElement('div');
            containAnswers.className='contain-answers';
            // contian each answers ============================
            let containEachAnswer = document.createElement('div');
            containEachAnswer.className='contain-each-answer';
            // contain answers option===========
            // let answerOption = document.createElement('div');
            // answerOption.className='answerOption';
            let option = document.createElement('li');
            if (i == data[index]['correctAnswer_'+i]){
                option.className='correct';
            }
            // answerOption.appendChild(option);
            containEachAnswer.appendChild(option);
            // answerOption.appendChild(option);
            // containEachAnswer.appendChild(answerOption);
            // contain answers =================
            let containAnswer = document.createElement('div');
            containAnswer.className = 'contain-answer';
            containAnswer.textContent = data[index][i];
            containEachAnswer.appendChild(containAnswer);
            containEachQuiz.appendChild(containEachAnswer);
            // console.log(containEachAnswer);
        }
        // score update delete
        let container = document.createElement('div');
        container.className="question-buttom"

        let score = document.createElement('p');
        score.className = "score";
        score.textContent = "Score : " + document.querySelector('.scores-create').value;
        container.appendChild(score);
        
        let group_update = document.createElement('div');
        group_update.className="update-question";
        
        let delete_question = document.createElement('button');
        delete_question.className = "btn";
        delete_question.id = "delete";
        delete_question.textContent = "DELETE";
        group_update.appendChild(delete_question);
        
        let edite_question = document.createElement('button');
        edite_question.className = "btn";
        edite_question.id = "edite";
        edite_question.textContent = "EDITE";
        group_update.appendChild(edite_question);
        
        container.appendChild(group_update);
        containEachQuiz.appendChild(container);
        
        
        // clear create question
        document.querySelector('.question').value='';
        document.querySelector('.scores-create').value=0;
        for (i=0; i<4; i++){
            let eachDelete = document.getElementsByClassName('each-answer')[i];
            eachDelete.childNodes[1].checked=false;
            eachDelete.childNodes[3].value='';
        }
    }
}

// ================ Update task ============================
    // chenge option answer
function modalOptionAnswers(){
    let options = document.querySelector('#type-of-answer').value;
    let changeOption = document.getElementsByName('correction');
    for (i=0; i< 4; i++){
        changeOption[i].type = options;
        // alert("You can change Your option!")
    }
}

function check(e){

}