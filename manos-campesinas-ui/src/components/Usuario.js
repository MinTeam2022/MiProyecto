import '../css/Usuarios.css'

// ES5 Imports https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
//Dependencias
import { useEffect, useState } from 'react'
import EditarUsuario from '../modals/EditarUsuario'
//Componentes

import axios from 'axios';


const Usuarios = (props) => {

    // State #https://reactjs.org/docs/state-and-lifecycle.html
    const [usuariosList, setUsuariosList] = useState([])
    const [nombre, setNombre] = useState("")
    const [mail, setMail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [rol, setRol] = useState("")
    const [documentId, setDocumentId] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectUsuario, setSelectedUsuario] = useState({})


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/users")
                setUsuariosList(response.data)
            } catch (error) {
                console.error(error)
            }

        }
        fetchData()
    }, [])


    // Arrow function https://www.w3schools.com/Js/js_arrow_function.asp
    const handleNombreChange = event => {
        setNombre(event.target.value)
    }
    const handleRolChange = event => {
        setRol(event.target.value)
    }
    const handleMailChange = event => {
        setMail(event.target.value)
    }
    const handleUsernameChange = event => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = event => {
        setPassword(event.target.value)
    }
    const handleDocumentIdChange = event => {
        setDocumentId(event.target.value)
    }

    const cleanFields = () => {
        setNombre("")
        setRol("")
        setUsername("")
        setMail("")
        setPassword("")
        setDocumentId("")
    }


    const eliminarUsuario = async (id) => {
        try {
            await axios.delete("http://localhost:8080/users/" + id)
            setUsuariosList(usuariosList.filter(usuario => usuario.id !== id))
        } catch (error) {
            if (error.reponse.status === 404) {
                console.error("El usuario no está creado, por lo tanto no se puede borrar")
            }
        }


    }

    const agregarUsuario = async (event) => {
        event.preventDefault();
        let newUsuario = {
            name: nombre,
            mail: mail,
            role: rol,
            username: username,
            password: password,
            documentId: documentId
        }
        try {
            const response = await axios.post("http://localhost:8080/users", newUsuario)
            newUsuario = response.data
            let newUsuariosList = usuariosList.concat(newUsuario)
            setUsuariosList(newUsuariosList)
            setSuccessMessage(true)
            cleanFields()
        } catch (error) {
            console.error(error)
        }


        let newUsuariosList = usuariosList.concat(newUsuario)
        setUsuariosList(newUsuariosList)
        setSuccessMessage(true)
        setTimeout(() => {
            setSuccessMessage(false)
        }, 2000)
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

    const editarUsuario = async (usuarioEditado) => {
        const id = usuarioEditado.id
        try {
            await axios.put("http://localhost:8080/users/" + id, usuarioEditado)
            const indexUsuarioAEditar = usuariosList.findIndex(usuario => usuario.id === usuarioEditado.id)
            let newUsuariosList = usuariosList
            if (indexUsuarioAEditar !== -1) {
                newUsuariosList[indexUsuarioAEditar] = usuarioEditado
                setUsuariosList(newUsuariosList)
                setSelectedUsuario({})
                setModalIsOpen(false)
            }

        } catch (error) {
            console.error(error)
        }


    }

    return (

        <>
            <h2>Crear nuevo usuario</h2>
            <form onSubmit={agregarUsuario} className="usuarios_form" autocomplete="off">
                <input type="text" placeholder="Nombre" value={nombre} onChange={handleNombreChange} />
                <input type="email" placeholder="Email" value={mail} onChange={handleMailChange} />
                <input type="number" placeholder="Documento" value={documentId} onChange={handleDocumentIdChange} />
                <select name="rol" placeholder="Rol" onChange={handleRolChange} value={rol}>
                    <option selected>Seleccionar rol...</option>
                    <option value="vendedor">Vendedor</option>
                    <option value="cliente">Cliente</option>
                </select>
                {rol === "vendedor" &&
                    <>
                        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
                        <input type="password" placeholder="Contraseña" value={password} onChange={handlePasswordChange} />
                    </>
                }

                <button className="btn btn-success" type="submit">Agregar</button>
            </form>
            <br />
            {successMessage && <p className="productos_success">Usuario agregado</p>}

            <h2>Usuarios</h2>
            <table className="productos_table">
                <tbody className="productos_table_body">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Documento</th>
                        <th>Acciones</th>
                    </tr>
                    {usuariosList.map((usuario) =>
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.name}</td>
                            <td>{usuario.role}</td>
                            <td>{usuario.status}</td>
                            <td>{usuario.documentId}</td>
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