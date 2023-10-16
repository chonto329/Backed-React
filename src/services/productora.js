import axios from "axios"

 const ListarProductora = () => {
     axios.get(process.env.REACT_APP_BASE_URL_PRODUCTORA).then((response) => {
        console.log(response)
        }).catch(response=>{
            console.log(response)
        })
}