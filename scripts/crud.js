export function deleteDog(dogToDelete) {
	dogToDelete ? dogToDelete.remove() : console.error("Dog not found");
}
