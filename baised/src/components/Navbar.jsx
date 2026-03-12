import { UserButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import CreditsDisplay from "./CreditsDisplay";
import { UserCreditsContext } from "../context/UserCreditsContext";

const Navbar = ({ activeMenu }) => {

const [openSideBar,setOpenSideBar] = useState(false);
const { credits } = useContext(UserCreditsContext);

return (

<div className="flex items-center justify-between gap-5 bg-[#F7F7FF] border-b border-[#27187E]/20 backdrop-blur-[2px] py-4 sm:px-7 sticky top-0 z-30">

<div className="flex items-center gap-5">

<button
className="block lg:hidden text-[#27187E] hover:bg-[#27187E]/10 p-1 rounded transition-colors"
onClick={()=>setOpenSideBar(!openSideBar)}
>

{openSideBar ? (
<X className="text-2xl"/>
) : (
<Menu className="text-2xl"/>
)}

</button>

<div className="flex items-center gap-2">

<img src="/vite.svg" alt="logo" className="w-[10%]" />

<span className="text-lg font-semibold text-[#27187E] truncate">
baised
</span>

</div>

</div>

<div className="flex items-center gap-4">

<Link to="/subscription">
<CreditsDisplay credits={credits}/>
</Link>

<div className="relative">
<UserButton/>
</div>

</div>

{openSideBar && (

<div className="fixed top-[73px] left-0 right-0 bg-[#F7F7FF] border-b border-[#27187E]/20 lg:hidden z-20">
<Sidebar activeMenu={activeMenu}/>
</div>

)}

</div>

);
};

export default Navbar;