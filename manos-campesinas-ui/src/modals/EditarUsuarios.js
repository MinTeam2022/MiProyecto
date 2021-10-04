import '../css/EditarUsuarios.css'

import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';


const EditarUsuarios = props => {

    const { isOpen, handleClose, usuario, handleSave } = props

    const [usuarioFormData, setUsuarioFormData] = useState({
        cliente: "",
        cconit: 0,
        valor: 0
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
                        <form className="edit_modal_usuario_form" onSubmit={handleSubmit}>
                            <label htmlFor="edit_nombre">
                                Cliente
                                <input type="text" name="cliente" value={usuarioFormData.cliente} onChange={handleFormChange} />
                            </label>

                            <label htmlFor="edit_nombre">
                                Cconit
                                <input type="number" name="cconit" height="120" value={usuarioFormData.cconit} onChange={handleFormChange} />
                            </label>

                            <label htmlFor="edit_nombre">
                                Valor
                                <input type="number" name="valor" value={usuarioFormData.valor} onChange={handleFormChange} />
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

export default EditarUsuarios