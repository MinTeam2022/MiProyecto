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
    const [selectVenta, setSelectedVenta] = useState({})

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
            <h2>Busqueda de cliente</h2>
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
                                <button className="products_edit_btn" onClick={() => MostrarVentasModal(venta)}>Mostrar</button>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
            {/* <HistorialVentas
                isOpen={modalIsOpen}
                venta={selectVenta}
                handleClose={handleCloseModal}
            /> */}
        </>
    )

}

export default VentasHistorial

