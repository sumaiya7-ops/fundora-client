import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRoleChange = async (id, role) => {
  try {
    const response = await fetch(
      `http://localhost:5000/users/role/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      }
    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      fetchUsers();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleRemove = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `http://localhost:5000/users/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      fetchUsers();
    }
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008A5A]">
        Admin Dashboard
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#101828]">
        Manage <span className="text-[#008A5A]">Users</span>
      </h1>

      <p className="mt-3 text-[#667085]">
        View, update roles, and remove users.
      </p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-[#E9E7E1] bg-white shadow-[0_12px_35px_rgba(16,24,40,0.05)]">
  <div className="overflow-x-auto">
    <table className="w-full min-w-[900px]">
      <thead className="bg-[#F7F6F2]">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            User
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Email
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Role
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Credits
          </th>

          <th className="px-6 py-4 text-center text-xs font-bold uppercase">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {users.length === 0 ? (
          <tr>
            <td
              colSpan="5"
              className="px-6 py-10 text-center text-gray-500"
            >
              No users found.
            </td>
          </tr>
        ) : (
          users.map((user) => (
            <tr
              key={user._id}
              className="border-t border-[#E9E7E1]"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <span className="font-semibold">
                    {user.name}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4">
                {user.email}
              </td>

              <td className="px-6 py-4">
                {user.role}
              </td>

              <td className="px-6 py-4">
                {user.credits}
              </td>

              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-3">
  <select
    value={user.role}
    onChange={(e) =>
      handleRoleChange(user._id, e.target.value)
    }
    className="rounded-lg border px-2 py-1 text-sm"
  >
    <option value="admin">Admin</option>
    <option value="creator">Creator</option>
    <option value="supporter">Supporter</option>
  </select>

  <button
    onClick={() => handleRemove(user._id)}
    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white hover:bg-red-700"
  >
    Remove
  </button>
</div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
    </motion.section>
  );
};

export default ManageUsers;