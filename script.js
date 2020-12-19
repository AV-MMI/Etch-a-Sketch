/*For changin the side in which our menu is display*/
const changeSideBtn = document.querySelector('#changeSide');                                                                                                                                            
changeSideBtn.addEventListener('click', changeSide);   

function changeSide(e){
	const containerParent = document.querySelector('#container-div');
	containerParent.classList.toggle('left-p')
	const menu = document.querySelector('#menu-div');
	//To change the side of our menu-div.
	if(containerParent.classList.contains('left-p') || !containerParent.classList.contains('left-p')){
		menu.classList.toggle('left');
		menu.classList.toggle('right');
	}
}

  /*to create a certain number of pixels(grid items)*/
function createGrid(numberGrid){
  const gridArea = numberGrid * numberGrid;
  const canvas = document.querySelector('#canvas-div');
  for(let i = 0; i < gridArea; i++){
    const newGrid = document.createElement('div');
    newGrid.classList.add('items');
    canvas.appendChild(newGrid);
  }
  canvas.style.gridTemplateColumns = `repeat(${numberGrid}, 1fr)`;
  canvas.style.gridTemplateRows = `repeat(${numberGrid}, 1fr)`;
}
createGrid(16);

  /*Each pixel will be marked only when the user clicks on the canvas, if its already marking and the user clicks again then it will stop*/
const screen = document.querySelector('#canvas-div');
screen.addEventListener('click', Onclick);
const pixels = document.querySelectorAll('.items');

function Onclick(e){
  screen.classList.toggle('active');
  if(screen.className == 'active'){
    pixels.forEach(item => item.addEventListener('mouseover', marker));
  }
  else {
    pixels.forEach(item => item.removeEventListener('mouseover', marker));
  }
}

  /*Markers being selected*/
const pencilSelected = document.querySelector('#pencil');
pencilSelected.addEventListener('click', selected);

const coloredPencilSelected = document.querySelector('#coloredPencils');
coloredPencilSelected.addEventListener('click', selected);

const colorPickerSelected = document.querySelector('#colorPicker');
colorPickerSelected.addEventListener('click', selected)

const darkener = document.querySelector('#darkener-btn');
console.log(darkener)
darkener.addEventListener('click', selected)

function selected(e){
  pencilSelected.classList.remove('selected');
  coloredPencilSelected.classList.remove('selected');
  colorPickerSelected.classList.remove('selected');
  darkener.classList.remove('selected');
  e.target.parentElement.classList.add('selected');
}

  /*Marker*/
function marker(e){                                                                                                                                                                                     
	if(pencilSelected.classList.contains('selected')){
		return e.target.style.backgroundColor = 'black';
	}

  if(coloredPencilSelected.classList.contains('selected')){
    return e.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }
  if(colorPickerSelected.classList.contains('selected')){
    const colorPick = document.querySelector('#colorPickerHead');
    return e.target.style.backgroundColor = colorPick.value;
  }
  if(darkener.classList.contains('selected')){
    let currentOpacity = Number(e.target.style.backgroundColor.slice(-4, -1));
    if(currentOpacity < 0.9){
      return e.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})` 
    }
  }
	else {
		return e.target.style.backgroundColor = 'red';
	}
}              

  /*Rainbow marker*/

  /*Clear button*/
const clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', clear);

function clear(){
  const pixels = document.querySelectorAll('.items');
  pixels.forEach(item => item.removeAttribute('style'));
}

  /*Adding more pixels*/
const morePixels = document.querySelector('#pixels');
morePixels.addEventListener('click', moreGrids);

function moreGrids(){
  let size = prompt('How many pixels do you want? Please, keep in mind that our limit is 100. :)');
  size = Number(size);
  if(size > 0 && size <= 100){
    clear();
    createGrid(size);
  }
}
