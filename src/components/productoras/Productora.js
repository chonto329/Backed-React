import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { show_alert } from '../ui/Functions'

export const Productora = () => {

  var url = process.env.REACT_APP_BASE_URL_PRODUCTORA
  useEffect(() => {
    ListarProductora()
  }, [])

  const [Productora, setProductora] = useState([])
  const [_id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [estado, setEstado] = useState('')
  const [slogan, setSlogan] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [operacion, setOperacion] = useState('')
  const [title, setTitle] = useState("")
  const [busqueda, setBusqueda] = useState("")

  let result = []
  if (!busqueda) {
    result = Productora
  } else {
    result = Productora.filter((dato) =>
      dato.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase())
    )
  }
  const ListarProductora = async () => {
    const { data } = await axios.get(url)
    setProductora(data)
  }

  const openModal = (op, _id, nombre, estado, slogan, descripcion) => {
    setId("");
    setNombre("")
    setEstado("Seleccionar")
    setSlogan("")
    setDescripcion("")
    setOperacion(op)
    if (op === 1) {
      setTitle("Añadir Productora")
    } else if (op === 2) {
      setTitle("Modificar Productora")
      setId(_id);
      setNombre(nombre)
      setEstado(estado)
      setSlogan(slogan)
      setDescripcion(descripcion)
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
    } else if (slogan === '') {
      show_alert('El slogan esta vacio', 'warning')
    } else if (descripcion.trim() === '') {
      show_alert('La descripcion esta vacia', 'warning')
    } else {
      param = { _id, nombre, estado, slogan, descripcion }

      enviarSolicitud(param)
    }

  }

  const enviarSolicitud = async (param) => {

    if (operacion === 1) {
      await axios.post(url, param).then(response => {
        show_alert("Se guardo correctamente", "success")
        document.getElementById('btnCerrar').click()
        ListarProductora()

      }).catch(e => {
        show_alert("No se puede hacer la solicitud", "error")
        console.log(e)
      })

    } else if (operacion === 2) {
      let ruta = url + _id
      await axios.put(ruta, param).then(response => {
        show_alert("Se guardo correctamente", "success")
        ListarProductora()
        document.getElementById('btnCerrar').click()


      }).catch(e => {
        show_alert("No se puede hacer la solicitud", "error")
        console.log(e)
      })
    } else if (operacion === 3) {
      Delete(param._id, param.nombre)
    }
  }
  // METODO DE AXIOS PARA ELIMINAR 
  const deleteaxios = async (_id) => {
    setId(_id)
    let ruta = url + _id
    await axios.delete(ruta, _id)
    ListarProductora()
  }
  // MENSAJE DE CONFIRMACION ELIMINAR 
  const Delete = async (_id, nombre) => {

    console.log(_id, nombre)
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: 'Esta seguro de eliminar la productora ' + nombre + ' ?',
      text: 'No se podra recuperar el dato eliminado',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteaxios(_id)
        console.log()
        MySwal.fire(
          'Eliminado!',
          'La productora ' + nombre + ' fue Eliminado.',
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
  return (

    // BOTON PARA ABRIR MODAL
    <div className='App'>

      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto' >
              <button onClick={() => openModal(1)} className='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalDirector'>
                <i className='fa-solid fa-circle-plus'></i>   Añadir Productora
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
                  <th>Slogan</th>
                  <th>descripcion</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {result.map(({ _id, nombre, estado, slogan, descripcion }, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{nombre}</td>
                      <td>{estado ? 'Activo' : 'Inactivo'}</td>
                      <td>{slogan}</td>
                      <td>{descripcion}</td>
                      <td>
                        <button type="button" onClick={() => openModal(2, _id, nombre, estado, slogan, descripcion)} className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalDirector"><i className='fa-solid fa-edit'></i></button>&nbsp;
                        <button type="button" onClick={() => Delete(_id, nombre)} className='btn btn-danger '><i className='fa-solid fa-trash'></i></button>
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
                <span className='input-group-text'><i className='fa-solid fa-user-check'></i></span>
                <select type='text' id='estado' className='form-control form-select' value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option selected>Seleccionar...</option>
                  <option >Activo</option>
                  <option >Inactivo</option>
                </select>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-id-card'></i></span>
                <input type='text' id='slogan' className='form-control' placeholder='Slogan' value={slogan} onChange={(e) => setSlogan(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-id-card'></i></span>
                <textarea type='text' id='Descripcion' className='form-control' placeholder='Descripcion' value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
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

    </div>
  )
}
