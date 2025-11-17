    const operators = document.querySelectorAll('.operator');
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const resultInput = document.getElementById('result');
    const equalsBtn = document.getElementById('equals');
    let selectedOp = '+';

    operators.forEach(op => {
      op.addEventListener('click', () => {
        operators.forEach(o => o.classList.remove('selected'));
        op.classList.add('selected');
        selectedOp = op.getAttribute('data-op');
      });
    });

    equalsBtn.addEventListener('click', () => {
      const a = parseFloat(num1Input.value) || 0;
      const b = parseFloat(num2Input.value) || 0;
      let result;

      switch (selectedOp) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': 
          result = b !== 0 ? a / b : '∞'; 
          break;
      }

      if (typeof result === 'number') {
        result = result % 1 === 0 ? result : parseFloat(result.toFixed(4));
      }

      resultInput.value = result;
    });

    [num1Input, num2Input].forEach(input => {
      input.addEventListener('input', () => {
        resultInput.value = '';
      });
    });