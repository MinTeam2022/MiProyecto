import '../css/Productos.css'

// ES5 Imports https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
//Dependencias
import { useEffect, useState } from 'react'
import EditarProducto from '../modals/EditarProducto'
import axios from 'axios'


const backendUrl = "http://localhost:8080/products"
//Componentes


const Productos = (props) => {

    // State #https://reactjs.org/docs/state-and-lifecycle.html
    const [productosList, setProductsList] = useState([])
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState("")
    const [notification, setNotification] = useState({
        message: '',
        state: 'notification-success',
        visible: false

    })

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectProduct, setSelectedProduct] = useState({})


    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get(backendUrl)
            setProductsList(data)
        }
        fecthData()
    }, [])


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


    const eliminarProducto = async (id) => {
        try {
            await axios.delete(`${backendUrl}/${id}`)
            setProductsList(productosList.filter(product => product.id !== id))
            showNotification("Producto eliminado exitosamente", "notification-success")
        } catch (error) {
            showNotification("Hubo un error eliminando el product", "notification-error")
        }

    }

    const agregarProducto = async (event) => {
        event.preventDefault();
        let newProducto = {
            name: nombre,
            description: descripcion,
            price: precio
        }
        try {
            const response = await axios.post(backendUrl, newProducto)
            newProducto = response.data
            let newProductsList = productosList.concat(newProducto)
            setProductsList(newProductsList)
            showNotification("Producto agregado exitosamente", "notification-success")
            cleanFields()

        } catch (error) {
            showNotification("Hubo un error agregando", "notification-error")
        }


    }

    const showNotification = (message, state = "notification-success") => {
        setNotification({
            message,
            state,
            visible: true
        })
        setTimeout(() => {
            setNotification({
                message: '',
                state: 'notification-success',
                visible: false
            })
        }, 5000)
    }

    const MostrarEditarProductoModal = producto => {
        setSelectedProduct(producto)
        setModalIsOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedProduct({})
        setModalIsOpen(false)
    }

    const editarProducto = async (productoEditado) => {

        try {
            await axios.put(`${backendUrl}/${productoEditado.id}`, productoEditado)
            const indexProductAEditar = productosList.findIndex(producto => producto.id === productoEditado.id)
            let newProductsList = productosList
            if (indexProductAEditar !== -1) {
                newProductsList[indexProductAEditar] = productoEditado
                setProductsList(newProductsList)
                setSelectedProduct({})
            }
            setModalIsOpen(false)
            showNotification('Producto editado exitosamente')
        } catch (error) {
            showNotification('Hubo un error editando el producto', 'notification-error')

        }

    }

    return (

        <>
            <h2>Crear nuevo producto</h2>
            <form className="productos_form" onSubmit={agregarProducto}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={handleNombreChange} />
                <input type="text" placeholder="Descripcion" value={descripcion} onChange={handleDescripcionChange} />
                <input type="number" placeholder="Precio" value={precio} onChange={handlePrecioChange} />
                <button type="submit" className="btn btn-success">Agregar</button>
            </form>
            {notification.visible && <p className={notification.state}>{notification.message}</p>}
            <br />
            <h2>Productos</h2>
            <table className="productos_table" style={{
                marginTop: '20px'
            }}>
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
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
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