import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '/src/Firebase/firebaseConfig.js'; // Suponiendo que tienes una configuración de Firebase
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import './AdminDetallesBitacora.css';

const DetallesBitacora = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bitacora } = location.state || {};  // Si no hay estado, bitacora será undefined

    const [loading, setLoading] = useState(true);
    const [especies, setEspecies] = useState([]);
    const [selectedEspecie, setSelectedEspecie] = useState(null);  // Estado para la especie seleccionada
    const [showFormulario, setShowFormulario] = useState(false);  // Estado para mostrar el formulario
    const [nuevaEspecie, setNuevaEspecie] = useState({
        NombreComun: '',
        NombreCientifico: '',
        CantidadDeMuestras: '',
        EstadoPlanta: '',
        Familia: '',
        Fotografia: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!bitacora?.id) {
                return; // Si no hay ID de bitacora, no hacemos nada
            }

            try {
                // Obtener la subcolección de especies de la bitacora
                const especiesRef = collection(db, 'bitacoras', bitacora.id, 'especies');
                const especiesSnapshot = await getDocs(especiesRef);
                const especiesList = especiesSnapshot.docs.map(doc => doc.data());

                setEspecies(especiesList); // Guardar las especies en el estado
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener las especies: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [bitacora]);

    const handleEspecieClick = (especie) => {
        console.log("Especie seleccionada:", especie);  // Verifica si la especie contiene los datos correctos
        setSelectedEspecie(especie);  // Actualizar el estado con la especie seleccionada
    };

    const handleCloseDetails = () => {
        setSelectedEspecie(null);  // Cerrar el detalle
    };

    const handleRegresar = () => {
        navigate(-1);
    };

    const handleAgregarEspecie = () => {
        setShowFormulario(true);  // Mostrar el formulario de agregar especie
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaEspecie((prevEspecie) => ({
            ...prevEspecie,
            [name]: value
        }));
    };

    const handleSubmitFormulario = async (e) => {
        e.preventDefault();

        // Guardar la nueva especie en Firestore
        try {
            if (bitacora?.id) {
                await addDoc(collection(db, 'bitacoras', bitacora.id, 'especies'), nuevaEspecie);
                setEspecies([...especies, nuevaEspecie]); // Actualizar la lista de especies
                setShowFormulario(false);  // Ocultar el formulario después de agregar la especie
                setNuevaEspecie({
                    NombreComun: '',
                    NombreCientifico: '',
                    CantidadDeMuestras: '',
                    EstadoPlanta: '',
                    Familia: '',
                    Fotografia: ''
                });  // Limpiar el formulario
            }
        } catch (error) {
            console.error("Error al agregar la especie: ", error);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!bitacora) {
        return <p className="adb-error-message">No se encontraron detalles para esta bitácora.</p>;
    }

    return (
        <div className="adb-detalles-bitacora">
            <div className="adb-detalles-box">
                <h1 className="adb-detalles-title">Detalles de la Bitácora</h1>

                {/* Detalles de la bitácora */}
                <div className="adb-detalles-item">
                    <strong>Título:</strong> <span>{bitacora.titulo}</span>
                </div>
                <div className="adb-detalles-item">
                    <strong>Clima:</strong> <span>{bitacora.clima}</span>
                </div>
                <div className="adb-detalles-item">
                    <strong>Descripción:</strong> <span>{bitacora.descripcion}</span>
                </div>
                <div className="adb-detalles-item">
                    <strong>Fecha de Muestreo:</strong> <span>{bitacora.fecha}</span>
                </div>
                <div className="adb-detalles-item">
                    <strong>Fecha de Creación:</strong> <span>{bitacora.fechaCreacion}</span>
                </div>
                <div className="adb-detalles-item">
                    <strong>Hábitat:</strong> <span>{bitacora.habitat}</span>
                </div>
                <div className="adb-detalles-item">
                    <strong>Localización:</strong> <span>{bitacora.localizacion}</span>
                </div>
                <div className="adb-detalles-item">
                    <strong>Imagen:</strong> <span>{bitacora.imagen ? bitacora.imagen : 'No disponible'}</span>
                </div>

                {/* Información de las especies */}
                <div className="adb-especies-section">
                    <h2>Especies Asociadas</h2>
                    <button className="adb-btn-agregar-especie" onClick={handleAgregarEspecie}>Agregar Especie</button> {/* Botón para agregar especie */}
                    {especies.length > 0 ? (
                        <div className="adb-especies-list">
                            {especies.map((especie, index) => (
                                <div
                                    key={index}
                                    className="adb-especie-item"
                                    onClick={() => handleEspecieClick(especie)}  // Evento para seleccionar la especie
                                >
                                    <div className="adb-especie-details">
                                        <strong>Nombre Común:</strong> <span>{especie.NombreComun}</span>
                                    </div>
                                    <div className="adb-especie-details">
                                        <strong>Nombre Científico:</strong> <span>{especie.NombreCientifico}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No se encontraron especies asociadas a esta bitácora.</p>
                    )}
                </div>

                {/* Botón de Regresar */}
                <button className="adb-btn-regresar" onClick={handleRegresar}>
                    Regresar
                </button>
            </div>

            {/* Formulario para agregar nueva especie */}
            {showFormulario && (
                <div className="adb-especie-formulario-modal">
                    <div className="adb-modal-content">
                        <h3>Agregar Nueva Especie</h3>
                        <form onSubmit={handleSubmitFormulario}>
                            <div className="adb-detalles-item">
                                <label>Nombre Común:</label>
                                <input
                                    type="text"
                                    name="NombreComun"
                                    value={nuevaEspecie.NombreComun}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="adb-detalles-item">
                                <label>Nombre Científico:</label>
                                <input
                                    type="text"
                                    name="NombreCientifico"
                                    value={nuevaEspecie.NombreCientifico}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="adb-detalles-item">
                                <label>Cantidad de Muestras:</label>
                                <input
                                    type="number"
                                    name="CantidadDeMuestras"
                                    value={nuevaEspecie.CantidadDeMuestras}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="adb-detalles-item">
                                <label>Estado de la Planta:</label>
                                <input
                                    type="text"
                                    name="EstadoPlanta"
                                    value={nuevaEspecie.EstadoPlanta}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="adb-detalles-item">
                                <label>Familia:</label>
                                <input
                                    type="text"
                                    name="Familia"
                                    value={nuevaEspecie.Familia}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="adb-detalles-item">
                                <label>Fotografía:</label>
                                <input
                                    type="text"
                                    name="Fotografia"
                                    value={nuevaEspecie.Fotografia}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="adb-btn-agregar">
                                Agregar Especie
                            </button>
                            <button
                                type="button"
                                className="adb-btn-close"
                                onClick={() => setShowFormulario(false)}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Detalles de la especie seleccionada */}
            {selectedEspecie && (
                <div className="adb-especie-detalles-modal">
                    <div className="adb-modal-content">
                        <h3>Detalles de la Especie</h3>
                        <div className="adb-detalles-item">
                            <strong>Cantidad de Muestras:</strong> <span>{selectedEspecie.CantidadDeMuestras}</span>
                        </div>
                        <div className="adb-detalles-item">
                            <strong>Estado de la Planta:</strong> <span>{selectedEspecie.EstadoPlanta}</span>
                        </div>
                        <div className="adb-detalles-item">
                            <strong>Familia:</strong> <span>{selectedEspecie.Familia}</span>
                        </div>

                        {/* Fotografía: Mostrar imagen si la URL es válida */}
                        <div className="adb-detalles-item">
                            <strong>Fotografía:</strong>
                            {selectedEspecie.Fotografia ? (
                                <img
                                    src={selectedEspecie.Fotografia}
                                    alt="Fotografía de la especie"
                                    className="adb-especie-image"
                                />
                            ) : (
                                <span>No disponible</span>
                            )}
                        </div>

                        <div className="adb-detalles-item">
                            <strong>Nombre Científico:</strong> <span>{selectedEspecie.NombreCientifico}</span>
                        </div>
                        <div className="adb-detalles-item">
                            <strong>Nombre Común:</strong> <span>{selectedEspecie.NombreComun}</span>
                        </div>

                        <button className="adb-btn-close" onClick={handleCloseDetails}>Cerrar</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DetallesBitacora;
