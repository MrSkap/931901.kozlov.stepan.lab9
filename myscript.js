const panel = document.querySelector(".panel");
const buttons = document.querySelectorAll(".button");

let firstNum = "";
let secondNum = "";
let operator = "";
let checkedButton;

for (let i = 0; i < buttons.length; i++ ){
	buttons[i].addEventListener("click", function(e){
		const button = e.target;
		const buttonValue = button.textContent;
		
		if(checkedButton != null){
			checkedButton.style.borderColor="#a3a3a3";
		} 
		checkedButton = button;
		button.style.borderColor="#a6c7ff";
		
		if (buttonValue === "C"){
			firstNum = "";
			secondNum = "";
			operator = "";
			
		} else if (button.classList.contains("num")){
			if (operator.length > 0){
				secondNum = secondNum + buttonValue;
			} else{
				firstNum = firstNum + buttonValue;
			}
			
		} else if (button.classList.contains("operator")){
			if (firstNum.length === 0 || secondNum.length !== 0){
				return;
			}
			operator = buttonValue;
			
		} else if (buttonValue === "<-"){
			if (secondNum != ""){
				secondNum = secondNum.slice(0, secondNum.length - 1);
			} else if (operator != ""){
				operator = operator.slice(0, operator.length - 1);
			} else if (firstNum != ""){
				firstNum = firstNum.slice(0, firstNum.length - 1);
			}
			
		} else if (buttonValue === "="){
			if (secondNum.length === 0){
				return;
			}
			let result;
			firstNum = +firstNum;
			secondNum = +secondNum;
			if (operator === "/"){
				result = firstNum / secondNum;
			} else if (operator === "*"){
				result = firstNum * secondNum;
			} else if (operator === "-") {
				result = firstNum - secondNum;
			} else if (operator === "+"){
				result = firstNum + secondNum;
			}

			firstNum = result;
			secondNum = "";
			operator = "";
			panel.textContent = result;

		} else if (buttonValue === "."){
			let num = (operator.length > 0) ? secondNum : firstNum;
			
			if (num.length === 0 || num.includes(".")){
				return;
			}
			
			if (operator.length > 0){
				secondNum = secondNum + buttonValue;
			} else{
				firstNum = firstNum + buttonValue;
			}
		}
		panel.innerHTML = firstNum + operator + secondNum;
		
		if (panel.textContent.length == 0){
			panel.textContent = "0";
		}
	});
}

