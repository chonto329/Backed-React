import React from 'react'

export const Table = ({ generos = [] }) => {
  return (
    <div className='container'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            generos.map((genero, index) => {
              const { nombre, descripcion, estado } = genero
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{nombre}</td>
                  <td>{estado ? 'Activo' : 'Inactivo'}</td>
                  <td>{descripcion}</td>
                  <td>
                    <button type="button" className="btn btn-info">Editar</button>
                    <button type="button" className="btn btn-danger">Borrar</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
