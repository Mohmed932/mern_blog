"use client"
import { CustomContext } from '../../app/Context'
import '@/styles/Header.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { Fragment, useContext, useEffect } from 'react'


const Header = () => {
    const { data, setData } = useContext(CustomContext);
    const logOut = async () => {
        try {
            const req = await fetch("http://localhost:5000/logout", {
                method: 'POST',
                credentials: 'include'
            });
            const res = await req.json();
            if (req.ok) {
                setData(null)
            }
        } catch (error) {
            if (error) throw error;
            console.log(error);
        }
    }
    useEffect(() => {
        (async () => {
            try {
                const req = await fetch("http://localhost:5000/islogedIn", {
                    credentials: 'include'
                });
                const res = await req.json();
                if (req.ok) {
                    setData(res)
                } else {
                    setData(null);
                    console.log(req)
                    const router = useRouter();
                    router.push('/login'); // توجيه إلى صفحة تسجيل الدخول
                }
            } catch (error) {
                if (error) throw error;
                console.log(error);
            }
        })()
    }, []);
    return (
        <div className='Header'>
            <div className='Header_logo'>T<span>R</span>Y</div>
            <div className='Header_items'>
                {!data ?
                    <Fragment>
                        <Link href='/login'>Login</Link>
                        <Link href='/signup'>SignUp</Link>
                    </Fragment> :
                    <Fragment>
                        <Link href='/craete'>Craete Post</Link>
                        <span className='Logout' onClick={logOut}>Logout {data?.fristName}</span>
                    </Fragment>}
            </div>
        </div>
    )
}

export default Header
