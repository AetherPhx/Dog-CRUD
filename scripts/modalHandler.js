import { deleteDog, addDog } from "./crud";
let overlay;
class Modal {
	constructor(action, dog) {
		this.actionName = action;
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
		} else if (this.actionName === "add") {
			const modalContent = document.createElement("form");
			modalContent.className = "modal-form";
			modalContent.innerHTML = `
				<input class="modal-input" type="text" name="name" placeholder="Nombre" required>
				<input class="modal-input" type="text" name="img" placeholder="URL de la imagen" required>
				<input class="modal-input" type="text" name="phone" placeholder="Teléfono" required>
				<input class="modal-input" type="email" name="mail" placeholder="Email" required>
				<input class="modal-input" type="text" name="country" placeholder="País" required>
				<textarea name="description" placeholder="Descripción" required></textarea>
			`;
			this.modalForm = modalContent;
			return modalContent;
		}
	}
	createModalActions() {
		const modalActions = document.createElement("footer");
		modalActions.className = "modal-actions";
		if (this.actionName === "delete")
			modalActions.innerHTML = `
			<button class="modal-confirm">Aceptar</button>`;
		else if (this.actionName === "add")
			modalActions.innerHTML = `
        	<button type="submit" class="modal-confirm">Aceptar</button>`;

		modalActions.innerHTML += `<button class="modal-cancel">Cancelar</button>`;
		return modalActions;
	}

	handleEvents() {
		this.modalHTML.addEventListener("click", (event) => {
			const { target } = event;
			if (target.classList.contains("modal-confirm")) this.action();
		});
	}

	// Asignación CRUD
	action() {
		if (this.actionName === "delete") deleteDog(this.dog);
		else if (this.actionName === "add") addDog(this.modalForm);
		else if (this.actionName === "edit") null; // TODO: To be implemented
	}
}

function modalHandler(action, dog) {
	console.group("Se ha llamado a la función modalHandler");
	console.log("Los parámetros son:", action, dog);

	prepareOverlay();
	prepareModal(action, dog);
	openModal();
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

function prepareModal(action, dog) {
	console.log("Preparando modal...");
	const modal = new Modal(action, dog);
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
