import '../css/EditarUsuario.css'

import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';


const EditarUsuario = props => {

    const { isOpen, handleClose, usuario, handleSave } = props

    const [usuarioFormData, setUsuarioFormData] = useState({
        nombre: "",
        rol: "",
        estado: ""
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
                        maxHeight: "300px",
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
                                <input type="text" name="nombre" value={usuarioFormData.nombre} onChange={handleFormChange} />
                            </label>

                            <label htmlFor="edit_nombre">
                                Rol
                                <input type="text" name="rol" height="120" value={usuarioFormData.rol} onChange={handleFormChange} />
                            </label>

                            <label htmlFor="edit_nombre">
                                Estado
                                <input type="text" name="estado" value={usuarioFormData.estado} onChange={handleFormChange} />
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