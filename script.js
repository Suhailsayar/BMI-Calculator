let currentUnit = "metric";

function setUnit(unit) {
  currentUnit = unit;
  document
    .getElementById("btn-m")
    .classList.toggle("active", unit === "metric");
  document
    .getElementById("btn-i")
    .classList.toggle("active", unit === "imperial");

  // Update labels
  document.getElementById("u-w").innerText = unit === "metric" ? "kg" : "lbs";
  document.getElementById("u-h").innerText = unit === "metric" ? "cm" : "in";
}

function calculateBMI() {
  // 1. Grab the inputs using the correct IDs from your HTML
  const weight = parseFloat(document.getElementById("inp-w").value);
  const height = parseFloat(document.getElementById("inp-h").value);
  const errMsg = document.getElementById("err-msg");

  // 2. Validate inputs
  if (isNaN(weight) || isNaN(height) || height <= 0 || weight <= 0) {
    errMsg.innerText = "Please enter valid positive numbers.";
    return;
  }
  errMsg.innerText = ""; // Clear errors

  // 3. Calculation
  let bmi;
  if (currentUnit === "metric") {
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
  } else {
    // Imperial formula: (lbs / in^2) * 703
    bmi = (weight / (height * height)) * 703;
  }

  const finalBmi = bmi.toFixed(1);

  // 4. Determine Category & Needle Position (0% to 100%)
  let category = "";
  let percent = 0;

  if (bmi < 18.5) {
    category = "Underweight";
    percent = (bmi / 18.5) * 25; // First 25% of scale
  } else if (bmi < 25) {
    category = "Normal";
    percent = 25 + ((bmi - 18.5) / 6.5) * 25;
  } else if (bmi < 30) {
    category = "Overweight";
    percent = 50 + ((bmi - 25) / 5) * 25;
  } else {
    category = "Obese";
    percent = 75 + (Math.min(bmi - 30, 10) / 10) * 25;
  }

  // 5. Display Results in your HTML elements
  document.getElementById("res").style.display = "block"; // Show result section
  document.getElementById("bmi-num").innerText = finalBmi;
  document.getElementById("s-bmi").innerText = finalBmi;
  document.getElementById("cat-pill").innerText = category;

  // Update the stats boxes
  document.getElementById("s-w").innerText =
    weight + (currentUnit === "metric" ? " kg" : " lbs");
  document.getElementById("s-h").innerText =
    height + (currentUnit === "metric" ? " cm" : " in");

  // Move the needle!
  document.getElementById("ndl").style.left =
    Math.max(0, Math.min(percent, 100)) + "%";
}
