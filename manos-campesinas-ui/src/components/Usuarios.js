import '../css/Usuarios.css'

// ES5 Imports https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
//Dependencias
import { useState } from 'react'
import EditarUsuarios from '../modals/EditarUsuarios'
//Componentes

const initialUsuariosList = [
    {
        id: 1,
        cliente: "ABC",
        cconit: 12345678,
        valor: 5000

    },
    {
        id: 2,
        cliente: "ABC",
        cconit: 12345678,
        valor: 5000

    },
    {
        id: 3,
        cliente: "ABC",
        cconit: 12345678,
        valor: 5000

    },

]

const Usuarios = (props) => {

    // State #https://reactjs.org/docs/state-and-lifecycle.html
    const [usuariosList, setUsuariosList] = useState(initialUsuariosList)
    const [cliente, setCliente] = useState("")
    const [cconit, setCconit] = useState(0)
    const [valor, setValor] = useState(0)
    const [successMessage, setSuccessMessage] = useState(false)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectUsuario, setSelectedUsuario] = useState({})


    // Arrow function https://www.w3schools.com/Js/js_arrow_function.asp
    const handleClienteChange = event => {
        setCliente(event.target.value)
    }
    const handleCconitChange = event => {
        setCconit(event.target.value)
    }
    const handleValorChange = event => {
        setValor(event.target.value)
    }

    const cleanFields = () => {
        setCliente("")
        setCconit("")
        setValor(0)
    }


    const eliminarUsuario = id => {
        setUsuariosList(usuariosList.filter(usuario => usuario.id !== id))
    }

    const agregarUsuario = (event) => {
        event.preventDefault();
        let newUsuario = {
            id: usuariosList[usuariosList.length - 1].id + 1,
            cliente: cliente,
            cconit: cconit,
            valor: valor
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

    const editarUsuarios = usuarioEditado => {
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
                <input type="text" placeholder="Usuario" value={cliente} onChange={handleClienteChange} />
                <input type="number" placeholder="CC o NIT" value={cconit} onChange={handleCconitChange} />
                <input type="number" placeholder="Valor" value={valor} onChange={handleValorChange} />
                <button type="submit">Agregar</button>
            </form>
            {successMessage && <p className="usuarios_success">Producto agregado</p>}
            <table className="usuarios_table">
                <tbody className="usuarios_table_body">
                    <tr>
                        <th>Id</th>
                        <th>Cliente</th>
                        <th>Cconit</th>
                        <th>Valor</th>
                        <th>Acciones</th>
                    </tr>
                    {usuariosList.map((usuario) =>
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.cliente}</td>
                            <td>{usuario.cconit}</td>
                            <td>{usuario.valor}</td>
                            <td>
                                <button className="usuarios_edit_btn" onClick={() => MostrarEditarUsuarioModal(usuario)}>editar</button>
                                <button className="usuarios_delete_btn" onClick={() => eliminarUsuario(usuario.id)}>eliminar</button>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
            <EditarUsuarios
                isOpen={modalIsOpen}
                usuario={selectUsuario}
                handleSave={editarUsuarios}
                handleClose={handleCloseModal}
            />
        </>
    )

}

export default Usuarios