"use client"
import '@/styles/Auth.css'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
const Signup = () => {
    const [fristName, setfristName] = useState('');
    const [secoundName, setSecoundName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [empty, setEmpty] = useState(null);
    const [validEmail, setValidEmail] = useState(null);
    const [checkEmail, setcheckEmail] = useState(null);
    const [allow, setallow] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const validateEmail = (email) => {
        // Regular expression for more comprehensive email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };
    const isActive = () => {
        if (email.length > 1 && password.length > 1 && fristName.length > 1 && secoundName.length > 1) {
            setIsButtonEnabled(true); // تمكين الزر إذا تم تلبية جميع الشروط
            setallow(true);
        }
    };
    const router = useRouter()

    const handleRedirect = () => {
        router.push('/login')
    }
    const CreateUser = async () => {
        const userName = email.substring(0, email.indexOf("@"));
        try {
            const req = await fetch("http://localhost:5000/signup", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ userName, fristName, secoundName, password, email })
            });
            req.status === 409 ? setcheckEmail(true) : setcheckEmail(null)
            const res = await req.json();
            console.log(res)
            if (req.status === 201) {
                handleRedirect()
            }
        } catch (error) {
            if (error) throw error;
            console.log(error);
        }
    }
    const handelform = (e) => {
        e.preventDefault();
        email === "" ? setEmpty(false) : setEmpty(true) & setValidEmail(validateEmail(email))
        fristName === "" ? setEmpty(false) : setEmpty(true)
        secoundName === "" ? setEmpty(false) : setEmpty(true)
        password === "" ? setEmpty(false) : setEmpty(true)
        if (fristName === '' | email === '' | password === '' | secoundName === '') {
            setEmpty(false)
        }
        if (fristName !== '' && secoundName !== '' && email !== '' && password !== '' && validateEmail(email)) {
            CreateUser()
        }
    }
    return (
        <div className='auth'>
            <form className='auth_container'>
                <h1>انشاء حساب</h1>
                <div className='labal_input labal_input_container'>
                    <div>
                        <label htmlFor='fristName'>الاسم الأول</label>
                        <input type='text' id='fristName' name='fristName' required onChange={(e) => setfristName(e.target.value) & isActive()} />
                    </div>
                    <div>
                        <label htmlFor='secoundName'>الاسم الأخير</label>
                        <input type='text' id='secoundName' name='secoundName' required onChange={(e) => setSecoundName(e.target.value) & isActive()} />
                    </div>
                </div>
                <div className='labal_input'>
                    <label htmlFor='email'>البريد الألكتروني</label>
                    <input type='email' id='email' name='email' required onChange={(e) => setEmail(e.target.value) & isActive()} />
                </div>
                {validEmail === false ? <span>يرجي كتابه البريد الالكتروني بشكل صحيح</span> : ''}
                {checkEmail ? <span>هذا البريد مستخدم بلفعل</span> : ''}
                <div className='labal_input'>
                    <label htmlFor='Password'>كلمه المرور</label>
                    <input type='password' id='Password' name='Password' required onChange={(e) => setPassword(e.target.value) & isActive()} />
                </div>
                {empty === false ? <span>يجب الا يكون اي حقل فارغ</span> : ''}
                <button
                    className='btn'
                    type='submit'
                    disabled={!isButtonEnabled} // استخدم القيمة المعكوسة للتعيين
                    style={allow === false ? { cursor: "not-allowed", opacity: '.3' } : { cursor: "pointer", opacity: '1' }}
                    onClick={e => handelform(e)}
                >انشاء حساب</button>
                <button className='btn_signup'><Link href='/login'>هل لديك حساب ؟</Link></button>
            </form>
        </div>
    )
}

export default Signup
