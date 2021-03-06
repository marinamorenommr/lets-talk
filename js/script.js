//selecting all required elements
const intro_text = document.querySelector(".intro_text button");
const slider_question = document.querySelector(".slider_question");
const continue_btn = slider_question.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");


// if startQuiz button clicked
intro_text.onclick = ()=>{
    slider_question.classList.add("activeInfo"); //show info box
}


// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    slider_question.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); 
    queCounter(1); 
    
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    que_count = 0;
    que_numb = 1;
    let userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    next_btn.classList.remove("show"); 
    window.location.reload(); 
}


const bottom_ques_counter = document.querySelector(".total_que");
const next_btn = document.querySelector("footer .next_btn");


// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count);
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}
 
// getting questions and options from array
function showQuetions(index){
    const question_text = document.querySelector(".question_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>' + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>';
    question_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    var userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; 
        answer.classList.add("selected"); 
        console.log("Selected Answer");
        console.log("Your selected answers = " + userAns);
    }

    else{
        answer.classList.add("selected"); //adding green color to correct selected option
        console.log("Selected Answer");
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }

    next_btn.classList.add("show"); 
}




function showResult(){
    slider_question.classList.remove("activeInfo"); //hide info box 
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const result_text = result_box.querySelector(".result_text");
    if (userScore >= 7){  
        let scoreTag = '<span><p> Seems like you are on top of your mental health, well done! </br> Try some <a href="https://www.youtube.com/watch?v=ZToicYcHIOU">meditation</a> to keep you on track!</p></span>'  ;
        result_text.innerHTML = scoreTag;  
    }
    else if(userScore <=3){ // if user selected YES in less than  3 questions 
        let scoreTag = '<span><p> Seems like you might be strugglinh with your mental health. </br> Check out this <a href="https://www.mind.org.uk/information-support/">Information and support services</a> to help you with your journey to improving your mental health.</p></span>';
        result_text.innerHTML = scoreTag;
    }
    else { // if user selected No in more than 4 questions 
        let scoreTag = '<span><p> Seems like your mental is stable but could be better!</br> Check out this <a href="https://www.mentalhealth.org.uk/publications/how-to-mental-health">blog</a> and follow the tips to improve your mental health!</p></span>';
        result_text.innerHTML = scoreTag;
    }
}
        


function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = + index +' of '+ questions.length +' Questions';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

//this is the slider JS code

const body = document.querySelector("body");
const emotions = document.querySelector(".slide-emotions");
const input = document.querySelector("input");
const bar = document.querySelector(".progress-bar");
const thumb = document.querySelector(".thumb");
input.oninput = ()=>{
  let sliderValue = input.value;
  thumb.style.left = sliderValue + '%';
  bar.style.width = sliderValue + '%';
  if(sliderValue < 20){

    emotions.style.marginTop = "0px";
    body.classList.add("green");
    body.classList.remove("yellow");
    body.classList.remove("orange");
    body.classList.remove("red");
    body.classList.remove("blue");
  }
  if(sliderValue >= 20){
    emotions.style.marginTop = "-140px";
    body.classList.add("yellow");
    body.classList.remove("green");
    body.classList.remove("orange");
    body.classList.remove("red");
    body.classList.remove("blue");
  }
  if(sliderValue >= 40){
    emotions.style.marginTop = "-280px";
    body.classList.add("orange");
    body.classList.remove("yellow");
    body.classList.remove("red");
    body.classList.remove("blue");
    body.classList.remove("green");
  }
  if(sliderValue >= 60){
    emotions.style.marginTop = "-420px";
    body.classList.add("red");
    body.classList.remove("orange");
    body.classList.remove("blue");
    body.classList.remove("green");
    body.classList.remove("yellow");
  }
  if(sliderValue >= 80){
    emotions.style.marginTop = "-560px";
    body.classList.add("blue");
    body.classList.remove("red");
    body.classList.remove("green");
    body.classList.remove("orange");
    body.classList.remove("yellow");
  }
}
