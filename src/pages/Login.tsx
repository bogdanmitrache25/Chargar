import { Formik, FormikHelpers } from "formik";
import InputLabel from "../components/input/InputLabel";
import Button from "../components/button/Button";
import * as Yup from "yup";
import backgroundImage from "../images/landingpage.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, RootState } from "../store";
import { loginUser } from "../store/authSlice";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogged } = useSelector((state: RootState) => state.auth);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("El correo no es válido")
      .required("El correo es requerido"),

    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .max(20, "Máximo 20 caracteres")
      .required("La contraseña es requerida"),
  });

  const onSubmit = (values: typeof initialValues) => {
    dispatch(loginUser(values)).then((response) => {
      if (response.type === "auth/loginUser/fulfilled") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Inicio de sesión correcto ✅",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/user");
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Credenciales erróneas",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <section
      className="bg-gray-50 bg-cover bg-center min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full sm:max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Iniciar Sesión
          </h1>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputLabel
                  label="Correo"
                  name="email"
                  placeholder="correo@correo.com"
                  error={errors.email}
                  onChange={handleChange}
                  value={values.email}
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

                <Button value="Iniciar Sesión" type="submit" />
                <p className="text-sm font-light text-gray-500">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    Regístrate
                  </Link>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
