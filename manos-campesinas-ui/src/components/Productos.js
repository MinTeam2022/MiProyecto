import '../css/Productos.css'

// ES5 Imports https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
//Dependencias
import { useState } from 'react'
import EditarProducto from '../modals/EditarProducto'
//Componentes

const initialProductList = [
    {
        id: 1,
        nombre: "Arepas",
        descripcion: "Paquete X 5",
        precio: 5000

    },
    {
        id: 2,
        nombre: "Cocadas",
        descripcion: "Paquete X 10",
        precio: 10000

    },
    {
        id: 3,
        nombre: "Salsa de Aguacate",
        descripcion: "Paquete X 1",
        precio: 20000

    },
    {
        id: 4,
        nombre: "Almojabana",
        descripcion: "Paquete X 1",
        precio: 12000

    },
]

const Productos = (props) => {

    // State #https://reactjs.org/docs/state-and-lifecycle.html
    const [productosList, setProductsList] = useState(initialProductList)
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState(0)
    const [successMessage, setSuccessMessage] = useState(false)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectProduct, setSelectedProduct] = useState({})


    // Arrow function https://www.w3schools.com/Js/js_arrow_function.asp
    const handleNombreChange = event => {
        setNombre(event.target.value)
    }
    const handleDescripcionChange = event => {
        setDescripcion(event.target.value)
    }
    const handlePrecioChange = event => {
        setPrecio(event.target.value)
    }

    const cleanFields = () => {
        setNombre("")
        setDescripcion("")
        setPrecio(0)
    }


    const eliminarProducto = id => {
        setProductsList(productosList.filter(product => product.id !== id))
    }

    const agregarProducto = (event) => {
        event.preventDefault();
        let newProducto = {
            id: productosList[productosList.length - 1].id + 1,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio
        }
        let newProductsList = productosList.concat(newProducto)
        setProductsList(newProductsList)
        setSuccessMessage(true)
        cleanFields()

    }

    const MostrarEditarProductoModal = producto => {
        setSelectedProduct(producto)
        setModalIsOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedProduct({})
        setModalIsOpen(false)
    }

    const editarProducto = productoEditado => {
        const indexProductAEditar = productosList.findIndex(producto => producto.id === productoEditado.id)
        let newProductsList = productosList
        if (indexProductAEditar !== -1) {
            newProductsList[indexProductAEditar] = productoEditado
            setProductsList(newProductsList)
            setSelectedProduct({})
            setModalIsOpen(false)
        }
    }

    return (

        <>
            <h1>Productos</h1>
            <form onSubmit={agregarProducto}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={handleNombreChange} />
                <input type="text" placeholder="Descripcion" value={descripcion} onChange={handleDescripcionChange} />
                <input type="number" placeholder="Precio" value={precio} onChange={handlePrecioChange} />
                <button type="submit">Agregar</button>
            </form>
            {successMessage && <p className="productos_success">Producto agregado</p>}
            <table className="productos_table">
                <tbody className="productos_table_body">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                    {productosList.map((product) =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nombre}</td>
                            <td>{product.descripcion}</td>
                            <td>{product.precio}</td>
                            <td>
                                <button className="products_edit_btn" onClick={() => MostrarEditarProductoModal(product)}>editar</button>
                                <button className="products_delete_btn" onClick={() => eliminarProducto(product.id)}>eliminar</button>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
            <EditarProducto
                isOpen={modalIsOpen}
                producto={selectProduct}
                handleSave={editarProducto}
                handleClose={handleCloseModal}
            />
        </>
    )

}

export default Productos