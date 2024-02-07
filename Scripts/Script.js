// For High Performance [+]
const $ = document;

// Variables [+]
let displayCalc = $.querySelector("#value-display-calc");
let calculatorButtons = $.querySelectorAll(".calculator_button");
let backBtn = $.querySelector("#backButton");
let result = 0;

// Constants [+]
const operators = ["+", "-", "*", "/", "%"];

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
    if(displayCalc.value.length > 10)
        return;

    const lastCharacter = displayCalc.value[displayCalc.value.length - 1]
    const isDatasetAnOperator =  operators.includes(dataset);

    if (operators.includes(lastCharacter)) {
        if (isDatasetAnOperator || dataset === ".")
            return;
    }

    if (dataset === "." && lastCharacter === ".")
        return;

    if(lastCharacter === "." && isDatasetAnOperator)
        return;

    if (lastCharacter === "." && !operators.includes(displayCalc.value[displayCalc.value.length - 2])) {
        displayCalc.value += dataset;
        return;
    }

    if (displayCalc.value === "0") {
        if (dataset !== 0) {
            displayCalc.value = dataset;
        }
    }else{
        displayCalc.value += dataset;
    }
}
function clearDisplayCalc(){
    displayCalc.value = "0";
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
        displayCalc.style.cssText = "box-shadow: 1px 1px 1px rgba(91, 1, 0, 0.7),  -1px -1px 1px rgba(151, 46, 47, 0.6)";
        setTimeout(function () {
            displayCalc.style.cssText = "1px 1px 1px rgba(0, 0, 0, 0.5),  -1px -1px 1px rgba(256, 256, 256, 0.2)";
        },700)
        result = 0;

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
