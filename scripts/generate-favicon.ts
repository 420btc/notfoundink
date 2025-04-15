import sharp from "sharp";
import fs from "fs";

(async () => {
  await sharp("./public/images/aNeW.jpg")
    .resize(64, 64)
    .toFile("./public/favicon.png");
})();
