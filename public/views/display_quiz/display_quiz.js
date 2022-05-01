// TO DISPLAY THE LIST OF QUESTIONS OF THE QUIZ TO FOR USER TO DO
function displayQuest() {
    
    let idForLabel = 0;
    let quizForm = document.createElement("form");
    quizForm.className = "form";
    quizForm.setAttribute("action", "../correction/correction.html");
    container.appendChild(quizForm);

    let divTitle = document.createElement("div");
    divTitle.className = "divTitleQuiz";
    quizForm.appendChild(divTitle);
    let datas = JSON.parse(localStorage.getItem('quizdatas'));

    axios.get("/titles/" + datas[0].idOfQ).then((result) => {
        let data = result.data[0];
        let titleQuiz = document.createElement("span");
        titleQuiz.textContent = data.title;
        titleQuiz.className = "text-title";
        divTitle.appendChild(titleQuiz);
    })


    let quizBlock = document.createElement("div");
    quizBlock.className = "blockQuest";
    quizForm.appendChild(quizBlock);

    for (let data of datas) {

        let eachQuest = document.createElement("div");
        eachQuest.className = "each-quest";
        quizBlock.appendChild(eachQuest);
    
        let divQuest = document.createElement("div");
        divQuest.className = "question";
        eachQuest.appendChild(divQuest);
    
        let quest = document.createElement("span");
        quest.className = "quest-span";
        quest.textContent = data.question;
        divQuest.appendChild(quest);

        let questScore = document.createElement("span");
        questScore.className = "score-quest";
        questScore.textContent = "Score: " + data.score;
        divQuest.appendChild(questScore);
    
        let divAnswers = document.createElement("div");
        divAnswers.className = "answers";
        eachQuest.appendChild(divAnswers);

        for (let answ of data.answers) {

            let answer = document.createElement("div");
            answer.className = "answer";
            divAnswers.appendChild(answer);
        
            let eachAnswer = document.createElement("input");
            eachAnswer.type = data.typeOfQ;
            eachAnswer.name = data._id ;
            eachAnswer.className = data.typeOfQ;
            eachAnswer.id = idForLabel;
            answer.appendChild(eachAnswer);
            
            let labelAnswer = document.createElement("label");
            labelAnswer.setAttribute("for", idForLabel);
            labelAnswer.textContent = answ;
            answer.appendChild(labelAnswer);
            idForLabel += 1;
        }

        if (data.typeOfQ == "radio") {
            let toRequired = document.getElementsByName(data._id);
            toRequired[0].required = "required";

        }
    
    }
    let btnSubmit = document.createElement("button");
    btnSubmit.className = "btn bg-primary";
    btnSubmit.textContent = "Submit";
    btnSubmit.type = "Submit";
    btnSubmit.id = datas[0].idOfQ
    quizBlock.appendChild(btnSubmit);
    // btnSubmit.addEventListener("click", displayResult);
    
}



let container = document.querySelector(".main-container");
displayQuest();