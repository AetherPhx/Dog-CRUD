import "./../styles/main.scss";
import { getDogList } from "./dogService.js";
import { modalHandler } from "./modalHandler.js";

// Variables
const layout = document.querySelector(".layout");
const dogListHTML = document.querySelector(".dog-list");

(function initApp() {
	console.log("App is started");
	document.addEventListener("DOMContentLoaded", () => {
		layout.addEventListener("click", (event) => {
			if (event.target.classList.contains("add-btn")) modalHandler("add");
		});

		getDogList().then((dogList) => printDogList(dogList));

		dogListHTML.addEventListener("click", (event) => {
			// Destructurar botón de acción y tarjeta de perro
			const {
				target: { parentElement: actionBtn },
				target: {
					parentElement: {
						parentElement: { parentElement: dogCard },
					},
				},
			} = event;

			if (actionBtn.classList.contains("dog-del"))
				modalHandler("delete", dogCard);

			if (actionBtn.classList.contains("dog-edit"))
				modalHandler("edit", dogCard);
		});
	});
})();

// Functions
export function printDogList(dogList) {
	if (!dogList || dogList.length === 0) {
		const dogNotFound = document.createElement("p");
		dogNotFound.classList.add("dog-not-found");
		dogNotFound.textContent = "No se encontraron perros 😢";

		dogListHTML.appendChild(dogNotFound);
	} else {
		dogList.forEach((dog) => printDog(createDogCard(dog)));
	}
}

export function createDogCard(dog) {
	const { id, img, name, phone, mail, country, description: desc } = dog;

	const dogCard = document.createElement("li");
	dogCard.classList.add("dog-card");
	dogCard.id = id;
	dogCard.innerHTML = `
	<header class="dog-header">
					<img class="dog-photo" src="./dogs/${img}" alt="${name}">

					<h2 class="dog-name">${name}</h2>

					<div class="dog-contact">
						<a class="dog-link" href="https://api.whatsapp.com/send?phone=51${phone}" target="_blank" id="phone">${phone}</a>
						|
						<a class="dog-link" href="mailto:${mail}" target="_blank" id="email">${mail}</a>
					</div>
				</header>

				<p class="dog-country">${country}</p>

				<p class="dog-description">
					${desc}
				</p>

				<div class="dog-actions">
					<div class="dog-edit">
						<p>✏️</p>
						<p>Edit</p>
					</div>
					<div class="dog-del">
						<p>❌</p>
						<p>Delete</p>
					</div>
				</div>

	`;

	return dogCard;
}

export function printDog(dogCard) {
	dogListHTML.appendChild(dogCard);
}

export function refreshList() {
	dogListHTML.innerHTML = "";
	getDogList().then((dogList) => printDogList(dogList));
}

export function replaceDog(dogCard, dog) {
	const newDogCard = createDogCard(dog);

	dogListHTML.replaceChild(newDogCard, dogCard);
}
