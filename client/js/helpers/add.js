const addButton = document.querySelector("#add");
const addModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false
})

let isModalVisible = false;

const nameInput = document.querySelector("#modal-nome");
const estrelasInput = document.querySelector("#modal-estrelas");
const cidadeInput = document.querySelector("#modal-cidade");
const diariaInput = document.querySelector("#modal-diaria");

addButton.addEventListener("click", async () => {
    addModal.toggle()
})

const resetForm = () => {
    nameInput.value = ""
    estrelasInput.value = ""
    cidadeInput.value = ""
    diariaInput.value = ""
}

const saveHotel = async () => {
    const hotel = {
        nome: nameInput.value,
        estrelas: estrelasInput.value,
        cidade: cidadeInput.value,
        diaria: diariaInput.value,
    }

    try {
        const apiResponse = await fetch("http://localhost:5000/hotel/new", {
            method: "POST",
            body: JSON.stringify(hotel),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })

        const json = await apiResponse.json();

        if (json.hotel_id) {
            addHotel(hotel)
        
            resetForm()
            addModal.hide()
        } else {
            throw new Error("Something went wrong adding this hotel :")
        }
    } catch (error) {
        console.log(error)
    }
}