import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'
const logo = () => {
    return (
        <div className="ma4" style={{width:'200px'}}>
            <Tilt className="tile br4 shadow-2">
                <div className="ph4 pv2" style={{ height: '150px' }}>
                    <img src={brain} style={{height:'130px'}}/>
                </div>
            </Tilt>
        </div>
    )
}

export default logo;