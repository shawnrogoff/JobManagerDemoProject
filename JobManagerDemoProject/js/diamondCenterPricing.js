function resetDiamondCenterPricingForm(){
    document.getElementById("diamondCenterPriceCalculatorForm").reset();
    document.getElementById("diamondPriceResultsTextAlert").classList.add("invisible");
}

function populateDiamondWeightInput(){
    document.getElementById("diamondCenterWeightSliderValue").value = diamondCenterWeightSlider.value;
}

function getDiamondPricePerCarat(){
    var centerWeight = document.getElementById("diamondCenterWeightSliderValue").value;
    var shape = document.getElementById("centerShapeSelection").value;
    var clarity = document.getElementById("centerClaritySelection").value;
    var color = document.getElementById("centerColorSelection").value;

    // Get weight range for database check
    if (centerWeight >= 0.50 && centerWeight < 0.70){
        var centerWeightRange = 0.50;
    } else if (centerWeight >= 0.70 && centerWeight < 0.90){
        var centerWeightRange = 0.70;
    } else if (centerWeight >= 0.90 && centerWeight < 1.00){
        var centerWeightRange = 0.90;
    } else if (centerWeight >= 1.00 && centerWeight < 1.5){
        var centerWeightRange = 1.00;
    } else if (centerWeight >= 1.50 && centerWeight < 2.00){
        var centerWeightRange = 1.50;
    } else if (centerWeight >= 2.00 && centerWeight < 3){
        var centerWeightRange = 2.00;
    }

    var baseURL = "https://66.158.188.108:5001/DiamondCenters/GetCenterPricePerCarat";
    var queryString = "?shape=" + shape + "&clarity=" + clarity + "&color=" + color + "&weight=" + centerWeightRange;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = doAfterGetDiamondPricePerCarat;

    xhr.open("GET", baseURL + queryString, true);
    xhr.send();

    function doAfterGetDiamondPricePerCarat() {

        if (xhr.readyState === 4) { //done
            if (xhr.status === 200) { //ok
                //alert(xhr.responseText);

                var response = JSON.parse(xhr.responseText);

                if (response.result === "success") {
                    var diamondCenters = response.diamondCenters;
                    calculateDiamondPriceRange(diamondCenters);
                } else {
                    alert("API Error: " + response.message);
                }

            } else {
                alert("Server Error: " + xhr.statusText);
            }
        }
    }
    
}

function calculateDiamondPriceRange(diamondCenters){
    var diamondCenter = diamondCenters[0];
    var pricePerCarat = diamondCenter.pricePerCarat;
    // Calculate for genuine stones
    var genuinePriceRangeMinimum = Math.round(parseFloat(pricePerCarat * .9));
    var genuinePriceRangeMaximum = Math.round(parseFloat(pricePerCarat * 1.1));
    var genuinePriceRangeString = `Mined diamond expected price between $${genuinePriceRangeMinimum} and $${genuinePriceRangeMaximum}`;
    document.getElementById("genuineDiamondPriceResults").innerHTML = genuinePriceRangeString;
    // Calculate for lab grown stones
    var labPriceRangeMinimum = Math.round(parseFloat(pricePerCarat * .3));
    var labPriceRangeMaximum = Math.round(parseFloat(pricePerCarat * .4));
    var labPriceRangeString = `Lab grown diamond expected price between $${labPriceRangeMinimum} and $${labPriceRangeMaximum}`;
    document.getElementById("labDiamondPriceResults").innerHTML = labPriceRangeString;

    document.getElementById("diamondPriceResultsTextAlert").classList.remove("invisible");
}

// === Event Listeners For Section === //
document.getElementById("diamondCenterWeightSlider").addEventListener("change", populateDiamondWeightInput);
document.getElementById("resetDiamondPriceFormBtn").addEventListener("click", resetDiamondCenterPricingForm);
document.getElementById("getDiamondPriceRangeBtn").addEventListener("click", getDiamondPricePerCarat);