import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ppalAdmin.css';

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="eco-admin-dashboard">
      <div className="eco-dashboard-header">
        <h1>Panel de Administrador</h1>
        <button className="eco-logout-action" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <div className="eco-dashboard-content">
        <div className="eco-dashboard-section">
          <h2>Gestión de Bitácoras</h2>
          <p className="eco-section-description">
            Administra y organiza las bitácoras de muestreo de forma eficiente. Aquí puedes crear nuevas bitácoras o ver una lista de las existentes.
          </p>
          <div className="eco-section-actions">
            <button onClick={() => navigate('/crear-bitacora')}>Crear Bitácora</button>
            <button onClick={() => navigate('/lista-bitacoras')}>Ver Lista de Bitácoras</button>
          </div>
        </div>

        <div className="eco-dashboard-section">
          <h2>Mapa de Muestreos</h2>
          <p className="eco-section-description">
            Visualiza todos los puntos de muestreo en el mapa para facilitar la toma de decisiones y planificación.
          </p>
          <div className="eco-section-actions">
            <button onClick={() => navigate('/mapa-muestreos')}>Ver Mapa de Muestreos</button>
          </div>
        </div>

        <div className="eco-dashboard-section">
          <h2>Gestión de Usuarios</h2>
          <p className="eco-section-description">
            Administra los usuarios registrados en el sistema, gestionando roles y permisos para una administración eficiente.
          </p>
          <div className="eco-section-actions">
            <button onClick={() => navigate('/gestion-usuarios')}>Administrar Usuarios</button>
          </div>
        </div>

        <div className="eco-dashboard-section">
          <h2>Categorías de Muestreo</h2>
          <p className="eco-section-description">
            Gestiona las categorías de los muestreos, permitiendo clasificar los datos y facilitar la organización del sistema.
          </p>
          <div className="eco-section-actions">
            <button onClick={() => navigate('/categorias-muestreo')}>Administrar Categorías</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;