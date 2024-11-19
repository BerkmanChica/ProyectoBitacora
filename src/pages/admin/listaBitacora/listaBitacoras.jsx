import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '/src/Firebase/firebaseConfig.js'; // Asegúrate de tener la configuración de Firebase
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import './ListaBitacoras.css';

const ListaBitacoras = () => {
    const [bitacoras, setBitacoras] = useState([]); // Todas las bitácoras
    const [filteredBitacoras, setFilteredBitacoras] = useState([]); // Bitácoras filtradas
    const [lastVisible, setLastVisible] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
    const navigate = useNavigate();

    // Cargar bitácoras al iniciar
    useEffect(() => {
        fetchBitacoras();
    }, []);

    // Función para obtener las bitácoras desde Firebase
    const fetchBitacoras = async () => {
        setLoading(true);
        try {
            const bitacorasRef = collection(db, "bitacoras");
            const q = query(bitacorasRef, orderBy("fecha"), limit(10));
            const querySnapshot = await getDocs(q);

            const bitacorasList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setBitacoras(bitacorasList); // Guardar todas las bitácoras
            setFilteredBitacoras(bitacorasList); // Inicialmente mostramos todas
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        } catch (error) {
            console.error("Error fetching bitácoras: ", error);
        } finally {
            setLoading(false);
        }
    };

    // Función para cargar más bitácoras cuando se hace scroll
    const loadMore = async () => {
        if (!lastVisible) return;

        setLoading(true);
        try {
            const bitacorasRef = collection(db, "bitacoras");
            const q = query(bitacorasRef, orderBy("fecha"), startAfter(lastVisible), limit(10));
            const querySnapshot = await getDocs(q);

            const bitacorasList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setBitacoras(prevBitacoras => [...prevBitacoras, ...bitacorasList]); // Cargar más
            setFilteredBitacoras(prevFilteredBitacoras => [
                ...prevFilteredBitacoras,
                ...bitacorasList,
            ]);
            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
        } catch (error) {
            console.error("Error loading more bitácoras: ", error);
        } finally {
            setLoading(false);
        }
    };

    // Manejar el cambio en el campo de búsqueda
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Actualizar el término de búsqueda
    };

    // Manejar la búsqueda cuando se presiona el botón
    const handleSearch = () => {
        if (!searchTerm) {
            setFilteredBitacoras(bitacoras); // Si no hay término, mostrar todas las bitácoras
        } else {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            const filteredData = bitacoras.filter((bitacora) => {
                // Filtrar por título, fecha o localización
                return (
                    bitacora.titulo.toLowerCase().includes(lowercasedSearchTerm) ||
                    bitacora.fecha.toLowerCase().includes(lowercasedSearchTerm) ||
                    bitacora.localizacion.toLowerCase().includes(lowercasedSearchTerm)
                );
            });
            setFilteredBitacoras(filteredData); // Actualizar las bitácoras filtradas
        }
    };

    // Navegar a la vista de detalles de la bitácora
    const handleBitacora = (bitacora) => {
        navigate("/bitacoraDet", { state: { bitacora: bitacora } });
    };

    return (
        <div className="lb-bitacoras-list-container">
            <div className="lb-header-and-cancel">
                <header className="lb-bitacoras-header">
                    <h1>Lista de Bitácoras</h1>
                </header>
            </div>

            <div className="lb-search-section">
                <input
                    type="text"
                    placeholder="Buscar por nombre, fecha..."
                    value={searchTerm}
                    onChange={handleSearchChange} // Actualiza el término de búsqueda
                />
                <button className="lb-search-btn" onClick={handleSearch}>Buscar</button> {/* Solo filtra cuando se hace clic */}
            </div>

            <table className="lb-bitacoras-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Fecha de Muestreo</th>
                        <th>Localización</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBitacoras.length > 0 ? (
                        filteredBitacoras.map((bitacora) => (
                            <tr key={bitacora.id}>
                                <td>{bitacora.id}</td>
                                <td>{bitacora.titulo}</td>
                                <td>{bitacora.fecha}</td>
                                <td>{bitacora.localizacion}</td>
                                <td className="lb-action-buttons">
                                    <Link
                                        to="/bitacoraDet"
                                        state={{ bitacora: bitacora }}
                                        className="lb-view-details-btn"
                                    >
                                        Ver Detalles
                                    </Link>
                                    <button className="lb-edit-btn">Editar</button>
                                    <button className="lb-delete-btn">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No se encontraron resultados para la búsqueda</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="lb-pagination">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <button onClick={loadMore} className="lb-load-more-btn">
                        Cargar más
                    </button>
                )}
            </div>

            <button className="lb-cancel-btn" onClick={() => navigate('/ppalAdmin')}>
                Regresar
            </button>
        </div>
    );
};

export default ListaBitacoras;
