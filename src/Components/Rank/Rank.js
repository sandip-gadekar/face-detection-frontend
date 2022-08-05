import React from "react";
const Rank=({name,entries})=>{
    return(
        <div style={{textAlign:'center'}}>
            <div className="f3 ">
                {`${name} your rank is`}
            </div>
            <div className="f2 white">
                {entries}
            </div>
        </div>
    )
}

export default Rank;