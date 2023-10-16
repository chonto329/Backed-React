import React from 'react'

export const Modal = () => {
  return (
    <div className='container'>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo Genero</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="recipient-name" className="col-form-label">Nombre:</label>
                  <input type="text" className="form-control" id="recipient-name" required />
                </div>
                <div class="mb-3">
                  <label for="recipient-name" className="col-form-label">Estado:</label>
                  <select class="form-select" id="inputGroupSelect01">
                    <option selected>Seleccionar...</option>
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="message-text" className="col-form-label">Descripción:</label>
                  <textarea className="form-control" id="message-text" required></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary p-3" data-bs-dismiss="modal">Cerrar</button>
              <button type="submit" className="btn btn-primary p-3">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
