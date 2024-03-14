import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { chargingPointList } from "./shared/chargingPointList";

interface ChargingPoint {
  zipcode: string;
  address: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  stations: number;
}

const ChargingPoint: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chargingPoints, setChargingPoints] = useState<ChargingPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<ChargingPoint | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  const handleSearch = () => {
    const filteredPoints = chargingPointList.filter((point) =>
      point.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredPoints.length > 0) {
      setChargingPoints(filteredPoints);
      setSelectedPoint(filteredPoints[0]);
      setError("");
    } else {
      setChargingPoints([]);
      setSelectedPoint(null);
      setError("No se encontraron puntos de carga.");
    }
  };

  const handlePointSelection = (point: ChargingPoint) => {
    setSelectedPoint(point);
    if (map) {
      map.setCenter({ lat: point.latitude, lng: point.longitude });
    }
  };

  const handleMapLoad = () => {
    const loader = new Loader({
      apiKey: "AIzaSyBGpTXd8OMvjB_Pz6wAJ0GBD2coevjv81c",
      version: "weekly",
    });

    loader.load().then(() => {
      const mapInstance = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 41.656322, lng: -0.87885 },
          zoom: 15,
        }
      );
      setMap(mapInstance);

      const newMarkers: google.maps.Marker[] = chargingPointList.map(
        (point) => {
          return new google.maps.Marker({
            position: { lat: point.latitude, lng: point.longitude },
            map: mapInstance,
            title: point.name,
          });
        }
      );
      setMarkers(newMarkers);
    });
  };

  useEffect(() => {
    handleMapLoad();
  }, []);

  useEffect(() => {
    if (map) {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      const newMarkers: google.maps.Marker[] = chargingPoints.map((point) => {
        return new google.maps.Marker({
          position: { lat: point.latitude, lng: point.longitude },
          map: map,
          title: point.name,
        });
      });
      setMarkers(newMarkers);
    }
  }, [chargingPoints]);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center mt-10">
      <div className="lg:w-1/3 bg-green-200 shadow-lg rounded-xl p-6 text-purple-800 lg:mr-4">
        <p className="font-bold text-xl mb-4">Buscar Puntos de Carga</p>
        <div className="text-center mt-4">
          <input
            type="text"
            className="py-3 px-6 text-lg rounded-3xl border border-gray-200 text-gray-300 placeholder:text-gray-400 focus:outline-none bg-purple-600 shadow-md"
            placeholder="Introduce la dirección"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            className="py-3 px-6 bg-green-500 text-white rounded-3xl mt-4"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {chargingPoints.length > 0 && (
          <div>
            {chargingPoints.map((chargingPoint) => (
              <div
                key={chargingPoint.id}
                className={`border border-purple-400 bg-purple-100 text-purple-900 p-4 mb-4 rounded-lg shadow-lg mt-4 ${
                  selectedPoint?.id === chargingPoint.id ? "bg-green-200" : ""
                }`}
                onClick={() => handlePointSelection(chargingPoint)}
              >
                <p className="text-lg font-semibold">
                  Código Postal: {chargingPoint.zipcode}
                </p>
                <p className="text-lg font-semibold">
                  Dirección: {chargingPoint.address}
                </p>
                <p>Latitude: {chargingPoint.latitude}</p>
                <p>Longitude: {chargingPoint.longitude}</p>
                <p className="text-lg font-semibold">
                  Nombre Estación: {chargingPoint.name}
                </p>
                <p className="text-lg font-semibold">
                  Puntos de carga disponibles: {chargingPoint.stations}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        id="map"
        className="w-full lg:w-2/3 h-80vh lg:h-auto mt-4 lg:mt-0"
        style={{ minHeight: "300px" }}
      />
    </div>
  );
};

export default ChargingPoint;
// Api google maps : AIzaSyBGpTXd8OMvjB_Pz6wAJ0GBD2coevjv81c
