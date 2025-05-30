import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js'
import { uploadCloudinary } from '../utils/cloudinary.js';


export const register = async (req, res) => {
    try{
        const {fullName, email, password} = req.body;
        if(!fullName){
            return res.status(400).json({ message: "Please enter your full name", success: false });
        }
        if(!email){
            return res.status(400).json({ message: "Please enter an email ID", success: false });
        }
        if(!password){
            return res.status(400).json({ message: "Please enter a password", success: false });
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters long", success: false });
        }

        if(await User.findOne({email})){
            return res.status(409).json({ message: "Email already exists", success: false });
        }
        const avatarLocalPath = req.file?.path;
        let avatar;
        try{
            if(avatarLocalPath){
                console.log("Avatar Local Path:", avatarLocalPath);
                avatar = await uploadCloudinary(avatarLocalPath); 
                avatar = avatar.url;      
            }
            else{
                console.log("No avatar uploaded, using default avatar");
                avatar = `https://avatar.iran.liara.run/username?username=${fullName}%20shankar%20mishra&bold=false&length=1`
            }
        }catch (error) {
            return res.status(500).json({ message: "Error uploading avatar", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            avatar
        });

        const isUserExist = await User.findById(user._id).select(
            "-password"
        )

        if(!isUserExist){
            return res.status(500).json({ message: "Something went wrong", success: false });
        }

        return res.status(201).json({ message: "User registered successfully", user: isUserExist, success: true });

    }catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email){
            return res.status(400).json({ message: "Please enter an email ID", success: false });
        }
        if(!password){
            return res.status(400).json({ message: "Please enter a password", success: false });
        }
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found", success: false });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Enter Valid Password", success: false });
        }

        const token = user.generateToken();
        
        // send secure cookies having tokens
        const options = {
            httpOnly: true,
            secure: true,           //This makes cookies secured by not allowing frontend users to modify cookies (view only)
            
        }
        
        return res.status(200)
            .cookie("token", token, options)
            .json({
                    message: "Login successful",
                    success: true,
                    user: {
                        _id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        avatar: user.avatar,
                    }
                }
            );
        
        
    }catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = async (req, res) => {
    try{
        const options = {
            httpOnly: true,
            secure: true,           //This makes cookies secured by not allowing frontend users to modify cookies (view only)
            expires: new Date(Date.now()) // Set cookie to expire immediately
        }
        return res.status(200).cookie("token", null, options).json({
            message: "Logout successful",
            success: true
        })
    }catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}