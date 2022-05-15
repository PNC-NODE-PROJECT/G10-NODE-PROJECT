
// TO DISPLAY THE LIST OF QUESTIONS OF THE QUIZ TO FOR USER TO DO
function noBack()
{
    window.history.forward();
}
function displayQuest() {
    let quiz = new URLSearchParams(window.location.search).get("id");
    axios.get("/questions/" + quiz).then((result) => {
        let datas = result.data;

        if (datas.length >0) {
            let idForLabel = 0;
            let quizForm = document.createElement("form");
            quizForm.className = "form";
            container.appendChild(quizForm);
    
            let divTitle = document.createElement("div");
            divTitle.className = "divTitleQuiz";
            quizForm.appendChild(divTitle);
    
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
            
            }
            let btnSubmit = document.createElement("a");
            btnSubmit.className = "btn bg-primary btn-submit";
            btnSubmit.textContent = "Submit";
            btnSubmit.type = "Submit";
            btnSubmit.id = datas[0].idOfQ;
            btnSubmit.href = "../correction/correction.html?id="+quiz;
            quizBlock.appendChild(btnSubmit);
            btnSubmit.addEventListener("click", displayResult);
        }else{
            let noQuest = document.createElement("div");
            noQuest.className = "no-quest";
            noQuest.textContent = "No Question"
            container.appendChild(noQuest);
    
            let back = document.createElement("div");
            back.className = "back-list-quiz";
            container.appendChild(back);
    
            let linkBack = document.createElement("a");
            linkBack.className = "btn link-back";
            linkBack.href = "../home/home.html";
            linkBack.textContent = "Back";
            back.appendChild(linkBack);
        }
    })     

}

function displayResult(event) {
    let titleID = event.target.id;
    window.history.forward();
    getUserAnswer(titleID);
    
}


// TO GET THE ANSWER OF THE USER AND TOTALSCORE AND STORE IT IN MONGODB
function getUserAnswer(id) {

    axios.get("/questions/" + id).then((result) => {
        let datascore = {};
        let userChose = [];
        let datas = result.data;
        for (let data of datas) {
            let choseAnswer = document.getElementsByName(data._id);
            let answerOfeach = [];
            for (let i=0; i<choseAnswer.length; i++) {
                if (choseAnswer[i].checked) {
                    answerOfeach.push(i);
                }
            }
            if (answerOfeach.length == 0) {
                answerOfeach.push(-1);
            }
            userChose.push(answerOfeach);
        }

        let totals = [];
        let totalScore = 0;
        let totalUserScore = 0;
        let scoreOfEachQuestion = [];
        for (let i=0; i<datas.length; i++) {
            let data = datas[i];
            totalScore += data.score;
            if (data.typeOfQ == "checkbox") {
                if (data.correctA.length == userChose[i].length) {
                    let correct = true;
                    for (let j=0; j<data.correctA.length; j++) {
                        if (data.correctA[j] != userChose[i][j]) {
                            correct = false;
                        }
                    }
                    if (correct) {
                        totalUserScore += data.score;
                        scoreOfEachQuestion.push(data.score);
                    }else {
                        scoreOfEachQuestion.push(0);
                    }
                }else {
                    scoreOfEachQuestion.push(0);
                    
                }
            }else {
                if (data.correctA[0] == userChose[i][0]) {
                    totalUserScore += data.score;
                    scoreOfEachQuestion.push(data.score);
                }else {
                    scoreOfEachQuestion.push(0)
                }
            }
        }
        totals.push(totalUserScore);
        totals.push(totalScore);
        totals.push(scoreOfEachQuestion);

        datascore.useranswers = userChose;
        datascore.totalscore = totals;

        axios.post("/scores", datascore).then((result) => {
            res.send(result);
        }) 

    })
}


let container = document.querySelector(".main-container");

displayQuest();



// ================================================================
//                      session storage empty
// ================================================================
if(sessionStorage.getItem("id")==null){
    location.replace("/index.html")
}