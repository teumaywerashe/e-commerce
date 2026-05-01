import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/slice/adminSlice";
import { useNavigate } from "react-router-dom";

function UserManagement() {
  const { users, loading, error } = useSelector((state) => state.admin);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch]);

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(addUser(formData));
    } catch (error) {
      console.log(error);
    } finally {
      SetFormData({
        name: "",
        email: "",
        password: "",
        role: "customer",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        User Management
      </h2>
      {loading && <p className="text-gray-500 dark:text-gray-400">Loading</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="p-6 rounded-lg mb-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <h1 className="text-lg font-bold mx-4 mb-4 text-gray-900 dark:text-white">
          Add New User
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300"
              htmlFor="Email"
            >
              Email
            </label>
            <input
              className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="w-full p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              onChange={handleChange}
              value={formData.role}
              name="role"
              id="role"
            >
              <option value="customer">customer</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 cursor-pointer text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
      </div>
      <div className="shadow-md sm:rounded-lg overflow-x-auto mb-6">
        <table className="min-w-full text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-100 dark:bg-gray-800 p-4 text-sm text-gray-700 dark:text-gray-300">
            <tr>
              <th className="py-3 uppercase px-4">name</th>
              <th className="py-3 uppercase px-4">email</th>
              <th className="py-3 uppercase px-4">role</th>
              <th className="py-3 uppercase px-4">actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  className="border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"
                  key={user._id}
                >
                  <td className="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <select
                      name="role"
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      value={user.role}
                      className="p-2 border dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-red-600 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-3 text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
