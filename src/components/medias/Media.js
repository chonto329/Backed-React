import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { show_alert } from '../ui/Functions'


export const Media = () => {

  // var url = process.env.REACT_APP_BASE_URL_MEDIA
  // useEffect(() => {
  //   ListarMedias()
  //   ListarDirectores()
  //   ListarGeneros()
  //   ListarProductoras()
  //   ListarTipos()
  // }, [])

  // const [media, setMedia] = useState([])
  // const [_id, setId] = useState('')
  // const [serial, setSerial] = useState('')
  // const [titulo, setTitulo] = useState('')
  // const [sipnosis, setSipnosis] = useState('')
  // const [urlImagen, setUrl] = useState('')
  // const [año, setAño] = useState('')
  // const [genero, setGenero] = useState('')
  // const [director, setDirector] = useState('')
  // const [productora, setProductora] = useState('')
  // const [tipo, setTipo] = useState('')
  // const [operacion, setOperacion] = useState('')
  // const [title, setTitle] = useState("")

  // const [generos, setGeneros] = useState([])
  // const [directores, setDirectores] = useState([])
  // const [productoras, setProductoras] = useState([])
  // const [tipos, setTipos] = useState([])

  // const ListarMedias = async () => {
  //   const data = await axios.get(url)
  //   setMedia(data)
  // }
  // const ListarDirectores = async () => {
  //   await axios.get(process.env.REACT_APP_BASE_URL_DIRECTORES).then((response) => {
  //     console.log(response.data)
  //     setDirectores(response.data)
  //   })

  // }
  // const ListarGeneros = async () => {
  //   await axios.get(process.env.REACT_APP_BASE_URL_GENEROS).then((response) => {
  //     console.log(response.data)
  //     setDirectores(response.data)
  //   })
  // }
  // const ListarProductoras = async () => {
  //   await axios.get(process.env.REACT_APP_BASE_URL_PRODUCTORA).then((response) => {
  //     console.log(response.data)
  //     setDirectores(response.data)
  //   })
  // }
  // const ListarTipos = async () => {
  //   await axios.get(process.env.REACT_APP_BASE_URL_TIPO).then((response) => {
  //     console.log(response.data)
  //     setDirectores(response.data)
  //   })
  // }

  // const openModal = (op, _id, serial, titulo, sipnosis, urlImagen, año, genero, director, productora, tipo) => {
  //   setId("");
  //   setSerial("")
  //   setTitulo("")
  //   setSipnosis("")
  //   setUrl("")
  //   setAño("")
  //   setGenero("")
  //   setDirector("")
  //   setProductora("")
  //   setTipo("")
  //   setOperacion(op)
  //   if (op === 1) {
  //     setTitle("Añadir Peliculas y Series")
  //   } else if (op === 2) {
  //     setTitle("Modificar Peliculas y series")
  //     setId(_id);
  //     setSerial(serial)
  //     setTitulo(titulo)
  //     setSipnosis(sipnosis)
  //     setUrl(urlImagen)
  //     setAño(año)
  //     setGenero(genero)
  //     setDirector(director)
  //     setProductora(productora)
  //     setTipo(tipo)
  //   } else if (op === 3) {
  //     setId(_id);
  //   }
  //   window.setTimeout(() => {
  //     document.getElementById('serial').focus()
  //   }, 500)
  // }

  // const validarDatos = () => {

  //   var param

  //   if (serial.trim() === '') {
  //     show_alert('El serial esta vacio', 'warning')
  //   } else if (titulo.trim() === '') {
  //     show_alert('El titulo esta vacio', 'warning')
  //   } else if (sipnosis.trim() === '') {
  //     show_alert('La sipnosis esta vacia', 'warning')
  //   } else if (urlImagen.trim() === '') {
  //     show_alert('La URL esta vacia', 'warning')
  //   } else if (año.trim() === '') {
  //     show_alert('El año esta vacio', 'warning')
  //   } else if (genero.trim() === 'Seleccionar') {
  //     show_alert('El genero esta vacio', 'warning')
  //   } else if (director.trim() === 'Seleccionar') {
  //     show_alert('El director esta vacio', 'warning')
  //   } else if (productora.trim() === 'Seleccionar') {
  //     show_alert('La productora esta vacia', 'warning')
  //   } else if (tipo.trim() === 'Seleccionar') {
  //     show_alert('El tipo esta vacio', 'warning')
  //   }
  //   else {
  //     param = { _id, serial, titulo, sipnosis, urlImagen, año, generos, directores, productoras, tipo }

  //     enviarSolicitud(param)
  //   }

  // }

  // const enviarSolicitud = async (param) => {

  //   if (operacion === 1) {
  //     await axios.post(url, param).then(response => {
  //       show_alert("Se guardo correctamente", "success")
  //       document.getElementById('btnCerrar').click()
  //       ListarMedias()

  //     }).catch(e => {
  //       show_alert("No se puede hacer la solicitud", "error")
  //       console.log(e)
  //     })

  //   } else if (operacion === 2) {
  //     let ruta = url + _id
  //     await axios.put(ruta, param).then(response => {
  //       show_alert("Se guardo correctamente", "success")
  //       ListarMedias()
  //       document.getElementById('btnCerrar').click()


  //     }).catch(e => {
  //       show_alert("No se puede hacer la solicitud", "error")
  //       console.log(e)
  //     })
  //   } else if (operacion === 3) {
  //     Delete(param._id, param.titulo)
  //   }
  // }
  // // METODO DE AXIOS PARA ELIMINAR 
  // const deleteaxiso = async (_id) => {
  //   setId(_id)
  //   let ruta = url + _id
  //   await axios.delete(ruta, _id)
  //   ListarMedias()
  // }
  // // MENSAJE DE CONFIRMACION ELIMINAR 
  // const Delete = async (_id, titulo) => {

  //   console.log(_id, titulo)
  //   const MySwal = withReactContent(Swal)
  //   MySwal.fire({
  //     title: 'Esta seguro de eliminar ' + titulo + ' ?',
  //     text: 'No se podra recuperar el dato eliminado',
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: 'Si, Eliminar!',
  //     cancelButtonText: 'No, Cancelar!',
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteaxiso(_id)
  //       console.log()
  //       MySwal.fire(
  //         'Eliminado!',
  //         'La pelicula o serie' + titulo + ' fue Eliminado.',
  //         'success'
  //       )
  //     } else if (
  //       result.dismiss === Swal.DismissReason.cancel
  //     ) {
  //       MySwal.fire(
  //         'Cancelado',
  //         'La eliminación fue cancelado.',
  //         'info'
  //       )
  //     }
  //   })
  // }
  // return (

  //   // BOTON PARA ABRIR MODAL
  //   <div className='App'>

  //     <div className='container-fluid'>
  //       <div className='row mt-3'>
  //         <div className='col-md-4 offset-md-4'>
  //           <div className='d-grid mx-auto' >
  //             <button onClick={() => openModal(1)} className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalDirector'>
  //               <i className='fa-solid fa-circle-plus'></i>   Añadir Peliculas o Series
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* CARDS  */}
  //     <div className='container'>
  //       <div className="container-fluid mt-3 mb-3">
  //         <div className="row row-cols-1 row-cols-md-4 g-4">
  //           {
  //             media.map(({ _id, serial, titulo, sipnosis, urlImagen, año, genero, director, productora, tipo }) => {
  //               return (
  //                 <div className="col" key={_id}>
  //                   <div className="card">
  //                     <img src={urlImagen} className="card-img-top" alt="..." />
  //                     <div className="card-body">
  //                       <h5 className="card-title">{año}</h5>
  //                       <p className="card-text">{sipnosis}</p>
  //                     </div>
  //                     <div className='card-footer text-muted text-center'>
  //                       <button type="button" onClick={() => { openModal(2, _id, serial, titulo, sipnosis, urlImagen, año, genero, director, productora, tipo); console.log(año) }} className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalDirector"><i className='fa-solid fa-edit'></i></button>&nbsp;
  //                       <button type="button" onClick={() => Delete(_id, titulo)} className='btn btn-danger '><i className='fa-solid fa-trash'></i></button>
  //                     </div>
  //                   </div>
  //                 </div>
  //               )
  //             })
  //           }
  //         </div>
  //       </div>
  //     </div>

  //     {/* FORMULARIO EN MODAL PARA GUARDAR Y ACTUALIZAR */}
  //     <div id='modalDirector' className='modal fade' aria-hidden="true">
  //       <div className='modal-dialog'>
  //         <div className='modal-content'>
  //           <div className='modal-header'>
  //             <label className='h5'>{title}</label>
  //             <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label='close'></button>
  //           </div>
  //           <div className='modal-body'>
  //             <input type='hidden' value={_id} id='id'></input>
  //             <div className='input-group mb-3'>
  //               <span className='input-group-text'><i className='fa-solid fa-barcode'></i></span>
  //               <input type='text' id='serial' className='form-control' placeholder='Serial' value={serial} onChange={(e) => setSerial(e.target.value)}></input>
  //             </div>
  //             <div className='input-group mb-3'>
  //               <span className='input-group-text'><i className='fa-solid fa-pen-to-square'></i></span>
  //               <input type='text' id='titulo' className='form-control' placeholder='Titulo' value={titulo} onChange={(e) => setTitulo(e.target.value)}></input>
  //             </div>
  //             <div className='input-group mb-3'>
  //               <span className='input-group-text'><i className='fa-solid fa-clipboard'></i></span>
  //               <input type='text' id='sipnosis' className='form-control' placeholder='Sipnosis' value={sipnosis} onChange={(e) => setSipnosis(e.target.value)}></input>
  //             </div>
  //             <div className='input-group mb-3'>
  //               <span className='input-group-text'><i className='fa-solid fa-image'></i></span>
  //               <input type='text' id='urlImagen' className='form-control' placeholder='URl' value={urlImagen} onChange={(e) => setUrl(e.target.value)}></input>
  //             </div>
  //             <div className='input-group mb-3'>
  //               <span className='input-group-text'><i className='fa-solid fa-calendar'></i></span>
  //               <input type='text' id='año' className='form-control' placeholder='Año' value={año} onChange={(e) => setAño(e.target.value)}></input>
  //             </div>
  //             <div className='input-group mb-3'>
  //               <span className='input-group-text'><i className='fa-solid fa-venus-mars'></i></span>
  //               <select type='text' id='genero' className='form-control form-select' value={genero} onChange={(e) => setGenero(e.target.value)}>
  //                 <option selected>Seleccionar...</option>
  //                 {generos.map(({ _id, nombre }) => {
  //                   return (
  //                     <option key={_id}>{nombre}</option>
  //                   )
  //                 })}
  //               </select>
  //             </div>
  //             <div className='input-group mb-3'>
  //               <span className='input-group-text'><i class="fa fa-address-book" aria-hidden="true"></i></span>
  //               <select type='text' id='director' className='form-control form-select' value={director} onChange={(e) => setDirector(e.target.value)}>
  //                 <option selected>Seleccionar...</option>
  //                 {directores.map(({ _id, nombre }) => {
  //                   return (
  //                     <option key={_id}>{nombre}</option>
  //                   )
  //                 })}
  //               </select>
  //             </div>
  //             <div className='input-group mb-3'>
  //               <span className='input-group-text'><i className='fa-solid fa-video'></i></span>
  //               <select type='text' id='productora' className='form-control form-select' value={productora} onChange={(e) => setProductora(e.target.value)}>
  //                 <option selected>Seleccionar...</option>
  //                 {productoras.map(({ _id, nombre }) => {
  //                   return (
  //                     <option key={_id}>{nombre}</option>
  //                   )
  //                 })}
  //               </select>
  //             </div>
  //             <div className='input-group mb-3'>
  //               <span className='input-group-text'><i className='fa-solid fa-arrows-down-to-people'></i></span>
  //               <select type='text' id='tipo' className='form-control form-select' alue={tipo} onChange={(e) => setProductora(e.target.value)}>
  //                 <option selected>Seleccionar...</option>
  //                 {tipos.map(({ _id, nombre }) => {
  //                   return (
  //                     <option key={_id}>{nombre}</option>
  //                   )
  //                 })}
  //               </select>
  //             </div>
  //             <div className='input-group mb-3'>
  //               <div className='d-grid col-6 mx-auto'>
  //                 <button type="button" onClick={() => validarDatos()} className='btn btn-success'><i className='fa-solid fa-floppy-disk'></i> Guardar</button>
  //               </div>
  //             </div>
  //             <div className='modal-footer'>
  //               <button type="button" className='btn btn-secondary' id="btnCerrar" data-bs-dismiss="modal"><i className='fa-solid fa-times'></i> Cerrar </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}
