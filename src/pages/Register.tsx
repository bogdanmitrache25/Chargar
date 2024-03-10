import { Formik, FormikHelpers } from "formik";
import InputLabel from "../components/input/InputLabel";
import Button from "../components/button/Button";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { registerUser } from "../store/authSlice";
import Swal from "sweetalert2";
import background from "../images/landingpage.jpg";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "El nombre debe tener al menos tres caracteres")
      .max(20, "El nombre no puede tener más de 20 caracteres")
      .required("El nombre es requerido"),
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(20, "La contraseña no puede tener más de 20 caracteres")
      .required("La contraseña es requerida"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
      .required("La confirmación de la contraseña es requerida"),
  });

  const onSubmit = (
    values: typeof initialValues,
    { setFieldError }: FormikHelpers<typeof initialValues>
  ) => {
    dispatch(registerUser(values)).then((response) => {
      if (response.type === "auth/register/fulfilled") {
        Swal.fire({
          icon: "success",
          title: "Registro correcto!",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        Object.entries(response.payload.errors).forEach(([key, value]) => {
          setFieldError(key, value[0]);
        });
      }
    });
  };

  return (
    <section
      className="bg-gray-50 bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="w-full sm:max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Regístrate</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputLabel
                  label="Correo Electrónico"
                  name="email"
                  placeholder="correo@correo.com"
                  error={errors.email}
                  onChange={handleChange}
                  value={values.email}
                />
                <InputLabel
                  name="name"
                  label="Nombre"
                  placeholder="Juan García"
                  error={errors.name}
                  onChange={handleChange}
                  value={values.name}
                />
                <InputLabel
                  name="password"
                  label="Contraseña"
                  placeholder="******"
                  type="password"
                  error={errors.password}
                  onChange={handleChange}
                  value={values.password}
                />
                <InputLabel
                  name="password_confirmation"
                  label="Confirmar Contraseña"
                  placeholder="******"
                  type="password"
                  error={errors.password_confirmation}
                  onChange={handleChange}
                  value={values.password_confirmation}
                />
                <Button value="Regístrate" type="submit" />
              </form>
            )}
          </Formik>
          <p className="text-sm text-gray-600 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
