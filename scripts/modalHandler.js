import { requestGetDogById } from "./dogService";
import { deleteDog, addDog, editDog } from "./crud";
import { refreshList } from "./main";
let overlay;
class Modal {
	constructor(action, dogCard, dog) {
		this.actionName = action;
		this.dogCard = dogCard;
		this.dog = dog;
		this.modalHTML = null;
		this.modalForm = null;

		this.setUpModal();
	}

	setUpModal() {
		this.createModalHTML();
		this.handleEvents();
	}

	// Maquetación del modal
	createModalHTML() {
		this.modalHTML = document.createElement("section");
		this.modalHTML.className = "modal";
		this.modalHTML.appendChild(this.createModalMenu());
		this.modalHTML.appendChild(this.createModalContent());
		this.modalHTML.appendChild(this.createModalActions());
		overlay.appendChild(this.modalHTML);
	}
	createModalMenu() {
		const modalMenu = document.createElement("header");
		modalMenu.className = "modal-menu";
		modalMenu.innerHTML = `<button class="modal-close">X</button>`;
		if (this.actionName === "add")
			modalMenu.innerHTML += `<h3 class="modal-title">Agregar Mascota</h3>`;
		else if (this.actionName === "edit")
			modalMenu.innerHTML += `<h3 class="modal-title">Editar Mascota</h3>`;

		return modalMenu;
	}
	createModalContent() {
		if (this.actionName === "delete") {
			const modalContent = document.createElement("p");
			modalContent.className = "modal-question";
			modalContent.textContent = `¿Estas seguro de querer eliminar a este perro?`;
			return modalContent;
		} else if (this.actionName === "add" || this.actionName === "edit") {
			const values = {
				img: "",
				name: "",
				phone: "",
				mail: "",
				country: "",
				description: "",
			};
			if (this.actionName === "edit") Object.assign(values, this.dog);

			const modalContent = document.createElement("form");
			modalContent.className = "modal-form";
			modalContent.innerHTML = `
				<input class="modal-input" type="text" name="name" placeholder="Nombre" value="${
					values.name
				}">
				<input class="modal-input" type="text" name="img" placeholder="Nombre del archivo" value="${
					values.img
				}">
				<input class="modal-input" type="text" name="phone" placeholder="Teléfono" value="${
					values.phone
				}">
				<input class="modal-input" type="email" name="mail" placeholder="Email" value="${
					values.mail
				}">
				<select class="modal-input" name="country">
					<option value="perú" ${
						values.country === "perú" ? "selected" : ""
					}>Perú</option>

					<option value="colombia" ${
						values.country === "colombia" ? "selected" : ""
					}>Colombia</option>

					<option value="bolivia" ${
						values.country === "bolivia" ? "selected" : ""
					}>Bolivia</option>

					<option value="ecuador" ${
						values.country === "ecuador" ? "selected" : ""
					}>Ecuador</option>
				</select>
				<textarea name="description" placeholder="Descripción">${
					values.description
				}</textarea>
			`;
			this.modalForm = modalContent;
			return modalContent;
		}
	}

	createModalActions() {
		const modalActions = document.createElement("footer");
		modalActions.className = "modal-actions";
		modalActions.innerHTML = `
			<button class="modal-confirm">Aceptar</button>
			<button class="modal-cancel">Cancelar</button>
		`;
		return modalActions;
	}

	handleEvents() {
		this.modalHTML.addEventListener("click", (event) => {
			const { target } = event;
			if (target.classList.contains("modal-confirm")) this.action();
		});
	}

	action() {
		if (this.actionName === "delete") deleteDog(this.dogCard);
		else if (this.actionName === "add") addDog(this.modalForm);
		else if (this.actionName === "edit")
			editDog(this.dogCard, this.modalForm, this.dog);
	}
}

async function modalHandler(action, dogCard) {
	console.group("Se ha llamado a la función modalHandler");
	console.log("Los parámetros son:", action, dogCard);
	try {
		if (dogCard) {
			const dog = await findDogById(dogCard.id);
			if (!dog)
				throw new Error("No se generará un modal porque el perro no existe.");
			prepareOverlay();
			prepareModal(action, dogCard, dog);
			openModal();
		} else {
			prepareOverlay();
			prepareModal(action, dogCard);
			openModal();
		}
	} catch (error) {
		console.error(error);
		refreshList();
	}
}

async function findDogById(id) {
	try {
		console.log("El id es: ", id);
		console.log("Buscando el perro...");

		const dog = await requestGetDogById(id);
		if (!dog) throw new Error("No se encontró el perro");
		return dog;
	} catch (error) {
		console.error(error);
	}
}

function prepareOverlay() {
	if (document.getElementById("modal-overlay")) return false;

	console.log("Preparando Overlay...");
	overlay = document.createElement("div");
	overlay.id = "modal-overlay";
	overlay.classList = "modal-overlay--hidden";

	overlay.addEventListener("click", (event) => {
		const { target } = event;

		if (
			target.classList.contains("modal-overlay") ||
			target.classList.contains("modal-close") ||
			target.classList.contains("modal-cancel")
		) {
			console.log("Cancelar acción");
			closeModal();
		}
	});

	document.querySelector(".layout").appendChild(overlay);
	console.log("Overlay preparado");
	return true;
}

function prepareModal(action, dogCard, dog) {
	console.log("Preparando modal...");
	const modal = new Modal(action, dogCard, dog);
	overlay.appendChild(modal.modalHTML);
	console.log(modal.modalHTML);
	console.log("Modal preparado!");
}

function openModal() {
	overlay.classList = "modal-overlay";
	console.log("Modal abierto");
}

export function closeModal() {
	overlay.classList = "modal-overlay--hidden";
	if (document.querySelector(".modal"))
		document.querySelector(".modal").remove();
	console.log("Modal cerrado");
	console.groupEnd();
}

export { modalHandler };
