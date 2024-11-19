import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom'; // Para la navegación
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ data }) => {
    return (
        <div className="map-container">
            <MapContainer center={[6.244203, -75.581211]} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data.map((sample, index) => (
                    <Marker key={index} position={[sample.latitude, sample.longitude]}>
                        <Popup>
                            <h3>{sample.name}</h3>
                            <p>{sample.date}</p>
                            <p>{sample.description}</p>
                            <Link to={`/mapa-detalado/${sample.name}`}>Ver detalles</Link>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
