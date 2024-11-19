import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "/src/Firebase/firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

import "./crearBitacoraAdmin.css";

function BitacoraForm() {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [fecha, setFecha] = useState("");
    const [clima, setClima] = useState("");
    const [habitat, setHabitat] = useState("");
    const [localizacion, setLocalizacion] = useState("");
    const [fechaCreacion, setFechaCreacion] = useState(new Date().toISOString().split('T')[0]);
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(file);
        }
    };

    const agregarBitacora = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "bitacoras"), {
                titulo: titulo,
                descripcion: descripcion,
                fecha: fecha,
                clima: clima,
                habitat: habitat,
                localizacion: localizacion,
                fechaCreacion: fechaCreacion,
                imagen: imagen ? imagen.name : null,
            });

            console.log("Bitácora agregada con ID: ", docRef.id);

            alert("Bitácora agregada exitosamente.");

            setTitulo("");
            setDescripcion("");
            setFecha("");
            setClima("");
            setHabitat("");
            setLocalizacion("");
            setFechaCreacion(new Date().toISOString().split('T')[0]);
            setImagen(null);

        } catch (e) {
            console.error("Error al agregar la bitácora: ", e);
            alert("Hubo un error al agregar la bitácora.");
        }
    };

    const regresar = () => {
        navigate(-1);
    };

    return (
        <div className="cba-form-container">
            <h2 className="cba-form-header">Crear Bitácora</h2>
            <form className="cba-form-layout" onSubmit={agregarBitacora}>
                <div className="cba-form-group">
                    <label htmlFor="titulo" className="cba-form-label">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        className="cba-form-input"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div className="cba-form-group">
                    <label htmlFor="descripcion" className="cba-form-label">Descripción:</label>
                    <textarea
                        id="descripcion"
                        className="cba-form-textarea"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="cba-form-group">
                    <label htmlFor="clima" className="cba-form-label">Clima:</label>
                    <input
                        type="text"
                        id="clima"
                        className="cba-form-input"
                        value={clima}
                        onChange={(e) => setClima(e.target.value)}
                        required
                    />
                </div>
                <div className="cba-form-group">
                    <label htmlFor="habitat" className="cba-form-label">Hábitat:</label>
                    <input
                        type="text"
                        id="habitat"
                        className="cba-form-input"
                        value={habitat}
                        onChange={(e) => setHabitat(e.target.value)}
                        required
                    />
                </div>
                <div className="cba-form-group">
                    <label htmlFor="localizacion" className="cba-form-label">Localización:</label>
                    <input
                        type="text"
                        id="localizacion"
                        className="cba-form-input"
                        value={localizacion}
                        onChange={(e) => setLocalizacion(e.target.value)}
                        required
                    />
                </div>
                <div className="cba-form-group">
                    <label htmlFor="fecha" className="cba-form-label">Fecha del Muestreo:</label>
                    <input
                        type="date"
                        id="fecha"
                        className="cba-form-input"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div className="cba-form-group">
                    <label htmlFor="fechaCreacion" className="cba-form-label">Fecha de Creación:</label>
                    <input
                        type="date"
                        id="fechaCreacion"
                        className="cba-form-input"
                        value={fechaCreacion}
                        onChange={(e) => setFechaCreacion(e.target.value)}
                        required
                    />
                </div>
                <div className="cba-form-group">
                    <label htmlFor="imagen" className="cba-form-label">Imagen (opcional):</label>
                    <input
                        type="file"
                        id="imagen"
                        className="cba-form-file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <button type="submit" className="cba-form-submit">Agregar Bitácora</button>
            </form>
            <button onClick={regresar} className="cba-form-submit cba-regresar-button">
                Regresar
            </button>
        </div>
    );
}

export default BitacoraForm;
