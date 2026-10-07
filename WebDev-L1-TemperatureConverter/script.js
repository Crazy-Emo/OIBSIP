// Temperature converter: Celsius, Fahrenheit, Kelvin

const form = document.getElementById("converter");
const tempInput = document.getElementById("temp");
const unitSelect = document.getElementById("unit");
const errorBox = document.getElementById("error");
const emptyMsg = document.getElementById("empty");
const output = document.getElementById("output");
const fill = document.getElementById("fill");

const outputs = {
  C: document.getElementById("out-c"),
  F: document.getElementById("out-f"),
  K: document.getElementById("out-k"),
};

const rows = document.querySelectorAll(".output__row");

// Accepts values like 36.6, -5, +12, .5, 10.
const NUMBER_PATTERN = /^[+-]?(\d+(\.\d*)?|\.\d+)$/;

const ABSOLUTE_ZERO_C = -273.15;

// Convert any unit to Celsius first, then out to the others.
function toCelsius(value, unit) {
  switch (unit) {
    case "F":
      return (value - 32) * (5 / 9);
    case "K":
      return value - 273.15;
    default:
      return value;
  }
}

function fromCelsius(celsius, unit) {
  switch (unit) {
    case "F":
      return celsius * (9 / 5) + 32;
    case "K":
      return celsius + 273.15;
    default:
      return celsius;
  }
}

function format(value) {
  // Round to 2 decimals and drop trailing zeros. Avoid showing "-0".
  const rounded = Math.round(value * 100) / 100;
  return (Object.is(rounded, -0) ? 0 : rounded).toString();
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  tempInput.setAttribute("aria-invalid", "true");
  output.hidden = true;
  emptyMsg.hidden = false;
  emptyMsg.textContent = "Fix the input above to see results.";
  fill.style.height = "0%";
}

function clearError() {
  errorBox.hidden = true;
  errorBox.textContent = "";
  tempInput.removeAttribute("aria-invalid");
}

// Map -50 to 150 Celsius onto the gauge, and shift colour from blue to red.
function updateGauge(celsius) {
  const min = -50;
  const max = 150;
  const clamped = Math.min(Math.max(celsius, min), max);
  const percent = ((clamped - min) / (max - min)) * 100;
  const t = percent / 100;
  const cold = [59, 130, 246];
  const hot = [239, 68, 68];
  const mix = cold.map(function (c, i) {
    return Math.round(c + (hot[i] - c) * t);
  });
  fill.style.height = Math.max(percent, 4) + "%";
  fill.style.background = "rgb(" + mix.join(",") + ")";
}

function showResults(celsius, enteredUnit) {
  outputs.C.textContent = format(fromCelsius(celsius, "C")) + " °C";
  outputs.F.textContent = format(fromCelsius(celsius, "F")) + " °F";
  outputs.K.textContent = format(fromCelsius(celsius, "K")) + " K";

  rows.forEach(function (row) {
    row.classList.toggle("is-entered", row.dataset.unit === enteredUnit);
  });

  emptyMsg.hidden = true;
  output.hidden = false;
  updateGauge(celsius);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearError();

  const raw = tempInput.value.trim();
  const unit = unitSelect.value;

  if (raw === "") {
    showError("Enter a temperature to convert.");
    return;
  }

  if (!NUMBER_PATTERN.test(raw)) {
    showError("Numbers only, please. Try something like 36.6 or -5.");
    return;
  }

  const value = parseFloat(raw);
  const celsius = toCelsius(value, unit);

  // Small tolerance so 0 K and -459.67 F are accepted despite rounding.
  if (celsius < ABSOLUTE_ZERO_C - 1e-9) {
    showError(
      "That is below absolute zero, the coldest possible temperature " +
        "(-273.15 °C, -459.67 °F, or 0 K). Enter a higher value."
    );
    return;
  }

  showResults(celsius, unit);
});

// Clear the error as soon as the person starts fixing the input.
tempInput.addEventListener("input", clearError);
