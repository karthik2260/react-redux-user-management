import { Link, useNavigate } from "react-router-dom";
import { LogOut, User, Settings, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../util/axios.js";
import { logout } from "../util/Auth.slice.js";
import { uplode, searchdata } from "../util/Admin.js";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Navbar = () => {
  const authUser = useSelector((Store) => Store.Auth.authUser);
  const search = useSelector((Store) => Store.Admin.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      dispatch(logout());
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleAdduser = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Multiple inputs",
      html: `
          <input id="swal-input1" class="swal2-input" placeholder="Enter your Name">
          <input id="swal-input2" class="swal2-input" placeholder="Enter your Email">
          <input id="swal-input3" class="swal2-input" placeholder="Enter your Password">
        `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById("swal-input1").value,
          email: document.getElementById("swal-input2").value,
          password: document.getElementById("swal-input3").value,
        };
      },
    });
    if (formValues) {
      try {
        const res = await axiosInstance.post("/auth/signup", formValues);
        if (res.status == 201) {
          const updatedRes = await axiosInstance.get("/auth/admin");
          dispatch(uplode(updatedRes.data.users));
          toast.success("Your file has been added.");
        } else {toast.error("Something went wrong.");}
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add.");
      }
    }
  };

  const handleInputChange = (event) => {
    dispatch(searchdata(event.target.value));
  };

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <button onClick={() => navigate(-2)}>
              <h1 className="text-lg font-bold">User management</h1>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {authUser && authUser?.role === "admin" && (
              <div>
                <input
                  type="text"
                  placeholder="Search by name or email"
                  className="input input-bordered h-8"
                  value={search}
                  onChange={handleInputChange}
                />

                <span
                  onClick={handleAdduser}
                  className={`btn btn-sm gap-2 transition-colors `}
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Add user</span>
                </span>
              </div>
            )}

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex gap-2 items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
