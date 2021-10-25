import '../css/RegistrarVenta.css'
import { useEffect, useState } from 'react'

import RegistroExitoso from '../modals/RegistroExitoso'
import axios from 'axios'
import { UseCart, useCartDispatch } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { backendUrl } from '../utils/constants'


const RegistrarVenta = (props) => {
    const auth = useAuth()
    const [products, setProducts] = useState([])
    const [Cliente, setCliente] = useState("")
    const [Documento, setDocumento] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)

    const cart = UseCart()
    const cartDispatch = useCartDispatch()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const calculateTotalCarrito = (cart) => {
        return cart.reduce((acc, current) => acc + current.price * current.quantity, 0)
    }
    useEffect(() => {
        fecthProductsData()
    }, [])

    const fecthProductsData = async () => {
        const { data } = await axios.get(`${backendUrl}/products`)
        setProducts(data)
    }


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

    const RegistrarVenta = async (event) => {
        event.preventDefault();
        const order = {
            clientName: Cliente,
            clientDocumentId: Documento,
            vendedorId: auth.user.id
        }
        const products = cart.map(p => {
            return {
                id: p.id,
                quantity: p.quantity
            }
        })
        try {
            await axios.post(`${backendUrl}/orders`, {
                order,
                products
            })
            setModalIsOpen(true)
            cleanFields()
            cartDispatch({
                type: 'clean'
            })
        } catch (error) {
            console.error(error)
        }
    }

    // Productos

    const agregarProductoACarrito = producto => {
        const existentProduct = cart.find(p => p.id === producto.id)
        if (existentProduct) {
            cartDispatch({
                type: 'plus',
                id: producto.id
            })
        } else {
            cartDispatch({
                type: 'added',
                product: producto
            })
        }

    }
    const eliminarProductoCarrito = producto => {
        cartDispatch({
            type: 'deleted',
            id: producto.id
        })

    }
    const closeModal = () => {
        setModalIsOpen(false)
    }


    return (
        <>
            <h2>RegistrarVenta</h2>
            <br></br>
            <h2>Productos</h2>
            <br></br>
            <table className="productos_table">
                <tbody className="productos_table_body">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>cantidad</th>
                    </tr>
                    {products.map((product) =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <button id="btn_add" onClick={() => agregarProductoACarrito(product)}>Agregar</button>
                            </td>
                        </tr>
                    )
                    }
                </tbody>

            </table>
            <br></br>

            <h2 style={{
                marginBottom: "5px"
            }}>Carrito</h2>
            <input type="text" placeholder="Cliente" value={Cliente} onChange={handleClienteChange} />
            <input style={{
                marginBottom: "5px"
            }} type="text" placeholder="Documento" value={Documento} onChange={handleDocumentoChange} />
            <table className="carrito_table">
                <tbody className="carrito_table_body">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                    </tr>
                    {cart.map((carProduct, index) =>
                        <tr key={index}>
                            <td>{carProduct.id}</td>
                            <td>{carProduct.name}</td>
                            <td>{carProduct.description}</td>
                            <td>{carProduct.price}</td>
                            <td>{carProduct.quantity}</td>
                            <td>
                                <button id="btn_add" type="submit" onClick={() => eliminarProductoCarrito(carProduct)}>Eliminar</button>
                            </td>
                        </tr>
                    )}
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Total</th>
                        <th>{calculateTotalCarrito(cart)}</th>
                        <th></th>
                    </tr>
                </tbody>
            </table>

            <button onClick={RegistrarVenta} >Guardar</button>

            <br></br>
            <br></br>
            <RegistroExitoso
                isOpen={modalIsOpen}
                handleClose={closeModal}
            />
            {successMessage && <p className="reg_success">Venta Registrada</p>}
        </>

    )
}

export default RegistrarVenta