const operators = {
  '+': (a, b) => a.plus(b),
  '-': (a, b) => a.minus(b),
  '*': (a, b) => a.times(b),
  '/': (a, b) => a.div(b),
};

class Calculator {
  constructor() {
    this.displayElement = document.querySelector('.display');
    this.display = '0';
    this.firstOperand = null;
    this.operator = null;
    this.secondOperand = null;
    this.isDecimalUsed = false;
  }

  set firstOperand(value) {
    if (this.operator) return;

    this._firstOperand = value;
    this.display = value;
  }

  get firstOperand() {
    return this._firstOperand;
  }

  set operator(value) {
    if (!this.firstOperand) return;

    this.isDecimalUsed = false;
    this._operator = value;
  }

  get operator() {
    return this._operator;
  }

  set secondOperand(value) {
    if (!this.firstOperand || !this.operator) return;

    this._secondOperand = value;
    this.display = value;
  }

  get secondOperand() {
    return this._secondOperand;
  }

  set display(value) {
    this._display = value;
    this.displayElement.textContent = value;
  }

  get display() {
    return this._display;
  }

  clear() {
    this.display = '0';
    this.secondOperand = null;
    this.operator = null;
    this.firstOperand = null;
    this.isDecimalUsed = false;
  }

  back() {
    if (this.display.length === 1) {
      if (!this.operator) {
        // setting the first operand
        this.firstOperand = null;
      } else {
        this.secondOperand = null;
      }
      return this.display = '0';
    }

    if (!this.operator) {
      // setting the first operand
      this.firstOperand = this.firstOperand.slice(0, -1);
      this.display = this.firstOperand;
      return;
    }

    // setting the second operand
    this.secondOperand = this.secondOperand.slice(0, -1);
    this.display = this.secondOperand;
  }

  signSwitch() {
    if (!this.operator) {
      if (!this.firstOperand) return;

      if (this.firstOperand.startsWith('-')) {
        this.firstOperand = this.firstOperand.slice(1);
        this.display = this.firstOperand;
        return;
      }
      this.firstOperand = '-' + this.firstOperand;
      this.display = this.firstOperand;
      return;
    }

    if (!this.secondOperand) return;

    if (this.secondOperand.startsWith('-')) {
      this.secondOperand = this.secondOperand.slice(1);
      this.display = this.secondOperand;
      return;
    }
    this.secondOperand = '-' + this.secondOperand;
    this.display = this.secondOperand;
    return;
  }

  equals() {
    if (!this.firstOperand || !this.operator || !this.secondOperand) return;

    const first = new Big(this.firstOperand);
    const second = new Big(this.secondOperand);

    const result = operators[this.operator](first, second).toString();
    this.clear();
    this.display = result;
  }
}

const cal = new Calculator();

let operands = document.getElementsByClassName("num-btn");
for (let i=0; i<operands.length; i++) {
  operands[i].addEventListener("click", (event) => {
    let digit = event.target.textContent;
    if (cal.operator) {
      if (!cal.secondOperand) {cal.secondOperand = "";}
      cal.secondOperand = cal.secondOperand + digit;
    } else {
      if (!cal.firstOperand) {cal.firstOperand = "";}
      cal.firstOperand = cal.firstOperand + digit;
    }
  });
}

let funcs = document.getElementsByClassName("func-btn");
for (let i=0; i<funcs.length; i++) {
  funcs[i].addEventListener("click", (event) => {
    const ftype = event.target.textContent;
    if (ftype === "AC") {
      cal.clear();
    } else if (ftype === "Back") {
      cal.back();
    } else {
      cal.signSwitch();
    }
  });
}

let operator_buttons = document.getElementsByClassName("operator-btn");
for (let i=0; i<operator_buttons.length; i++) {
  operator_buttons[i].addEventListener("click", (event) => {
    const otype = event.target.textContent;
    if (otype === "=") {
      cal.equals();
    } else {
      cal.operator = otype;
    }
  });
}