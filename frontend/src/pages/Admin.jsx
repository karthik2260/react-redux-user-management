import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../util/axios";
import { uplode } from "../util/Admin";
import toast from "react-hot-toast";
import { updateEmail, deleteUser } from "../util/Api";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";


const Admin = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.Admin.users);
  const search = useSelector((Store) => Store.Admin.search);

  useEffect(() => {
    const details = async () => {
      try {
        const res = await axiosInstance.get("/auth/admin");
        dispatch(uplode(res.data.users));
      } catch (error) {
        console.log(error, "loading user error");
        toast.error(error.response?.data?.message || "Error loading users");
      }
    };
    details();
  }, []);

  const filteredUsers = search
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) || // Search by name
          user.email.toLowerCase().includes(search.toLowerCase()) // Search by email
      )
    : users;

  const handilDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedRes = await deleteUser(id);
          dispatch(uplode(updatedRes.data.users));
          toast.success("Your file has been deleted");
        } catch (error) {
          toast.error(error.response?.data?.message);
        }
      }
    });
  };

  const handilUpdate = async (id) => {
    const { value: email } = await Swal.fire({
      title: "Enter you new email",
      input: "email",
      inputLabel: "",
      inputPlaceholder: "Enter your email address",
    });
    if (email) {
      try {
        const updatedRes = await updateEmail(id, email);
        dispatch(uplode(updatedRes.data.users));
        toast.success("Your file has been updated.");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update.");
      }
    }
  };

  return (
    <div className="overflow-x-auto mt-11 py-7">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handilUpdate(user._id)}
                  >
                    <Pencil />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handilDelete(user._id)}
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
