import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // console.log(req.body);
        // first check if the user already exists
        const existing_user = await User.findOne({ username });
        const existing_user2 = await User.findOne({ email });

        if (existing_user || existing_user2) {
            return res.status(400).json({ error: "Username or email is already in use" });
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(password, salt);

        // create a new user
        const user = new User({ username, email, password:hashed_password, role });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the user' });
    }
    }

const signin = async (req, res) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({error: "user not found"});
        }

        const is_password_cor = await bcrypt.compare(password, user.password);
        if(!is_password_cor){
            return res.status(401).json({error: "invalid try"});
        }
        const token= jwt.sign(
            {username: user.username, id: user._id, role: user.role},
            process.env.SECRET_KEY,
            {expiresIn: '1d'}
        )

        res.status(200).json({result: user, token})

    } catch (error) {
        res.status(500).json({error: "fail to signin"})
    }
}

export { signup, signin };