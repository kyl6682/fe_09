// 모든 요소 선택하기

// const setScreen = document.querySelector(".setScreen");
// const closeBtn = document.querySelector(".close");
// const minimizeBtn = document.querySelector(".minimize");
// const maximizeBtn = document.querySelector(".maximize");

const display = document.querySelector(".display");

const buttons = document.querySelector(".buttons");
const button = document.querySelectorAll(".button");

const functionBtn = document.querySelectorAll(".function"); // AC, +/-, %
const operatorBtn = document.querySelectorAll(".operator"); // +, -, *, /
const numberBtn = document.querySelectorAll(".number");     // 1 ~ 9
const dotBtn = document.querySelector(".dot");              // .
const resultBtn = document.querySelector(".result");        // =

// 변수 세팅
let screenNum = '0';    // 문자열로 값 받기 (화면에 표시될 숫자)
let firstOperand = 0;   // 첫 번째 피연산자
let secondOperand = 0;  // 두 번째 피연산자
let operator = '';      // 연산자
let result = 0;         // 연산결과 (숫자)
let isOpt = false;      // 연산자 존재 여부

display.textContent = screenNum;

// 연산 함수
function calculate(x, y, opt) {
    switch(opt){
        case '+' : return x + y;
        case '-' : return x - y;
        case '*' : return x * y;
        case '/' : return x / y;
    }
}

// 각 버튼을 클릭했을 때 console에 각 버튼의 value가 나오도록 하기
button.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const value = btn.value;
        // 숫자를 디스플레이에 표시하기
        
        // AC 버튼을 클릭한 경우
        if (value === 'AC') {
            screenNum = '0';    // 문자열로 값 받기 (화면에 표시될 숫자)
            firstOperand = 0;   // 첫 번째 피연산자
            secondOperand = 0;  // 두 번째 피연산자
            operator = '';      // 연산자
            result = 0;         // 연산결과 (숫자)
            isOpt = false;      // 연산자 존재 여부
            display.textContent = screenNum;
            console.log('clear');   // 확인용
        } 
        // dot 버튼을 클릭한 경우
        else if (btn.classList.contains('dot')) {
            if (screenNum.includes('.')) {
                return
            } else {
                screenNum += '.';
                display.textContent = screenNum;
                console.log(screenNum); // 확인용
            }
        }  
        // operator 버튼을 클릭한 경우
        else if (btn.classList.contains('operator')) { 
            screenNum = '';
            // 이미 연산자가 존재하면 이전 연산 처리
            if (operator && isOpt) {
                // 계산한 결과가 첫 번째 피연산자가 됨
                firstOperand = calculate(firstOperand, secondOperand, operator);
                operator = value;
                display.textContent = firstOperand;
                console.log(`Calculated: ${firstOperand} + operator : ${operator}`);
            } 
            // 연산자가 존재하지 않는다면 연산자 할당
            else {
                operator = value;
                isOpt = true;
                screenNum = '';
                console.log(`operator: ${operator}`);

            }
        }
        // = 버튼을 클릭한 경우
        else if (btn.classList.contains('result')) { 
            if (operator && isOpt) {
                secondOperand = parseFloat(screenNum) || 0;
                result = calculate(firstOperand, secondOperand, operator);
                display.textContent = result;
                console.log(`result: ${result}`)
            }
        }
        // 숫자(1~9) 버튼을 클릭한 경우
        else {
            if (screenNum === '0') {
                screenNum = value;
            } else {
                screenNum += value;
            }
            display.textContent = screenNum;
            // 숫자 표시하고 저장
            if (!isOpt) {
                firstOperand = parseFloat(screenNum);
            } else {
                secondOperand = parseFloat(screenNum);
            }
        }
    })
})
