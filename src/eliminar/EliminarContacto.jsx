const EliminarContacto = ({ index, contactos, setContactos }) => {
  const eliminar = () => {
    if (confirm("¿Estás seguro de eliminar este contacto?")) {
      const actualizados = [...contactos];
      actualizados.splice(index, 1);
      setContactos(actualizados);
      localStorage.setItem("contactos", JSON.stringify(actualizados));
    }
  };

  return (
    <button className="btn btn-danger btn-sm" onClick={eliminar}>
      <i className="fa-solid fa-trash" />
    </button>
  );
};

export default EliminarContacto;

