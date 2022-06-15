import React, { Component } from 'react';
import { variables } from './Variables.js';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export class Machines extends Component {

    constructor(props) {
        super(props);

        this.state = {
            machines: [],
            modalTitle: "",
            MachineId: 0,
            MachineName: "",
            MachineClass: "",
            MachineCompany: "",
            MachineState: "",

            MachineIdFilter: "",
            MachineNameFilter: "",
            MachineClassFilter: "",
            MachineStateFilter: "",
            MachinesWithoutFilter: []
        }
    }

    FilterFunction() {
        var MachineIdFilter = this.state.MachineIdFilter;
        var MachineNameFilter = this.state.MachineNameFilter;
        var filteredData = this.state.MachinesWithoutFilter.filter(
            function (el) {
                return el.id.toString().toLowerCase().includes(
                    MachineIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.description.toString().toLowerCase().includes(
                        MachineNameFilter.toString().trim().toLowerCase()
                    )
            }
        );

        this.setState({ machines: filteredData });

    }
    editClick(machin) {
        this.setState({
            modalTitle: "Añadir Máquina",
            MachineId: machin.MachineId,
            MachineName: machin.MachineName,
            MachineClass: machin.MachineClass,
            MachineCompany: machin.MachineCompany,
            MachineState: machin.MachineState
        });
    }


    changeMachineIdFilter = (e) => {
        this.state.MachineIdFilter = e.target.value;
        this.FilterFunction();
    }
    changeMachineNameFilter = (e) => {
        this.state.MachineNameFilter = e.target.value;
        this.FilterFunction();
    }


    refreshList() {
        fetch(variables.API_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({ machines: data, MachinesWithoutFilter: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    render() {
        const {
            machines,
            modalTitle,
            MachineId,
            MachineName,
            MachineClass,
            MachineCompany,
            MachineState,
        } = this.state;

        return (
            <div>
                <header className="cabecera">
                    <div id="logo">
                        <div id="logoUnimap">
                            <img src="./Assets/logo35x35.png" alt="logo de unimap" />
                        </div>
                        <h1 className="logoh1">
                            Uni<strong>map</strong>
                        </h1>
                    </div>
                    <div id="search">

                        <input type="search" placeholder="Buscar" onChange={this.changeMachineNameFilter} />


                    </div>


                </header>
                <div className="caja1">
                    <div className="renglon">
                        <div className="number text-align-left">
                            <input type="search" placeholder="buscar por id" onChange={this.changeMachineIdFilter} />
                        </div>
                    </div>

                    {machines.map(machin =>
                        <Link to={`/machines/${machin.id}`}>
                            <a href={`/machines/${machin.id}`} data={machin.id} onClick={() => this.editClick(machin)}>
                                <div className="renglon" key={machin.id}>
                                    <div className="number">
                                        ({machin.id})
                                    </div>
                                    <p className="text">
                                        {machin.description}
                                    </p>
                                    <div className="boton">
                                        {machin.working ? <button className="button button1"></button> : <button className="button button2"></button>}
                                    </div>
                                </div>
                            </a>
                        </Link>



                    )}
                </div>
            </div>



        )
    }
}