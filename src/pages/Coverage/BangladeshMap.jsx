import { MapContainer, TileLayer, Marker, Popup,useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


const position = [23.685, 90.3563]; // Center of Bangladesh

// Optional custom icon (can skip for default)
const customIcon = new L.Icon({
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

// Helper component to move map
function FlyToDistrict({ coords }) {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 10, { duration: 1.5 });
    }
    return null;
}

const BangladeshMap = ({ serviceCenters, activeCoords, activeDistrict }) => {
	return (
		<div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg mb-10">
			<MapContainer
				center={position}
				zoom={7}
				scrollWheelZoom={false}
				className="h-full w-full z-0 "
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				<FlyToDistrict coords={activeCoords} />
				{serviceCenters.map((center, index) => (
					<Marker
						key={index}
						position={[center.latitude, center.longitude]}
						icon={customIcon}
					>
						<Popup autoOpen={center.district === activeDistrict}>
							<strong>{center.district}</strong>
							<br />
							{center.covered_area.join(", ")}
						</Popup>
					</Marker>
				))}

				<Marker position={position} icon={customIcon}>
					<Popup>We are available across Bangladesh!</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default BangladeshMap;
