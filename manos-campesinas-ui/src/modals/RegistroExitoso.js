import ReactModal from 'react-modal';


const RegistroExitoso = props => {

    const { isOpen, handleClose, total } = props

    return (
        <>
            <ReactModal
                isOpen={isOpen}
                ariaHideApp={false}
                contentLabel="Registro exitoso"
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
                {total !== null &&
                    <>
                        <h1 style={{
                            color:"green"
                        }}>Registro exitoso</h1>
                        <ul>
                            <li><b>Total</b> <t /> {total}</li>
                        </ul>
                        <button onClick={handleClose}>Cerrar</button>
                    </>
                }

            </ReactModal>
        </>
    )
}

export default RegistroExitoso