import ReactModal from 'react-modal';


const RegistroExitoso = props => {

    const { isOpen, handleClose } = props

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
                        maxHeight: "200px",
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

                <>
                    <h1 style={{
                        color: "green"
                    }}>Registro exitoso</h1>

                    <button onClick={handleClose}>Cerrar</button>
                </>


            </ReactModal>
        </>
    )
}

export default RegistroExitoso