import {FaSignInAlt, FaSignOutAlt, FaUser, FaGrinAlt} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logoutUser, reset} from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logoutUser())
        dispatch(reset())
        navigate('/')
    }

    return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>REACH YOUR GOALS</Link>
        </div>
        <ul>
            {user ? (<>
            <li>
                <Link to='/dashboard'>
                    <FaGrinAlt /> Dashboard
                </Link>
            </li>
            <li>
                <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            </li>
            </>) : (<>
            <li>
                <Link to='/login'>
                    <FaSignInAlt /> Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser /> Register
                </Link>
            </li>
            </>)}   
        </ul>
    </header>
    )
}

export default Header