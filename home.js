let runningTotal = 0;
let bufer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = bufer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            bufer = '0'
            runningTotal = 0
            break;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(bufer));
            previousOperator = null;
            bufer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if(bufer.length ===1){
                bufer = '0';
            }else{ 
                bufer = bufer.substring(0 ,bufer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol)
            break;
    }
}

function handleMath(symbol){
    if(bufer === '0'){
        return
    }

    const intBuffer = parseInt(bufer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    bufer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(bufer === "0"){
        bufer = numberString;
    }else{
        bufer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();