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
