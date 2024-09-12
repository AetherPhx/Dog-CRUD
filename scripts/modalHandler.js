// Modal dinámico que su contenido sea de formulario o de confirmación.
// * Tipos de modales: Formulario & Confirmación.
// En el caso de formulario el contenido es un formulario con los campos de datos de la mascota y se debe realizar una validación al presionar en aceptar.
// En el caso de confirmación se muestra una pregunta para confirmar la acción que se quiere realizar.
// En ambos casos, si todo es correcto, se debe realizar la acción y cerrar el modal.

// * Ciclo de vida del modal:
// Al querer agregar, editar o eliminar una mascota, se generará el modal y una vez que haya éxito, el modal-overlay se agrega al DOM y se superpone sobre el contenido de la página.
// Al momento de crear el modal, se debe asignar una acción que se ejecutará cuando se presione en aceptar y que se cancelará cuando se presione en cancelar, cuando se cierre el modal (Presionando en la X) o cuando se presione fuera del modal (también cierra el modal).
// Para generar el modal, primero se debe crear el contenido del modal respectivo. Una vez creado el contenido, se mostrará tanto el overlay como el modal a espera de que se presione en aceptar o cancelar.

// * Desarrollo:
// El modal se llama cuando se quiere agregar, editar o eliminar una mascota. Por lo tanto, se debe crear una función que reciba como parámetro la acción que se desea realizar.
// Esta fn llamará otra fn que se encargará de preparar el modal en base a la acción que se desee realizar. Por último, se agregará el overlay y modal al DOM.
// Para preparar el modal, se creará su contenido HTML respectivo y agregará la fn crud relacionada. También se asignarán los listeners necesarios para que se puedan ejecutar o cancelar la acción llamando a la fn que cierra el modal (Cambia la clase del overlay a modal-overlay--hidden).
// Una vez que la fn de preparar el modal haya sido un éxito, se llamará otra fn que abra el modal. O sea, que le brindará la clase modal-overlay al elemento del DOM.

function modalHandler(action, dog) {
	console.log("Función modalHandler");
	console.log(action, dog);

	prepareModal(action, dog);
	openModal();
}

function prepareModal(action, dog) {
	console.log("Preparando modal");
	const modal = document.createElement("section");
	modal.className = "modal";
	modal.innerHTML = `
        <div class="modal-menu">
            <h3 class="modal-title">Confirmar</h3>
            <button class="modal-close">X</button>
        </div>
    
        <section class="modal-content">
            <p class="modal-question">
                ¿Estas seguro de querer ${action} a este perro?
            </p>
        </section>

        <footer class="modal-actions">
            <button class="modal-confirm">Aceptar</button>
            <button class="modal-cancel">Cancelar</button>
        </footer>
        `;
	document.getElementById("modal-overlay").appendChild(modal);
}

function openModal() {
	document.getElementById("modal-overlay").classList = "modal-overlay";
	console.log("Modal abierto");

	// ! Only to test closeModal():
	setTimeout(() => {
		closeModal();
	}, 5000);
}

function closeModal() {
	document.getElementById("modal-overlay").classList = "modal-overlay--hidden";
	console.log("Modal cerrado");
}

export { modalHandler };
