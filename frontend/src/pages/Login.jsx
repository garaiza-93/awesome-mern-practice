import {useState, useEffect} from 'react'
import {FaSignInAlt, FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {loginUser, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector
    (
        (state) => state.auth
    )

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/dashboard')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) =>{
        e.preventDefault()

        if(!email || !password) {
            toast.error('Missing username or password')
        } else {
            const userData = {
                email,
                password
            }

            dispatch(loginUser(userData))
        }
    }

    if (isLoading) {
        return <Spinner/>
    }

  return <>
    <section className='heading'>
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <p>Please log in. Pretty please.</p>
    </section>
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type='email' 
                    className='form-control' 
                    id='email'
                    name = 'email' 
                    value={email} 
                    placeholder='Email Address' 
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <input type='password' 
                    className='form-control' 
                    id='password'
                    name = 'password' 
                    value={password} 
                    placeholder='Password' 
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <button type='submit' className='btn btn-block'>
                    Submit
                </button>
            </div>
        </form>
    </section>
  </>
}

export default Login