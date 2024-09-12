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

function addModalListener() {
	modalOverlay.addEventListener("click", (event) => {
		const { target } = event;

		if (
			target.classList.contains("modal-overlay") ||
			target.classList.contains("modal-close") ||
			target.classList.contains("modal-cancel")
		)
			closeModal();
		else if (target.classList.contains("modal-confirm")) {
			currentAction.action
				? currentAction.action() // Ejecutar la acción
				: console.error("No hay una acción seleccionada");
			closeModal();
		}
	});
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

export { addModalListener, openModal, closeModal, currentAction };
