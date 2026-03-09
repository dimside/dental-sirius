const path = require('path');
const fs = require('fs');
const SvgSprite = require('svg-sprite');

const config = {
  mode: {
    symbol: {
      dest: '.', // результат сохраняется в папке назначения
      sprite: 'sprite.svg', // имя спрайта
    },
  },
  shape: {
    transform: ['svgo'], // оптимизация каждого SVG
  },
};

const spriter = new SvgSprite(config);

// Путь к исходным SVG
const svgFolder = path.resolve(__dirname, 'src/assets/icons');

fs.readdirSync(svgFolder).forEach((file) => {
  const filePath = path.join(svgFolder, file);
  spriter.add(filePath, null, fs.readFileSync(filePath, 'utf-8'));
});

// Компиляция и сохранение спрайта
spriter.compile((error, result) => {
  if (error) {
    console.error(error);
  } else {
    // Папка назначения для спрайта — public/icons
    const outputFolder = path.resolve(__dirname, 'src/assets/icons');
    if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder, { recursive: true });

    const spriteContent = result.symbol.sprite.contents;
    fs.writeFileSync(path.join(outputFolder, 'sprite.svg'), spriteContent);
    console.log('Спрайт создан: assets/icons/sprite.svg');
  }
});
