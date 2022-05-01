// TO DISPLAY ALL LIST OF QUIZZES
function displayQuiz() {

    let homeContainer = document.createElement("div");
    homeContainer.className = "home-container row justify-content-center";
    container.appendChild(homeContainer);
    
    axios.get("/titles").then((result) => {

        let titles = result.data;

        for (let title of titles) {

            let eachQuiz = document.createElement("div");
            eachQuiz.className = "card m-3 col-3";
            homeContainer.appendChild(eachQuiz);

            let cardHeader = document.createElement("div");
            cardHeader.className = "card-header";
            eachQuiz.appendChild(cardHeader);
        
            let titleQuiz = document.createElement("h1");
            titleQuiz.textContent = title.title;
            cardHeader.appendChild(titleQuiz);

            let cardFooter = document.createElement("div");
            cardFooter.className = "card-footer d-flex justify-content-between";
            eachQuiz.appendChild(cardFooter);

            let footerLeft = document.createElement("div");
            footerLeft.className = "left";
            cardFooter.appendChild(footerLeft);

            let btnPlay = document.createElement("a");
            btnPlay.className = "btn bg-success";
            btnPlay.textContent = "Play";
            btnPlay.id = title._id;
            btnPlay.href = "../display_quiz/display_quiz.html";
            footerLeft.appendChild(btnPlay);
            btnPlay.addEventListener("click", play);

            let footerRight = document.createElement("div");
            footerRight.className = "right d-flex align-items-center";
            cardFooter.appendChild(footerRight);

            let iEdit = document.createElement("i");
            iEdit.className = "fa fa-edit text-danger icons";
            footerRight.appendChild(iEdit);
            
            let iDelete = document.createElement("i");
            iDelete.className = "fa fa-trash text-danger icons";
            footerRight.appendChild(iDelete);

        }
    })
}

// TO SAVE ALL QUESTIONS OF QUIZ TO LOCALSTORAGE
function play(event) {
    let quiz = event.target.id;
    axios.get("/questions/" + quiz).then((result) => {
        let data = result.data;
        saveData(data);
    }) 
}


// CREATE FUNCTION TO SAVE DATA TO LOCALSTORAGE
function saveData(data) {
    localStorage.setItem('quizdatas', JSON.stringify(data));
}

let container = document.querySelector(".main-container");
displayQuiz();

function goToCreatePage(){
    let Password = new URLSearchParams(window.location.search).get("id")
    location.replace("http://localhost/views/create/create.html?id="+Password)
}
