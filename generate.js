"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sharp = require("sharp");
const inputImagePath = "Images/input/CITYVIEW_02_261.jpg";
const outputImagePath = "Images/output/New_CITYVIEW_02_261.jpg";
const backgroundColor = "#D7A9B8";
const outputWidth = 1080;
const outputHeight = 1080;
const borderRadius = 30;
const shadowOffset = 10;
const shadowBlur = 15;
function generateImage() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const processedImage = yield sharp(inputImagePath)
                .resize(800, 800, {
                fit: "inside",
            })
                .extend({
                top: shadowOffset,
                bottom: shadowOffset,
                left: shadowOffset,
                right: shadowOffset,
                background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
                .toBuffer();
            yield sharp({
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
                    gravity: "center",
                    blend: "over",
                },
            ])
                .sharpen()
                .blur(shadowBlur)
                .png()
                .toFile(outputImagePath);
            console.log("Image generated successfully:", outputImagePath);
        }
        catch (error) {
            console.error("Error processing image:", error);
        }
    });
}
generateImage();
