import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Upload as UploadIcon, X } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

const Upload = () => {

const [files,setFiles] = useState([]);
const { getToken } = useAuth();
const MAX_FILES = 5;

const handleFileSelect = (e) => {

const selected = Array.from(e.target.files);

if(files.length + selected.length > MAX_FILES){
toast.error("You can only upload a maximum of 5 files at once");
return;
}

setFiles(prev => [...prev,...selected]);

};

const handleDrop = (e) => {

e.preventDefault();

const dropped = Array.from(e.dataTransfer.files);

if(files.length + dropped.length > MAX_FILES){
toast.error("You can only upload a maximum of 5 files at once");
return;
}

setFiles(prev => [...prev,...dropped]);

};

const removeFile = (index) => {
setFiles(files.filter((_,i)=> i !== index));
};

const uploadFiles = async () => {

try{

if(files.length === 0){
toast.error("No files selected");
return;
}

const token = await getToken();

const formData = new FormData();

files.forEach(file=>{
formData.append("files",file);
});

await axios.post(
"http://localhost:8080/api/v1.0/files/upload",
formData,
{
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"multipart/form-data"
}
}
);

toast.success("Upload completed");

setFiles([]);

}catch(error){

console.log(error);
toast.error("Upload failed");

}

};

return (

    <DashboardLayout activeMenu="Upload">
    
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto bg-[#F7F7FF] min-h-screen">
    
    <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-[#27187E]">
    Upload Files
    </h2>
    
    <div
    onDragOver={(e)=>e.preventDefault()}
    onDrop={handleDrop}
    className="border-2 border-dashed border-[#27187E]/40 rounded-xl p-6 sm:p-10 md:p-12 text-center hover:bg-[#27187E]/10 transition"
    >
    
    <input
    type="file"
    multiple
    className="hidden"
    id="fileInput"
    onChange={handleFileSelect}
    />
    
    <label htmlFor="fileInput" className="cursor-pointer">
    
    <div className="flex flex-col items-center gap-2 sm:gap-3">
    
    <UploadIcon size={40} className="text-[#27187E] sm:w-12 sm:h-12" />
    
    <p className="text-[#27187E] font-medium text-base sm:text-lg">
    Upload your files
    </p>
    
    <p className="text-xs sm:text-sm text-[#27187E]/60">
    Drag your files here
    </p>
    
    </div>
    
    </label>
    
    </div>
    
    {files.length > 0 && (
    
    <div className="mt-5 sm:mt-6 bg-[#F7F7FF] rounded-xl border border-[#27187E]/20 max-h-72 overflow-y-auto">
    
    <p className="p-3 font-medium border-b border-[#27187E]/20 text-[#27187E] text-sm sm:text-base">
    Selected Files ({files.length}/{MAX_FILES})
    </p>
    
    {files.map((file,index)=> (
    
    <div
    key={index}
    className="flex items-center justify-between p-3 border-b border-[#27187E]/10"
    >
    
    <div className="min-w-0">
    
    <p className="text-xs sm:text-sm font-medium text-[#27187E] break-all">
    {file.name}
    </p>
    
    <p className="text-[11px] sm:text-xs text-[#27187E]/60">
    {(file.size/1024/1024).toFixed(2)} MB
    </p>
    
    </div>
    
    <button
    onClick={()=>removeFile(index)}
    className="text-[#27187E]/60 hover:text-red-500 transition"
    >
    <X size={18}/>
    </button>
    
    </div>
    
    ))}
    
    </div>
    
    )}
    
    <button
    onClick={uploadFiles}
    className="mt-5 sm:mt-6 w-full bg-[#27187E] text-[#F7F7FF] py-2.5 sm:py-3 text-sm sm:text-base rounded-lg hover:opacity-90 transition"
    >
    Upload {files.length} File(s)
    </button>
    
    </div>
    
    </DashboardLayout>
    
    );

};

export default Upload;