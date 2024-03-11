import { useEffect, useState } from "react";
import { Api } from "../services/Api";
import { createPortal } from "react-dom";
import EditUsers from "./EditUsers";

const UserList = () => {
  const user = localStorage.getItem("user");
  if (user && JSON.parse(user).rol !== 1) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <h1 className="text-4xl text-center animate-bounce">
          ⚠️ No tienes privilegios de Admin para acceder a esta sección.
          Contacta con Bogdan para solicitarlos. ⚠️
        </h1>
      </div>
    );
  }

  const [editUserId, setEditUserId] = useState<number>();
  const [deleteUserId, setDeleteUserId] = useState<number>();
  const [users, setUsers] = useState<
    {
      id: number;
      name: string;
      email: string;
    }[]
  >([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await Api.get("/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  const deleteUser = async () => {
    try {
      await Api.delete(`/users/${deleteUserId}`);
      setUsers(users.filter((user) => user.id !== deleteUserId));
      setDeleteUserId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (updatedUser: any) => {
    try {
      const response = await Api.put(`/users/${updatedUser.id}`, updatedUser);
      const updatedUserIndex = users.findIndex(
        (user) => user.id === updatedUser.id
      );
      if (updatedUserIndex !== -1) {
        const updatedUsers = [...users];
        updatedUsers[updatedUserIndex] = response.data.user;
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="bg-black text-white">
      <h2 className="text-2xl font-bold mb-4 text-center transition duration-300 ease-in-out transform hover:scale-105 hover:text-green-500 text-yellow-400">
        Usuarios registrados
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border border-white transition duration-300 ease-in-out transform hover:scale-105 hover:text-green-500">
                Id
              </th>
              <th className="border border-white transition duration-300 ease-in-out transform hover:scale-105 hover:text-green-500">
                Nombre
              </th>
              <th className="border border-white transition duration-300 ease-in-out transform hover:scale-105 hover:text-green-500">
                E-Mail
              </th>
              <th className="border border-white transition duration-300 ease-in-out transform hover:scale-105 hover:text-green-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-white text-center">{user.id}</td>
                  <td className="border border-white text-center">
                    {user.name}
                  </td>
                  <td className="border border-white text-center">
                    {user.email}
                  </td>
                  <td className="border border-white">
                    <button
                      className="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setEditUserId(user.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                      onClick={() => setDeleteUserId(user.id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {editUserId &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setEditUserId(undefined)}
              >
                Cerrar
              </button>
              <EditUsers
                data={users.find((user) => user.id === editUserId)}
                onSubmit={(ev) => {
                  console.log(ev);
                  updateUser(ev);
                  setEditUserId(undefined);
                }}
              />
            </div>
          </div>,
          document.body
        )}
      {deleteUserId && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded">
            <p className="text-black">
              ¿Seguro que quieres borrar este usuario?{" "}
            </p>
            <div className="mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={deleteUser}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setDeleteUserId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
