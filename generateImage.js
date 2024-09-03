const sharp = require('sharp');

const inputImagePath = 'images/input/CITYVIEW_02_261.jpg'; 
const outputImagePath = 'images/output/New_CITYVIEW_02_261.jpg'; 

const backgroundColor = '#D7A9B8';
const outputWidth = 1080; 
const outputHeight = 1080; 
const borderRadius = 30; 
const shadowOffset = 10; 
const shadowBlur = 15; 

async function generateImage() {
  try {
 
    const processedImage = await sharp(inputImagePath)
      .resize(800, 800, {
        fit: 'inside', 
      })
      .extend({
        top: shadowOffset,
        bottom: shadowOffset,
        left: shadowOffset,
        right: shadowOffset,
        background: { r: 0, g: 0, b: 0, alpha: 0 }, 
      })
      .toBuffer();

    await sharp({
      create: {
        width: outputWidth,
        height: outputHeight,
        channels: 4,
        background: backgroundColor,
      },
    })
      .composite([
        {
          input: processedImage,
          top: (outputHeight - 800) / 2,
          left: (outputWidth - 800) / 2,
          blend: 'over',
        },
      ])
      .sharpen() 
      .blur(shadowBlur) 
      .png()
      .toFile(outputImagePath);

    console.log('Image generated successfully:', outputImagePath);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}
generateImage();
