function getPixel(imageData, x, y) {
    const w = imageData.width;
    const h = imageData.height;

    if (x < 0 || x >= w || y < 0 || y >= h) {
        // Out of bounds
        return null;
    }

    
    const index = (w * y + x) * 4;

    // Return a copy of the R, G, B, and A elements
    return imageData.data.slice(index, index + 4);
}

// Example Usage

const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const pixelRGBA = getPixel(imageData, 10, 10);

console.log(pixelRGBA);