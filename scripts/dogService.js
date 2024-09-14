import axios from "axios";

const DOG_API_URL = "http://localhost:3000/dogs";

export async function requestGetDogById(id) {
	try {
		const { data: dog } = await axios.get(`${DOG_API_URL}/${id}`);
		return dog;
	} catch (error) {
		console.error("Error al obtener el perro:\n", error.message);
	}
}

export async function requestGetDogList() {
	try {
		const { data: dogList } = await axios.get(DOG_API_URL);
		return dogList;
	} catch (error) {
		console.error("Error al obtener la lista de perros:\n", error.message);
	}
}

export async function requestAddDog(dog) {
	try {
		const { data, statusText } = await axios.post(DOG_API_URL, dog);
		if (statusText === "Created") {
			console.log("Perro agregado correctamente");
			return data;
		}
	} catch (error) {
		console.error(
			"Error al agregar el perro a la base de datos:\n",
			error.message
		);
	}
}

export async function requestDeleteDog(dog) {
	try {
		const { statusText } = await axios.delete(`${DOG_API_URL}/${dog.id}`);
		if (statusText === "OK") return true;
	} catch (error) {
		console.error("Error en la petición de eliminación:\n", error.message);
		return false;
	}
}

export async function requestPartialUpdateDog(newData, id) {
	try {
		const { data, statusText } = await axios.patch(
			`${DOG_API_URL}/${id}`,
			newData
		);
		if (statusText === "OK") return data;
	} catch (error) {
		console.error("Error al editar parcialmente el perro:\n", error.message);
	}
}

export async function requestFullUpdateDog(newData, id) {
	try {
		const { data, statusText } = await axios.put(
			`${DOG_API_URL}/${id}`,
			newData
		);
		if (statusText === "OK") return data;
	} catch (error) {
		console.error("Error al editar por completo el perro:\n", error.message);
	}
}
