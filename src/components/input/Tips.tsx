const Tips = () => {
  return (
    <div className="flex flex-col items-center p-4 md:p-8 mt-16 md:mt-0">
      {" "}
      {/* Ajuste en el margen superior */}
      <h2 className="text-primary text-3xl font-semibold mb-8 text-center">
        Consejos para el Uso de Coches Eléctricos
      </h2>
      <ul className="w-full md:w-2/3 lg:w-1/2">
        <li className="mb-4">
          <span className="text-primary mr-2">&#8226;</span> Familiarízate con
          los puntos de carga disponibles en tu área y en tus rutas habituales
          utilizando aplicaciones y mapas específicos para coches eléctricos.
        </li>
        <li className="mb-4">
          <span className="text-primary mr-2">&#8226;</span> Aprovecha los
          programas de carga gratuita o con tarifas reducidas ofrecidos por
          algunos proveedores de energía eléctrica y operadores de estaciones de
          carga.
        </li>
        <li className="mb-4">
          <span className="text-primary mr-2">&#8226;</span> Considera instalar
          paneles solares en tu hogar para generar tu propia energía limpia y
          recargar tu coche eléctrico de manera sostenible.
        </li>
        <li className="mb-4">
          <span className="text-primary mr-2">&#8226;</span> Mantén una
          velocidad constante en autopistas y carreteras para optimizar la
          autonomía de tu coche eléctrico.
        </li>
        <li className="mb-4">
          <span className="text-primary mr-2">&#8226;</span> Programa la carga
          de tu coche eléctrico durante las horas de menor demanda eléctrica
          para aprovechar tarifas reducidas y contribuir a la estabilidad de la
          red eléctrica.
        </li>
        <li className="mb-4">
          <span className="text-primary mr-2">&#8226;</span> Realiza un
          mantenimiento regular de tu coche eléctrico, incluyendo la inspección
          de la batería, los frenos y los neumáticos, para garantizar un
          rendimiento óptimo y prolongar su vida útil.
        </li>
        <li className="mb-4">
          <span className="text-primary mr-2">&#8226;</span> Únete a comunidades
          y grupos de propietarios de coches eléctricos para compartir
          experiencias, obtener consejos y acceder a eventos y descuentos
          exclusivos.
        </li>
      </ul>
    </div>
  );
};

export default Tips;
