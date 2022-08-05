import React from "react";
const Navigation = ({ onRouteChange,signedIn }) => {
    if (signedIn){
        return (
            <header className="bg-black-90  w-100" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <nav className="f6 fw6 ttu tracked">
                    <p onClick={() => onRouteChange('signin')} className="link dim white dib mr3">Sign Out</p>
                </nav>
            </header>
        )
    }
    else  
    {
        return (
            <header className="bg-black-90  w-100" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <nav className="f6 fw6 ttu tracked">
                    <p onClick={() => onRouteChange("signin")} className="link dim white dib mr3">Sign In</p>
                    <p onClick={() => onRouteChange("Register")} className="link dim white dib mr3">Register</p>
                </nav>
            </header>
        )

    }


}
export default Navigation;