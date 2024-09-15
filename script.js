const typeInputs = document.querySelectorAll(".type-input");

const submitCal = document.querySelector(".submit-cal");

const typeContainers = document.querySelectorAll(".type-container");

const amountContainer = document.querySelector(".amount-container");
const rateContainer = document.querySelector(".rate-container");
const termContainer = document.querySelector(".term-container");

const amountInput = document.querySelector(".amount-input");
const rateInput = document.querySelector(".rate-input");
const termInput = document.querySelector(".term-input");

const nInput = document.querySelectorAll(".n-input");
const nContainer = document.querySelectorAll(".n-container");

const clearBtn = document.querySelector(".clear-btn");

const resultsDiv = document.querySelector(".results-total");
const resultsEmptyDiv = document.querySelector(".results-empty");

const resultsError = document.querySelector(".results-error");

const errorText = document.querySelector(".error-text");
submitCal.addEventListener("click", () => {
  let inputsCheck = chooseMortgageType();
  let amountValueNew = amountInput.value.replace(/\./g, "");
  if (
    inputsCheck &&
    amountInput.value.trim() != "" &&
    termInput.value.trim() != "" &&
    rateInput.value.trim() != ""
  ) {
    calResult(
      Number(amountValueNew),
      Number(termInput.value),
      Number(rateInput.value),
      inputsCheck.value
    );
    resultsEmptyDiv.classList.remove("right-c-active");
    resultsDiv.classList.add("right-c-active");
  } else {
    errorText.innerHTML = "Please fill in all required fields";

    resultsError.classList.add("right-c-active");

    let intervalError = setInterval(intervalErrorFunc, 1000);

    function intervalErrorFunc() {
      resultsError.classList.remove("right-c-active");

      clearInterval(intervalError);
    }

    if (!inputsCheck) {
      typeInputs.forEach((input) => {
        let container = input.parentElement;
        let span = input.nextElementSibling;
        let intervalType = setInterval(intervalTypeRemove, 1000);

        function intervalTypeRemove() {
          container.classList.remove("type-error-active");
          span.classList.remove("type-error-active-span");
          document.querySelector("main").style.pointerEvents = "all";
          clearInterval(intervalType);
        }

        document.querySelector("main").style.pointerEvents = "none";
        container.classList.add("type-error-active");
        span.classList.add("type-error-active-span");
      });
    }

    nInput.forEach((input) => {
      let container = input.parentElement;
      let span = input.nextElementSibling;
      let header = input.parentElement.previousElementSibling;
      let interval = setInterval(intervalRemove, 1000);

      function intervalRemove() {
        container.classList.remove("error-active");
        span.classList.remove("error-active-span");
        document.querySelector("main").style.pointerEvents = "all";
        clearInterval(interval);
      }

      if (input.value.trim() == "") {
        container.classList.add("error-active");
        span.classList.add("error-active-span");
        document.querySelector("main").style.pointerEvents = "none";
      }
    });
  }
});

function chooseMortgageType() {
  let a;
  typeInputs.forEach((input) => {
    if (input.checked) {
      a = input;
    }
  });
  return a;
}
selectActiveEffect();
inputIsNumberControl();

function selectActiveEffect() {
  typeContainers.forEach((typeContainer) => {
    typeContainer.addEventListener("click", (e) => {
      let input = e.target.children[0];

      input.checked = true;

      document
        .querySelectorAll(".type-input.input-check-active")
        .forEach((activeContainer) => {
          activeContainer.classList.remove("input-check-active");
        });
      input.classList.add("input-check-active");

      document
        .querySelectorAll(".type-container.type-active")
        .forEach((activeContainer) => {
          activeContainer.classList.remove("type-active");
        });

      typeContainer.classList.add("type-active");
    });
  });

  nInput.forEach((input) => {
    input.addEventListener("focus", function (e) {
      let container = e.target.parentElement;
      let span = e.target.nextElementSibling;
      document
        .querySelectorAll(".n-container.type-active")
        .forEach((activeContainer) => {
          activeContainer.classList.remove("type-active");
        });

      document
        .querySelectorAll(".n-container span.type-active-span")
        .forEach((activeContainer) => {
          activeContainer.classList.remove("type-active-span");
        });

      container.classList.add("type-active");
      span.classList.add("type-active-span");
    });

    input.addEventListener("blur", function (e) {
      let container = e.target.parentElement;
      let span = e.target.nextElementSibling;
      container.classList.remove("type-active");
      span.classList.remove("type-active-span");
    });
  });
}
function inputIsNumberControl() {
  nInput.forEach((input) => {
    input.addEventListener("input", function (e) {
      let cleanInput = input.value.trim().replace(/\./g, "");

      if (input.classList.contains("amount-input")) {
        if (input.value.includes(".") && cleanInput.length <= 9) {
          input.value = input.value.replace(".", ""); // Noktayı kaldır
        }

        if (cleanInput.length == 4) {
          input.value = input.value.replace(".", "");
          input.value = input.value.slice(0, 1) + "." + input.value.slice(1); //
        }
        if (cleanInput.length == 5) {
          input.value = input.value.replace(".", "");
          input.value = input.value.slice(0, 2) + "." + input.value.slice(2); //
        }
        if (cleanInput.length == 6) {
          input.value = input.value.replace(".", "");
          input.value = input.value.slice(0, 3) + "." + input.value.slice(3); //
        }
        if (cleanInput.length == 7) {
          input.value = input.value.replace(".", "");
          input.value = input.value.slice(0, 1) + "." + input.value.slice(1); //
          input.value = input.value.slice(0, 5) + "." + input.value.slice(5); //
        }
        if (cleanInput.length == 8) {
          input.value = input.value.replace(".", "");
          input.value = input.value.slice(0, 2) + "." + input.value.slice(2); //
          input.value = input.value.slice(0, 6) + "." + input.value.slice(6); //
        }
        if (cleanInput.length == 9) {
          input.value = input.value.replace(".", "");
          input.value = input.value.slice(0, 3) + "." + input.value.slice(3); //
          input.value = input.value.slice(0, 7) + "." + input.value.slice(7); //
        }
      }

      let inputR = e.target.value.trim().replace(/[^0-9.]/g, "");
      input.value = inputR;
    });
  });
}

clearBtn.addEventListener("click", () => {
  resultsEmptyDiv.classList.add("right-c-active");
  resultsDiv.classList.remove("right-c-active");
  nInput.forEach((input) => {
    input.value = "";
  });

  typeInputs.forEach((input) => {
    input.checked = false;
    input.classList.remove("input-check-active");
  });

  typeContainers.forEach((container) => {
    container.classList.remove("type-active");
  });
});

function calResult(amount, term, rate, type) {
  let monltyRep = document.querySelector(".montly-results");
  let totalRep = document.querySelector(".total-repay-results");
  let p = amount;
  let r = rate / 100 / 12;
  let n = term * 12;
  let m;
  let t;
  if (type.toLowerCase() == "repayment") {
    m = (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    monltyRep.textContent = "€" + m.toFixed(2);

    t = m * n;

    totalRep.textContent = "€" + t.toFixed(2);
  } else {
    m = p * r;
    monltyRep.textContent = "€" + m.toFixed(2);

    t = m * n + p;
    totalRep.textContent = "€" + t.toFixed(2);
  }
}
