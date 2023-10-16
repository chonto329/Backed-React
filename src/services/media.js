import axios from "axios"

 const ListarMedia= () => {
     axios.get(process.env.REACT_APP_BASE_URL_MEDIA).then((response) => {
        console.log(response)
        }).catch(response=>{
            console.log(response)
        })
}