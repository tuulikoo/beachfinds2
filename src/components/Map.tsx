import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41], 
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34], 
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

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
