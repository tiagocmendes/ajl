import React from 'react';

import './style.css';

const Loader: React.FC = () => {

    return (
        <div className='loader-container'>
            <div className="box">
                <div className="shadow"></div>
                <div className="gravity">
                    <div className="ball"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader;