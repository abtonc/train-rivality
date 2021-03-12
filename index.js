const fs = require('fs');
const gm = require('gm');
const config = require('./config.json');

const randomColor = () => {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
};

for (let i = 0; i < config.limit; i++) {
  let image = gm(1024, 1024, '#fff').stroke('#fff', config.stroke);

  const colorsToUse = [];
  for (let c = 0; c < config.colorRange; c++) colorsToUse.push(randomColor());

  for (let y = 0; y < 1024 / config.squareSize; y++) {
    for (let x = 0; x < 1024 / config.squareSize; x++) {
      const x0 = 0 + x * config.squareSize;
      const y0 = 0 + y * config.squareSize;

      const x1 = x0 + config.squareSize;
      const y1 = y0 + config.squareSize;

      const selectedColor =
        colorsToUse[Math.floor(Math.random() * colorsToUse.length)];

      image.fill(selectedColor).drawRectangle(x0, y0, x1, y1);

      if (config.debug)
        console.log(
          `Filled square at ${x}x${y} from ${x0}x${y0} to ${x1}x${y1} with ${selectedColor}`
        );
    }
  }

  image.write(
    `./output/${config.squareSize}-${(i + 1)
      .toString()
      .padStart(config.limit.toString().length, '0')}-${Date.now()}.png`,
    (err) => {
      if (err) console.log(err);
    }
  );
}
