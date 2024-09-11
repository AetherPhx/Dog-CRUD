import "./../styles/main.scss";
import { getDogList } from "./dogService.js";
import { deleteDog } from "./crud.js";

// Variables
const dogListHTML = document.querySelector(".dog-list");
const modalOverlay = document.getElementById("modal-overlay");
const currentAction = {
	question: "",
	confirm: "",
	action: null,

	asign(question, confirm, action) {
		this.question = question;
		this.confirm = confirm;
		this.action = action;
	},

	clear() {
		this.question = "";
		this.confirm = "";
		this.action = null;
	},
};

// Event Listeners
(function initApp() {
	console.log("App is started");
	document.addEventListener("DOMContentLoaded", () => {
		modalOverlay.addEventListener("click", (event) => {
			const { target } = event;

			if (
				target.classList.contains("modal-overlay") ||
				target.classList.contains("modal-close") ||
				target.classList.contains("modal-cancel")
			) {
				closeModal();
			} else if (target.classList.contains("modal-confirm")) {
				if (currentAction.action) currentAction.action(); // Ejecutar la acción
				else console.error("No hay una acción seleccionada");
				closeModal();
			}
		});

		getDogList().then((dogList) => printDogList(dogList));

		dogListHTML.addEventListener("click", (event) => {
			// Destructurar para obtener el botón de acción y la tarjeta de perro donde se hizo el click
			const {
				target: { parentElement: actionBtn },
				target: {
					parentElement: {
						parentElement: { parentElement: dogCard },
					},
				},
			} = event;

			if (actionBtn.classList.contains("dog-del")) {
				currentAction.asign(
					"¿Estas seguro de querer eliminar a este perro?",
					"Eliminar",
					() => deleteDog(dogCard)
				);
				openModal(currentAction);
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

function openModal(currentAction) {
	try {
		const { question, confirm } = currentAction;
		if (!question || !confirm)
			throw new Error("La información de la acción actual está incompleta");

		if (document.querySelector(".modal")) {
			console.log("Ya existe un modal, por lo que se reescribirán sus datos");
			document.querySelector(".modal-question").textContent = question;
			document.querySelector(".modal-confirm").textContent = confirm;
			// modalQuestion.textContent = question;
			// confirmBtn.textContent = confirm;
		} else {
			const modal = document.createElement("section");

			modal.className = "modal";
			modal.innerHTML = `
			<div class="modal-menu">
				<button class="modal-close">X</button>
			</div>
		
			<section class="modal-content">
				<p class="modal-question">
					${question}
				</p>
		
				<footer class="modal-actions">
					<button class="modal-confirm">${confirm}</button>
					<button class="modal-cancel">Cancelar</button>
				</footer>
			</section>
			`;
			modalOverlay.appendChild(modal);
		}

		modalOverlay.className = "modal-overlay";
	} catch (error) {
		console.error(error);
	}
}

function closeModal() {
	modalOverlay.className = "modal-overlay--hidden";
	currentAction.clear();
}
