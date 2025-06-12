import Campo from "./Campo"

const Contacto = () => {
    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalContacto"><i className="fa-solid fa-circle-plus" />  Añadir </button>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-8 offset-lg-2 mt-3">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Teléfono</th>
                                <th>Correo</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            <div id="modalContacto" className="modal fade" aria-hidden="true" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">Agregar Contacto</label>
                        </div>
                        <div className="modal-body">
                            <Campo id="nombre" iconName="fa-solid fa-user" inputType="text" placeHolder="Nombre" />
                            <Campo id="apellido" iconName="fa-solid fa-user" inputType="text" placeHolder="Apellido" />
                            <Campo id="telefono" iconName="fa-solid fa-phone" inputType="tel" placeHolder="Teléfono" />
                            <Campo id="correo" iconName="fa-solid fa-envelope" inputType="email" placeHolder="Correo Electrónico" />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success"> <i className="fa-solid fa-floppy-disk"/> Guardar</button>
                            <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss="modal"><i className="fa-solid fa-circle-xmark"/> Cerrar</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacto