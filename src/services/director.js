import axios from "axios"

 const ListarDirector = () => {
    axios.get(process.env.REACT_APP_BASE_URL_DIRECTOR).then((response) => {
        console.log(response)
        }).catch(response=>{
            console.log(response)
        })
}