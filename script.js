// Adicione à página o título "Paleta de Cores"
const cabecalho = document.getElementById('cabecalho');
const h1 = document.createElement('h1');
h1.id = 'title';
h1.innerHTML = 'Paleta de Cores';
cabecalho.appendChild(h1);
// Adicione à página uma paleta contendo quatro cores distintas.
const ul = document.createElement('ul');
ul.id = 'color-palette';
cabecalho.append(ul);
for (let i = 0; i < 4; i += 1) {
  const li = document.createElement('li');
  li.className = 'color';
  li.style.border = '1px solid black';
  li.style.display = 'inline-block';
  li.style.width = '45px';
  li.style.height = '45px';
  ul.appendChild(li);
}
// Função que gera cores.
const gerarColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
// Adicionar cores na paleta;
// Adicione a cor preta com a primeira da paleta.
const li = document.getElementsByClassName('color');
li[0].style.backgroundColor = 'black';
li[1].style.backgroundColor = gerarColor();
li[2].style.backgroundColor = gerarColor();
li[3].style.backgroundColor = gerarColor();

// Adicione um botão para gerar cores aleatórias para a paleta de cores.
// Criando o botão
const buttonColor = document.createElement('button');
buttonColor.id = 'button-random-color';
buttonColor.innerHTML = 'Cores aleatórias';
cabecalho.append(buttonColor);
// Adicionando a função de gerar cor ao botão.
const arrumaIndex = (index) => {
  if (index < 10) {
    return `0${index}`;
  }
  return index;
};

buttonColor.onclick = () => {
  const colors = document.querySelectorAll('.color');
  const newPalette = {};
  for (let i = 0; i < colors.length; i += 1) {
    if (i === 0) {
      colors[i].style.backgroundColor = 'black';
    } else {
      const cor = gerarColor();
      colors[i].style.backgroundColor = cor;
      newPalette[`cor${arrumaIndex(i)}`] = cor;
    }
  }
  localStorage.setItem('colorPalette', JSON.stringify(newPalette));
};
//
/*
buttonColor.addEventListener('click', () => {
  for (let i = 0; i < 3; i += 1) {
    const liColor = document.getElementById(`color-${i + 1}`);
    liColor.style.backgroundColor = gerarColor();
  }
  const cor1 = document.getElementById('color-1');
  const cor2 = document.getElementById('color-2');
  const cor3 = document.getElementById('color-3');
  const newPalette = {
    cor01: cor1.style.backgroundColor,
    cor02: cor2.style.backgroundColor,
    cor03: cor3.style.backgroundColor,
  };
  localStorage.setItem('colorPalette', JSON.stringify(newPalette));
}); */
const recuperarPalette = () => {
  const paletSave = JSON.parse(localStorage.getItem('colorPalette'));
  if (paletSave === null) {
    return;
  }
  const cores = document.getElementsByClassName('color');
  cores[1].style.backgroundColor = paletSave.cor01;
  cores[2].style.backgroundColor = paletSave.cor02;
  cores[3].style.backgroundColor = paletSave.cor03;
};

// Implemente uma função usando localStorage para que a paleta de cores gerada aleatoriamente seja mantida após recarregar a página.
// Adicione à página um quadro contendo 25 pixels.
// Faça com que cada pixel do quadro tenha largura e altura de 40 pixels e borda preta de 1 pixel de espessura.
const caixaPixel = document.getElementsByClassName('caixaPixel')[0];
caixaPixel.id = 'pixel-board';
for (let i = 0; i < 5; i += 1) {
  const linha = document.createElement('div');
  linha.className = 'linha';
  caixaPixel.appendChild(linha);
}
for (let i = 0; i < 5; i += 1) {
  const linha = document.getElementsByClassName('linha');
  for (let index = 0; index < 5; index += 1) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.width = '40px';
    pixel.style.height = '40px';
    pixel.style.display = 'inline-block';
    pixel.style.backgroundColor = 'white';
    pixel.style.border = '1px solid black';
    linha[index].appendChild(pixel);
  }
}
// Defina a cor preta como cor inicial da paleta de cores.
const firstSelect = document.getElementsByClassName('color')[0];
firstSelect.className += ' selected';
// crie uma função para selecioner uma cor na paletad e cores.
const addRemoveSelect = (event) => {
  const classSelect = document.querySelector('.selected');
  classSelect.classList.remove('selected');
  event.target.classList.add('selected');
};
const listLi = document.querySelectorAll('.color');
listLi[0].addEventListener('click', addRemoveSelect);
listLi[1].addEventListener('click', addRemoveSelect);
listLi[2].addEventListener('click', addRemoveSelect);
listLi[3].addEventListener('click', addRemoveSelect);
// Crie uma função que permita preencher um pixel do quadro com a cor selecionada na paleta de cores.
const paintPixel = (evento) => {
  const corselect = document.querySelector('.selected');
  const corBg = window.getComputedStyle(corselect).getPropertyValue('background-color');
  if (evento.target.classList.contains('pixel')) {
    const e = evento;
    e.target.style.backgroundColor = corBg;
  }
};
document.addEventListener('click', paintPixel);
// Crie um botão que retorne a cor do quadro para a cor inicial.
const buttonClear = document.createElement('button');
buttonClear.id = 'clear-board';
buttonClear.innerHTML = 'Limpar';
cabecalho.append(buttonClear);

buttonClear.addEventListener('click', () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = 'white';
  }
});

// 12
const pixels = document.querySelectorAll('.pixel');
document.addEventListener('click', (evento) => {
  const savePixels = [];
  for (let i = 0; i < pixels.length; i += 1) {
    if (evento.target.classList.contains('pixel')) {
      savePixels.push(pixels[i].style.backgroundColor);
    } else {
      return savePixels;
    }
  }
  localStorage.setItem('pixelBoard', JSON.stringify(savePixels));
});
const recuperarPaint = () => {
  const paintSave = JSON.parse(localStorage.getItem('pixelBoard'));
  console.log(paintSave);
  if (paintSave === null) {
    return;
  }
  const pixelss = document.querySelectorAll('.pixel');
  for (let i = 0; i < pixels.length; i += 1) {
    pixelss[i].style.backgroundColor = paintSave[i];
  }
};

window.onload = () => {
  recuperarPalette();
  recuperarPaint();
};
// Crie um input que permita à pessoa usuária preencher um novo tamanho para o quadro de pixels.
const inputSize = document.createElement('input');
inputSize.id = 'board-size';
inputSize.style.width = '60px';
inputSize.style.height = '30px';
inputSize.style.marginRight = '10px';
inputSize.type = 'number';
cabecalho.appendChild(inputSize);
const inputButon = document.createElement('button');
inputButon.id = 'generate-board';
inputButon.innerHTML = 'VQV';
cabecalho.appendChild(inputButon);
