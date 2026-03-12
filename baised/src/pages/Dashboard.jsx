import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { UploadCloud, FileText } from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {

  const { getToken } = useAuth();

  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const API_BASE = "http://localhost:8080/api/v1.0/files";

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {

    const token = await getToken();

    const res = await axios.get(`${API_BASE}/my`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setFiles(res.data);

  };

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
  };

  const uploadFiles = async () => {

    if(selectedFiles.length === 0){
      toast.error("No files selected");
      return;
    }

    try{

      const token = await getToken();

      const formData = new FormData();

      selectedFiles.forEach((file)=>{
        formData.append("files", file);
      });

      await axios.post(`${API_BASE}/upload`, formData, {
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
      });

      toast.success("Files uploaded successfully");

      setSelectedFiles([]);
      fetchFiles();

    }catch(error){
      toast.error("Upload failed");
    }

  };

  return (
    <DashboardLayout activeMenu="Dashboard">
  
      <div className="p-4 sm:p-6 md:p-8 bg-[#F7F7FF] min-h-screen">
  
        <h1 className="text-xl sm:text-2xl font-semibold text-[#27187E] mb-1 sm:mb-2">
          My Drive
        </h1>
  
        <p className="text-sm sm:text-base text-[#27187E]/60 mb-6 sm:mb-8">
          Upload, manage, and share your files securely
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  
          {/* Upload Card */}
          <div className="bg-[#F7F7FF] border border-[#27187E]/20 rounded-xl shadow-sm p-4 sm:p-6">
  
            <label className="border-2 border-dashed border-[#27187E]/40 rounded-xl flex flex-col items-center justify-center h-44 sm:h-52 md:h-56 cursor-pointer hover:bg-[#27187E]/10 transition text-center px-4">
  
              <UploadCloud className="w-10 h-10 sm:w-12 sm:h-12 text-[#27187E] mb-2 sm:mb-3"/>
  
              <p className="text-[#27187E] font-medium text-sm sm:text-base">
                Upload your files
              </p>
  
              <span className="text-xs sm:text-sm text-[#27187E]/60">
                Drag your files here
              </span>
  
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
  
            </label>
  
            {/* Selected Files */}
            <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 max-h-48 overflow-y-auto hide-scrollbar">
  
              {selectedFiles.map((file,index)=>(
  
                <div
                  key={index}
                  className="flex items-center justify-between bg-[#27187E]/10 px-3 sm:px-4 py-2 rounded-lg text-[#27187E]"
                >
  
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <FileText size={18}/>
                    <span className="text-xs sm:text-sm break-all">
                      {file.name}
                    </span>
                  </div>
  
                  <span className="text-[10px] sm:text-xs whitespace-nowrap">
                    {(file.size/1024).toFixed(1)} KB
                  </span>
  
                </div>
  
              ))}
  
            </div>
  
            <button
              onClick={uploadFiles}
              className="mt-4 sm:mt-5 w-full bg-[#27187E] text-[#F7F7FF] py-2 sm:py-2.5 text-sm sm:text-base rounded-lg hover:opacity-90 transition"
            >
              Upload {selectedFiles.length} File(s)
            </button>
  
          </div>
  
          {/* Recent Files */}
          <div className="bg-[#F7F7FF] border border-[#27187E]/20 rounded-xl shadow-sm p-4 sm:p-6">
  
            <h2 className="text-base sm:text-lg font-semibold text-[#27187E] mb-4 sm:mb-5">
              Recent Files
            </h2>
  
            <div className="space-y-2 sm:space-y-3 max-h-[400px] overflow-y-auto hide-scrollbar">
  
              {files.map((file)=>(
  
                <div
                  key={file.id}
                  className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#27187E]/10 hover:bg-[#27187E]/5 transition"
                >
  
                  <div className="flex items-center gap-2 sm:gap-3 text-[#27187E] min-w-0">
                    <FileText size={18}/>
                    <span className="text-xs sm:text-sm break-all">
                      {file.name}
                    </span>
                  </div>
  
                  <div className="text-[10px] sm:text-xs text-[#27187E]/60 whitespace-nowrap">
                    {(Number(file.size)/1024).toFixed(1)} KB
                  </div>
  
                </div>
  
              ))}
  
            </div>
  
          </div>
  
        </div>
  
      </div>
  
    </DashboardLayout>
  );
};

export default Dashboard;