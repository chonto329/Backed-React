import axios from "axios"

 const ListarTipo = () => {
    axios.get(process.env.REACT_APP_BASE_URL_TIPO).then((response) => {
        console.log(response)
        }).catch(response=>{
            console.log(response)
        })
}