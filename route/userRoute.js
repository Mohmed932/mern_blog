import { Router } from "express"
import { islogedIn, logInController, logOutController, signUpController } from "../controller/usercontroller.js";
import { verifyToken } from "../middleware/protected.js";

export const UserRoute = Router();

UserRoute.post('/signup', signUpController)
UserRoute.post('/login', logInController)
UserRoute.post('/logout', logOutController)
UserRoute.get('/islogedIn', verifyToken, islogedIn)