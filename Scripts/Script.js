// For High Performance [+]
const $ = document;

// Variables [+]
let displayCalc = $.querySelector("#value-display-calc");
let calculatorButtons = $.querySelectorAll(".calculator_button");
let backBtn = $.querySelector("#backButton");
let result = 0;

// Functions [+]
function mouseFocusOnButton(event){
    if(event.target.dataset.name !== undefined){
        ResultGenerator(event.target.dataset.name);
    }
    if(event.target.dataset.name === "Clear"){
        clearDisplayCalc();
    }
}
function keyboardFocusOnButton(event){
    calculatorButtons.forEach(function (button) {
        if(event.key === button.dataset.name){
            setAnimation(button);

            ResultGenerator(button.dataset.name);
        }
    });
    if(event.key === "Backspace"){
        setAnimation(backBtn)
        UndoReturnHandler();
    }
    if(event.key === "Enter"){
        ShowResult();
    }
}
function ResultGenerator(dataset){
    if(displayCalc.value.length <= 10){
        displayCalc.value += dataset;
    }
}
function clearDisplayCalc(){
    displayCalc.value = null;
    result = 0;
}
function UndoReturnHandler(){
    displayCalc.value = displayCalc.value.slice(0, (displayCalc.value.length - 1));
}
function ShowResult(){
    result = Number(eval(displayCalc.value));
    let x = result;
    if(Math.round(x) !== x){
        x = x.toFixed(4);
    }
    if(!isNaN(x)){
        displayCalc.value = x;
        result = 0;
    }else{
        alert("Your input is out of range !")
    }
}
function setAnimation(element){
    element.classList.add("setAnimation");
    element.addEventListener("animationend", function(){
        getAnimation(element);
    })
}
function getAnimation(element){
    element.classList.remove("setAnimation");
}

// Events [+]
calculatorButtons.forEach(function (button) {
    button.addEventListener("click", mouseFocusOnButton)
});
backBtn.addEventListener("click", function (){
    setAnimation(backBtn);
    UndoReturnHandler()
})
$.body.addEventListener("keydown", keyboardFocusOnButton)
