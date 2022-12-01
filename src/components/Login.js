import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../index.css'

const Login = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handlesubmit = (e) => {
        e.preventDefault();
        if (data.email == 'foo' && data.password == 'bar') {
            localStorage.setItem('dataKey', JSON.stringify(data));
            navigate('/home')
        }
        else
            window.alert("wrong credentials");
    };

    const handleChange = (e) => {

        let name = e.target.name
        let value = e.target.value;
        setData({ ...data, [name]: value })
    }

    return (
        <div className='outer'>

            <div className='login w-100 mt-5'>
                <h3 className='text-center'>Login Form</h3>
                <form className=' mt-5 ' onSubmit={handlesubmit}>
                    <div class="form-outline mb-4">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="text" class="form-control border" id="exampleInputEmail1" name='email' value={data.email} onChange={handleChange} />

                    </div>

                    <div class="form-outline mb-4">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control border" id="exampleInputPassword1" name='password' value={data.password} onChange={handleChange} />

                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>


                </form>
                <p className='text-center'>Only accecpts </p>
                <div className='text-center'><span >Username: foo </span><span className='mx-5'>Pasword: bar </span></div>

            </div>
        </div>
    )
}

export default Login