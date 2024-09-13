import { requestAddDog, requestDeleteDog } from "./dogService.js";
import { closeModal } from "./modalHandler.js";

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

	show() {
		console.log(`El perro es:
			${this.img}
			${this.name}
			${this.phone}
			${this.mail}
			${this.country}
			${this.description}
			`);
	}

	restart() {
		this.img = "";
		this.name = "";
		this.phone = "";
		this.mail = "";
		this.country = "";
		this.description = "";
	}
}

export function deleteDog(dogToDelete) {
	console.log("Se ha llamado a la función deleteDog");
	console.log("Los parámetros son:", dogToDelete);

	try {
		if (!dogToDelete) throw new Error("Dog not found");

		requestDeleteDog(dogToDelete).then((status) => {
			if (status) {
				dogToDelete.remove();
				console.log("Dog was deleted successfully");
			}
		});
	} catch (error) {
		console.error(error);
	}
	closeModal();
}

export function addDog(dogForm) {
	console.log("Se ha llamado a la función addDog");
	const dogList = dogForm.elements;
	const newDog = new Dog();

	for (let i = 0; i < dogList.length; i++) {
		const field = dogList[i];
		console.groupCollapsed("Validando campo:", field.name);
		if (!validateInput(field)) {
			alert(
				`${field.name} no es válido.\n
				Llena correctamente todos los campos para poder enviarlo.`
			);
			console.log("El campo", field.name, "esta vacío");
			newDog.restart();
			newDog.show();
			return false;
		} else {
			console.log(`El campo ${field.name} con valor ${field.value} es válido`);
			newDog.setData(field.name, field.value);
		}

		console.groupEnd();
	}
	console.log("Todos los campos son válidos!");
	newDog.show();
	requestAddDog(newDog).then((response) => {
		if (response) {
			// TODO: Implementar reinicio de objetos (newDog, dogForm y modal) y repintar la lista de perros :3
			// newDog.restart();
			// dogForm.reset();
			// closeModal();
		}
	});
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

export default {
	addDog,
	deleteDog,
};
