import React, { useState } from "react";
import contact from "../../assets/imgs/register.jpg";
export default function RegLogForm({ loginUser }) {
  const [registro, setRegistro] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  console.log(formData);
  const divStyle = {
    backgroundImage: `url(${contact})`,
    backgroundSize: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    Height: "100%",
  };

  const handleSwitchMode = () => {
    setRegistro((prevRegistro) => !prevRegistro);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (registro) {
      console.log(registro);
      // Lógica para el registro
    } else {
      console.log(formData);
      loginUser(formData);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <>
      <section className="text-white font-sans" style={divStyle}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="p-8 rounded-lg w-full md:w-1/2 lg:w-1/3 backdrop-blur-2xl shadow-2xl">
            <h2 className="text-3xl text-green-400 font-semibold mb-6 text-center text:shadow-lg">
              Formulario de {registro ? "Registro" : "Inicio de Sesión"}
            </h2>
            <form className="w-full max-w-sm mx-auto" onSubmit={handleSubmit}>
              <div className="flex items-center justify-center mt-20">
                <div
                  onClick={() => setRegistro(false)}
                  className={`w-1/3 pb-4 font-medium text-center ${
                    !registro
                      ? "text-green-400 capitalize border-b-2 border-green-500 dark:border-white-900 dark:text-white"
                      : "text-white-500"
                  } cursor-pointer`}
                >
                  Entrar
                </div>

                <div
                  onClick={() => setRegistro(true)}
                  className={`w-1/3 pb-4 font-medium text-center ${
                    registro
                      ? "text-green-400 capitalize border-b-2 border-green-500 dark:border-green-400 dark:text-white"
                      : "text-white-500"
                  } cursor-pointer`}
                >
                  Registro
                </div>
              </div>

              {/* Campos de formulario comunes */}
              <div className="relative flex items-center mt-8">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Usuario"
                />
              </div>

              {registro ? (
                // Campos específicos para registro
                <>
                  <div className="relative flex items-center mt-6">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <input
                      type="email"
                      className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Dirección de Email"
                    />
                  </div>

                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Contraseña"
                    />
                  </div>

                  <div className="relative flex items-center mt-4">
                    <span className="absolute">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Confirmar Contraseña"
                    />
                  </div>
                </>
              ) : (
                // Campos específicos para inicio de sesión
                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-green-400 dark:focus:border-green-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                  />
                </div>
              )}

              <div className="mt-6">
                <button
                  type="submit"
                  onClick={() =>
                    typeof loginUser === "function" && loginUser(formData)
                  }
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  {registro ? "Registrarse" : "Iniciar Sesión"}
                </button>

                <div className="mt-6 text-center ">
                  <span
                    onClick={handleSwitchMode}
                    className="text-sm text-white-100 hover:underline dark:text-white-400 cursor-pointer"
                  >
                    {registro
                      ? "¿Ya tienes una cuenta? Inicia Sesión"
                      : "¿No tienes una cuenta? Regístrate"}
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
