import '../css/EditarProducto.css'

import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';


const EditarVenta = props => {

    const { isOpen, handleClose, venta, handleSave } = props

    const [ventaFormData, setVentaFormData] = useState({
        cliente: "",
        documento : "",
        producto1: "",
        vProducto1: 0,
        producto2: "",
        vProducto2: 0,
        total: 0
    })

    useEffect(() => {
        setVentaFormData(venta)
    }, [venta])

    const handleFormChange = event => {
        setVentaFormData({
            ...ventaFormData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        handleSave(ventaFormData)
    }

    return (
        <>
            <ReactModal
                isOpen={isOpen}
                ariaHideApp={false}
                contentLabel="Editar Venta"
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
                {venta !== null &&
                    <>
                        <h1>Venta #{venta.id}</h1>
                        <form className="edit_modal_product_form" onSubmit={handleSubmit}>
                            <label htmlFor="edit_nombre">
                                Cliente: {ventaFormData.cliente} || Documento:  {ventaFormData.documento}
                            </label>

                            <label htmlFor="edit_nombre">
                                Producto 1: {ventaFormData.producto1} || Valor: {ventaFormData.vProducto1}
                            </label>
                            <label htmlFor="edit_nombre">
                                Producto 2: {ventaFormData.producto2} || Valor: {ventaFormData.vProducto2}
                            </label>
                            <label htmlFor="edit_nombre">
                                Total Venta: {ventaFormData.total}
                            </label>
                            <div className="edit_modal_btn_group">                                
                                <button className="btn-cancel" onClick={handleClose}>Cancelar</button>
                            </div>
                        </form>

                    </>
                }

            </ReactModal>
        </>
    )
}

export default EditarVenta