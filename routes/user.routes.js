import express from 'express';
import { getUserById, getUsers, updateUseremail, deleteUser, updateUserpassword } from '../controllers/user.controller.js';
import authentication from '../middleware/authentication.js';


const user_router = express.Router();

user_router.get('/',getUsers, authentication);
user_router.get('/:id', authentication ,getUserById );
user_router.put('/:id/email', authentication , updateUseremail );
user_router.put('/:id/password',updateUserpassword)
user_router.delete('/:id',deleteUser );

export default user_router;