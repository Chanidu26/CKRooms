import React from 'react'
import { BeatLoader } from 'react-spinners';

function Loader() {
    return ( <div className='loader'>
        <span style={{
                        fontFamily: "cursive",
                        fontSize: "50px",
                        color: "black",
                    }}>Please Wait</span>
        <div><BeatLoader
            color="#000000"
            size={25}
            speedMultiplier={0.6}
        /></div>
        </div>)
}

export default Loader