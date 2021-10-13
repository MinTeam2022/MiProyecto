import '../css/RegistrarVenta.css'
import { useState } from 'react'

import RegistroExitoso from '../modals/RegistroExitoso'

const initialCarList = [
]


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

const RegistrarVenta = (props) => {

    const [Cliente, setCliente] = useState("")
    const [Documento, setDocumento] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)
    const [Carrito, setCarrito] = useState(initialCarList)
    const [totalCarrito, setTotalCarrito] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false)



    const handleClienteChange = event => {
        setCliente(event.target.value)
    }
    const handleDocumentoChange = event => {
        setDocumento(event.target.value)
    }

    const cleanFields = () => {
        setCliente("")
        setDocumento("")
    }

    const RegistrarVenta = (event) => {
        event.preventDefault();
        let newSell = {
            id: 1,
            Cliente: Cliente,
            Documento: Documento,
        }
        calcularTotalCarrito()
        setModalIsOpen(true)
        cleanFields()
    }


    // Productos

    const agregarProductoACarrito = producto => {
        let newCarrito = Carrito.concat(producto)
        setCarrito(newCarrito)
    }
    const eliminarProductoCarrito = indexProductAElminar => {
        let newCarrito = Carrito.filter((producto, index) => indexProductAElminar !== index)
        setCarrito(newCarrito)

    }
    const calcularTotalCarrito = () => {
        let sum = 0
        for (const carProducto of Carrito) {
            sum += carProducto.precio
        }
        setTotalCarrito(sum)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    return (
        <>
            <h3>RegistrarVenta</h3>
            <br></br>

            <br></br>
            <br></br>
            <h1>Productos</h1>
            <br></br>
            <table className="productos_table">
                <tbody className="productos_table_body">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Acción</th>
                    </tr>
                    {initialProductList.map((product) =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nombre}</td>
                            <td>{product.descripcion}</td>
                            <td>{product.precio}</td>
                            <td>
                                <button id="btn_add" onClick={() => agregarProductoACarrito(product)}>Agregar</button>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
            <br></br>

            <h3>Carrito</h3>
            <input type="text" placeholder="Cliente" value={Cliente} onChange={handleClienteChange} />
            <input type="text" placeholder="Documento" value={Documento} onChange={handleDocumentoChange} />
            <table className="carrito_table">
                <tbody className="carrito_table_body">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th></th>
                    </tr>
                    {Carrito.map((carProduct, index) =>
                        <tr key={index}>
                            <td>{carProduct.id}</td>
                            <td>{carProduct.nombre}</td>
                            <td>{carProduct.descripcion}</td>
                            <td>{carProduct.precio}</td>
                            <td>
                                <button id="btn_add" type="submit" onClick={() => eliminarProductoCarrito(index)}>Eliminar</button>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Total</th>
                        <th>{totalCarrito}</th>
                        <th></th>
                    </tr>
                </tbody>
            </table>

            <button onClick={RegistrarVenta} >Guardar</button>
            <button onClick={calcularTotalCarrito}>Calcular total</button>

            <br></br>
            <br></br>
            <RegistroExitoso
                isOpen={modalIsOpen}
                total={totalCarrito}
                handleClose={closeModal}
            />
            {successMessage && <p className="reg_success">Venta Registrada</p>}
        </>

    )
}
export default RegistrarVenta