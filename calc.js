/*** Calculator implementation ***/

// Init once the page has loaded
window.onload = () => {
  "use strict";

  // State
  let state = {
    numStr: "",
    fn: undefined,
    isResult: false
  };

  // DOM update fn
  var updateDOM = (displayStr) => document.getElementById("display").innerHTML = displayStr;

  var isInMiddleOfOperation = () => /[-\+/\*]/.test(state.numStr);

  // Digit Button Handler
  var pressDigit = (digitStr) => {
    if (state.isResult || isInMiddleOfOperation()) {
      state.numStr = "";
      state.isResult = false;
    }
    state.numStr = state.numStr.concat(digitStr);
    updateDOM(state.numStr);
  }

  // ----- Bind Digit Button Handlers
  document.getElementById("1").onclick = () => pressDigit("1");
  document.getElementById("2").onclick = () => pressDigit("2");
  document.getElementById("3").onclick = () => pressDigit("3");
  document.getElementById("4").onclick = () => pressDigit("4");
  document.getElementById("5").onclick = () => pressDigit("5");
  document.getElementById("6").onclick = () => pressDigit("6");
  document.getElementById("7").onclick = () => pressDigit("7");
  document.getElementById("8").onclick = () => pressDigit("8");
  document.getElementById("9").onclick = () => pressDigit("9");
  document.getElementById("0").onclick = () => {
    if (state.numStr[0] !== "0") {
      pressDigit("0");
    }
  };

  // Decimal point Handler
  document.getElementById("decimal").onclick = () => {
    if (!state.numStr.includes(".")) {
      pressDigit(".");
    }
  };

  // ----- Bind Function Button Handlers
  document.getElementById("plus/equals").onclick = () => {
    if (!state.numStr || isInMiddleOfOperation()) {
      return;
    }
    else if (state.fn) {
      var calcSoFar = state.fn(parseFloat(state.numStr)).toString();
      state.fn = undefined;
      state.isResult = true;
      state.numStr = calcSoFar;
      updateDOM(calcSoFar);
    } else {
      var calcSoFar = state.numStr;
      state.fn = (arg) => parseFloat(calcSoFar) + arg;
      state.numStr = "+";
      updateDOM("+");
    }
  };

  document.getElementById("minus").onclick = () => {
    if (!state.numStr || isInMiddleOfOperation()) {
      return;
    }
    else if (state.fn) {
      var calcSoFar = state.fn(parseFloat(state.numStr)).toString();
      state.fn = (arg) => parseFloat(calcSoFar) - arg;
      state.numStr = "-";
      updateDOM(calcSoFar);
    } else {
      var calcSoFar = state.numStr;
      state.fn = (arg) => parseFloat(calcSoFar) - arg;
      state.numStr = "-";
      updateDOM("-");
    }
  };

  document.getElementById("times").onclick = () => {
    if (!state.numStr || isInMiddleOfOperation()) {
      return;
    }
    else if (state.fn) {
      var calcSoFar = state.fn(parseFloat(state.numStr)).toString();
      state.fn = (arg) => parseFloat(calcSoFar) * arg;
      state.numStr = "*";
      updateDOM(calcSoFar);
    } else {
      var calcSoFar = state.numStr;
      state.fn = (arg) => parseFloat(calcSoFar) * arg;
      state.numStr = "*";
      updateDOM("*");
    }
  };

  document.getElementById("divide").onclick = () => {
    if (!state.numStr || isInMiddleOfOperation()) {
      return;
    }
    else if (state.fn) {
      var calcSoFar = state.fn(parseFloat(state.numStr)).toString();
      state.fn = (arg) => parseFloat(calcSoFar) / arg;
      state.numStr = "/";
      updateDOM(calcSoFar);
    } else {
      var calcSoFar = state.numStr;
      state.fn = (arg) => parseFloat(calcSoFar) / arg;
      state.numStr = "/";
      updateDOM("/");
    }
  };

  // ----- Clear Button Handler
  document.getElementById("clear").onclick = () => {
    // reset state
    state.numStr = "";
    state.fn = undefined;
    state.isResult = false;
    updateDOM("0");
  };
};

