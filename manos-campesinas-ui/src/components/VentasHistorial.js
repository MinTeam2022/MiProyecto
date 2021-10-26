import '../css/Usuarios.css'

// ES5 Imports https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
//Dependencias
import { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../utils/constants'
//Componentes

const VentasHistorial = (props) => {


    // State #https://reactjs.org/docs/state-and-lifecycle.html
    const [ventasList, setVentasList] = useState([])
    const [clienteId, setClienteId] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectedVenta, setSelectedVenta] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async (clientId = null) => {
        try {
            let options = {}
            if (clientId && clientId.length > 2) {
                options = {
                    params: {
                        clientId
                    },
                    ...options
                }
            }
            const response = await axios.get(`${backendUrl}/orders`, options)
            setVentasList(response.data)
        } catch (error) {
            console.error(error)

        }
    }

    const handleQueryChange = (event) => {
        setClienteId(event.target.value)
    }
    const buscarVentas = () => {
        fetchData(clienteId)
    }

    const mostrarDetalleVenta = async (venta) => {
        const response = await axios.get(backendUrl + "/orders/" + venta.id)
        const products = response.data.Products.map(p => {
            return {
                id: p.id,
                name: p.name,
                quantity: p.OrderProducts.quantity,
                price: p.price
            }
        })
        setSelectedVenta({
            ...venta,
            products
        })

    }

    const MostrarVentasModal = venta => {
        setSelectedVenta(venta)
        setModalIsOpen(true)
    }


    const handleCloseModal = () => {
        setSelectedVenta({})
        setModalIsOpen(false)
    }
    return (

        <>
            <h2>Busqueda por cliente</h2>
            <br></br>
            <div style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "400px"
            }}>
                <input type="search" value={clienteId} onChange={handleQueryChange} className="input" placeholder="Documento" style={{
                    marginBottom: "10px",
                    height: "30px",
                    border: "solid 1p black",
                    padding: "10px",
                    paddingLeft: "10px"
                }} />
                <input type="button" onClick={buscarVentas} className="btn btn-success" value="Buscar" />
            </div>

            {successMessage && <p className="productos_success">Se encontraron resultados</p>}
            <br />
            <h2>Ventas</h2>
            <table className="productos_table">
                <tbody className="productos_table_body">
                    <tr>
                        <th>Id de Venta</th>
                        <th>Cliente</th>
                        <th>Documento</th>
                        <th>Total Venta</th>
                        <th>Acciones</th>
                    </tr>
                    {ventasList.map((venta) =>
                        <tr key={venta.id}>
                            <td>{venta.id}</td>
                            <td>{venta.cliente.name}</td>
                            <td>{venta.cliente.documentId}</td>
                            <td>{venta.total}</td>
                            <td>
                                <button className="products_edit_btn" onClick={() => mostrarDetalleVenta(venta)}>Mostrar</button>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
            <br></br>
            {selectedVenta &&
                <>
                    <h1>Venta #{selectedVenta.id}</h1>
                    <h2>Cliente:{selectedVenta.cliente.name}</h2>
                    <h2>Documeno cliente:{selectedVenta.cliente.documentId}</h2>
                    <h2>Vendedor:{selectedVenta.vendedor.name}</h2>
                    

                    <table className="productos_table">
                        <tbody className="productos_table_body">
                            <tr>
                                <th>Producto</th>
                                <th>Precio unitario</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                            </tr>
                            {selectedVenta.products.map(p => (

                                <tr>
                                    <td>{p.name}</td>
                                    <td>{p.price}</td>
                                    <td>{p.quantity}</td>
                                    <td>{p.quantity*p.price}</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td><b>Total</b></td>
                                <td><b>{selectedVenta.total}</b></td>
                            </tr>
                        </tbody>
                    </table>
                   

                </>
            }
        </>
    )

}

export default VentasHistorial

