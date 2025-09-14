window.onload = () => {
  const inputField = document.getElementById("res");

  const insert = (val) => {
    inputField.value += val;
  };

  const clearInput = () => {
    inputField.value = "";
  };

  const calculate = () => {
    const expr = inputField.value;
    if (!expr) return;

    const operator = expr.match(/[+\-*/]/)?.[0];
    if (!operator) return;

    const [num1, num2] = expr.split(/[+\-*/]/);
    if (!num1 || !num2) return;

    const dec1 = parseInt(num1, 2);
    const dec2 = parseInt(num2, 2);
    let result;

    switch (operator) {
      case "+":
        result = dec1 + dec2;
        break;
      case "-":
        result = dec1 - dec2;
        break;
      case "*":
        result = dec1 * dec2;
        break;
      case "/":
        if (dec2 === 0) {
          inputField.value = "Error";
          return;
        }
        result = Math.floor(dec1 / dec2);
        break;
      default:
        return;
    }

    inputField.value = result.toString(2);
  };

  // Attach button clicks
  document.querySelectorAll(".button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.value;
      if (val === "C") clearInput();
      else if (val === "=") calculate();
      else insert(val);
    });
  });

  // Keyboard support
  document.addEventListener("keydown", (e) => {
    const keyMap = { 0: "0", 1: "1", "+": "+", "-": "-", "*": "*", "/": "/" };
    if (keyMap[e.key]) insert(keyMap[e.key]);
    else if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    } else if (e.key === "c" || e.key === "C" || e.key === "Backspace")
      clearInput();
  });
};
