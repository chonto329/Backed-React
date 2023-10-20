import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { show_alert } from '../ui/Functions'

export const Tipo = () => {

  var url = process.env.REACT_APP_BASE_URL_TIPO
  useEffect(() => {
    ListarTipo()
  }, [])

  const [tipo, setTipo] = useState([])
  const [_id, setId] = useState('')
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [operacion, setOperacion] = useState('')
  const [title, setTitle] = useState("")
  const [busqueda, setBusqueda] = useState("")

  let result = []
  if (!busqueda) {
    result = tipo
  } else {
    result = tipo.filter((dato) =>
      dato.nombre.toLowerCase().includes(busqueda.toLocaleLowerCase())
    )
  }
  const ListarTipo = async () => {
    const { data } = await axios.get(url)
    setTipo(data)
  }

  const openModal = (op, _id, nombre, descripcion) => {
    setId("");
    setNombre("")
    setDescripcion("")
    setOperacion(op)
    if (op === 1) {
      setTitle("Añadir Tipo")
    } else if (op === 2) {
      setTitle("Modificar Tipo")
      setId(_id);
      setNombre(nombre)
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
    } else if (descripcion.trim() === '') {
      show_alert('El estado esta vacio', 'warning')
    } else {
      param = { _id, nombre, descripcion }

      enviarSolicitud(param)
    }

  }

  const enviarSolicitud = async (param) => {

    if (operacion === 1) {

      await axios.post(url, param).then(response => {
        show_alert("Se guardo correctamente", "success")
        document.getElementById('btnCerrar').click()
        ListarTipo()

      }).catch(e => {
        show_alert("No se puede hacer la solicitud", "error")
        console.log(e)
      })
    } else if (operacion === 2) {
      let ruta = url + _id
      await axios.put(ruta, param).then(response => {
        show_alert("Se guardo correctamente", "success")
        ListarTipo()
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
  const deleteaxiso = async (_id) => {
    setId(_id)
    let ruta = url + _id
    await axios.delete(ruta, _id)
    ListarTipo()
  }
  // MENSAJE DE CONFIRMACION ELIMINAR 
  const Delete = async (_id, nombre) => {

    console.log(_id, nombre)
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: 'Esta seguro de eliminar el tipo ' + nombre + ' ?',
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
          'El tipo ' + nombre + ' fue Eliminado.',
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
                <i className='fa-solid fa-circle-plus'></i>   Añadir Tipo
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
                  <th>Descripcion</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {result.map(({ nombre, descripcion, _id }, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{nombre}</td>
                      <td>{descripcion}</td>
                      <td>
                        <button type="button" onClick={() => openModal(2, _id, nombre, descripcion)} className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalDirector"><i className='fa-solid fa-edit'></i></button>&nbsp;
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
                <span className='input-group-text'><i className='fa-solid fa-id-card'></i></span>
                <textarea type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
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
