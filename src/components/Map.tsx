import { MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { useEffect } from 'react';

function UpdateMapView({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position);
  }, [map, position]);

  return null;
}

export default function MyMap({ position, zoom }: { position: [number, number]; zoom: number }) {
  return (
    <div style={{borderRadius:"30px"}}>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{ height: '200px', width: '300px',borderRadius:"30px", borderColor:"blue", zIndex:0}}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Tooltip>A pretty CSS3 popup. <br /> Easily customizable.</Tooltip>
      </Marker>
      <UpdateMapView position={position} />
    </MapContainer>

    </div>
    
  );
}
