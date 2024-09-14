import {
	requestAddDog,
	requestDeleteDog,
	requestPartialUpdateDog,
	requestFullUpdateDog,
} from "./dogService.js";
import { closeModal } from "./modalHandler.js";
import { createDogCard, printDog, refreshList, replaceDog } from "./main.js";

class Dog {
	constructor() {
		this.img = "";
		this.name = "";
		this.phone = "";
		this.mail = "";
		this.country = "";
		this.description = "";
	}

	setData(data, value) {
		this[data] = value;
	}

	isValid() {
		return (
			this.img &&
			this.name &&
			this.phone &&
			this.mail &&
			this.country &&
			this.description
		);
	}

	restart() {
		this.img = "";
		this.name = "";
		this.phone = "";
		this.mail = "";
		this.country = "";
		this.description = "";
	}

	show() {
		console.table(this);
	}
}

export function deleteDog(dogCardToDelete) {
	console.group("Delete Dog");

	try {
		if (!dogCardToDelete) throw new Error("Dog not found");

		requestDeleteDog(dogCardToDelete).then((status) => {
			if (status) {
				dogCardToDelete.remove();
				console.log("Dog was deleted successfully");
			}
		});
	} catch (error) {
		console.error("❗  Error al eliminar el perro:\n", error.message);
		refreshList();
	}

	console.groupEnd();
	closeModal();
}

export function addDog(dogForm) {
	console.group("Add Dog");
	const newDog = new Dog();
	try {
		if (isValidForm(dogForm, newDog)) {
			requestAddDog(newDog).then((newDogAdded) => {
				newDogAdded ? printDog(createDogCard(newDogAdded)) : refreshList();
				newDog.restart();
				dogForm.reset();
				closeModal();
			});
		}

		console.groupEnd();
	} catch (error) {
		console.error("❗  Error al agregar el perro:\n", error.message);
		refreshList();
	}
}

export function editDog(dogCard, dogForm, dogToEdit) {
	console.group("Editar Mascota");
	console.log("Los parámetros son:", dogCard, dogForm, dogToEdit);

	const newDog = new Dog();
	if (isValidForm(dogForm, newDog)) {
		console.log(newDog);
		console.log(dogToEdit);
		if (!areDifferent(dogToEdit, newDog)) {
			console.error("El perro no ha cambiado");
			console.groupEnd();
			return;
		}

		requestPartialUpdateDog(newDog, dogToEdit.id).then((newDogEdited) => {
			console.log(newDogEdited);
			newDogEdited ? replaceDog(dogCard, newDogEdited) : refreshList();
			newDog.restart();
			dogForm.reset();
			closeModal();
		});
	}

	console.groupEnd();
}

function isValidForm(dogForm, newDog) {
	console.groupCollapsed("Validando formulario");
	const form = dogForm.elements;

	// Validación de campos y asignación de valores
	for (let i = 0; i < form.length; i++) {
		const field = form[i];
		console.groupCollapsed("Validando campo:", field.name);
		if (!validateInput(field)) {
			console.error("❗  El campo", field.name, "esta vacío");
			newDog.restart();
			console.groupEnd();
			break;
		} else {
			console.log(`El campo ${field.name} con valor ${field.value} es válido`);
			newDog.setData(field.name, field.value);
			console.groupEnd();
		}
	}

	console.groupEnd();
	if (newDog.isValid()) return true;
	else console.error("Formulario no válido");
}

function validateInput(input) {
	if (!input.value) console.log(`Antes de limpiar está vacío`);
	else console.log(`Antes de limpiar tiene valor: ${input.value}`);

	const inputValue = input.value.replace(/\s/g, "");
	if (!inputValue || inputValue === "") {
		console.log(`Tras la limpieza esta vacío`);
		return false;
	} else console.log(`Tras la limpieza tiene valor: ${inputValue}`);
	return true;
}

function areDifferent(dog1, dog2) {
	return (
		dog1.img !== dog2.img ||
		dog1.name !== dog2.name ||
		dog1.phone !== dog2.phone ||
		dog1.mail !== dog2.mail ||
		dog1.country !== dog2.country ||
		dog1.description !== dog2.description
	);
}

export default {
	addDog,
	deleteDog,
	editDog,
};
