import React, { Component } from 'react';
import defaultImg from '../../assets/default-image.jpg';

class DefaultImg extends Component { 
    render() { 
        return ( 
            <img src={defaultImg} alt={"Pokemon image not found"}/> 
        )  
    }
}

export default DefaultImg;