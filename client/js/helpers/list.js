const listButton = document.querySelector("#list");
const contentSection = document.querySelector("#content");

let hoteis = []

listButton.addEventListener("click", async () => {
    const response = await fetch("http://localhost:5000/hoteis")
    const json = await response.json()
    hoteis = json.hoteis

    renderTable(hoteis)
})

const renderTable = hoteis => {
    contentSection.innerHTML = ListTemplate(hoteis);
}

const ListTemplate = (hoteis) => {
    html = `<table class="table" style="color: var(--text-color); margin-top: 48px">
    <thead>
        <tr>
            <th scope="col">Nome</th>
            <th scope="col">Estrelas</th>
            <th scope="col">Cidade</th>
            <th scope="col">Diária</th>
            <th scope="col">Ações</th>
        </tr>
    </thead>
    <tbody>
    `

    hoteis.forEach((hotel, index) => {
        html += `
        <tr>
            <td> ${hotel.nome} </td>
            <td> ${hotel.estrelas} </td>
            <td> ${hotel.cidade} </td>
            <td> ${hotel.diaria} </td>
            <td>
                <button
                    onClick="editHotel(${index})"
                    class="btn btn-outline-primary"
                    data-id="${index}"
                >
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                    onClick="deleteHotel(${index})"
                    class="btn btn-outline-danger"
                    data-id="${index}"
                >
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>`
    })

    html += '</tbody></table>'

    return html
}

const hotelModel = {
    validate: hotel => {
        if (!hotel.nome) throw new Error("Hotel nome required")
        if (!hotel.estrelas) throw new Error("Hotel estrelas required")
        if (!hotel.cidade) throw new Error("Hotel cidade required")
        if (!hotel.diaria) throw new Error("Hotel diaria required")

        return {
            nome: hotel.nome,
            estrelas: hotel.estrelas,
            cidade: hotel.cidade,
            diaria: hotel.diaria,
        }
    }
}

const editHotel = (index) => {
    console.log(index)

}


const addHotel = hotel => {
    try {
        const validHotel = hotelModel.validate(hotel)
        hoteis.push(validHotel)

        renderTable(hoteis)
    } catch (error) {
        console.log(error)
    }
}