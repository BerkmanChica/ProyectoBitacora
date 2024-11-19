import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import HomeAdmin from "./pages/admin/listaBitacora/listaBitacoras";
import PpalAdmin from "./pages/admin/ppal/ppalAdmin";
import CrearBitacoraAdmin from "./pages/admin/crearBitacoraAdmin/crearBitacoraAdmin";
import ListaBitacoras from "./pages/admin/listaBitacora/listaBitacoras";
import Mapeo from "./pages/admin/mapeo/mapeo";
import AdminUsers from "./pages/admin/Users/users";
import AdminCategories from "./pages/admin/AdminCategories/AdminCategories";
import AdminDetalles from "./pages/admin/AdminDetallesBitacora/AdminDetallesBitacora"

import "./App.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
        <Route path="/ppalAdmin" element={<PpalAdmin />} />
        <Route path="/crear-bitacora" element={< CrearBitacoraAdmin/>} />
        <Route path="/lista-bitacoras" element={< ListaBitacoras/>} />
        <Route path="/mapa-muestreos" element={<Mapeo/>} />
        <Route path="/gestion-usuarios" element={<AdminUsers />} />
        <Route path="/categorias-muestreo" element={<AdminCategories />} />
        <Route path="/bitacoraDet" element={<AdminDetalles />} />


      </Routes>
    </div>
  );
};

export default App;