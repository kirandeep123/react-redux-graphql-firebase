import React from 'react';
import './styles.scss';

import Logo from '../../assets/image_opt.jpg';

const Header = props =>{
return ( <header className="header">
    <div className="wrap">
        <div className="item">
            One stop shop for all your needs 
            {/* <img height="65" width="65" src={Logo} alt="myapp"/> */}
        </div>
    </div>
</header>);
}
export default Header;