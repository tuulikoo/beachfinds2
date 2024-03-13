import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

interface Location {
  lat: number;
  lng: number;
  display_name?: string;
  id?: string;
}

interface MapProps {
  locations: Location[];
  initialCenter?: Location;
}

const Map: React.FC<MapProps> = ({ locations, initialCenter }) => {
  const center: [number, number] = [
    initialCenter?.lat ?? locations[0].lat,
    initialCenter?.lng ?? locations[0].lng,
  ];
  const navigate = useNavigate();
  const handlePopupClick = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]}>
          <Popup>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => location.id && handlePopupClick(location.id)}
            >
              {location.display_name}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
