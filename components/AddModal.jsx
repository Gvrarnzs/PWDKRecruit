import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../connections/Connect';
import {useFormik} from 'formik'
import ErrorIcon from '@mui/icons-material/Error';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '15px',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};
const TextfieldCustom = styled(TextField)({
    '& label.Mui-focused': {
      color: '#38A3A5',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ceeaeb',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ceeaeb',
      },
      '&:hover fieldset': {
        borderColor: '#38A3A5',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ceeaeb',
      },
    },
});
const Addmodal = ({open, handleModal}) => {
    const colRef = collection(db, 'users')
    let regexSymbol = new RegExp("^(?=.*?[#?!@$%^&*}{:;-])")
    //? Untuk Validate Value Formik
    const validate = values => {
        const errors = {}
        if (!values.email){
            errors.email = "Required"
        }else if (values.email.length < 4){
            errors.email = 'Must be 5 Characters or more'
        }
        if (!values.password){
            errors.password = "Required"
        }else if (values.password.length < 4){
            errors.password = 'Must be 5 Characters or more'
        }
        if (!values.username){
            errors.username = "Required"
        }else if (values.username.length < 4){
            errors.username = 'Must be 5 Characters or more'
        }
        if (!values.name){
            errors.name = "Required"
        }else if (values.name.length < 4){
            errors.name = 'Must be 5 Characters or more'
        }
        if (!values.age){
            errors.age = "Required"
        }else if (regexSymbol.test(values.age.toString())){
            errors.age = 'Fill Number Only!'
        }
        return errors
    }


    //? Cara menggunakan Formik 
    const formik = useFormik({
        initialValues:{
            username: '',
            name: '',
            email: '',
            password: '',
            age: '',
        },validate,
        onSubmit: values => {
            const { username, name, email, password, age } = values
            addDoc(colRef, {username, name, email, password, age})
            // alert(JSON.stringify(values, null, 2))\
            handleModalclose()
        }
    })

    //? Close Modal dan Reset Form
    const handleModalclose = () => {
        formik.handleReset()
        handleModal()
    }
    return (
        <div className='bg-gray-400'>
            <Modal
                open={open}
                onClose={handleModalclose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" sx={{mb:3, mt: 1, textAlign: 'center', fontSize: 25}} component="h2">
                        Add User
                    </Typography>
                    <form onSubmit={formik.handleSubmit} id="add-form-next">
                        <TextfieldCustom 
                            name = "username"
                            value = {formik.values.username}
                            onChange= {formik.handleChange}
                            onBlur={formik.handleBlur}
                            label = 'Username'
                            id='custom-css-outlined-input'
                            sx={{ mt: 1 }}
                            fullWidth
                        />
                        {formik.touched.username && formik.errors.username ? 
                            <Typography color='error' sx={{ fontSize: 13, mt: 0.5, justifyContent: 'center' }}>
                                <ErrorIcon sx={{ fontSize: 'medium', mr: 0.5 }} />{formik.errors.username}
                            </Typography> : null}
                        <TextfieldCustom 
                            name = "name"
                            value = {formik.values.name}
                            onChange= {formik.handleChange}
                            label = 'Name'
                            id='custom-css-outlined-input'
                            sx={{ mt: 1 }}
                            fullWidth
                        />
                        {formik.touched.name && formik.errors.name ? 
                            <Typography color='error' sx={{ fontSize: 13, mt: 0.5, justifyContent: 'center' }}>
                                <ErrorIcon sx={{ fontSize: 'medium', mr: 0.5 }} />{formik.errors.name}
                            </Typography> : null}
                        <TextfieldCustom 
                            name = "email"
                            value = {formik.values.email}
                            onChange= {formik.handleChange}
                            onBlur={formik.handleBlur}
                            label = 'Email'
                            id='custom-css-outlined-input'
                            sx={{ mt: 1 }}
                            fullWidth
                        />
                        {formik.touched.email && formik.errors.email ? 
                            <Typography color='error' sx={{ fontSize: 13, mt: 0.5, justifyContent: 'center' }}>
                                <ErrorIcon sx={{ fontSize: 'medium', mr: 0.5 }} />{formik.errors.email}
                            </Typography> : null}
                        <TextfieldCustom 
                            name = "password"
                            value = {formik.values.password}
                            onChange= {formik.handleChange}
                            onBlur={formik.handleBlur}
                            label = 'Password'
                            id='custom-css-outlined-input'
                            sx={{ mt: 1 }}
                            fullWidth
                        />
                        {formik.touched.password && formik.errors.password ? 
                            <Typography color='error' sx={{ fontSize: 13, mt: 0.5, justifyContent: 'center' }}>
                                <ErrorIcon sx={{ fontSize: 'medium', mr: 0.5 }} />{formik.errors.password}
                            </Typography> : null}
                        <TextfieldCustom 
                            name = "age"
                            value = {formik.values.age}
                            onChange= {formik.handleChange}
                            label = 'Age'
                            type="number"
                            id='custom-css-outlined-input'
                            sx={{ mt: 1 }}
                            fullWidth
                        />
                        {formik.touched.age && formik.errors.age ? 
                            <Typography color='error' sx={{ fontSize: 13, mt: 0.5, justifyContent: 'center' }}>
                                <ErrorIcon sx={{ fontSize: 'medium', mr: 0.5 }} />{formik.errors.age}
                            </Typography> : null}
                        <Button fullWidth variant="outlined" sx={{mt:3,color: "#293045", borderColor: "#293045", ":hover":{color: "#293045", borderColor: "#293045"}}} type="submit">Add</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    )
}

export default Addmodal