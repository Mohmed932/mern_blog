"use client"
import '@/styles/Auth.css'
import Link from 'next/link'
import { useContext, useState } from 'react';
import { CustomContext } from '../Context';
import { useRouter } from 'next/navigation';
const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [empty, setEmpty] = useState(null);
    const [allow, setallow] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [validEmail, setValidEmail] = useState(null);
    const [status, setStatus] = useState(null);
    const { data, setData } = useContext(CustomContext);


    // const navigation = 
    const validateEmail = (email) => {
        // Regular expression for more comprehensive email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };
    const isActive = () => {
        if (email.length > 1 && password.length > 1) {
            setIsButtonEnabled(true); // تمكين الزر إذا تم تلبية جميع الشروط
            setallow(true);
        }
    };
    const router = useRouter()

    const handleRedirect = () => {
        router.push('/')
    }
    const handelform = (e) => {
        e.preventDefault();
        email === "" ? setEmpty(false) : setEmpty(true) & setValidEmail(validateEmail(email));
        password === "" ? setEmpty(false) : setEmpty(true)
        if (email === '' | password === '') {
            setEmpty(false)
        }
        if (email !== '' && password !== '' && validateEmail(email)) {
            (async () => {
                try {
                    const req = await fetch("http://localhost:5000/login", {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                        credentials: 'include'
                    });
                    const res = await req.json();
                    setStatus(req.ok)
                    if (req.ok) {
                        setData(res);
                        handleRedirect()
                    }
                } catch (error) {
                    if (error) throw error;
                    console.log(error);
                }
            })()
        }
    }
    return (
        <div className='auth'>
            <form className='auth_container'>
                <h1>تسجيل الدخول</h1>
                <div className='labal_input'>
                    <label htmlFor='email'>البريد الألكتروني</label>
                    <input type='email' id='email' name='email' required onChange={(e) => setEmail(e.target.value) & isActive()} />
                </div>
                {validEmail === false ? <span>يرجي كتابه البريد الالكتروني بشكل صحيح</span> : ''}
                <div className='labal_input'>
                    <label htmlFor='Password'>كلمه المرور</label>
                    <input type='password' id='Password' name='Password' required onChange={(e) => setPassword(e.target.value) & isActive()} />
                </div>
                {empty === false ? <span>يجب الا يكون اي حقل فارغ</span> : ''}
                {status === false ? <span>اسم المستخدم أو كلمة المرور غير صحيحة.</span> : ''}
                <button
                    className='btn'
                    onClick={e => handelform(e)}
                    disabled={!isButtonEnabled} // استخدم القيمة المعكوسة للتعيين
                    style={allow === false ? { cursor: "not-allowed", opacity: '.3' } : { cursor: "pointer", opacity: '1' }}
                >تسجيل دخول</button>
                <div className='Auth_line'>
                    <Link href='/'>هل نسيت كلمه المرور؟</Link>
                </div>
                <button className='btn_signup' type='submit' onClick={e => e.preventDefault()}><Link href='/signup'>ليس لديك حساب ؟</Link></button>
            </form>
        </div>
    )
}

export default login
