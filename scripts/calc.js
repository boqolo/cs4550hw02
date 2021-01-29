/*** Calculator implementation ***/

// Init once the page has loaded
window.onload = () => {
  "use strict";

  // State
  let GLOBAL_STATE = {
    display: "0",
    calcSoFar: 0,
    fn: undefined,
    isResult: false
  };

  // DOM update fn
  var updateDOM = (state) => 
    document.getElementById("display").innerHTML = state.display;

  // Global App State update fn
  var updateState = (newState) => {
    GLOBAL_STATE = newState;
  };

  var isInMiddleOfOperation = (state) => {
    return state.display.length === 1 && /[-\+/\*]/.test(state.display);
  };

  // Digit Button Handler
  var pressDigit = (state, digitStr) => {
    var newState = { ...state };
    if (state.display === "0" || state.isResult || isInMiddleOfOperation(state)) {
      newState.display = "";
      newState.isResult = false;
    }
    newState.display = newState.display.concat(digitStr);
    return newState;
  }

  // ----- Bind Digit Button Handlers
  document.getElementById("1").onclick = () => {
    updateState(pressDigit(GLOBAL_STATE, "1"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("2").onclick = () => {
    updateState(pressDigit(GLOBAL_STATE, "2"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("3").onclick = () => {
    updateState(pressDigit(GLOBAL_STATE, "3"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("4").onclick = () => {
    updateState(pressDigit(GLOBAL_STATE, "4"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("5").onclick = () => {
    updateState(pressDigit(GLOBAL_STATE, "5"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("6").onclick = () => {
    updateState(pressDigit(GLOBAL_STATE, "6"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("7").onclick = () => {
    updateState(pressDigit(GLOBAL_STATE, "7"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("8").onclick = () => {
    updateState(pressDigit(GLOBAL_STATE, "8"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("9").onclick = () => {
    updateState(pressDigit(GLOBAL_STATE, "9"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("0").onclick = () => {
    if (GLOBAL_STATE.display !== "0") {
      updateState(pressDigit(GLOBAL_STATE, "0"));
      updateDOM(GLOBAL_STATE);
    }
  };

  // Decimal point Handler
  document.getElementById("decimal").onclick = () => {
    if (!GLOBAL_STATE.display.includes(".")) {
      updateState(pressDigit(GLOBAL_STATE, "."));
      updateDOM(GLOBAL_STATE);
    }
  };

  // Funcion Button Scaffold
  var arithFn = (operatorStr, calcSoFar) => {
    if (operatorStr === "+/=") {
      return (arg) => calcSoFar + arg;
    } else if (operatorStr === "-") {
      return (arg) => calcSoFar - arg;
    } else if (operatorStr === "*") {
      return (arg) => calcSoFar * arg;
    } else {
      return (arg) => calcSoFar / arg;
    }
  };

  var isInvalidOperatorPress = (state) => {
    return isInMiddleOfOperation(state) || 
      state.display === "." || !state.display;
  };

  var pressOperator = (state, operatorStr) => {
    if (isInvalidOperatorPress(state)) {
      return state;
    } else if (state.fn) {
      var newState = { ...state };
      var calcSoFar = state.fn(parseFloat(state.display));
      newState.calcSoFar = calcSoFar;
      newState.display = calcSoFar.toString();
      newState.isResult = true;
      if (operatorStr === "+/=") {
        newState.fn = undefined;
      } else {
        newState.fn = arithFn(operatorStr, calcSoFar);
      }
      return newState;
    } else {
      var newState = { ...state };
      var calcSoFar = parseFloat(state.display);
      newState.calcSoFar = calcSoFar;
      newState.fn = arithFn(operatorStr, calcSoFar);
      newState.display = operatorStr === "+/=" ? "+" : operatorStr;
      return newState;
    }
  };

  // ----- Bind Arithmetic Operator Button Handlers
  document.getElementById("plus/equals").onclick = () => {
    updateState(pressOperator(GLOBAL_STATE, "+/="));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("minus").onclick = () => {
    updateState(pressOperator(GLOBAL_STATE, "-"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("times").onclick = () => {
    updateState(pressOperator(GLOBAL_STATE, "*"));
    updateDOM(GLOBAL_STATE);
  };

  document.getElementById("divide").onclick = () => {
    updateState(pressOperator(GLOBAL_STATE, "/"));
    updateDOM(GLOBAL_STATE);
  };

  // ----- Clear Button Handler
  document.getElementById("clear").onclick = () => {
    // reset state
    var newState = {
      display: "0",
      calcSoFar: 0,
      fn: undefined,
      isResult: false
    };
    updateState(newState);
    updateDOM(newState);
  };
};

