import React from 'react';
import './styles.scss';
import {Link} from 'react-router-dom';
import Logo from '../../assets/image_opt.jpg';

const Header = props =>{
return ( <header className="header">
    <div className="wrap">
        <div className="item">
            <Link to="/"> 
            One stop shop for all your needs </Link>
        </div>
        <div className="callToActions">
            <ul>
                    <Link to="/registeration">
                    Register</Link>
                
            </ul>
        </div>
    </div>
</header>);
}
export default Header;