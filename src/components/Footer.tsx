const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <span className="text-primary mb-2 sm:mb-0 sm:mr-4">
          Trabajo Final de Máster de Bogdan Mitrache
        </span>
        <span className="text-center mb-2 sm:mb-0 sm:mx-4">
          <a
            className="text-primary"
            href="https://es.linkedin.com/in/bogdan-mitrache-bb0781247"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </span>
        <span className="text-right">
          <a href="mailto:bogdancmitrache@gmail.com" className="text-primary">
            bogdancmitrache@gmail.com
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
