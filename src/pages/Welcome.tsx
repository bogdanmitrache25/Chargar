import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 min-w-full min-h-full object-cover z-0"
      >
        <source src="src\assets\landingVideo.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white z-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 sm:mb-8 text-yellow-400 animate-bounce mt-[-50vh] sm:mt-[-25vh]">
          Bienvenido 🚗⚡
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white shadow-lg mb-4 sm:mb-0 sm:mr-4 transition duration-300"
          >
            Iniciar Sesión
          </Link>

          <Link
            to="/top-cars"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white shadow-lg mb-4 sm:mb-0 sm:mr-4 transition duration-300"
          >
            Acceso sin registro
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white shadow-lg mb-4 sm:mb-0 sm:mr-4 transition duration-300"
          >
            Registro
          </Link>
          <Link
            to="/user"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white shadow-lg transition duration-300"
          >
            Chargar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
