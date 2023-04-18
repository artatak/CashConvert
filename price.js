// For selecting different controls
var search = document.querySelector(".searchBox");
var convert = document.querySelector(".convert");
var fromCurrency = "TRY"; // Définition de la devise source comme TRY
var toCurrency = "EUR"; // Définition de la devise cible comme EUR
var finalValue = document.querySelector(".finalValue");
var finalAmount = document.getElementById("finalAmount");
var searchValue;

// Event when input value is changed
search.addEventListener('input', updateValue);

// Function for updating value
function updateValue(e) {
	searchValue = e.target.value;
}

// When user clicks, it calls function getResults
convert.addEventListener("click", getResults);

// Function getResults
function getResults() {
	if (!searchValue.includes("TL") && !searchValue.includes("EUR")) {
		alert("Veuillez inclure la mention 'TL' ou 'EUR' dans la valeur saisie.");
		return;
	}
	// Appel à l'API de taux de change avec les devises source et cible
	fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
		.then(currency => {
			return currency.json();
		}).then(displayResults);
}

// Display results after conversion
function displayResults(currency) {
	let fromRate = 1; // Taux de change fixe de TRY à TRY (1 TRY = 1 TRY)
	let toRate = currency.rates[toCurrency]; // Taux de change de TRY à EUR

	// Vérification si "TL" est collé à la valeur chiffrée
	if (searchValue.includes("TL")) {
		fromCurrency = "TRY"; // Modification de la devise source en TRY
		toCurrency = "EUR"; // Modification de la devise cible en EUR
		searchValue = searchValue.replace("TL", ""); // Suppression de "TL" de la valeur
	} else if (searchValue.includes("EUR")) {
		fromCurrency = "EUR"; // Modification de la devise source en EUR
		toCurrency = "TRY"; // Modification de la devise cible en TRY
		searchValue = searchValue.replace("EUR", ""); // Suppression de "EUR" de la valeur
	}

	let convertedAmount = ((toRate / fromRate) * parseFloat(searchValue)).toFixed(2); // Conversion du montant avec le taux de change
	finalValue.innerHTML = `${convertedAmount} ${toCurrency}`; // Affichage du montant converti avec la devise cible
	finalAmount.style.display = "block"; // Affichage du résultat
}

// When user clicks on reset button
function clearVal() {
	search.value = ""; // Réinitialisation de la valeur d'entrée
	searchValue = ""; // Réinitialisation de la valeur d'entrée dans la variable
	finalValue.innerHTML = ""; // Réinitialisation de la valeur convertie
	finalAmount.style.display = "none"; // Masquage du résultat
};
