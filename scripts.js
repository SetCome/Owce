function toHTML(owca) {
	return `
	  <tr>
			<td>${owca.name}</td>
			<td>${owca.colors}</td>
			<td>${owca.age}</td>
			<td>${owca.canSweam}</td>
			<td>${owca.isHappy}</td>
			<td>${owca.maxSpeed}</td>
			<td>${owca.numberOfLegs}</td>
	  </tr>
 	`;
}

const tabela = document.querySelector("#owce");
const imię = document.querySelector("#sheep-name");
const szczęście = document.querySelector("#sheep-happy");
const pływalność = document.querySelector("#sheep-sweam");
const kolor = document.querySelector("#sheep-color")
const minLiczbaNog = document.querySelector("#sheep-legs-min")
const maxLiczbaNog = document.querySelector("#sheep-legs-max")
const sheepSort = document.querySelector("#sheep-sort")
const sheepSortReverse = document.querySelector("#sheep-sort-reverse")


function check( owca ){
	const wpisaneImię = imię.value.trim();
	const wpisaneSzczęście = szczęście.checked;
	const wpisanaPływalność = pływalność.checked;
	const wpisanyKolor = kolor.value.trim()
	const wpisanaMinimalnaLiczbaNog = parseInt(minLiczbaNog.value)
	const wpisanaMaksymalnaLiczbaNog = parseInt(maxLiczbaNog.value)
	

	// obsługa checkboxa
	if(wpisaneSzczęście && (!owca.isHappy) ) return false;
	if(wpisanaPływalność && (!owca.canSweam) ) return false;
	// ovsługa pola tekstowego
	if(wpisaneImię !== "" && !(owca.name.startsWith( wpisaneImię ))) return false;
	if(wpisanyKolor !== "" && !(owca.name.startsWith( wpisanyKolor ))) return false;

	return true;
}

function refresh(){
	const przefiltrowane_owce = randomSheeps.filter( check );

	//sortBy to to po czym mamy sortować
	const sortBy = sheepSort.value; //name, numberOfLegs, maxSpeed, colours
	// reverse mówi czy sortujemy w odwrotnej kolejności
	const reverse = sheepSortReverse.checked;
	przefiltrowane_owce.sort( function(owcaA, owcaB){
		let result;
		if(sortBy === "name") {
			//porównanie leksykograficzne
			result = owcaA.name < owcaB.name ? -1: 1;
		}
		if(sortBy === "numberOfLegs") {
			//porównanie arytmetyczne
			result = owcaA.numberOfLegs < owcaB.numberOfLegs ? -1: 1;
		}
		if(sortBy === "maxSpeed") {
			//porównanie arytmetyczne
			result = parseInt(owcaA.maxSpeed) < parseint(owcaB.maxSpeed) ? -1: 1;
		}
		if(sortBy === "colour") {
			//porównanie leksykograficzne
			result = owcaA.colour < owcaB.colour ? -1: 1;
		}
		// -1 jeżeli A ma być przed B
		// 0 jeżeli są równe
		// 1 jeżeli B ma być przed A 
		return reverse ? -result : result;
	})


	const html_owce = przefiltrowane_owce.map(toHTML);
	tabela.innerHTML = html_owce.join("");
}

refresh();


const szukaj = document.querySelector("#szukaj");
szukaj.addEventListener("click", refresh);

document.querySelectorAll(document.querySelector("input"))
wszystkieInputy.forEach(input =>onchange = refresh)
