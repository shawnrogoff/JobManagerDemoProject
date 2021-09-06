function populateCreditPercentages(){
    document.getElementById("creditPercentage1Value").value = creditPercentage1Slider.value;
    document.getElementById("creditPercentage2Value").value = creditPercentage2Slider.value;
}

function resetGoldCreditForm(){
    document.getElementById("goldCreditMetalSelection1").value = "14k";
    document.getElementById("goldCreditMetalSelection2").value = "14k";
    document.getElementById("metalSpotPrice1").value = "";
    document.getElementById("metalSpotPrice2").value = "";
    document.getElementById("creditMetalWeight1").value = "";
    document.getElementById("creditMetalWeight2").value = "";
    document.getElementById("creditPercentage1Slider").value = 70;
    document.getElementById("creditPercentage2Slider").value = 70;
    document.getElementById("creditAmount1").innerHTML = "Credit Amount:";
    document.getElementById("creditAmount2").innerHTML = "Credit Amount:";

    document.getElementById("goldCreditResultsTextAlert").classList.add("invisible");

}

function calculateGoldCredit(){
    // Handle if user leaves these inputs blank
    if (document.getElementById("metalSpotPrice1").value == ""){
        var spotPrice1 = 0;
    } else {
        var spotPrice1 = parseFloat(document.getElementById("metalSpotPrice1").value);
    }

    if (document.getElementById("creditMetalWeight1").value == ""){
        var metalWeight1 = 0;
    } else {
        var metalWeight1 = parseFloat(document.getElementById("creditMetalWeight1").value);
    }

    var spotPriceReduced1 = parseFloat(spotPrice1/31.1);
    var creditPercentage1 = parseFloat((document.getElementById("creditPercentage1Value").value)/100);
    var multiplier10k = parseFloat(10/24);
    var multiplier14k = parseFloat(14/24);
    var multiplier18k = parseFloat(18/24);
    
    if (document.getElementById("goldCreditMetalSelection1").value == "10k"){
    var pricePerGram1 = parseFloat(spotPriceReduced1 * multiplier10k);
    } else if (document.getElementById("goldCreditMetalSelection1").value == "14k"){
    var pricePerGram1 = parseFloat(spotPriceReduced1 * multiplier14k);
    } else if (document.getElementById("goldCreditMetalSelection1").value == "18k"){
    var pricePerGram1 = parseFloat(spotPriceReduced1 * multiplier18k);
    }
    
    var creditTotal1 = parseFloat(pricePerGram1 * metalWeight1 * creditPercentage1);
    var htmlString1 = `Credit Amount: $${creditTotal1.toFixed(2)}`;
    document.getElementById("creditAmount1").innerHTML = htmlString1;
    
    // Handle if user leaves these inputs blank
    if (document.getElementById("metalSpotPrice2").value == ""){
        var spotPrice2 = 0;
    } else {
        var spotPrice2 = parseFloat(document.getElementById("metalSpotPrice2").value);
    }

    if (document.getElementById("creditMetalWeight2").value == ""){
        var metalWeight2 = 0;
    } else {
        var metalWeight2 = parseFloat(document.getElementById("creditMetalWeight2").value);
    }

    var spotPriceReduced2 = parseFloat(spotPrice2/31.1);
    var creditPercentage2 = parseFloat((document.getElementById("creditPercentage2Value").value)/100);
    
    if (document.getElementById("goldCreditMetalSelection2").value == "10k"){
    var pricePerGram2 = parseFloat(spotPriceReduced2 * multiplier10k);
    } else if (document.getElementById("goldCreditMetalSelection2").value == "14k"){
    var pricePerGram2 = parseFloat(spotPriceReduced2 * multiplier14k);
    } else if (document.getElementById("goldCreditMetalSelection2").value == "18k"){
    var pricePerGram2 = parseFloat(spotPriceReduced2 * multiplier18k);
    }
    
    var creditTotal2 = parseFloat(pricePerGram2 * metalWeight2 * creditPercentage2);
    var htmlString2 = `Credit Amount: $${creditTotal2.toFixed(2)}`;
    document.getElementById("creditAmount2").innerHTML = htmlString2;
    
    var totalCredit = parseFloat(creditTotal1 + creditTotal2).toFixed(2);
    
    var totalCreditOutputString = `The total credit is: $${totalCredit}`;

    document.getElementById("goldCreditResultsText").innerHTML = totalCreditOutputString;
    document.getElementById("goldCreditResultsTextAlert").classList.remove("invisible");
}



// === Event Listeners For Section === //
document.getElementById("creditPercentage1Slider").addEventListener("change", populateCreditPercentages);
document.getElementById("creditPercentage2Slider").addEventListener("change", populateCreditPercentages);
document.getElementById("resetGoldCreditFormBtn").addEventListener("click", resetGoldCreditForm);
document.getElementById("calculateGoldCreditBtn").addEventListener("click", calculateGoldCredit);

// document.getElementById("").addEventListener("click", function);