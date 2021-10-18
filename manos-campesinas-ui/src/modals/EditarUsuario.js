import '../css/EditarUsuario.css'

import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';


const EditarUsuario = props => {

    const { isOpen, handleClose, usuario, handleSave } = props

    const [usuarioFormData, setUsuarioFormData] = useState({
        name: "",
        role: "",
        status: "",
        username: "",
        password: "",
        mail: "",
        documentId: ""

    })

    useEffect(() => {
        setUsuarioFormData(usuario)
    }, [usuario])

    const handleFormChange = event => {
        setUsuarioFormData({
            ...usuarioFormData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        handleSave(usuarioFormData)
    }

    return (
        <>
            <ReactModal
                isOpen={isOpen}
                ariaHideApp={false}
                contentLabel="Editar usuario"
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgb(0 0 0 / 75%)'
                    },
                    content: {
                        position: 'absolute',
                        maxWidth: "500px",
                        maxHeight: "400px",
                        margin: "auto",
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none',
                        padding: '20px',
                        display: "flex",
                        flexDirection: "column"
                    }
                }}
            >
                {usuario !== null &&
                    <>
                        <h1>Editando usuario #{usuario.id}</h1>
                        <form className="edit_modal_product_form" onSubmit={handleSubmit}>
                            <label htmlFor="edit_nombre">
                                Nombre
                                <input type="text" name="name" value={usuarioFormData.name} onChange={handleFormChange} />
                            </label>
                            {usuarioFormData.username &&
                                <label htmlFor="edit_nombre">
                                    Username
                                    <input type="text" name="username" value={usuarioFormData.username} onChange={handleFormChange} />
                                </label>
                            }
                            <label htmlFor="edit_nombre">
                                Email
                                <input type="email" name="mail" value={usuarioFormData.mail} onChange={handleFormChange} />
                            </label>
                            <label htmlFor="edit_nombre">
                                Documento
                                <input type="number" name="documentId" value={usuarioFormData.documentId} onChange={handleFormChange} />
                            </label>

                            <label htmlFor="edit_nombre">
                                Rol
                                <select name="role" onChange={handleFormChange} value={usuarioFormData.role}>
                                    <option>Seleccionar un rol</option>
                                    <option value="vendedor">Vendedor</option>
                                    <option value="cliente">Cliente</option>
                                </select>
                            </label>

                            <label htmlFor="edit_nombre">
                                Estado
                                <select name="status" onChange={handleFormChange} value={usuarioFormData.status}>
                                    <option value="Seleccionar estado">Seleccionar estado...</option>
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </label>
                            <div className="edit_modal_btn_group">
                                <button className="btn-success" type="submit">Guardar</button>
                                <button className="btn-cancel" onClick={handleClose}>Cancelar</button>
                            </div>
                        </form>

                    </>
                }

            </ReactModal>
        </>
    )
}

export default EditarUsuario