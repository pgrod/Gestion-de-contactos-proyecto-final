import Swal from 'sweetalert2';

const EliminarContacto = ({ index, contactos, setContactos }) => {
  const eliminar = () => {
    Swal.fire({
      title: '¿Estás seguro de eliminar este contacto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizados = [...contactos];
        actualizados.splice(index, 1);
        setContactos(actualizados);
        localStorage.setItem('contactos', JSON.stringify(actualizados));

        Swal.fire('Eliminado', 'El contacto ha sido eliminado.', 'success');
      }
    });
  };

  return (
    <button className="btn btn-danger btn-sm" onClick={eliminar}>
      <i className="fa-solid fa-trash" />
    </button>
  );
};

export default EliminarContacto;


