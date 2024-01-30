import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ stations }) => {

  return (
    <MapContainer
      center={[38.8235584, -0.6043974]}
      zoom={14}
      style={{
        height: "600px",
        width: "70%",
        margin: "8%",
        borderRadius: "10px",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lon]}
          
        >
          <Popup>
            <h5>
              <b>Estació</b>
            </h5>
            <p>
              Nombre: <b>{station.name}</b>
            </p>
            <p>
              Bicicletes disponibles: <b>{station.num}</b>
              </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
