import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Media } from "../components/medias/Media";
import { Director } from "../components/directores/Director";
import { Productora } from "../components/productoras/Productora";
import { Tipo } from "../components/tipos/Tipo";
import { Genero } from '../components/generos/Genero'
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../components/ui/Footer';

export const Routers = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='media' element={<Media />} />
                <Route path='genero' element={<Genero />} />
                <Route path='director' element={<Director />} />
                <Route path='productora' element={<Productora />} />
                <Route path='tipo' element={<Tipo />} />

                <Route path='*' element={<Navigate to='/media' />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}