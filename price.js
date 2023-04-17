
var search = document.querySelector(".searchBox");
var convert = document.querySelector(".convert");
var fromCurrency = "TRY"; 
var toCurrency = "EUR"; 
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");
var searchValue;


search.addEventListener('input', updateValue);


function updateValue(e) {
	searchValue = e.target.value;
}


convert.addEventListener("click", getResults);


function getResults() {
	if (!searchValue.includes("TL") && !searchValue.includes("EUR")) {
		alert("Veuillez inclure la mention 'TL' ou 'EUR' dans la valeur saisie.");
		return;
	}

	fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
		.then(currency => {
			return currency.json();
		}).then(displayResults);
}


function displayResults(currency) {
	let fromRate = 1; 
	let toRate = currency.rates[toCurrency]; 


	if (searchValue.includes("TL")) {
		fromCurrency = "TRY"; 
		toCurrency = "EUR"; 
		searchValue = searchValue.replace("TL", ""); 
	} else if (searchValue.includes("EUR")) {
		fromCurrency = "EUR"; 
		toCurrency = "TRY"; 
		searchValue = searchValue.replace("EUR", ""); 
	}

	let convertedAmount = ((toRate / fromRate) * parseFloat(searchValue)).toFixed(2); 
	finalValue.innerHTML = `${convertedAmount} ${toCurrency}`; 
	finalAmount.style.display = "block"; 


function clearVal() {
	search.value = ""; 
	searchValue = ""; 
	finalValue.innerHTML = ""; 
	finalAmount.style.display = "none"; 
};
