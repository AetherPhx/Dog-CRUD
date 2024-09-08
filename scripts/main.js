import "./../styles/main.scss";
import axios from "axios";

// Variables
const DOG_API_URL = "http://localhost:3000/dogs";
const dogListHTML = document.querySelector(".dog-list");

// Event Listeners
(async function initApp() {
	console.log("App is started");
	document.addEventListener("DOMContentLoaded", () => {
		getDogList().then((dogList) => {
			printDogList(dogList);
		});

		dogListHTML.addEventListener("click", (event) => {
			const {
				target: { parentElement: actionBtn }, // Botón de acción
				target: {
					// Tarjeta de perro
					parentElement: {
						parentElement: { parentElement: dogCard },
					},
				},
			} = event;

			if (actionBtn.classList.contains("dog-del")) deleteDog(dogCard);
		});
	});
})();

// Functions
async function getDogList() {
	try {
		const { data: dogList } = await axios.get(DOG_API_URL);
		return dogList;
	} catch (error) {
		console.error("Error al obtener la lista de perros:\n", error.message);
	}
}

async function printDogList(dogList) {
	if (!dogList) console.log("No se encontraron perros");
	else {
		console.log(dogList);
		dogList.forEach((dog) => {
			const {
				img,
				name,
				telefono: phone,
				pais: country,
				descripcion: desc,
				id,
			} = dog;

			const dogCard = document.createElement("li");
			dogCard.classList.add("dog-card");
			dogCard.dataset.id = id;
			dogCard.innerHTML = `
			<header class="dog-header">
							<img class="dog-photo" src="${img}" alt="Perro" />

							<h2 class="dog-name">${name}</h2>

							<div class="dog-contact">
								<p id="phone">${phone}</p>
								|
								<p id="email">Correo</p>
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

function deleteDog(dogToDelete) {
	dogToDelete ? dogToDelete.remove() : console.error("Dog not found");
}
