import React from "react";
import { useNavigate } from "react-router-dom";
import { Blockquote } from "flowbite-react";
import "./Home.css";
import foto1 from "../../assets/imgs/Home/foto1.webp";
import foto2 from "../../assets/imgs/Home/foto2.webp";
import foto3 from "../../assets/imgs/Home/foto3.webp";
import foto4 from "../../assets/imgs/Home/foto4.webp";
import foto5 from "../../assets/imgs/Home/foto5.webp";
import foto6 from "../../assets/imgs/Home/foto6.webp";
import video from "../../assets/videos/videoHome.mp4";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="videoHeader relative">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        <div className="quote absolute bottom-0 left-0 right-0 p-6 text-center">
          <Blockquote className="quoteText">
            <svg
              className="mb-4 h-10 w-20 text-gray-400 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
            <p className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white">
              "En e-Move queremos que la movilidad sostenible sea una realidad
              para todos. Para tener unas ciudades más limpias y un aire más
              puro."
            </p>
          </Blockquote>
        </div>
      </div>

      <section className="text-gray-400 bg-green-100">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex w-full flex-wrap">
            <div className="lg:w-1/2 w-full mb-20">
              <h1
                className="sm:text-3xl text-2xl font-medium text-white mb-4"
                style={{
                  fontFamily: "'toxt', sans-serif",
                  fontSize: "4rem",
                  textShadow: "1px 2px 8px gray",
                  lineHeight: "1.2",
                }}
              >
                Movilidad Sostenible
              </h1>
            </div>
            <div className="lg:w-1/2 w-full">
              <blockquote className="quoteTextImage shadow-2xl rounded-b-xl p-6 sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
                <svg
                  className="mb-4 h-10 w-20 text-gray-400 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 14"
                >
                  <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                </svg>
                <p className="text-lg" style={{ fontFamily: "toxt" , whiteSpace: "pre-line" }}>
                  "En e-Move queremos que la movilidad sostenible sea una
                  realidad para todos. 
                  Para tener unas ciudades más limpias y un
                  aire más puro."
                </p>
              </blockquote>
            </div>
          </div>

          <div className="flex flex-wrap md:-m-2 -m-1">
            <div className="flex flex-wrap w-1/2 mt-10">
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg md:shadow-2xl"
                  src={foto1}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg md:shadow-2xl"
                  src={foto3}
                />
              </div>
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block rounded-lg md:shadow-2xl transition-transform duration-1000 transform hover:scale-110 cursor-pointer"
                  src={foto5}
                  onClick={() => {
                    navigate("/plan");
                  }}
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2 mt-10">
              <div className="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  className="w-full h-full object-cover object-center block rounded-lg md:shadow-2xl"
                  src={foto2}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg md:shadow-2xl"
                  src={foto4}
                />
              </div>
              <div className="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  className="w-full object-cover h-full object-center block rounded-lg md:shadow-2xl"
                  src={foto6}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white-900 text-black">
        <div className="mx-auto max-w-screen-m px-4 py-22 lg:flex lg:h-600 lg:items-center m-33">
          <div className="mx-auto max-w-3xl text-center m-20">
            <h1 className="bg-gradient-to-r rounded-xl from-green-500 via-blue-300 to-blue-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl shadow-2xl p-10">
              ¿Quieres empezar?
              <span className="sm:block" style={{fontFamily:"1942 Report"}}>
                ¿Estás preparado para una movilidad sana?
              </span>
            </h1>

            <p className="mx-auto mt-9 max-w-xl text-lg sm:text-xl lg:text-2xl xl:text-3xl/relaxed mt-12">
              Estamos encantados de que nos elijas como una forma sostenible de
              transporte urbano!
            </p>

            <div className="mt-8 m-20 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded-lg border border-green-600 bg-green-400 px-12 py-3 text-sm font-medium text-black hover:bg-white hover:text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/plan"
              >
                Empezar
              </a>

              <a
                className="block w-full rounded-lg border border-green-600 px-12 py-3 text-sm font-medium text-black hover:bg-green-400  focus:outline-none focus:ring active:bg-black-500 sm:w-auto"
                href="/rent"
              >
                Saber más
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
