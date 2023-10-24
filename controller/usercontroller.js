import { User } from '../models/userModel.js'
import { comparePassword, hashPassword } from '../utlis/bcrypt.js';
import { craeteToken } from '../utlis/token.js';



export const signUpController = async (req, res) => {
    const { userName, fristName, secoundName, password, email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "البريد الإلكتروني موجود بالفعل. الرجاء اختيار بريد الكتروني آخر."
            })
        }
        const hash = await hashPassword(password)
        const Data = new User({ userName, fristName, secoundName, password: hash, email });
        await Data.save();
        return res.status(201).json({ userName, email, fristName, secoundName, })
    } catch (error) {
        if (error) throw error
    }
}


export const logInController = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "اسم المستخدم أو كلمة المرور غير صحيحة."
            })
        }
        const compare = await comparePassword(password, user.password)
        if (!compare) {
            return res.status(401).json({
                message: "اسم المستخدم أو كلمة المرور غير صحيحة."
            })
        }
        const token = craeteToken(res, user._id, user.userName, user.email);
        return res.header("Authorization", token).status(200).json({ userName: user.userName, email, fristName: user.fristName, secoundName: user.secoundName, });
    } catch (error) {
        if (error) throw error
    }
};

export const logOutController = async (req, res) => {
    try {
        // const { token } = req.cookies
        return res.cookie('token', '', { expires: new Date(0) }).json("logout success")
    } catch (error) {
        if (error) throw error
    }
};

export const islogedIn = async (req, res) => {
    try {
        const { _id } = res.user
        const user = await User.findOne({ _id })
        if (!user) {
            return res.status(401).json({
                message: "يمكن ان يكون تم حذف هذا الحساب يرجي اعاده تسجيل الدخول"
            })
        }
        return res.json({ userName: user.userName, email: user.email, fristName: user.fristName, secoundName: user.secoundName });
    } catch (error) {
        if (error) throw error
    }
};