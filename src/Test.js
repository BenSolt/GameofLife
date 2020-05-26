import React from 'react';
export default function Test() {

    // return(
    //     <div>test</div>
    // )

function getPixel(imageData, x, y) {
    const w = imageData.width;
    const h = imageData.height;

    if (x < 0 || x >= w || y < 0 || y >= h) {
        return null;
    }

    
    const index = (w * y + x) * 4;

    return imageData.data.slice(index, index + 4);
    
}

// const canvas = document.querySelector('#my-canvas');
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');



const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const pixelRGBA = getPixel(imageData, 10, 10);

console.log(pixelRGBA);



}