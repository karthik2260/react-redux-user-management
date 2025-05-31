import toast from "react-hot-toast";
import { axiosInstance } from "./axios";



const uploadProfilePic =async(file)=>{
    if (!file) return;

    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }
  
    const formData = new FormData();
    formData.append("profilePic", file);
  
    try {
      const res = await axiosInstance.put('/auth/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
        
      toast.success("Update successful");
      console.log(res.data.updatedUser);
      
      return res.data.updatedUser
   
    } catch (error) {
      
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Upload failed");
    }
  
}






const signupUser = async (formData) => {
    try {
      const res = await axiosInstance.post("/auth/signup", formData);
      return res; 
    } catch (error) {
      
      throw error; 
    }
  };


  const updateEmail = async (id, email) => {
    try {
      const res = await axiosInstance.put("/auth/update", { email, id });
      if (res.status === 200) {
        const updatedRes = await axiosInstance.get("/auth/admin");
        return updatedRes
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      throw error;
    }
  };


const  deleteUser=async(id)=>{

try {
    const res = await axiosInstance.post("/auth/delete",{id});
    
    if (res.status === 200) {
        const res =await axiosInstance.get("/auth/admin");
      return res;
    } else {
        toast.error("Something went wrong.");
      throw new Error("Something went wrong");
    }
  } catch (error) {
    throw error;
  }
  }


export{
    uploadProfilePic,signupUser,updateEmail,deleteUser
}