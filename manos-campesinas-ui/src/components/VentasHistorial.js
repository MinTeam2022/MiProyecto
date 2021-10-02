import '../css/VentasHistorial.css'

// ES5 Imports https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
//Dependencias
import { useState } from 'react'
import HistorialVentas from '../modals/HistorialVentas'
//Componentes

const initialVentasList = [
    {
        id: 127635,
        cliente: "Daniel Torres",
        documento: 123456789,
        producto1: "arepas",
        vProducto1: 5000,
        producto2: "almojabanas",
        vProducto2: 4500,
        total: 9500
    },
    {
        id: 138623,
        cliente: "Luis Perez",
        documento: 189230971,
        producto1: "arepas",
        vProducto1: 6800,
        producto2: "almojabanas",
        vProducto2: 4500,
        total: 11300
    },
    {
        id: 110293,
        cliente: "Hector Perea",
        documento: 261984,
        producto1: "arepas",
        vProducto1: 15000,
        producto2: "almojabanas",
        vProducto2: 2500,
        total: 17500

    },
]

const VentasHistorial = props => {

    // State #https://reactjs.org/docs/state-and-lifecycle.html
    const [ventasList, setVentasList] = useState(initialVentasList)
    const [cliente, setCliente] = useState("")
    const [documento, setDocumento] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [selectVenta, setSelectedVenta] = useState({})


    // Arrow function https://www.w3schools.com/Js/js_arrow_function.asp
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

    const MostrarVentasModal = venta => {
        setSelectedVenta(venta)
        setModalIsOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedVenta({})
        setModalIsOpen(false)
    } 
    
    
    const busqueda = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = initialVentasList.filter((user) => {
                return user.cliente.toLowerCase().startsWith(keyword.toLowerCase());
                // Utiliza el método toLowerCase() para que no se distingan entre mayúsculas y minúsculas
            });
            setVentasList(results);
        } else {
            setVentasList(initialVentasList);
            // si la caja de texto esta vacia muestra todos los elementos de la lista
        }

        setCliente(keyword);
    };


    return (

        <>
            <h1>Historial de Ventas</h1>
            <br></br>
            
            <input type="search" value={cliente} onChange={busqueda} className="input" placeholder="Busqueda" />
            <p>Busqueda por cliente</p>
            
            {successMessage && <p className="productos_success">Producto agregado</p>}
            <table className="productos_table">
                <tbody className="productos_table_body">
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Total Venta</th>
                        <th>Acciones</th>
                    </tr>
                    {ventasList.map((venta) =>
                        <tr key={venta.id}>
                            <td>{venta.id}</td>
                            <td>{venta.cliente}</td>
                            <td>{venta.documento}</td>
                            <td>{venta.total}</td>
                            <td>
                                <button className="products_edit_btn" onClick={() => MostrarVentasModal(venta)}>Mostrar</button>
                            </td>
                        </tr>
                    )}
                </tbody>

            </table>
            <HistorialVentas
                isOpen={modalIsOpen}
                venta={selectVenta}
                handleClose={handleCloseModal}
            />
        </>
    )
}

export default VentasHistorial

