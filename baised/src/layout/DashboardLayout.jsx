import { useUser } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children, activeMenu }) => {

  const { user } = useUser();

  return (
    <div>

      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">

          <div className="hidden lg:block">
            <Sidebar activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">
            {children}
          </div>

        </div>
      )}

    </div>
  );
};

export default DashboardLayout;