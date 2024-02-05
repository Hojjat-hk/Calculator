// For High Performance [+]
const $ = document;

// Variables [+]
let displayCalc = $.querySelector("#value-display-calc");
let calculatorButtons = $.querySelectorAll(".calculator_button");
let backBtn = $.querySelector("#backButton");
let result = 0;

// Functions [+]
function FocusOnButtonHandlerMouse(event){
    event.target.style.boxShadow = "inset 1px 1px 1px rgba(0, 0, 0, 0.5), inset -1px -1px 1px rgba(256, 256, 256, 0.2)";
    BlurOnButtonHandlerMouse(event);
}
function BlurOnButtonHandlerMouse(event){
    setTimeout(function (){
        event.target.style.boxShadow = "1px 1px 1px rgba(0, 0, 0, 0.5), -1px -1px 1px rgba(256, 256, 256, 0.2)";
    },25)
    if(event.target.dataset.name !== undefined){
        ResultGenerator(event.target.dataset.name);
    }
    if(event.target.dataset.name === "Clear"){
        clearDisplayCalc();
    }
}
function FocusOnButtonHandlerKeyboard(event){
    calculatorButtons.forEach(function (button) {
        if(event.key === button.dataset.name){
            button.style.boxShadow = "inset 1px 1px 1px rgba(0, 0, 0, 0.5), inset -1px -1px 1px rgba(256, 256, 256, 0.2)";
            BlurOnButtonHandlerKeyboard(button);
        }
    });
}
function  BlurOnButtonHandlerKeyboard(event){
    setTimeout(function (){
        event.style.boxShadow = "1px 1px 1px rgba(0, 0, 0, 0.5), -1px -1px 1px rgba(256, 256, 256, 0.2)";
    },25)
    if(event.key === "Enter"){
        ShowResult();
    }
    if(event.key === "Backspace"){
        UndoReturnHandler();
        backBtn.style.boxShadow = 'inset 1px 1px 1px rgba(0, 0, 0, 0.5), inset -1px -1px 1px rgba(256, 256, 256, 0.2)';
        setTimeout(function(){
            backBtn.style.boxShadow = "1px 1px 1px rgba(0, 0, 0, 0.5), -1px -1px 1px rgba(256, 256, 256, 0.2)";
        },25)
    }
    ResultGenerator(event.dataset.name);
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
    let valueX = '';
    for (let i = 0; i < displayCalc.value.length ; i++){
        if(i < displayCalc.value.length - 1){
            valueX += displayCalc.value[i]
        }
    }
    displayCalc.value = valueX;
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

// Events [+]
calculatorButtons.forEach(function (button) {
    button.addEventListener("click", FocusOnButtonHandlerMouse)
});
$.body.addEventListener("keydown", FocusOnButtonHandlerKeyboard)
backBtn.addEventListener("click", UndoReturnHandler)