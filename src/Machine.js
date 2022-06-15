import React, { Component } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import './App.css';



export const Machine = () => {
    const { id } = useParams();
    // console.log(useParams())

    const [machine, setMachine] = React.useState({})
    const [data, setData] = React.useState({})
    const [general, setGeneral] = React.useState({})
    const [operacion, setOperacion] = React.useState({})
    const [clima, setClima] = React.useState({})

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch(`https://wrk.acronex.com/api/challenge/machines/${id}`)
        const api = await data.json()
        setMachine(api)
        setData(api.data)
        setGeneral(api.data.General)
        setOperacion(api.data['Operación'])
        setClima(api.data.Clima)

    }


    return (
        <div>
            <header className="cabecera">
                <div id="logo">
                    <div id="logoUnimap">
                        <img src="../Assets/logo35x35.png" alt="logo de unimap" />
                    </div>
                    <h1 className="logoh1">
                        Uni<strong>map</strong>
                    </h1>
                </div>
                <div id="search">
                    <input type="search" placeholder="buscar" />
                </div>
            </header>
            <div className="Caja2">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <h3>
                                {machine.description}
                            </h3>
                            <blockquote className="blockquote pt">
                                <p className="mb-6">
                                    Empresa
                                </p>
                                <div className="atributos">
                                    {machine.company}
                                </div>
                            </blockquote>
                            <blockquote className="blockquote">
                                <p className="mb-6">
                                    Clase
                                </p>
                                <div className="atributos">
                                    {machine.class}
                                </div>
                            </blockquote>
                            <blockquote className="blockquote">
                                <p className="mb-6">
                                    Estado
                                </p>
                                <div className="atributos">
                                    {machine.working ? <a><button className="button button1"></button>   Detenida</a> : <a><button className="button button2"></button>   En movimiento</a>}
                                </div>
                            </blockquote>
                            <blockquote className="blockquote">
                                <p className="mb-6">
                                    Última actualización
                                </p>
                                <div className="atributos">
                                    {machine.last_update}
                                </div>
                            </blockquote>
                        </div>
                        <div className="col-md-8">
                            <table className="table">           
                                        <h4>
                                            General
                                        </h4>

                                <tbody>
                                    <tr>
                                        <td>
                                            Cosechando
                                        </td>
                                        <td>
                                            {machine.moving}
                                        </td>
                                    </tr>
                                    <tr className="table">
                                        <td>
                                            Bateria interna
                                        </td>
                                        <td>
                                            {general['Batería Interna']}
                                        </td>
                                    </tr>
                                    <tr className="table">
                                        <td>
                                            Bateria vehículo
                                        </td>
                                        <td>
                                            {general['Batería Vehiculo']}
                                        </td>
                                    </tr>
                                    <tr className="table">
                                        <td>
                                            Uso Combustible
                                        </td>
                                        <td>
                                            {operacion['Producto / min']}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table">
                                        <h4>
                                            Clima
                                        </h4>
                                <tbody>
                                    <tr>
                                        <td>
                                            Temperatura
                                        </td>
                                        <td>
                                            {clima != undefined ? clima['Temperatura'] : "-"}
                                        </td>
                                    </tr>
                                    <tr className="table">
                                        <td>
                                            Humedad
                                        </td>
                                        <td>
                                            {clima != undefined ? clima['Humedad'] : "-"}
                                        </td>
                                    </tr>
                                    <tr className="table">
                                        <td>
                                            Dirección Viento
                                        </td>
                                        <td>
                                            {clima != undefined ? clima['Direccion Viento'] : "-"}
                                        </td>
                                    </tr>
                                    <tr className="table">
                                        <td>
                                            Velocidad viento
                                        </td>
                                        <td>
                                            {clima != undefined ? clima['Velocidad Viento'] : "-"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table">
                                        <h4>
                                            Operación
                                        </h4>
                                <tbody>
                                    <tr>
                                        <td>
                                            Velocidad
                                        </td>
                                        <td>
                                            {operacion['Velocidad']}
                                        </td>
                                    </tr>
                                    <tr className="table">
                                        <td>
                                            Presión
                                        </td>
                                        <td>
                                            {operacion['Presión']}
                                        </td>
                                    </tr>
                                    <tr className="table">
                                        <td>
                                            Producto / hectarea
                                        </td>
                                        <td>
                                            {operacion['Producto / hectarea']}
                                        </td>
                                    </tr>
                                    <tr className="table">
                                        <td>
                                            Ancho
                                        </td>
                                        <td>
                                            {operacion['Viento err']}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <NavLink className="btn btn-light btn-outline-primary" to="/machines">
              Volver
            </NavLink>
        </div>
    )
}
