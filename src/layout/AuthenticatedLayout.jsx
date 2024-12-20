import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { Outlet, useNavigate } from 'react-router-dom';


const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  // const name = useSelector((state) => state.auth.name);
  const accessToken = useSelector((state) => state.auth.accessToken);
  // const refreshToken = useSelector((state) => state.auth.refreshToken);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (accessToken === null) {
      navigate('/auth/signin');
    }
  }, [accessToken, navigate]);

  if (accessToken === null)  return null;

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet /> {/* Render passed children */}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default AuthenticatedLayout;
