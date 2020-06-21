import React from 'react';
import image from '../../assets/image_opt.jpg';
import './styles.scss';
const Directory =props=>{
    return (
        <div className="directory">
            <div className="wrap">
            <div className="item1" style={{ backgroundImage:`url(${image })`}}><a href="https://google.com">shop woman</a></div>
            <div className="item1" style={{ backgroundImage:`url(${image })`}}><a>shop mans  </a></div>
            </div>
             </div>
    )
}
export default Directory;