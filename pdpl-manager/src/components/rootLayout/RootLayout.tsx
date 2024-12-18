import { Outlet } from 'react-router-dom';
import Sidebar from '../sideBarLayout/SideBar';


function RootLayout() {
  return (
    <div className="flex min-h-screen bg-gray-background">
      <Sidebar />
      <div className=' fixed top-0 left-64 text-gray-text bg-white w-full h-24 '>organization</div>
      <main className="ml-64  mt-24 flex-1 p-6 ">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;