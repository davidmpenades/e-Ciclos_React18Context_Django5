import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Map = ({ stations }) => {
  const navigate = useNavigate();
 
  return (
    <MapContainer
      center={[38.8235584, -0.6043974]}
      zoom={14}
      style={{
        height: "600px",
        width: "70%",
        margin: "8%",
        borderRadius: "10px",
        boxShadow: "5px 6px 20px 0px rgba(0,0,0,0.75)",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stations.map((station) => (
        <Marker key={station.id} position={[station.lat, station.lon]}>
          <Popup>
            <h5>
              <b>Estación:</b>
            </h5>
            <p>
              Nombre: <b>{station.name}</b>
            </p>
            <p>
              Bicicletes disponibles: <b>{station.num}</b>
            </p>
            <p>
              Anclajes vacios: <b>{station.total_slots}</b>
            </p>
            <div className="flex justify-center">
            <Button onClick={() => navigate('/StationDetail', {state:{ stationId: station.id }} )}>Ver Estación</Button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
