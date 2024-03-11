import { useEffect, useState } from "react";
import { chargingPointList } from "./shared/chargingPointList";
import { normalizeString } from "../../shared/strings";
import ChargingPoint from "./ChargingPoint";
import { Loader } from "@googlemaps/js-api-loader";

function ChargingPointV2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPoint, setSelectedPoint] = useState<ChargingPoint | undefined>(
    undefined
  );
  const [chargingPoints, setChargingPoints] = useState<ChargingPoint[]>([]);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);

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

  const handleSearch = () => {
    const filteredPoints = chargingPointList.filter((point) => {
      const pointAddress = normalizeString(point.address);
      const searchTermNormalized = normalizeString(searchTerm);

      return pointAddress.includes(searchTermNormalized);
    });

    if (filteredPoints.length > 0) {
      setChargingPoints(filteredPoints);
      setSelectedPoint(filteredPoints[0]);
      return;
    }

    setChargingPoints([]);
    setSelectedPoint(undefined);
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

  const handlePointSelection = (point: ChargingPoint) => {
    setSelectedPoint(point);
    if (map) {
      map.setCenter({ lat: point.latitude, lng: point.longitude });
    }
  };

  return (
    <div className="flex gap-5 p-5 h-[calc(100vh-144px)] ">
      <div
        id="map"
        className="w-full lg:w-2/3 h-80vh lg:h-auto mt-4 lg:mt-0 min-w-[70%] bg-yellow-400	"
      />

      <div className="w-full lg:w-2/3 h-80vh lg:h-auto mt-4 lg:mt-0 bg-black	flex flex-col p-5 gap-5 rounded-xl">
        <div className="flex flex-col gap-5 justify-center items-center bg-yellow-400 w-full h-[30%]">
          <label className="flex  gap-3">
            <span className="inline-block bg-black text-white font-bold py-2 px-4 rounded-lg shadow-lg">
              Ciudad:
            </span>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all 
          w-32
          disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            onClick={handleSearch}
          >
            enviar
          </button>
        </div>
        <div className=" bg-yellow-400 w-full h-[70%] overflow-auto">
          <p className="align-middle select-none font-sans font-bold text-center uppercase transition-all ">
            Listado Puntos de Carga disponibles:
          </p>
          {!!chargingPoints.length && (
            <>
              {chargingPoints.map((chargingPoint) => (
                <div
                  key={chargingPoint.id}
                  className="flex flex-col gap-3 justify-center items-center"
                >
                  <div
                    key={chargingPoint.id}
                    className="p-5 bg-gradient-to-br from-yellow-500 to-black rounded-lg shadow-lg"
                  >
                    <p className="text-center text-white font-bold mb-3">
                      {chargingPoint.name}
                    </p>
                    <p className="text-center text-white">
                      {chargingPoint.address}
                    </p>
                    <p className="text-center text-white">
                      Disponibles: {chargingPoint.stations}
                    </p>
                  </div>

                  <button
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all 
                    w-32
                    disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    onClick={() => handlePointSelection(chargingPoint)}
                  >
                    seleccionar
                  </button>
                  <hr className="w-full" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChargingPointV2;
