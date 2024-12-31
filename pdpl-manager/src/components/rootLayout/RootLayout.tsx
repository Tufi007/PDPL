import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../sideBarLayout/SideBar";
import { User } from "lucide-react";
import { useEffect } from "react";

function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      // If token is not found, redirect to login
      navigate("/auth/login");
    }
  }, [navigate]); // Dependency array ensures `useNavigate` is updated correctly

  return (
    <div className="flex min-h-screen bg-gray-background w-full">
      <Sidebar />
      <div className=" fixed top-0 left-64 right-0 text-gray-text bg-white gap-2 h-24 mr-2  text-xs flex flex-row justify-end items-center ">
        <Link to={"/organization"}>
          <button className="bg-[#2563eb] text-white px-2 py-2 rounded-md">
            Organization
          </button>
        </Link>
        {/* <Link to={"/auth/login"}>
          <button className="bg-[#2563eb] text-white px-2 py-2 rounded-md">
            Login 
          </button>
        </Link> */}
        {/* <Link to={"/auth/signup"}>
          <button className="bg-[#2563eb] text-white px-2 py-2 rounded-md">
            SignUp
          </button>
        </Link> */}
        <Link to={""}>
          <button className="bg-[#2563eb] text-white px-2 py-2 rounded-md">
            <User className="mr-3" size={15} ></User>
          </button>
        </Link>
        <Link to={""}>
          <button className="bg-[#2563eb] text-white px-2 py-2 rounded-md">
            Theme
          </button>
        </Link>
      </div>
      <main className="ml-64  mt-24 flex-1 p-6 ">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
