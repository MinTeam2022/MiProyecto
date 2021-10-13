import '../css/EditarUsuario.css'

import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

const UsuarioExitoso = props => {

    const { isOpen, handleClose, usuario, handleSave } = props

    const [usuarioFormData, setUsuarioFormData] = useState({
        cliente: "",
        cconit: 0,
        valor: 0
    })

    useEffect(() => {
        setUsuarioFormData(usuario)
    }, [usuario])

    
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
                        backgroundColor: 'rgb(0 0 0 / 75%)',
                        color: '#35FF0D',                        
                    },
                    content: {
                        position: 'absolute',
                        maxWidth: "300px",
                        maxHeight: "100px",
                        margin: "auto",
                        coor: '#35FF0D',
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
                        <h1>Actualizacion Exitosa</h1>
                        <button className="btn-cancel" onClick={handleClose}>Cerrar</button>
                    </>
                }

            </ReactModal>
        </>
    )
}

export default UsuarioExitoso