import { useEffect, useState } from "react";
import Campo from "./Campo";
import EliminarContacto from "../eliminar/EliminarContacto";
import { alertaWarning } from "../utils/alertas";

const Contacto = () => {
  const [contactos, setContactos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [form, setForm] = useState({ nombre: "", apellido: "", telefono: "", correo: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [correoOriginal, setCorreoOriginal] = useState("");

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("contactos")) || [];
    setContactos(guardados);
  }, []);

  const guardarEnStorage = (lista) => localStorage.setItem("contactos", JSON.stringify(lista));

  const handleGuardar = () => {
    if (!form.nombre || !form.apellido || !form.telefono || !form.correo) {
      alertaWarning("Todos los campos son obligatorios");
      return;
    }

    if (editIndex === null && contactos.some(c => c.correo === form.correo)) {
      alertaWarning("Ya existe un contacto con este correo");
      return;
    }

    if (editIndex !== null) {
      const nuevos = contactos.map(c =>
        c.correo === correoOriginal ? { ...form, favorito: c.favorito || false } : c
      );
      setContactos(nuevos);
      guardarEnStorage(nuevos);
      setEditIndex(null);
      setCorreoOriginal("");
    } else {
      const nuevos = [...contactos, { ...form, favorito: false }];
      setContactos(nuevos);
      guardarEnStorage(nuevos);
    }

    setForm({ nombre: "", apellido: "", telefono: "", correo: "" });
    document.getElementById("btnCerrarModal").click();
  };

  const handleEditar = (correo) => {
    const contacto = contactos.find(c => c.correo === correo);
    if (contacto) {
      setForm(contacto);
      setEditIndex(contactos.findIndex(c => c.correo === correo));
      setCorreoOriginal(correo);
      document.getElementById("btnAbrirModal").click();
    }
  };

  const toggleFavorito = (correo) => {
    const nuevos = contactos.map(c =>
      c.correo === correo ? { ...c, favorito: !c.favorito } : c
    );
    setContactos(nuevos);
    guardarEnStorage(nuevos);
  };

  const handleBuscar = (e) => setBusqueda(e.target.value.toLowerCase());

  const filtrados = contactos
    .filter(
      (c) =>
        c.nombre.toLowerCase().includes(busqueda) ||
        c.correo.toLowerCase().includes(busqueda)
    )
    .sort((a, b) => {
      if (a.favorito === b.favorito) {
        return a.nombre.localeCompare(b.nombre);
      }
      return b.favorito - a.favorito;
    });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Gestor de Contactos</h2>

      <div className="d-flex justify-content-between mb-3">
        <button id="btnAbrirModal" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalContacto">
          <i className="fa-solid fa-circle-plus" /> Añadir
        </button>

        <input className="form-control w-50" placeholder="Buscar por nombre o correo" onChange={handleBuscar} />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length > 0 ? (
              filtrados.map((c, i) => (
                <tr key={c.correo}>
                  <td>{i + 1}</td>
                  <td>{c.nombre}</td>
                  <td>{c.apellido}</td>
                  <td>{c.telefono}</td>
                  <td>{c.correo}</td>
                  <td>
                    <button
                      className={`btn btn-sm me-2 ${c.favorito ? 'btn-warning' : 'btn-outline-warning'}`}
                      onClick={() => toggleFavorito(c.correo)}
                    >
                      <i className={`fa${c.favorito ? 's' : 'r'} fa-star`} />
                    </button>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(c.correo)}>
                      <i className="fa-solid fa-pen-to-square" />
                    </button>
                    <EliminarContacto contacto={c} contactos={contactos} setContactos={setContactos} />
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center">No hay contactos</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div id="modalContacto" className="modal fade" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{editIndex !== null ? "Editar" : "Agregar"} Contacto</h5>
            </div>
            <div className="modal-body">
              <Campo id="nombre" iconName="fa-solid fa-user" inputType="text" placeHolder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
              <Campo id="apellido" iconName="fa-solid fa-user" inputType="text" placeHolder="Apellido" value={form.apellido} onChange={e => setForm({ ...form, apellido: e.target.value })} />
              <Campo id="telefono" iconName="fa-solid fa-phone" inputType="tel" placeHolder="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
              <Campo id="correo" iconName="fa-solid fa-envelope" inputType="email" placeHolder="Correo" value={form.correo} onChange={e => setForm({ ...form, correo: e.target.value })} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={handleGuardar}>
                <i className="fa-solid fa-floppy-disk" /> Guardar
              </button>
              <button className="btn btn-danger" data-bs-dismiss="modal" id="btnCerrarModal">
                <i className="fa-solid fa-circle-xmark" /> Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
