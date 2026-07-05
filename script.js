// basic functioning of the Calculator
const historyList = document.getElementById("history");

const display = document.getElementById("display");

// function to add history value to  current
function append(value){
    display.value += value;
}

// function to clear history
function clearDisplay(){
    display.value = "";
}

// function to delete the last input
function deleteLast(){
    display.value = display.value.slice(0,-1);
}
// function to save the history
function saveHistory() {
    localStorage.setItem("history", historyList.innerHTML);
}

// function to square 
function square(){
    display.value = Number(display.value) ** 2;
}

//function to calculate 
function calculate(){
    try{
        //display.value = eval(display.value);
        const expression = display.value;
        const result = eval(expression);

        display.value = result;

        const li = document.createElement("li");

        li.textContent = `${expression} = ${result}`;

        historyList.prepend(li);
        saveHistory();
    }
    catch{
        display.value = "Error";
    }
}

// Connecting the Keyboard to my Calculator..
document.addEventListener("keydown", function (event) {
    const key = event.key;
    if ((key >= "0" && key <= "9") || "+-*/.%".includes(key)) {
        append(key);
    } 
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    } 
    else if (key === "Backspace") {
        deleteLast();
    } 
    else if (key === "Escape") {
        clearDisplay();
    }
});

// to load the history
window.onload = function () {

    const savedHistory = localStorage.getItem("history");

    if (savedHistory) {
        historyList.innerHTML = savedHistory;
    }

}

