import React from "react";
import Context from "../../context/StationsContext";
import Map from "../../component/Map/Map";
import foto2 from "../../assets/imgs/Home/foto2.jpg";
import icon from "../../assets/icons/pasos.svg";
import bici from "../../assets/icons/bicicleta.png";
import candado from "../../assets/icons/candado.png";
import mapa from "../../assets/icons/mapa.png";
import candadoA from "../../assets/icons/candado-abierto.png";
import { useNavigate } from "react-router-dom";
const Rent = () => {
  const { coordinates } = React.useContext(Context);
  const navigate = useNavigate(); 

  return (
    <>
      <header className="bg-green-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Ya estas más cerca!
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Aquí tienes toda la información para empezar a peladear con
                nosotros
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <button
                onClick={() => navigate("/login")}
                className="block rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring shadow-lg"
                type="button"
              >
                Registrate
              </button>
            </div>
          </div>
        </div>
      </header>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full">
            <div className="lg:w-1/2 md:w-full md:pr-10 md:py-6">
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
                  <img src={icon} alt="Tu icono" className="w-5 h-5" />
                </div>

                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Primer Paso
                  </h2>
                  <p className="leading-relaxed">
                    Registrate en nuestra plataforma, para poder acceder a todos
                    los servicios que ofrecemos.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
                  <img src={mapa} alt="Tu icono" className="w-5 h-5" />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Segundo Paso
                  </h2>
                  <p className="leading-relaxed">
                    Elige entre uno de nuestros planes, para poder acceder a las
                    bicicletas.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
                  <img src={candadoA} alt="Tu icono" className="w-5 h-5" />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Paso Tres
                  </h2>
                  <p className="leading-relaxed">
                    Ve una de nuestras estaciones y escanea el codigo QR para
                    poder desbloquear la bicicleta.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
                  <img
                    src={bici}
                    alt="Tu icono"
                    className="w-5 h-5"
                  />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Paso Cuatro
                  </h2>
                  <p className="leading-relaxed">
                    Recorre la ciudad y disfruta de tu paseo.
                  </p>
                </div>
              </div>
              <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 inline-flex items-center justify-center text-white relative z-10">
                  <img src={candado} alt="Tu icono" className="w-5 h-5" />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    Úlimo Paso
                  </h2>
                  <p className="leading-relaxed">
                    Deja la bicicleta en una de nuestras estaciones y escanea el
                    codigo QR para bloquearla.
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 md:w-full object-cover object-center md:mt-0 mt-12 shadow-2xl">
              <img src={foto2} alt="step" className="w-full h-full rounded-xl" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-green-50">
          <h1 className="font-bold text-gray-900 sm:text-5xl m-2 md:m-10 lg:m-10 text-center">
            Elige una estación:
          </h1>
          <Map stations={coordinates} />
        </div>
      </section>
    </>
  );
};

export default Rent;
