import axios from "axios"

 const ListarGenero = () => {
    axios.get(process.env.REACT_APP_BASE_URL_GENERO).then((response) => {
        console.log(response)
    }).catch(response => {
        console.log(response)
    })
}
