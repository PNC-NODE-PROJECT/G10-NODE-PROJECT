// TO SHOW THE RESULT OF QUIZ
function correctionQuiz() {

    let scores = JSON.parse(localStorage.getItem('totalscore'));
    let datas = JSON.parse(localStorage.getItem('quizdatas'));
    let userAnswers = JSON.parse(localStorage.getItem('useranswers'));
    let index = 0;

    let blockResult = document.createElement("div");
    blockResult.className = "block-result";
    container.appendChild(blockResult);

    let blockScore = document.createElement("div");
    blockScore.className = "block-score";
    blockResult.appendChild(blockScore);

    let textScore = document.createElement("span");
    textScore.className = "text-score";
    textScore.textContent = "Your Score";
    blockScore.appendChild(textScore);
    
    let score = document.createElement("span");
    score.className = "score";
    score.textContent = scores[0] + "/" + scores[1] ;
    blockScore.appendChild(score);

    let blockCorrections = document.createElement("div");
    blockCorrections.className = "block-corrections";
    blockResult.appendChild(blockCorrections);

    for (let data of datas) {

        let eachUserAnswer = userAnswers[index];

        let eachCorrection = document.createElement("div");
        eachCorrection.className = "each-correction";
        blockCorrections.appendChild(eachCorrection);
    
        let questionCorrections = document.createElement("div");
        questionCorrections.className = "question-correction";
        eachCorrection.appendChild(questionCorrections);
    
        let questSpan = document.createElement("span");
        questSpan.className = "quest-span";
        questSpan.textContent = data.question;
        questionCorrections.appendChild(questSpan);
    
        let scoreQuest = document.createElement("span");
        scoreQuest.className = "score-quest";
        scoreQuest.textContent = scores[2][index] + "/" + data.score;
        questionCorrections.appendChild(scoreQuest);
    
        let blockAnswerCorrection = document.createElement("ul");
        blockAnswerCorrection.className = "block-answer-correction";
        eachCorrection.appendChild(blockAnswerCorrection);
        let dataAnswer = data.answers;

        let typeIcon = "fa fa-circle-o";
        let typeRadio = true;
        if (data.typeOfQ == "checkbox") {
            typeIcon = "fa fa-square-o";
            typeRadio = false;
        }
        for (let i=0; i<dataAnswer.length; i++) {
            let ans = data.answers[i];
            
            let answerCorrection = document.createElement("li");
            answerCorrection.className = "answer-correction";
            blockAnswerCorrection.appendChild(answerCorrection);
            
            let check = false;
            if (typeRadio) {
                for (let a of eachUserAnswer) {
                    if (i == a) {
                        typeIcon = "fa fa-check-circle-o";
                        answerCorrection.style.color = "red";
                        check = true
                    }  
                }
                for (let j of data.correctA) {
                    if (i == j) {
                        typeIcon = "fa fa-check-circle-o";
                        answerCorrection.style.color = "green";
                        check = true;
                    }  
                }
                if (check != true) {
                    typeIcon = "fa fa-circle-o";
                }
            }else {
                for (let a of eachUserAnswer) {
                    if (i == a) {
                        typeIcon = "fa fa-check-square-o";
                        answerCorrection.style.color = "red";
                        check = true;
                    }
                }
                for (let j of data.correctA) {
                    if (i == j) {
                        typeIcon = "fa fa-check-square-o";
                        answerCorrection.style.color = "green";
                        check = true;
                    } 
                }
                if (check != true) {
                    typeIcon = "fa fa-square-o";
                }
            }
            
            let iconCheck = document.createElement("span");
            iconCheck.className = "icon-check";
            answerCorrection.appendChild(iconCheck);
        
            let faIcon = document.createElement("i");
            faIcon.className = typeIcon;
            iconCheck.appendChild(faIcon);
        
            let textAnswerCorrection = document.createElement("span");
            textAnswerCorrection.className = "text-answer-correction";
            textAnswerCorrection.textContent = ans;
            answerCorrection.appendChild(textAnswerCorrection);
        } 
        index += 1;
    }

    let linkBack = document.createElement("a");
    linkBack.className = "btn link-back";
    linkBack.href = "../home/home.html?id=theavy";
    linkBack.textContent = "Back";
    blockResult.appendChild(linkBack);

}

let container = document.querySelector(".main-container");
correctionQuiz();
