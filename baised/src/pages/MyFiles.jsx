import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
Grid,
List,
Download,
Trash2,
Share2,
Globe,
Lock
} from "lucide-react";

import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const API = "http://localhost:8080/api/v1.0/files";

const MyFiles = () => {

const [files,setFiles] = useState([]);
const [viewMode,setViewMode] = useState("list");

const {getToken} = useAuth();
const navigate = useNavigate();


const fetchFiles = async () => {

try {

const token = await getToken();

const res = await axios.get(`${API}/my`,{
headers:{Authorization:`Bearer ${token}`}
});

setFiles(res.data);

} catch(e){

toast.error("Failed to fetch files");

}

};

useEffect(()=>{
fetchFiles();
},[]);


const togglePublic = async(id)=>{

try{

const token = await getToken();

await axios.patch(
`${API}/${id}/toggle-public`,
{},
{
headers:{Authorization:`Bearer ${token}`}
}
);

toast.success("Sharing updated");
fetchFiles();

}catch(e){

toast.error("Toggle failed");

}

};


const deleteFile = async(id)=>{

try{

const token = await getToken();

await axios.delete(`${API}/${id}`,{
headers:{Authorization:`Bearer ${token}`}
});

toast.success("File deleted");
fetchFiles();

}catch{

toast.error("Delete failed");

}

};


const shareLink = (file)=>{

navigator.clipboard.writeText(file.fileLocation);
toast.success("File path copied");

};


const viewFile = (id)=>{
navigate(`/file/${id}`);
};

return(

    <DashboardLayout activeMenu="My Files">
    
    <div className="p-4 sm:p-6 md:p-8 bg-[#F7F7FF] min-h-screen">
    
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5 sm:mb-6">
    
    <h2 className="text-lg sm:text-2xl font-bold text-[#27187E]">
    My Files ({files.length})
    </h2>
    
    <div className="flex gap-3">
    
    <List
    size={22}
    onClick={()=>setViewMode("list")}
    className={`${viewMode==="list"?"text-[#27187E]":"text-[#27187E]/40"} cursor-pointer`}
    />
    
    <Grid
    size={22}
    onClick={()=>setViewMode("grid")}
    className={`${viewMode==="grid"?"text-[#27187E]":"text-[#27187E]/40"} cursor-pointer`}
    />
    
    </div>
    
    </div>
    
    
    {files.length===0?(
    
    <div className="bg-[#F7F7FF] rounded-xl shadow-sm border border-[#27187E]/20 p-8 sm:p-12 text-center">
    
    <p className="text-sm sm:text-base text-[#27187E]/60">
    No files uploaded yet
    </p>
    
    <button
    onClick={()=>navigate("/upload")}
    className="mt-4 px-5 sm:px-6 py-2 bg-[#27187E] text-[#F7F7FF] text-sm sm:text-base rounded-lg hover:opacity-90"
    >
    Go to Upload
    </button>
    
    </div>
    
    ):viewMode==="list"?(
    
    <div className="bg-[#F7F7FF] rounded-xl shadow-sm border border-[#27187E]/20 overflow-hidden">
    
    <div className="overflow-x-auto">
    
    <table className="min-w-[750px] w-full text-xs sm:text-sm text-[#27187E]">
    
    <thead className="bg-[#27187E]/10">
    
    <tr>
    <th className="px-3 sm:px-4 py-3 text-left whitespace-nowrap">NAME</th>
    <th className="px-3 sm:px-4 py-3 text-left whitespace-nowrap">SIZE</th>
    <th className="px-3 sm:px-4 py-3 text-left whitespace-nowrap">UPLOADED</th>
    <th className="px-3 sm:px-4 py-3 text-left whitespace-nowrap">SHARING</th>
    <th className="px-3 sm:px-4 py-3 text-left whitespace-nowrap">ACTIONS</th>
    </tr>
    
    </thead>
    
    <tbody>
    
    {files.map(file=>(
    
    <tr
    key={file.id}
    className="border-t border-[#27187E]/10 hover:bg-[#27187E]/5"
    >
    
    <td className="px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3">
    
    <img
    src={`${API}/download/${file.id}`}
    className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded"
    />
    
    <span className="truncate max-w-[120px] sm:max-w-none">
    {file.name}
    </span>
    
    </td>
    
    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
    {Math.round(file.size/1024)} KB
    </td>
    
    <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
    {new Date(file.uploadedAt).toLocaleDateString()}
    </td>
    
    <td className="px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3 whitespace-nowrap">
    
    <span className="flex items-center gap-1 text-[11px] sm:text-xs">
    
    {file.public?(
    <>
    <Globe size={14} className="text-green-600"/>
    Public
    </>
    ):(
    <>
    <Lock size={14}/>
    Private
    </>
    )}
    
    </span>
    
    <button
    onClick={()=>togglePublic(file.id)}
    className="text-[#27187E] text-[11px] sm:text-xs"
    >
    Toggle
    </button>
    
    {file.public && (
    
    <button
    onClick={()=>shareLink(file)}
    className="flex items-center gap-1 text-[#27187E] text-[11px] sm:text-xs"
    >
    <Share2 size={14}/>
    Share Link
    </button>
    
    )}
    
    </td>
    
    <td className="px-3 sm:px-4 py-3">
    
    <div className="flex gap-3 sm:gap-4 text-[#27187E]">
    
    <a href={`${API}/download/${file.id}`}>
    <Download size={18}/>
    </a>
    
    <button onClick={()=>deleteFile(file.id)}>
    <Trash2 size={18}/>
    </button>
    
    </div>
    
    </td>
    
    </tr>
    
    ))}
    
    </tbody>
    
    </table>
    
    </div>
    
    </div>
    
    ):(
    
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    
    {files.map(file=>(
    
    <div
    key={file.id}
    className="bg-[#F7F7FF] rounded-xl shadow-sm border border-[#27187E]/20"
    >
    
    <div className="aspect-square">
    
    <img
    src={`${API}/download/${file.id}`}
    className="w-full h-full object-cover rounded-t-xl"
    />
    
    </div>
    
    <div className="p-3 sm:p-4">
    
    <p className="text-xs sm:text-sm font-medium truncate text-[#27187E]">
    {file.name}
    </p>
    
    <p className="text-[11px] sm:text-xs text-[#27187E]/60">
    {Math.round(file.size/1024)} KB
    </p>
    
    <div className="flex justify-between mt-3">
    
    <button
    onClick={()=>togglePublic(file.id)}
    className="text-[11px] sm:text-xs text-[#27187E]"
    >
    {file.public?"Public":"Private"}
    </button>
    
    <div className="flex gap-3 text-[#27187E]">
    
    {file.public && (
    <button onClick={()=>shareLink(file)}>
    <Share2 size={16}/>
    </button>
    )}
    
    <a href={`${API}/download/${file.id}`}>
    <Download size={16}/>
    </a>
    
    <button onClick={()=>deleteFile(file.id)}>
    <Trash2 size={16}/>
    </button>
    
    </div>
    
    </div>
    
    </div>
    
    </div>
    
    ))}
    
    </div>
    
    )}
    
    </div>
    
    </DashboardLayout>
    
    );

};

export default MyFiles;