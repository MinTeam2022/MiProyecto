import '../css/EditarProducto.css'

import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';


const EditarProducto = props => {

    const { isOpen, handleClose, producto, handleSave } = props

    const [productFormData, setProductFormData] = useState({
        name: "",
        description: "",
        price: 0
    })

    useEffect(() => {
        setProductFormData(producto)
    }, [producto])

    const handleFormChange = event => {
        setProductFormData({
            ...productFormData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        handleSave(productFormData)
    }

    return (
        <>
            <ReactModal
                isOpen={isOpen}
                ariaHideApp={false}
                contentLabel="Editar producto"
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
                {producto !== null &&
                    <>
                        <h1>Editando producto #{producto.id}</h1>
                        <form className="edit_modal_product_form" onSubmit={handleSubmit}>
                            <label htmlFor="edit_nombre">
                                Nombre
                                <input type="text" name="name" value={productFormData.name} onChange={handleFormChange} />
                            </label>

                            <label htmlFor="edit_nombre">
                                Descripcion
                                <input type="text" name="description" height="120" value={productFormData.description} onChange={handleFormChange} />
                            </label>

                            <label htmlFor="edit_nombre">
                                Precio
                                <input type="number" name="price" value={productFormData.price} onChange={handleFormChange} />
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

export default EditarProducto