

async function deleteHotel(index){
    console.log(hoteis[index])

    const apiResponse = await fetch(`http://localhost:5000/hotel/${hoteis[index].hotel_id}`, {
        method: "DELETE" 
    })

    const json = await apiResponse.json();

    //hoteis = novo array de hoteis
    
    //renderTable(hoteis = splice);
    
    const Hotel = (index) => {

        Hotel.splice()
    }
  
}  