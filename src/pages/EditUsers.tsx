import React, { useState } from "react";
function removeEmptyFields(obj: any) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
      delete obj[key];
    }
  }
  return obj;
}

const EditUsers = ({
  onSubmit,
  data,
}: {
  onSubmit: (data: any) => any;
  data: any;
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    id: string;
    password: string;
    email: string;
  }>({
    name: data.name,
    id: data.id,
    password: "",
    email: data.email,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const validationErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      validationErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "El correo electrónico no es válido";
    }
    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Llamar al método deseado con los datos del formulario
      console.log("Datos del formulario:", formData);
      onSubmit(removeEmptyFields(formData));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <input type="hidden" id="id" name="id" value="some-id-value" />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Contraseña:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Confirmar modificación
        </button>
      </div>
    </form>
  );
};

export default EditUsers;
