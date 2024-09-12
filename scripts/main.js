import "./../styles/main.scss";
import { getDogList } from "./dogService.js";
import { deleteDog } from "./crud.js";
// import {
// 	addModalListener,
// 	openModal,
// 	currentAction,
// } from "./modalHandler-PREVIOUS.js";
import { modalHandler } from "./modalHandler.js";

// Variables
const dogListHTML = document.querySelector(".dog-list");

(function initApp() {
	console.log("App is started");
	document.addEventListener("DOMContentLoaded", () => {
		// addModalListener();

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

			if (actionBtn.classList.contains("dog-del")) {
				console.log("En mantenimiento: Función de eliminar");
				modalHandler("delete", dogCard);
				// currentAction.asign(
				// 	"¿Estas seguro de querer eliminar a este perro?",
				// 	"Eliminar",
				// 	() => deleteDog(dogCard)
				// );
				// openModal(currentAction);
			}

			if (actionBtn.classList.contains("dog-edit")) {
				console.log("Próximamente: Función de editar");
			}
		});
	});
})();

// Functions
function printDogList(dogList) {
	if (!dogList || dogList.length === 0) {
		const dogNotFound = document.createElement("p");
		dogNotFound.classList.add("dog-not-found");
		dogNotFound.textContent = "No se encontraron perros 😢";

		dogListHTML.appendChild(dogNotFound);
	} else {
		dogList.forEach((dog) => {
			const { id, img, name, phone, mail, country, description: desc } = dog;

			const dogCard = document.createElement("li");
			dogCard.classList.add("dog-card");
			dogCard.dataset.id = id;
			dogCard.innerHTML = `
			<header class="dog-header">
							<img class="dog-photo" src="${img}" alt="Perro" />

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
			dogListHTML.appendChild(dogCard);
		});
	}
}
