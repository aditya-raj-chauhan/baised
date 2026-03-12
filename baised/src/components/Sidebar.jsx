import { useUser } from "@clerk/clerk-react";
import { User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { SIDE_MENU_DATA } from "../assets/data";

const Sidebar = ({ activeMenu }) => {

  const { user } = useUser();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-[#F7F7FF] border-r border-[#27187E]/20 sticky top-[61px] z-20">

      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">

        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt="user image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <User className="w-20 h-20 text-[#27187E]" />
        )}

        <h5 className="text-[#27187E] font-medium leading-6">
          {user?.fullName || ""}
        </h5>

      </div>

      <div className="flex flex-col gap-2 px-4">

        {SIDE_MENU_DATA.map((item) => {

          const Icon = item.icon;
          const isActive = activeMenu === item.label;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded transition-colors
              ${isActive
                ? "bg-[#27187E]/10 text-[#27187E] font-medium"
                : "text-[#27187E] hover:bg-[#27187E]/10"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}

      </div>

    </div>
  );
};

export default Sidebar;