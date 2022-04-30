// const { json } = require("express/lib/response");

// data =================================
let questionID = [];
let titleID = [];


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
        addQuestionToMongoDB();
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

function hideEditeQuestion(){
    let hideEditeQuestion = document.querySelector("#questions-edite");
    hideEditeQuestion.style.display = "none";
}
function showEditeQuestion(){
    let hideEditeQuestion = document.querySelector("#questions-edite");
    hideEditeQuestion.style.display = "block";
}

function hideEditeTitle(){
    let hideEditeQuestion = document.querySelector("#title-edite");
    hideEditeQuestion.style.display = "none";
}
function showEditeTitle(){
    let hideEditeQuestion = document.querySelector("#title-edite");
    hideEditeQuestion.style.display = "block";
}

// Add data title ======================================
ADD_TITLE = "/titles"
function addTitleToMongDB(){
    // let quizTitle = document.getElementsByClassName('quiz-title');
    let addTitle = document.querySelector('.title-input');
    let showBtnEditeTitle = document.querySelector('.button-edite-title');
    let hideBtnCreateTitle = document.querySelector('.button-add-title');
    let contentTitle = document.querySelector(".title-quiz");
    let title = document.createElement('h2');
    title.className="quiz-title";
    data = {title: addTitle.value};
    axios.post(ADD_TITLE, data).then((response) => {
        let result = response.data;
        showBtnEditeTitle.style.display = "block";
        hideBtnCreateTitle.style.display = "none";
        title.id = result._id;
        title.textContent = result.title;
        contentTitle.appendChild(title);
        console.log(contentTitle.childNodes[5].id);
    })

    hideEditeTitle()
}


function editeTitleToMongDB(){
    // let quizTitle = document.getElementsByClassName('quiz-title');
    let addTitle = document.querySelector('.title-input');
    let title = document.querySelector('.quiz-title');
    let contentTitle = document.querySelector(".title-quiz");

    data = {id: contentTitle.childNodes[5].id, title: addTitle.value};
    axios.put(ADD_TITLE, data).then((response) => {
        let result = response.config.data;
        // title.id = result._id;
        // contentTitle.appendChild(title);
        let got = JSON.parse(result);
        title.textContent = got.title;
        console.log(got);
        console.log("hELLO wORLD hOW aRE yOU ?");
    })

    hideEditeTitle()
}


function addQuestionToMongoDB(){
    let contentTitle = document.querySelector(".title-quiz");
    let question = document.querySelector(".question");
    let answers = document.querySelectorAll(".answer-group");
    let correction = document.querySelectorAll(".type-of-input");
    let type = document.querySelector(".types");
    let scores = document.querySelector("#myScores");
    let data ={};
    let dataCorrection = [];
    let dataAnswer = [];

    data['question'] = question.value;
    for (i=0; i<answers.length-4; i++){
        dataAnswer.push(answers[i].value);
    }
    data['answers'] = dataAnswer;

    for (i=0; i<correction.length; i++){
        if(correction[i].checked){
            dataCorrection.push(i);
        }
    }
    data['correctA'] = dataCorrection;

    data['score'] = scores.value;

    data['typeOfQ'] = type.value;

    data['idOfQ'] = contentTitle.childNodes[5].id;
    
    // console.log(data);

    axios.post("/questions", data).then((resporn)=>{
        let result = resporn.data;

        let containShowQuiz = document.querySelector('.show-quizs');

            let containEachQuiz = document.createElement('div');
            containEachQuiz.className='contain-each-question';
            containEachQuiz.id=result._id;
            containShowQuiz.appendChild(containEachQuiz);
            
            let question = document.createElement('div');
            question.className='questions';
            question.textContent = result.question;
            containEachQuiz.appendChild(question);
    
            for (i=0; i<4; i++){
                let containAnswers = document.createElement('div');
                containAnswers.className='contain-answers';
                // contian each answers ============================
                let containEachAnswer = document.createElement('div');
                containEachAnswer.className='contain-each-answer';
                // contain answers option===========
                let option = document.createElement('li');
                for (index=0; index<result.correctA.length; index++){
                    if (i == result.correctA[index]){
                        option.className='correct';
                        console.log("Can add class");
                    }
                }
                // answerOption.appendChild(option);
                containEachAnswer.appendChild(option);
                // answerOption.appendChild(option);
                // containEachAnswer.appendChild(answerOption);
                // contain answers =================
                let containAnswer = document.createElement('div');
                containAnswer.className = 'contain-answer';
                containAnswer.textContent = result.answers[i];
                containEachAnswer.appendChild(containAnswer);
                containEachQuiz.appendChild(containEachAnswer);
                // console.log(containEachAnswer);
            }
            // score update delete
            let container = document.createElement('div');
            container.className="question-buttom"
    
            let score = document.createElement('p');
            score.className = "score";
            score.textContent = "Score : " + result.score;
            container.appendChild(score);
            
            let group_update = document.createElement('div');
            group_update.className="update-question";
            
            let delete_question = document.createElement('button');
            delete_question.className = "btn";
            delete_question.id = "delete";
            delete_question.addEventListener("click", deleteQuestion);
            delete_question.textContent = "DELETE";
            group_update.appendChild(delete_question);
            
            let edite_question = document.createElement('button');
            edite_question.className = "btn";
            edite_question.id = "edite";
            edite_question.addEventListener("click", showDataToUpdate);
            edite_question.textContent = "EDITE";
            // edite_question.onclick(deleteQuestion());
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
        // }
        // console.log(containShowQuiz);
    })
}


// Delete Question ====================
function deleteQuestion(e){
    let contentParent = document.querySelector(".show-quizs");
    let pare = e.target;
    let taskToDelete = pare.parentNode.parentNode.parentNode;
    axios.delete("/questions/"+taskToDelete.id).then((result)=>{
        alert("Hello world how are you?");
        console.log(result.data);
    });
    contentParent.removeChild(taskToDelete);

    console.log(taskToDelete);
}

// Edite Question =====================
function showDataToUpdate(e){
    showEditeQuestion();
    let id = e.target.parentNode.parentNode.parentNode.id;
    questionID.push(id);
    console.log(id);
    axios.get("/questions/"+id).then((resporn)=>{
        let result = resporn.data[0];
        console.log(result);
        document.querySelector('.question-edite').value = result.question;
        document.querySelector('.types-edite').value = result.typeOfQ;
        document.querySelector('.scores-edite').value = result.score;
        let allAnswer = document.querySelectorAll('.answer-edite');
        let correction = document.getElementsByName('correction');
        document.getElementsByClassName("left-edite").id = id;
        for (i=0; i<4; i++){
            allAnswer[i].value = result.answers[i];
        }
        for (i=0; i<4; i++){
            for (index=0; index<4; index++){
                if(i == result.correctA[index]){
                    correction[i].checked = true;
                    console.log("ello world");
                }
            }
        }
    })
}

function editeQuestionInMongDB(){
    let question = document.querySelector('.question-edite').value;
    let type = document.querySelector('.types-edite').value;
    let scores = document.querySelector('.scores-edite').value;
    let allAnswer = document.querySelectorAll('.answer-edite');
    let correction = document.getElementsByName('correction');
    // let save = document.getElementById('edite-question');
    // let data = {};
    // let id = e;
    let answer = [];
    let correctAnswer = [];
    // showDataToUpdate(id)
        for (i=0; i<4; i++){
            answer.push(allAnswer[i].value);
            if(correction[i].checked){
                correctAnswer.push(i);
            }
        }

        let data = {id: questionID[0], question: question, answers: answer, correctA: correctAnswer, score:scores, typeOfQ:type};

    
        // console.log(data);
        axios.put("/questions", data).then((result)=>{
            hideEditeQuestion()
            let resporn = result.config.data;
            let dataResporn = JSON.parse(resporn);
            console.log(dataResporn);
            let parent = document.getElementById(questionID[0].toString());
            // console.log(questionID[0]);
            console.log(parent);
            // console.log(parent.childNodes);
            parent.childNodes[0].textContent = dataResporn.question;
            for(i=1; i<5; i++){
                parent.childNodes[i].childNodes[1].textContent = dataResporn.answers[i-1];
                parent.childNodes[i].childNodes[0].className = "";
            }
            for(i=0; i<dataResporn.correctA.length; i++){
                parent.childNodes[dataResporn.correctA[i]].childNodes[0].className = "correct";
            }
            parent.childNodes[5].childNodes[0].textContent = dataResporn.score;

        })
        // hideEditeQuestion();
        // questionID = [];
}


// Concel create tasks
function concelTask(){
    let contentTitle = document.querySelector(".title-quiz");
    let id = contentTitle.childNodes[5].id;
    console.log(contentTitle.childNodes[5].id);
    axios.delete("/questions/delete/"+id).then((resporn)=>{
        alert("delete quez success");
    })
    axios.delete("/titles/"+id).then((resporn)=>{
        alert("delete title success")
    })
    location.replace("http://localhost/")
}
console.log(document.querySelector("body"));