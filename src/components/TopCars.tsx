import sideImage from "../images/teslamodel3.png";
import bmwI4 from "../images/bmwi4.png";
import polestar2 from "../images/polestar2.png";
import teslamodely from "../images/teslamodely.png";
import kiaev6 from "../images/kiaev6.png";
import hyundayioniq5 from "../images/hyundayioniq5.png";
import kiaeniro from "../images/kiaeniro.png";
import bmwix1 from "../images/bmwix1.png";
import volvoxc40 from "../images/volvoxc40.png";
import smart from "../images/smart.png";

const TopCars = () => {
  const cars = [
    {
      id: 1,
      model: "1. Tesla Model 3",
      description: `Esta berlina eléctrica de 4,72 metros está disponible en dos versiones con distintas configuraciones de motores y batería, lo que le otorga una autonomía WLTP de entre 513 y 629 kilómetros. Su comportamiento dinámico y sus prestaciones son de primer nivel, por no hablar de la ventaja que supone la red de supercargadores de Tesla a la hora de viajar.`,
      range: " Autonomía :  629 Km",
      price: "Precio desde 40.970 €* IVA incl.",
      image: sideImage,
    },
    {
      id: 2,
      model: "2. BMW i4",
      description: `Ofrece una calidad superior en términos generales que su principal rival, el Tesla Model 3, además de conseguir unas excelentes cifras en cuanto a autonomía (de entre 520 y 589 Km) y prestaciones. Destaca en cuanto a confort la versión básica y su principal desventaja es su mayor precio.`,
      range: " Autonomía :  590 Km",
      price: "Precio desde 51.990  €* IVA incl.",
      image: bmwI4,
    },
    {
      id: 3,
      model: " 3. Polestar 2",
      description: `Es el primer modelo de Polestar y ya está rivalizando directamente con los mejores eléctricos del mercado. Su autonomía de hasta 655 Km es buena y su diseño, calidad y rendimiento son excelentes. Tiene un precio razonable para todo lo que ofrece.`,
      range: " Autonomía :  654 Km",
      price: "Precio desde 51.690  €* IVA incl.",
      image: polestar2,
    },
    {
      id: 4,
      model: " 4. Tesla Model Y",
      description: `No tiene tanta autonomía como el Tesla Model 3, pero es capaz de recorrer hasta 533 kilómetros con un interior más espacioso y versátil, con un mejor acceso y que siempre tiene más luminosidad gracias a su mayor superficie acristalada. Además, se puede recargar a una mayor potencia de hasta 250 kW. Todo ello manteniendo la estupenda dinámica y comportamiento preciso del Model 3.`,
      range: " Autonomía :  565 Km",
      price: "Precio desde 43.970  €* IVA incl.",
      image: teslamodely,
    },
    {
      id: 5,
      model: " 5. KIA EV6",
      description: `El KIA EV6 puede configurarse con distintos motores con potencias entre 170 y 575 CV. La autonomía por su parte puede ser de 510 kilómetros en caso de escoger la batería con mayor capacidad. Su diseño de estilo crossover y la compacidad de sus baterías, le permiten ofrecer un gran espacio interior con un maletero de 572 litros. Además, tiene un equipamiento muy completo con tecnología de última generación.`,
      range: " Autonomía :  528 Km",
      price: "Precio desde 44.769 €* IVA incl.",
      image: kiaev6,
    },
    {
      id: 6,
      model: " 6. Hyundai Ioniq 5",
      description: `El Ioniq 5 es similar al KIA EV6 puesto que comparten plataforma, las versiones varían entre 170 y 306 CV de potencia y 363 y 480 kilómetros de autonomía, de manera que el primero es de tracción trasera y el segundo es total. Admite cargas rápidas de hasta 220 kW, por lo supone una ventaja clave para viajar el poder cargar la batería hasta el 80% en 18 minutos.`,
      range: " Autonomía :  507 Km",
      price: "Precio desde 45.088  €* IVA incl.",
      image: hyundayioniq5,
    },
    {
      id: 7,
      model: " 7. KIA e-Niro",
      description: `Un SUV eléctrico mediano, bien diseñado en prácticamente todo: es cómodo, eficaz en carretera como un buen turismo y su consumo permite una autonomía razonable de 463 kilómetros, con una potencia más que suficiente de 204 CV y a un precio competitivo.`,
      range: " Autonomía :  460 Km",
      price: "Precio desde 40.605  €* IVA incl.",
      image: kiaeniro,
    },
    {
      id: 8,
      model: " 8. BMW iX1",
      description: `Probablemente es el SUV más redondo de su segmento en cuanto a diseño, comportamiento, calidad de acabado, sistema multimedia y espacio interior. Con sus 313 CV tendrás prestaciones de sobra, eso si, no es barato en relación a su autonomía de 439 kilómetros, un factor que sigue teniendo mucho peso en un coche eléctrico.`,
      range: " Autonomía :  474 Km",
      price: "Precio desde 44.700   €* IVA incl.",
      image: bmwix1,
    },
    {
      id: 9,
      model: "9. Volvo XC40 Recharge Eléctrico Puro",
      description: `A bordo del XC40 eléctrico se respira uno de los ambientes más sofisticados y confortables que se pueden experimentar. Tiene unas buenas prestaciones (la versión de 408 CV es un tiro) pero con una calidad de rodadura sobresaliente, que otorga un gran aislamiento del ruido y una excelente amortiguación de cualquier tipo de bache o irregularidad del asfalto. Su sistema multimedia es avanzado pero muy sencillo e intuitivo.`,
      range: " Autonomía :  418 Km",
      price: "Precio desde 39.450   €* IVA incl.",
      image: volvoxc40,
    },
    {
      id: 10,
      model: " 10. Smart #1",
      description: `Tiene un interior con una calidad de acabado de primer nivel, además de ser muy práctico y versátil para un uso familiar de diario con un tamaño muy compacto de tan solo 4,27 metros de longitud . No es un coche deportivo pero tiene unas prestaciones muy destacables, especialmente la versión BRABUS de 428 CV, que llega a ser absurdo... Su autonomía de hasta 440 kilómetros le permite hacer trayectos por carretera sin mayor problema.`,
      range: " Autonomía :  440  Km",
      price: "Precio desde 39.096 €* IVA incl.",
      image: smart,
    },
  ];

  return (
    <div className="min-h-[80vh] bg-violet-100 flex flex-col p-4 md:p-8">
      <h1 className="text-center text-4xl font-bold text-purple-600 border-b-8 border-transparent hover:border-purple-800 transition duration-300">
        Top <span className="text-purple-800">Coches</span> Eléctricos{" "}
        <span className="text-purple-800">de 2024</span>
      </h1>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {cars.map((car) => (
          <div
            key={car.id}
            className="max-w-md bg-white rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row md:max-w-full"
          >
            <img
              src={car.image}
              alt={car.model}
              className="w-full md:w-1/3 object-cover"
            />
            <div className="p-4 md:w-2/3">
              <h2 className="text-2xl font-bold text-green-700 mb-2  border-green-700 hover:border-b-4 mr-10">
                {car.model}
              </h2>
              <p className="text-xl font-bold text-purple-700 mb-2">
                ⚡{car.range}
              </p>
              <p className="text-xl font-bold text-purple-700 mb-2">
                💲{car.price}
              </p>
              <p className="text-gray-500 leading-relaxed font-semibold italic">
                {car.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCars;
