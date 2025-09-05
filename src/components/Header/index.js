import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'

const Header = (props)=>{
    const onClickLogout = ()=>{
        Cookies.remove('jwt_token')
        const{history} = props
        history.replace('/login')
    }
    return(
    <div className="header-container">
        <div className='header-logo-container'>
            <img className='header-logo' src='https://res.cloudinary.com/dcmfpzh01/image/upload/v1753874751/Frame_8004_pvbvvb.png' alt='website logo'/>
        </div>
        <button className='header-logout-container-img' type='button' onClick={onClickLogout}>
            <img className='logout-icon' src='https://res.cloudinary.com/dcmfpzh01/image/upload/v1753979443/log-out-02_pfdrtg.png' alt='logout'/>
        </button>
        <button className='header-logout-container-btn' type='button' onClick={onClickLogout}>
            Logout
        </button>
    </div>
)
}

export default withRouter(Header)