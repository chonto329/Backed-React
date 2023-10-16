import React from 'react';
import { Link, NavLink } from 'react-router-dom';


export const Navbar= () => {

    return (
        <div className='container'>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/media"><img alt="Logo" src={'./logo.png'}></img></Link><br></br>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                    to="/media">
                                    Peliculas y Series
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                    to="/genero">
                                    Genero
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                    to="/director">
                                    Director
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                    to="/productora">
                                    Productora
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                    to="/tipo">
                                    Tipo
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

