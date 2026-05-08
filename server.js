const API_URL = "http://127.0.0.1:8000/predict";
const button = document.getElementById("predictBtn");
const resultBox = document.getElementById("result");
const inputField = document.getElementById("experience");

button.addEventListener("click", async function() {
    const experience = inputField.value;

    // 1. Reset & Validation
    if (experience === "") {
        resultBox.innerHTML = "⚠️ Please Enter Experience";
        resultBox.style.color = "#f87171"; // Red
        resultBox.style.transform = "scale(1.05)";
        return;
    }

    // 2. Loading State
    resultBox.innerHTML = "🔍 Analyzing data...";
    resultBox.style.color = "#fbbf24"; // Orange/Yellow
    resultBox.style.transform = "scale(1)";
    button.disabled = true;
    button.innerText = "Processing...";

    try {
        // 3. API CALL
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ YearsExperience: Number(experience) })
        });

        const data = await response.json();

        // 4. Show Result
        if (data.error) {
            resultBox.innerHTML = "❌ " + data.error;
            resultBox.style.color = "#f87171";
        } else {
            // Currency format: 50000 -> 50,000
            const formattedSalary = new Intl.NumberFormat('en-IN').format(data.Salary);
            
            resultBox.innerHTML = `
                <div style="text-align:center">
                    <small style="display:block; opacity:0.7">Estimated Salary</small>
                    <span style="font-size: 1.5rem; font-weight: bold">₹ ${formattedSalary}</span>
                </div>
            `;
            resultBox.style.color = "#4ade80"; // Green
            resultBox.style.transform = "scale(1.1)";
        }

    } catch (error) {
        resultBox.innerHTML = "🔌 API Connection Error";
        resultBox.style.color = "#f87171";
    } finally {
        button.disabled = false;
        button.innerText = "Predict Salary";
    }
});