import React from 'react';
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, email: "homero.simpson@gmail.com", phoneNumber: "12345667", address: "Av Simpre Viva 123", firstName: "Homero", lastName: "Simpson" },
  { id: 2, email: "bart.simpson@gmail.com", phoneNumber: "12345667", address: "Av Simpre Viva 123", firstName: "Bart", lastName: "Simpson" },
  { id: 3, email: "marge.simpson@gmail.com", phoneNumber: "12345667", address: "Av Simpre Viva 123", firstName: "Marge", lastName: "Simpson" },
  { id: 4, email: "lisa.simpson@gmail.com", phoneNumber: "12345667", address: "Av Simpre Viva 123", firstName: "Lisa", lastName: "Simpson" },
  { id: 5, email: "maggy.simpson@gmail.com", phoneNumber: "12345667", address: "Av Simpre Viva 123", firstName: "Maggy", lastName: "Simpson" }
];

const User = () => {

  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [usuario, setUsuario] = React.useState({
    data: data,
    form: {
      id: "",
      email: "",
      phoneNumber: "",
      address: "",
      firstName: "",
      lastName: ""
    }
  });

  const handleChange = (e) => {
    setUsuario((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      }
    }));
  };

  const mostrarModalActualizar = (e) => {
    let arregloUsuarios = usuario.data;
    let userToModify;
    arregloUsuarios.map((registro) => {
      if (e.target.id == registro.id) {
        userToModify = registro;
        }
    });
    setUsuario({
      ...usuario,
      form: userToModify
    });
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = () => {
    let contador = 0;
    let usuarioAModificar = { ...usuario.form };
    let arregloUsuarios = usuario.data;
    arregloUsuarios.map((registro) => {
      if (usuarioAModificar.id === registro.id) {
        arregloUsuarios[contador]= usuarioAModificar;
      }
      contador++;
    });
    setUsuario({
      ...usuario,
      data: arregloUsuarios
    });
    setModalActualizar(false);
  };

  const eliminar = (e) => {
    let contador = 0;
    let arregloUsuarios = usuario.data;
    arregloUsuarios.map((registro) => {
      if (e.target.id == registro.id) {
        let opcion = window.confirm("¿Está seguro que desea eliminar el valor " + registro.firstName + "?");
        if (opcion) {
          arregloUsuarios.splice(contador, 1);
        }
      }
      contador++;
    });
    setUsuario({
      ...usuario,
      data: arregloUsuarios
    });
  };

  const insertar = () => {
    let usuarioACrear = { ...usuario.form };
    usuarioACrear.id = usuario.data.length + 1;
    let arregloUsuarios = usuario.data;
    arregloUsuarios.push(usuarioACrear);
    setUsuario({
      ...usuario,
      data: arregloUsuarios
    });
    setModalInsertar(false);
  }

  return (
    <>
      <Container>
        <br />
        <Button color="success" onClick={mostrarModalInsertar}>Crear</Button>
        <br />
        <br />
        <Table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
              <th>Telefóno</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {usuario.data.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.email}</td>
                <td>{dato.firstName}</td>
                <td>{dato.lastName}</td>
                <td>{dato.address}</td>
                <td>{dato.phoneNumber}</td>
                <td>
                  <Button
                    color="primary" id={dato.id}
                    onClick={mostrarModalActualizar}
                  >
                    Editar
                  </Button>{" "}
                  <Button id={dato.id} color="danger" onClick={eliminar}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={modalActualizar}>
        <ModalHeader>
          <div><h3>Actualizar Usuario {usuario.form.id}</h3></div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>
              Id:
            </label>

            <input
              className="form-control"
              readOnly
              type="text"
              value={usuario.form.id}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Email:
            </label>
            <input
              className="form-control"
              name="email"
              type="text"
              onChange={handleChange}
              value={usuario.form.email}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>
              Nombre:
            </label>
            <input
              className="form-control"
              name="firstName"
              type="text"
              onChange={handleChange}
              value={usuario.form.firstName}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Apellido:
            </label>
            <input
              className="form-control"
              name="lastName"
              type="text"
              onChange={handleChange}
              value={usuario.form.lastName}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Dirección:
            </label>
            <input
              className="form-control"
              name="address"
              type="text"
              onChange={handleChange}
              value={usuario.form.address}
            />
          </FormGroup>
          <FormGroup>
            <label>
              Telefóno:
            </label>
            <input
              className="form-control"
              name="phoneNumber"
              type="text"
              onChange={handleChange}
              value={usuario.form.phoneNumber}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            onClick={editar}
          >
            Actualizar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={cerrarModalActualizar}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div><h3>Insertar Usuario</h3></div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>
              Id:
            </label>

            <input
              className="form-control"
              readOnly
              type="text"
              value={usuario.data.length + 1}
            />
          </FormGroup>
          <FormGroup>
            <label>
              Email:
            </label>
            <input
              className="form-control"
              name="email"
              type="text"
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>
              Nombre:
            </label>
            <input
              className="form-control"
              name="firstName"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Apellido:
            </label>
            <input
              className="form-control"
              name="lastName"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Dirección:
            </label>
            <input
              className="form-control"
              name="address"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label>
              Telefóno:
            </label>
            <input
              className="form-control"
              name="phoneNumber"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={insertar}
          >
            Insertar
          </Button>
          <Button
            className="btn btn-danger"
            onClick={cerrarModalInsertar}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
export default User;
