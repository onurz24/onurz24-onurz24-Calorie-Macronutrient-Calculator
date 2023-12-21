"use strict";
/* input & output fields */
const Age_Input = document.querySelector('#Age_Input');
const Gender_Input = document.querySelector('#Gender_Input');
const Weight_Input = document.querySelector('#Weight_Input');
const Height_Input = document.querySelector('#Height_Input');
const RestHours_Input = document.querySelector('#RestHours_Input');
const LightHours_Input = document.querySelector('#LightHours_Input');
const VeryLightHours_Input = document.querySelector('#VeryLightHours_Input');
const NormalHours_Input = document.querySelector('#NormalHours_Input');
const HeavyHours_Input = document.querySelector('#HeavyHours_Input');
const VeryHeavyHours_Input = document.querySelector('#VeryHeavyHours_Input');
const TotalHours_Output = document.querySelector('#TotalHours_Output');
const Base_Output = document.querySelector('#BaseOutput');
const Total_Output = document.querySelector('#TotalOutput');
const CalculateCalories_Button = document.querySelector('.CalculateCaloriesBtn');
const Makro_Output = document.querySelector('#Makro_Output');
const CalculateMakrosBtn = document.querySelector('.CalculateMakrosBtn');
const Total_Input = document.querySelector('#Total_Input');
const NutritionType_Input = document.querySelector('#NutritionType_Input');
/* variables */
let Age;
let Weight;
let Height;
let Base;
let Total;
let RestHours;
let VeryLightHours;
let LightHours;
let NormalHours;
let HeavyHours;
let VeryHeavyHours;
let TotalHours;
/* calculate total calorie consumption with movement */
const CalculateTotalCalories = () => {
    /* convert input to number  */
    if (isNaN(parseInt(RestHours_Input.value))) {
        RestHours = 0;
        RestHours_Input.value = RestHours.toString();
    }
    else {
        RestHours = parseInt(RestHours_Input.value);
    }
    if (isNaN(parseInt(VeryLightHours_Input.value))) {
        VeryLightHours = 0;
        VeryLightHours_Input.value = VeryLightHours.toString();
    }
    else {
        VeryLightHours = parseInt(VeryLightHours_Input.value);
    }
    if (isNaN(parseInt(LightHours_Input.value))) {
        LightHours = 0;
        LightHours_Input.value = LightHours.toString();
    }
    else {
        LightHours = parseInt(LightHours_Input.value);
    }
    if (isNaN(parseInt(NormalHours_Input.value))) {
        NormalHours = 0;
        NormalHours_Input.value = NormalHours.toString();
    }
    else {
        NormalHours = parseInt(NormalHours_Input.value);
    }
    if (isNaN(parseInt(HeavyHours_Input.value))) {
        HeavyHours = 0;
        HeavyHours_Input.value = HeavyHours.toString();
    }
    else {
        HeavyHours = parseInt(HeavyHours_Input.value);
    }
    if (isNaN(parseInt(VeryHeavyHours_Input.value))) {
        VeryHeavyHours = 0;
        VeryHeavyHours_Input.value = VeryHeavyHours.toString();
    }
    else {
        VeryHeavyHours = parseInt(VeryHeavyHours_Input.value);
    }
    TotalHours = RestHours + VeryLightHours + LightHours + NormalHours + HeavyHours + VeryHeavyHours;
    Base_Output.value = Base.toFixed(2); /* output base consumption */
    if (TotalHours === 24) {
        /* calculate total calorie consumption with base and output both */
        switch (Gender_Input.value) {
            case "male":
                Total =
                    Base / 24 *
                        (RestHours * 1 + (VeryLightHours * 1.2) + (LightHours * 1.3) +
                            (NormalHours * 1.5) + (HeavyHours * 1.7) +
                            (VeryHeavyHours * 2));
                break;
            case "female":
                Total =
                    Base / 24 *
                        (RestHours * 0.95 + (VeryLightHours * 1.1) + (LightHours * 1.2) +
                            (NormalHours * 1.4) + (HeavyHours * 1.6) +
                            (VeryHeavyHours * 1.8));
                break;
            default:
                break;
        }
        TotalHours_Output.value = TotalHours.toString();
        Total_Output.value = Total.toFixed(2).toString();
        Total_Input.value = Total.toFixed(2).toString();
    }
    else if (isNaN(TotalHours) || TotalHours === undefined || TotalHours === null) {
        // console.log(TotalHours,typeof TotalHours);
    }
    else {
        /* error message if not not 24h */
        alert(`Es müssen 24 Stunden sein. Jetzt sind es ${TotalHours} Stunden.`);
        TotalHours_Output.value = TotalHours.toString();
        Total_Output.value = "";
    }
};
CalculateCalories_Button.addEventListener('click', () => {
    /* update variable value's for calculation */
    Age = parseFloat(Age_Input.value);
    Weight = parseFloat(Weight_Input.value);
    Height = parseFloat(Height_Input.value);
    /* check gender and calculate different base */
    Gender_Input.value === "male" ?
        Base =
            66 + (13.7 * Weight) + (5 * Height) - (6.8 * Age) /* male */
        :
            Base =
                655 + (9.6 * Weight) + (1.7 * Height) - (4.7 * Age); /* female */
    isNaN(Base) ? alert("Eingabe ungültig!") : CalculateTotalCalories();
});
// Funktion zur Berechnung des Makronährstoffbedarfs
function calculateMacronutrients(totalCalories, nutritionType) {
    let proteinPercentage, carbPercentage, fatPercentage;
    // Je nach Ernährungsform die prozentualen Verteilungen setzen
    switch (nutritionType) {
        case "Standard":
            proteinPercentage = 0.25;
            carbPercentage = 0.5;
            fatPercentage = 0.25;
            break;
        case "Low Carb":
            proteinPercentage = 0.25;
            carbPercentage = 0.3;
            fatPercentage = 0.45;
            break;
        case "Low Fat":
            proteinPercentage = 0.25;
            carbPercentage = 0.5;
            fatPercentage = 0.25;
            break;
        default:
            console.log("Ungültige Ernährungsform");
            return;
    }
    // Berechnung der Kalorien für jede Makronährstoffart
    const proteinCalories = totalCalories * proteinPercentage;
    const carbCalories = totalCalories * carbPercentage;
    const fatCalories = totalCalories * fatPercentage;
    // Kalorien pro Gramm für jede Makronährstoffart
    const caloriesPerGramProtein = 4.1;
    const caloriesPerGramCarb = 4.1;
    const caloriesPerGramFat = 9.3;
    // Umrechnung von Kalorien in Gramm für jeden Makronährstoff
    const proteinGrams = (proteinCalories / caloriesPerGramProtein).toFixed(2);
    const carbGrams = (carbCalories / caloriesPerGramCarb).toFixed(2);
    const fatGrams = (fatCalories / caloriesPerGramFat).toFixed(2);
    return [`Kohlenhydrate:  ${carbGrams} g`, ` Protein:  ${proteinGrams} g `, ` Fett: ${fatGrams} g`];
}
CalculateMakrosBtn.addEventListener("click", () => {
    Total = Number(Total_Input.value);
    console.log(Total);
    if (!isNaN(Total)) {
        const result = calculateMacronutrients(Total, NutritionType_Input.value);
        Makro_Output.classList.add("Makro_Output_Show");
        Makro_Output.innerHTML = "";
        result?.map(result => {
            Makro_Output.innerHTML += `<div class="Makro_Result">${result}</div>`;
        });
        // Total_Input.value = result;
    }
    else {
        alert("Bitte geben Sie eine gültige Eingabe ein!");
    }
});
Total_Input.addEventListener("input", () => {
    CalculateMakrosBtn.click();
});
NutritionType_Input.addEventListener("change", () => {
    if (!isNaN(parseInt(Total_Input.value))) {
        CalculateMakrosBtn.click();
    }
});
