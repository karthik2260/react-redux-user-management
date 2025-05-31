import User from '../model.js/Usermodel.js'


const admin = async (req, res) => {
   try {
      const users = await User.find();
      res.status(200).json({
         users
      });
   } catch (error) {   
      console.log("admin err", error.message);
      res.status(500).json({ message: "Internal error" });
   }
};


const deleteUser= async(req,res)=>{

   const {id}= req.body
   console.log(id,'aaaaaaaaaaaaa');
   
   try {
      await User.findByIdAndDelete(id)
      res.status(200).json({ message: "User deleted successfully" });
      
   } catch (error) {
      console.log(error);
      
      res.status(500).json({ message: "Internal error in delete user" });
   }
}


const updateUser = async (req, res) => {
   const { email, id } = req.body;
 
   if (!id || !email) {
     return res.status(400).json({ message: "User ID and email are required." });
   }
 
   try {
     const updatedUser = await User.findByIdAndUpdate(id,{email},{new:true});
 
     if (!updatedUser) {
       return res.status(404).json({ message: "User not found." });
     }
 
     res.status(200).json({ message: "Email updated successfully." });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Internal server error." });
   }
 };


 const uplode=async(req,res)=>{

  
   

   try {
      const userId = req.user._id;
      console.log(userId,'kkkkkkkk');
      
      if (!req.file) {
        return res.status(400).json({ message: "Profile picture is required" });
      }
  
      const imageUrl = `/${req.file.filename}`; 
  
      
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: imageUrl },
        { new: true }
      );
      if (!updatedUser) {
         return res.status(404).json({ message: "User not found." });
       }
  
      res.status(200).json({ updatedUser, message: "Upload successful" });
    } catch (error) {
      console.log("Error uploading profile picture:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
   
 }
 

export{admin,deleteUser,updateUser,uplode}