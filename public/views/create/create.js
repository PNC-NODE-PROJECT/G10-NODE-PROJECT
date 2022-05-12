//====================== data =============================
function noBack()
{
    window.history.forward();
}
let questionID = [];
let titleID = [];
let questionEdit = [];
let questionCreate = [];
let questionDelete = []
let titleEdit = {};

// display when data input validation is not correct
function showInputError(input, errorInput){
    input.textContent = errorInput
    if (errorInput.length < 1){
        return true;
    }else{
        return false;
    }
}

// =============== data validation ========================
// validation create question
function checkAllInput(){
    let questionData = document.querySelector(".question");
    let answers = document.querySelectorAll(".answer-group");
    let correctionData = document.querySelectorAll(".type-of-input");

    let question = document.querySelector(".question-error");
    let answer1 = document.querySelector(".error-a1");
    let answer2 = document.querySelector(".error-a2");
    let answer3 = document.querySelector(".error-a3");
    let answer4 = document.querySelector(".error-a4");
    let correction = document.querySelector(".no-answer");

    let answerError = [];
    let correctionError = true;
    for (i=0; i<4; i++){
        if(i === 0){let answerEmpty = answers[i].value === "" ? showInputError(answer1, "Please check your answer!"):showInputError(answer1, ""); answerEmpty === false ? answerError.push(i):answerError}
        if(i === 1){let answerEmpty = answers[i].value === "" ? showInputError(answer2, "Please check your answer!"):showInputError(answer2, ""); answerEmpty === false ? answerError.push(i):answerError}
        if(i === 2){let answerEmpty = answers[i].value === "" ? showInputError(answer3, "Please check your answer!"):showInputError(answer3, ""); answerEmpty === false ? answerError.push(i):answerError}
        if(i === 3){let answerEmpty = answers[i].value === "" ? showInputError(answer4, "Please check your answer!"):showInputError(answer4, ""); answerEmpty === false ? answerError.push(i):answerError}
        if(correctionData[i].checked){
            correctionError = false
        }
    }

    let questionResporn =  questionData.value === "" ? showInputError(question, "Please check you question!"):showInputError(question, "");
    let noCorrect = correctionError === true ? showInputError(correction, "Please choose the correct answer!"):showInputError(correction, "");

    if(questionResporn && noCorrect && answerError.length==0){
        // console.log("Your Data validation is success");
        addQuestionToMongoDB()
    }
    
}

// validation edite question
function checkAllEditInput(){
    let questionData = document.querySelector(".question-edite");
    let answers = document.querySelectorAll(".answer-edite");
    let correctionData = document.getElementsByName("correction");

    let question = document.querySelector(".question-edit-error");
    let answer1 = document.querySelector(".answer1-edit-error");
    let answer2 = document.querySelector(".answer2-edit-error");
    let answer3 = document.querySelector(".answer3-edit-error");
    let answer4 = document.querySelector(".answer4-edit-error");
    let correction = document.querySelector(".no-edit-answer");

    let answerError = [];
    let correctionError = true;
    for (i=0; i<4; i++){
        if(i === 0){let answerEmpty = answers[i].value === "" ? showInputError(answer1, "Please check your answer!"):showInputError(answer1, ""); answerEmpty === false ? answerError.push(i):answerError}
        if(i === 1){let answerEmpty = answers[i].value === "" ? showInputError(answer2, "Please check your answer!"):showInputError(answer2, ""); answerEmpty === false ? answerError.push(i):answerError}
        if(i === 2){let answerEmpty = answers[i].value === "" ? showInputError(answer3, "Please check your answer!"):showInputError(answer3, ""); answerEmpty === false ? answerError.push(i):answerError}
        if(i === 3){let answerEmpty = answers[i].value === "" ? showInputError(answer4, "Please check your answer!"):showInputError(answer4, ""); answerEmpty === false ? answerError.push(i):answerError}
        if(correctionData[i].checked){
            correctionError = false
        }
    }

    let questionResporn =  questionData.value === "" ? showInputError(question, "Please check you question!"):showInputError(question, "");
    let noCorrect = correctionError === true ? showInputError(correction, "Please choose the correct answer!"):showInputError(correction, "");

    if(questionResporn && noCorrect && answerError.length==0){
        editeQuestionInMongDB()
    }
    
}

// ================ Change Option Answers ==================
function optionAnswers(){
    let options = document.querySelector('#list').value;
    let changeOption = document.querySelectorAll('.type-of-input');
    for (i=0; i< 4; i++){
        changeOption[i].type = options;
    }
}

// ================ Update task ============================
    // chenge option answer
function modalOptionAnswers(){
    let options = document.querySelector('#type-of-answer').value;
    let changeOption = document.getElementsByName('correction');
    for (i=0; i< 4; i++){
        changeOption[i].type = options;
    }
}

// hide the place for edit question
function hideEditeQuestion(){
    let hideEditeQuestion = document.querySelector("#questions-edite");
    hideEditeQuestion.style.display = "none";
    questionID = [];
}

// show the place for edite question
function showEditeQuestion(){
    let hideEditeQuestion = document.querySelector("#questions-edite");
    hideEditeQuestion.style.display = "block";
}

// hide the place for edit title quiz
function hideEditeTitle(){
    let hideEditeQuestion = document.querySelector("#title-edite");
    hideEditeQuestion.style.display = "none";
}

// Show the place for edit title quiz
function showEditeTitle(){
    let hideEditeQuestion = document.querySelector("#title-edite");
    hideEditeQuestion.style.display = "block";
}

//================= Add data title ==================
function addTitleToMongDB(){
    let playerID = sessionStorage.getItem("id");
    let addTitle = document.querySelector('.title-input');
    let showBtnEditeTitle = document.querySelector('.button-edite-title');
    let hideBtnCreateTitle = document.querySelector('.button-add-title');
    let contentTitle = document.querySelector(".title-quiz");
    let title = document.createElement('h2');
    title.className="quiz-title";
    // check for User don't complet title 
    if(addTitle.value.length>0){
        data = {title: addTitle.value,playerID: sessionStorage.getItem("playerName")+sessionStorage.getItem("email")+sessionStorage.getItem("id")};
    }else{
        data = {title: "Untitle",playerID: sessionStorage.getItem("playerName")+sessionStorage.getItem("email")+sessionStorage.getItem("id")};
    }
    axios.post("/titles", data).then((response) => {
        let result = response.data;
        showBtnEditeTitle.style.display = "block";
        hideBtnCreateTitle.style.display = "none";
        title.id = result._id;
        title.textContent = result.title;
        contentTitle.appendChild(title);
    })
    hideEditeTitle()
}

// ============== edit data title quiz ==============
function editeTitleToMongDB(){
    // let quizTitle = document.getElementsByClassName('quiz-title');
    let addTitle = document.querySelector('.title-input');
    let title = document.querySelector('.quiz-title');
    let contentTitle = document.querySelector(".title-quiz");

    if(addTitle.value.length>0){
        data = {id: contentTitle.childNodes[1].id, title: addTitle.value};
    }else{
        data = {id: contentTitle.childNodes[1].id, title: "Untitle"};  
    }

    axios.put("/titles", data).then((response) => {
        let result = response.config.data;
        let got = JSON.parse(result);
        title.textContent = got.title;

    })
    hideEditeTitle()
}

// ==== add each question user create to mongoDB ====
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

    data['idOfQ'] = contentTitle.childNodes[1].id;
    
    console.log(contentTitle.childNodes[1].id);
    console.log(data);

    axios.post("/questions", data).then((resporn)=>{
        let result = resporn.data;
        questionCreate.push(result._id)

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
                option.style.listStyleType = "disc";
                if (result.typeOfQ == "checkbox") {
                    option.style.listStyleType = "square";
                }
                for (index=0; index<result.correctA.length; index++){
                    if (i == result.correctA[index]){
                        if (result.typeOfQ == "radio") {
                            option.style.listStyleType = "disc";
                        }
                        option.className='correct';
                    }
                }
                containEachAnswer.appendChild(option);
                // contain answers =================
                let containAnswer = document.createElement('div');
                containAnswer.className = 'contain-answer';
                containAnswer.textContent = result.answers[i];
                containEachAnswer.appendChild(containAnswer);
                containEachQuiz.appendChild(containEachAnswer);
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
            
            // create button delete while create
            let delete_question = document.createElement('button');
            delete_question.className = "btn";
            delete_question.id = "delete";
            delete_question.addEventListener("click", deleteQuestion);
            delete_question.textContent = "DELETE";
            group_update.appendChild(delete_question);
            
            // create button edit while create quiz 
            let edite_question = document.createElement('button');
            edite_question.className = "btn";
            edite_question.id = "edite";
            edite_question.addEventListener("click", showDataToUpdate);
            edite_question.textContent = "EDIT";
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
            data ={};
    })
}

// ============== Delete Question ====================
function deleteQuestion(e){
    let contentParent = document.querySelector(".show-quizs");
    let pare = e.target;
    let taskToDelete = pare.parentNode.parentNode.parentNode;
    axios.get("/questions/question/"+taskToDelete.id).then((resporn)=>{
        console.log(resporn.data[0]);
        questionDelete.push(resporn.data[0])
        axios.delete("/questions/"+taskToDelete.id).then((result)=>{
            console.log(result.data);
        });
        contentParent.removeChild(taskToDelete);
    })
    console.log(questionDelete);
}

//========== show data question for edite ============
function showDataToUpdate(e){       
    showEditeQuestion();
    console.log(e.target.parentNode.parentNode.parentNode.id);
    let id = e.target.parentNode.parentNode.parentNode.id;     
    questionID.push(id);
    axios.get("/questions/question/"+id).then((resporn)=>{
        let result = resporn.data[0];
        console.log(result);
        questionEdit.push(result);
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
            correction[i].checked = false;
            for (index=0; index<4; index++){
                if(i == result.correctA[index]){
                    correction[i].checked = true;
                    console.log(result.correctA[index]);
                }
            }
            correction[i].type = result.typeOfQ;
        }
    })
}

// ========= Edit Question while create ==============
function editeQuestionInMongDB(){
    let question = document.querySelector('.question-edite').value;
    let type = document.querySelector('.types-edite').value;
    let scores = document.querySelector('.scores-edite').value;
    let allAnswer = document.querySelectorAll('.answer-edite');
    let correction = document.getElementsByName('correction');
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

        axios.put("/questions", data).then((result)=>{
            console.log(result);
            let resporn = result.config.data;
            let dataResporn = JSON.parse(resporn);
            let parent = document.getElementById(questionID[0].toString());
            parent.childNodes[0].textContent = dataResporn.question;
            for(i=1; i<5; i++){
                parent.childNodes[i].childNodes[1].textContent = dataResporn.answers[i-1];
                parent.childNodes[i].childNodes[0].className = "";
            }
            for(i=0; i<dataResporn.correctA.length; i++){
                parent.childNodes[dataResporn.correctA[i]+1].childNodes[0].className = "correct";
            }
            for (i=1; i<5; i++){
                // for (index=0; index<result.correctA.length; index++){
                    if (dataResporn.typeOfQ == "checkbox") {
                        parent.childNodes[i].childNodes[0].style.listStyleType = "square";
                    }
                    // if (i == result.correctA[index]){
                        if (dataResporn.typeOfQ == "radio") {
                            parent.childNodes[i].childNodes[0].style.listStyleType = "disc";
                        }
                    //     option.className='correct';
                    // }
                // }
            }
            console.log(parent);
            parent.childNodes[5].childNodes[0].textContent ="Score : " + dataResporn.score;
            
            // questionID = [];
            hideEditeQuestion()
        })
}

// Concel create tasks create
function concelTask(){
    let contentTitle = document.querySelector(".title-quiz");
    let id = contentTitle.childNodes[1].id;
    axios.delete("/questions/delete/"+id).then((resporn)=>{
        console.log("delete quez success");
    })
    axios.delete("/titles/"+id).then((resporn)=>{
        console.log("delete title success");
    })
    location.replace("views/home/home.html")
}

// for save the quiz create
function saveQuiz(){
    location.replace("views/home/home.html")
}





// ================================================================
//                       User for Edite quiz
// ================================================================
// for edit quiz
let condition = document.querySelector(".title-input").value;
if (new URLSearchParams(window.location.search).get("qId").length>0 && condition.length<1){
    // Button to concel Quiz Edit
    document.querySelector(".button-concel").style.display="none";
    document.querySelector(".button-concell-edite-quiz").style.display="flex";

    let showBtnEditeTitle = document.querySelector('.button-edite-title');
    let hideBtnCreateTitle = document.querySelector('.button-add-title');

    showBtnEditeTitle.style.display = "flex";
    hideBtnCreateTitle.style.display = "none";

    showDataForEdit();
}

// show all data of Quiz for edit
function showDataForEdit(){
    // show the title for edite
    let titleID = new URLSearchParams(window.location.search).get("qId");
    let contentTitle = document.querySelector(".title-quiz");
    // let showBtnEditeTitle = document.querySelector('.button-edite-title');
    // let hideBtnCreateTitle = document.querySelector('.button-add-title');
    contentTitle.id =titleID;
    axios.get("/titles/"+titleID).then((resporn)=>{

        let title = document.createElement('h2');
        title.className="quiz-title";
        title.id=titleID;
        title.textContent=resporn.data[0].title;
        titleEdit["id"] = titleID;
        titleEdit["title"] = resporn.data[0].title;
        console.log(titleEdit);
        contentTitle.appendChild(title);

        document.querySelector(".title-input").value = resporn.data[0].title;
        // showBtnEditeTitle.style.display = "block";
        // hideBtnCreateTitle.style.display = "none";
    })
    // for edit question
    axios.get("/questions/"+titleID).then((resporns)=>{
        let results = resporns.data;
        // console.log(results);
        let containShowQuiz = document.querySelector('.show-quizs');
        for (n=0; n<results.length; n++){
            let result = results[n];
            // console.log(n);
            // console.log(result);


            let containEachQuiz = document.createElement('div');
                containEachQuiz.className='contain-each-question';
                containEachQuiz.id=result._id;
                
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
                    option.style.listStyleType = "disc";
                    if (result.typeOfQ == "checkbox") {
                        option.style.listStyleType = "square";
                    }
                    for (index=0; index<result.correctA.length; index++){
                        if (i == result.correctA[index]){
                            if (result.typeOfQ == "radio") {
                                option.style.listStyleType = "disc";
                            }
                            option.className='correct';
                        }
                    }

                    containEachAnswer.appendChild(option);
                    // contain answers =================
                    let containAnswer = document.createElement('div');
                    containAnswer.className = 'contain-answer';
                    containAnswer.textContent = result.answers[i];
                    containEachAnswer.appendChild(containAnswer);
                    containEachQuiz.appendChild(containEachAnswer);
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
                edite_question.textContent = "EDIT";
                group_update.appendChild(edite_question);
                
                container.appendChild(group_update);
                containEachQuiz.appendChild(container);
                
                
            containShowQuiz.appendChild(containEachQuiz);

        }
        // console.log(containShowQuiz);
    })
}

// Concel create tasks Edit
function concelTaskEdit(){
    // restore title when we Edit ====================================================
    axios.put("/titles", titleEdit).then((response) => {
        console.log("Edit Title Success");
    })

    // restore all question that delete while edite ===================================
    for (index=0; index<questionDelete.length; index++){
        let data = questionDelete[index]
        axios.post("/questions", data).then((resporn)=>{
            console.log(resporn);
        })
    }

    // restore all question that edite while edite =====================================
    for (index=0; index<questionEdit.length; index++){
        let data = {id: questionEdit[index]._id, question: questionEdit[index].question, answers: questionEdit[index].answers, correctA: questionEdit[index].correctA, score:questionEdit[index].score, typeOfQ:questionEdit[index].typeOfQ};

        axios.put("/questions", data).then((result)=>{
            console.log(result);
        })
    }

    // delete all question that create while edite ======================================
    for (i=0; i<questionCreate.length; i++){
        let data = questionCreate[i]
        console.log(data);
        axios.delete("/questions/"+ data).then((response) => {
            console.log("Edit Question Success");
        })
    }

    location.replace("views/home/home.html");
    titleEdit={};
    questionEdit=[];
    questionCreate=[];
    questionDelete = [];
    // Button to concel Quiz Edit
    document.querySelector(".button-concel").style.display="flex";
    document.querySelector(".button-concell-edite-quiz").style.display="none";
}
// ================================================================
//                      session storage empty
// ================================================================
if(sessionStorage.getItem("id")==null){
    location.replace("index.html")
}