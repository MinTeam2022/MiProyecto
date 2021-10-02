import '../css/Usuarios.css'

// ES5 Imports https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
//Dependencias
import { useState } from 'react'
import EditarUsuario from '../modals/EditarUsuario'
//Componentes

const initialUsuarioList = [
    {        
        nombre: "Luisa",
        id: 1,
        rol:"vendedor",
        estado:"activo"

    },
]

const Usuarios = (props) => {

    // State #https://reactjs.org/docs/state-and-lifecycle.html
    const [usuariosList, setUsuariosList] = useState(initialUsuarioList)
    const [nombre, setNombre] = useState("")
    const [rol, setRol] = useState("")
    const [estado, setEstado] = useState(0)
    const [successMessage, setSuccessMessage] = useState(false)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectUsuario, setSelectedUsuario] = useState({})


    // Arrow function https://www.w3schools.com/Js/js_arrow_function.asp
    const handleNombreChange = event => {
        setNombre(event.target.value)
    }
    const handleRolChange = event => {
        setRol(event.target.value)
    }
    const handleEstadoChange = event => {
        setEstado(event.target.value)
    }

    const cleanFields = () => {
        setNombre("")
        setRol("")
        setEstado("")
    }


    const eliminarUsuario = id => {
        setUsuariosList(usuariosList.filter(usuario => usuario.id !== id))
    }

    const agregarUsuario = (event) => {
        event.preventDefault();
        let newUsuario = {
            id: usuariosList[usuariosList.length - 1].id + 1,
            nombre: nombre,
            rol: rol,
            estado: estado
        }
        let newUsuariosList = usuariosList.concat(newUsuario)
        setUsuariosList(newUsuariosList)
        setSuccessMessage(true)
        cleanFields()

    }

    const MostrarEditarUsuarioModal = usuario => {
        setSelectedUsuario(usuario)
        setModalIsOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedUsuario({})
        setModalIsOpen(false)
    }

    const editarUsuario = usuarioEditado => {
        const indexUsuarioAEditar = usuariosList.findIndex(usuario => usuario.id === usuarioEditado.id)
        let newUsuariosList = usuariosList
        if (indexUsuarioAEditar !== -1) {
            newUsuariosList[indexUsuarioAEditar] = usuarioEditado
            setUsuariosList(newUsuariosList)
            setSelectedUsuario({})
            setModalIsOpen(false)
        }
    }

    return (

        <>
            <h1>Usuarios</h1>
            <form onSubmit={agregarUsuario}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={handleNombreChange} />
                <input type="text" placeholder="Rol" value={rol} onChange={handleRolChange} />
                <input type="text" placeholder="Estado" value={estado} onChange={handleEstadoChange} />
                <button type="submit">Agregar</button>
            </form>
            {successMessage && <p className="productos_success">Usuario agregado</p>}
            <table className="productos_table">
                <tbody className="productos_table_body">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                    {usuariosList.map((usuario) =>
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.rol}</td>
                            <td>{usuario.estado}</td>
                            <td>
                                <button className="products_edit_btn" onClick={() => MostrarEditarUsuarioModal(usuario)}>editar</button>
                                <button className="products_delete_btn" onClick={() => eliminarUsuario(usuario.id)}>eliminar</button>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
            <EditarUsuario
                isOpen={modalIsOpen}
                usuario={selectUsuario}
                handleSave={editarUsuario}
                handleClose={handleCloseModal}
            />
        </>
    )

}

export default Usuarios