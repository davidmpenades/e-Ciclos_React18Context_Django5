import React from "react";
import fondo from "../../assets/imgs/fondoPlan.jpg";

export default function Plan() {
    const divStyle = {
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        Height: "100%"
      };
  return (
    <div className="min-h-screen flex items-center justify-center" style={divStyle}>
        <h1 className="text-center m-20 rounded-lg text-4xl bg-white p-5 shadow-xl" style={{fontFamily:"CustomFont"}}> Empieza. Elige el plan que mejor se adapte a tí</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8 p-20">
        <div className="rounded-2xl border border-green-400 p-6 shadow-sm ring-1 ring-green-400 sm:order-last sm:px-8 lg:p-12 shadow-2xl">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Intensivo
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {" "}
                30€{" "}
              </strong>

              <span className="text-sm font-medium text-gray-700">/mes</span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Viajes ilimitados</span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Total libertad </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-green-700"
              >
                <path
                  strokeLinecap="round"
                  strokeinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Soporte personalizado </span>
            </li>   
          </ul>

          <a
            href="#"
            className="mt-8 block rounded-full border border-green-600 bg-green-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-green-700 hover:ring-1 hover:ring-green-700 focus:outline-none focus:ring active:text-indigo-500"
          >
            Contratar
          </a>
        </div>

        <div className="rounded-2xl border border-blue-700 p-6 shadow-sm sm:px-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-lg font-medium text-gray-900">
              Ocasional
              <span className="sr-only">Plan</span>
            </h2>

            <p className="mt-2 sm:mt-4">
              <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {" "}
                7€{" "}
              </strong>

              <span className="text-sm font-medium text-gray-700">/mes</span>
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> 20 viajes incluidos </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> Solo pagarás por viaje extra </span>
            </li>

            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="text-gray-700"> 0,50€ viaje extra </span>
            </li>
          </ul>

          <a
            href="#"
            className="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
          >
            Contratar
          </a>
        </div>
      </div>
    </div>
  );
}
