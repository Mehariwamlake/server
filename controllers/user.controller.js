import User from "../models/user.model.js";

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the users" });
    }
}

// Get a single user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the user" });

        
    }
}

// Update a user by ID
const updateUserpassword = async (req, res) => {
    try{
        const userId = req.params.id;
        const {password} = req.body;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({error: "user not found"});
        }
        user.password = password;
        await user.save();

        return res.status(200).json(user);
    } catch (error){
        return res.status(500).json({error: "fail to update pasword"})
    }
}

const updateUseremail = async (req, res) => {
    try {
        const userId = req.params.id;
        const { email } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        
        user.email = email;
        await user.save();
        
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Failed to update the user email" });
    }
}

// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.remove();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete the user" });
    }
}

export { getUsers, getUserById, updateUseremail, updateUserpassword, deleteUser };

