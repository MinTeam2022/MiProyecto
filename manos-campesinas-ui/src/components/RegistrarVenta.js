import '../css/RegistrarVenta.css'
import { useState } from 'react'

const RegistrarVenta = (props) => {  

    const [Cliente, setCliente] = useState("")
    const [Documento, setDocumento] = useState("")
    const [successMessage, setSuccessMessage] = useState(false)

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
        setSuccessMessage(true)
        cleanFields()
    }

    // Productos

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
     
    const [carrito, setCarrito] = useState([])
    function addCarrito () {
        onclick = 
    }
          
     
    return (
        <>
            <h3>RegistrarVenta</h3>
            <br></br>
                <form onSubmit={RegistrarVenta}>
                <input type="text" placeholder="Cliente" value={Cliente} onChange={handleClienteChange} />
                <input type="text" placeholder="Documento" value={Documento} onChange={handleDocumentoChange} />
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
                        <th>cantidad</th>
                    </tr>
                    {initialProductList.map((product) =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nombre}</td>
                            <td>{product.descripcion}</td>
                            <td>{product.precio}</td>
                            <td>
                                <button id="btn_add" type="submit">Agregar</button>
                            </td>
                        </tr>
                        )
                        }
                </tbody>

            </table>
            <br></br>
                <button type="submit" >Guardar</button>
            </form>
            <br></br>
            <br></br>
            {successMessage && <p className="reg_success">Venta Registrada</p>} 
        </>

    )
}
export default RegistrarVenta