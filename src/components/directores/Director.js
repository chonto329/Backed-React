import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { show_alert } from '../ui/Functions'

export const Director = () => {

  var url = process.env.REACT_APP_BASE_URL_DIRECTORES
  console.log(url)
  useEffect(() => {
    ListarDirector()

  }, [])

  // const extraerValores = () => {

  //   window.addEventListener('Change', () => {
  //     let valorOption = directorEstado.value;
  //     setEstado(valorOption)
  //     console.log(setEstado(valorOption))

  //     var optionSelect = directorEstado.options[directorEstado.selectedIndex];

  //     console.log("Opción:", optionSelect.text);
  //     console.log("Valor:", optionSelect.value);

  //     /*Mostrando el resultado en el input*/
  //     let inputResult = document.querySelector('#result').value = (optionSelect.text + ' - ' + optionSelect.value);

  //     /* Mostrando resultado en la capa capaResultado*/
  //     const capa = document.querySelector('#capaResultado');
  //     capa.textContent = `Mi lenguaje es: ${valorOption}`;
  //   });
  // }


  const [director, setDirector] = useState([])
  const [_id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [estado, setEstado] = useState('')
  const [ValorSelect , setValorSelect] = useState('')
  const [operacion, setOperacion] = useState('')
  const [title, setTitle] = useState("")
  const [busqueda, setBusqueda] = useState("")

  let result = []
  if (!busqueda) {
    result = director
  } else {
    result = director.filter((dato) =>
      dato.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase())
    )
  }

  const ListarDirector = async () => {
    await axios.get(url).then((response) => {
      console.log(response)
      setDirector(response.data)
    })

  }

  const openModal = (op, _id, nombre, estado) => {
    setId("");
    setNombre("")
    setEstado("Seleccionar")
    setOperacion(op)
    if (op === 1) {
      setTitle("Añadir Director")
    } else if (op === 2) {
      setTitle("Modificar Director")
      setId(_id);
      setNombre(nombre)
      setEstado(estado)
    } else if (op === 3) {
      setId(_id);
    }
    window.setTimeout(() => {
      document.getElementById('nombre').focus()
    }, 500)
  }

  const validarDatos = () => {

    var param

    if (nombre.trim() === '') {
      show_alert('El nombre esta vacio', 'warning')
    } else if (estado === 'Seleccionar') {
      show_alert('El estado esta vacio', 'warning')
    } else {
      param = { _id, nombre, estado }

      enviarSolicitud(param)
    }

  }

  const enviarSolicitud = async (param) => {

    if (operacion === 1) {
      await axios.post(url, param).then(response => {
        show_alert("Se guardo correctamente", "success")
        document.getElementById('btnCerrar').click()
        ListarDirector()

      }).catch(e => {
        show_alert("No se puede hacer la solicitud", "error")
        console.log(e)
      })

    } else if (operacion === 2) {
      let ruta = url + _id
      await axios.put(ruta, param).then(response => {
        show_alert("Se guardo correctamente", "success")
        ListarDirector()
        document.getElementById('btnCerrar').click()


      }).catch(e => {
        show_alert("No se puede hacer la solicitud", "error")
        console.log(e)
      })
    } else if (operacion === 3) {
      DeleteDirector(param._id, param.nombre)
    }
  }
  // METODO DE AXIOS PARA ELIMINAR 
  const deleteaxiso = async (_id) => {
    setId(_id)
    let ruta = url + _id
    await axios.delete(ruta, _id)
    ListarDirector()
  }
  // MENSAJE DE CONFIRMACION ELIMINAR 
  const DeleteDirector = async (_id, nombre) => {

    console.log(_id, nombre)
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: 'Esta seguro de eliminar el director ' + nombre + ' ?',
      text: 'No se podra recuperar el dato eliminado',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteaxiso(_id)
        console.log()
        MySwal.fire(
          'Eliminado!',
          'El director ' + nombre + ' fue Eliminado.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        MySwal.fire(
          'Cancelado',
          'La eliminación fue cancelado.',
          'info'
        )
      }
    })
  }

  const options = [
    { label: 'Seleccionar', value: 'Seleccionar' },
    { label: 'Activo', value: true },
    { label: 'Inactivo', value: false }

  ]
  return (

    // BOTON PARA ABRIR MODAL
    <div className='App'>

      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto' >
              <button onClick={() => openModal(1)} className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalDirector'>
                <i className='fa-solid fa-circle-plus'></i>   Añadir Director
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA DE BUSQUEDA */}
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-8 offset-md-2'>
            <input className="form-control mr-sm-2" type="text" name='buscar' onChange={(e) => setBusqueda(e.target.value)} value={busqueda} placeholder="Buscar"></input>
          </div>
        </div>
      </div>

      {/* TABLA DE LISTAR DIRECTORES */}
      <div className='row mt-3'>
        <div className='col-12 col-lg-8 offset-lg-2'>
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {result.map(({ nombre, estado, _id }, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{nombre}</td>
                      <td>{estado ? 'Activo' : 'Inactivo'}</td>
                      <td>
                        <button type="button" onClick={() => openModal(2, _id, nombre, estado)} className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalDirector"><i className='fa-solid fa-edit'></i></button>&nbsp;
                        <button type="button" onClick={() => DeleteDirector(_id, nombre)} className='btn btn-danger '><i className='fa-solid fa-trash'></i></button>
                      </td>
                    </tr>
                  )
                })
                }
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FORMULARIO EN MODAL PARA GUARDAR Y ACTUALIZAR */}
      <div id='modalDirector' className='modal fade' aria-hidden="true">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label='close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' value={_id} id='id'></input>
              
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-id-card'></i></span>
                <input type='text' id='nombre' className='form-control' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text' id='estado'><i className='fa-solid fa-user-check'></i></span>
                <select type='text' className='form-control form-select' onChange={(e) =>{ setEstado(e.target.value); console.log(e.target.value)}}>
                  <option selected>Seleccionar...</option>
                  <option >Activo</option>
                  <option >Inactivo</option>
                  </select>
              <p></p>
            </div>
            <div className='d-grid col-6 mx-auto'>
              <button type="button" onClick={() => validarDatos()} className='btn btn-success'><i className='fa-solid fa-floppy-disk'></i> Guardar</button>
            </div>
          </div>
          <div className='modal-footer'>
            <button type="button" className='btn btn-secondary' id="btnCerrar" data-bs-dismiss="modal"><i className='fa-solid fa-times'></i> Cerrar </button>
          </div>
        </div>
      </div>
    </div>

    </div >
  )
}
