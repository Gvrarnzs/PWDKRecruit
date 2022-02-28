import React, { useEffect, useState } from 'react';
import { Button } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { 
    collection, where, query, doc, get, onSnapshot, getDoc, getDocs
} from "firebase/firestore";
import { db } from '../connections/Connect';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const DetailPage = () => {
    const idUsers = useRouter().asPath.slice(1)
    const [userData, setuserData] = useState();
    const docRef = doc(db, 'users', idUsers);
    const [userImage, setuserImage] = useState();
    const [loading, setloading] = useState(true)

    const usersFunc = async () => {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setuserData(docSnap.data())
        } else {
            console.log("No such document!");
            alert("No Such Document!")
        }
        
    }
    
    const fetchUnsplash = async() => {
        const response = await axios.get('https://api.unsplash.com/photos/random/?client_id=pQcBpoT9uKVytT8Q1IW4XMMruPXaEQu13lEeFrsiF1Q')
        const data = await response.data
        setuserImage(data)
        setloading(false)
        console.log(data.urls.full)
    }
    useEffect(() => {
        usersFunc()
        fetchUnsplash()
    }, []);
    if (loading){
        return (
            <div className='flex justify-center mt-5'>
                <CircularProgress  sx={{mr: 5}}/>
                <CircularProgress />
            </div>
        )
    }
    return (
        <div className='bg-primary h-screen flex justify-center items-center'>
            <div className='bg-primary h-5/6 w-5/6 flex rounded-full'>
                <div className="basis-6/12 overflow-hidden">
                    <img className='object-cover object-center h-full w-full' src={userImage.urls.raw} alt="image error" />
                </div>
                <div className='basis-6/12 text-center bg-secondary overflow-hidden'>
                    <div className='font-mono mt-36 font-bold tracking-wider text-2xl'><AlternateEmailOutlinedIcon sx={{fontSize: 20}} />{userData.username}</div>
                    <div className='mt-3 text-xl'><BadgeOutlinedIcon sx={{fontSize: 20, mr:3}} />{userData.name}</div>
                    <div className='mt-3 text-xl'><MailOutlinedIcon sx={{fontSize: 20, mr:3}} />{userData.email}</div>
                    <div className='mt-3 text-xl'><PasswordOutlinedIcon sx={{fontSize: 20, mr:3}} />{userData.password}</div>
                    <div className='mt-3 text-xl'>{userData.age} Years Old</div>
                    <div className='mt-12 text-lg text-primary'>
                        <ArrowBackIosIcon/><Link href={"/"}>Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage