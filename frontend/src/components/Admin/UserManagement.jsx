import React, { useState } from "react";

function UserManagement() {
  const users=[
    { _id: 12345, name: "jhon deo", email: "jhon@gmail.com", role: "admin" },
    {
      _id: 12365,
      name: "sthef meo",
      email: "esth@gmail.com",
      role: "customer",
    },
    { _id: 12395, name: "neo diad", email: "neo@gmail.com", role: "customer" },
  ];

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure to delete this user?")) {
      console.log(userId);
      console.log("yes");
    } else {
      console.log("no");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleRoleChange = (userId, newRole) => {
    console.log(userId, newRole);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
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
  const [formData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="P-6 rounded-lg mb-6 ">
        <h1 className="text-lg font-bold mx-4 mb-4">Add New User</h1>
        <form onSubmit={handleSubmit} action="submit">
          <div className="mb-4 ">
            <label className="block text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700" htmlFor="Email">
              Email
            </label>
            <input
              className="w-full p-2 border rounded"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 border rounded"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700" htmlFor="password">
              Role
            </label>
            <select
              className="w-full p-2 border rounded"
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
      <div className="shadow-md sm:rounded-lg  overflow-x-auto mb-6">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 p-4 text-sm text-gray-700">
            <tr>
              
              <th className="py-3 uppercase px-4">name</th>
              <th className="py-3 uppercase px-4">email</th>
              <th className="py-3 uppercase px-4">role</th>
              <th className="py-3 uppercase px-4">actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="border-b hover:bg-gray-200" key={user._id}>
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4 ">{user.email}</td>
                <td className="p-4 ">
                  <select
                    name="role"
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    value={user.role}
                    id=""
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4 ">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement;
