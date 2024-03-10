import jsonapi from "../assets/map.json";
import carPng from "../images/car.png";
import yellowCarPng from "../images/banner-car.png";
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("custom-storage-event-name", callback);
  return () => {
    window.removeEventListener("custom-storage-event-name", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem("theme") || "light";
}

const FrontPage = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => undefined);

  console.log(jsonapi);

  return (
    <div
      className={`dark:bg-black dark:text-white duration-300 relative flex justify-center items-center`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="order-2 sm:order-1 flex flex-col justify-center items-center sm:items-start space-y-5 sm:pr-16">
            <p className="text-primary text-lg sm:text-2xl font-serif">
              Movilidad eléctrica
            </p>
            <h1 className="text-4xl lg:text-6xl font-semibold font-serif">
              Conduce el cambio
            </h1>
            <p className="text-sm sm:text-base">
              Conducir un coche eléctrico no es solo un viaje, es un compromiso
              con nuestro planeta. Cero emisiones, cero excusas. Juntos, estamos
              cambiando el mundo, un kilómetro a la vez.
            </p>
            <button
              className="btn bg-primary text-black px-6 py-2 rounded-md transition duration-300 hover:bg-primary-80"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=YiNm6G8u30k",
                  "_blank"
                )
              }
            >
              Empieza ya!
            </button>
          </div>
          <div className="order-1 sm:order-2 flex justify-center">
            <img
              src={theme === "dark" ? carPng : yellowCarPng}
              alt=""
              className="max-w-full max-h-[500px] sm:max-h-full sm:scale-125 drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
