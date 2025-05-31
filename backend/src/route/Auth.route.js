import express, { Router } from "express";
import { signup,logout,login } from "../controller/Auth.controller.js";
import { admin, deleteUser, updateUser, uplode } from "../controller/Admin.js";
import protect from "../middleware/protect.js";

import upload from "../lib/multer.js";
const router=express.Router()

router.post('/signup',signup)
router.post('/logout',logout)
router.post('/login',login)
router.get('/admin',admin)
router.post('/delete',deleteUser)
router.put('/update',updateUser)
router.put('/upload',protect,upload,uplode)
export default router