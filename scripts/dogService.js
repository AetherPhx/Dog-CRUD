import axios from "axios";

const DOG_API_URL = "http://localhost:3000/dogs";

export async function getDogList() {
	try {
		const { data: dogList } = await axios.get(DOG_API_URL);
		return dogList;
	} catch (error) {
		console.error("Error al obtener la lista de perros:\n", error.message);
	}
}

export async function requestAddDog(dog) {
	try {
		const { status } = await axios.post(DOG_API_URL, dog);
		if (status === 201) return true;
		else {
			console.log(`Status: ${status}`);
			return true;
		}
	} catch (error) {
		console.error("Error al agregar el perro:\n", error.message);
	}
}

export async function requestDeleteDog(dog) {
	try {
		const { statusText } = await axios.delete(`${DOG_API_URL}/${dog.id}`);
		if (statusText === "OK") return true;
	} catch (error) {
		console.error("Error al eliminar el perro:\n", error.message);
		return false;
	}
}

// export async function requestEditDog(dog) {}
