 let changeLandscape = document.getElementById('changeLandscape');
 //функция отрисовки всего и сразу
 function draw() {

     let canvas = document.getElementById('canvas');
     let groundCanvas = document.getElementById('ground_canvas');
     //высота канвас = 300, ширина - 500
     let ctx = canvas.getContext('2d');
     canvas.style.border = "2px solid black";
     let groundCtx = groundCanvas.getContext('2d');
     groundCanvas.style.border = "2px solid red";



     function getColor() { //функция создает рандомный цвет RGB формата
         const r = getRandomNumber(0, 255);
         const g = getRandomNumber(0, 255);
         const b = getRandomNumber(0, 255);
         return `rgb(${r}, ${g}, ${b})`;
     }

     //Создаем градиенты
     //градиент для неба, цвет рандомный, от самого темного к белому
     let colorOfHeavens = getColor();
     let heavenLinearGradient = ctx.createLinearGradient(0, 0, 0, 200);
     heavenLinearGradient.addColorStop(0, colorOfHeavens);
     heavenLinearGradient.addColorStop(1, '#ffffff');

     //4 градиента для земли, цвет один и тот же, тени от смещения градиента по Y
     let colorOfGround = getColor();
     let groundGradient1 = ctx.createLinearGradient(0, 0, 0, 220);
     groundGradient1.addColorStop(0, '#ffffff');
     groundGradient1.addColorStop(0.50, colorOfGround);
     groundGradient1.addColorStop(1, '#000000');

     let groundGradient2 = ctx.createLinearGradient(0, 50, 0, 300);
     groundGradient2.addColorStop(0, '#ffffff');
     groundGradient2.addColorStop(0.50, colorOfGround);
     groundGradient2.addColorStop(1, '#000000');

     let groundGradient3 = ctx.createLinearGradient(0, 160, 0, 300);
     groundGradient3.addColorStop(0, '#ffffff');
     groundGradient3.addColorStop(0.50, colorOfGround);
     groundGradient3.addColorStop(1, '#000000');

     let groundGradient4 = ctx.createLinearGradient(0, 240, 0, 300);
     groundGradient4.addColorStop(0, '#ffffff');
     groundGradient4.addColorStop(1, colorOfGround);



     function getRandomNumber(min, max) { //рандомайзер чисел
         return Math.random() * (max - min) + min;
     }

     function drawStars() {
         for (let i = 0; i < 300; i++) {
             let x = getRandomNumber(1, canvas.clientWidth);
             let y = getRandomNumber(1, canvas.clientHeight); //случайные координаты звезд - всего будет три сотни
             ctx.fillStyle = 'white';
             ctx.fillRect(x, y, 2, 2); //рисует точки в случайных координатах, размер 2х2
         }
     }

     //функция отрисовки неба, рисует градиентом по холсту
     function drawHeavens() {
         ctx.fillStyle = heavenLinearGradient;
         ctx.fillRect(0, 0, 500, 300);
     }

     //функция рисует светила
     function drawLights() {
         //берем набор цветов, подходящих под звезды
         let colors = ['LightCyan', 'Aquamarine', 'NavajoWhite', '#FFA07A', 'DeepSkyBlue', 'MintCream', 'Plum'];
         //рандомно выбираем количество светил
         let sumOfSuns = getRandomNumber(1, 3);
         //для каждого Солнца рисуем: 
         for (let i = 0; i < sumOfSuns; i++) {
             let x = getRandomNumber(0, canvas.clientHeight); //точка Х 
             let y = getRandomNumber(0, canvas.clientHeight / 2); //точка Y - в верхней части холста
             let radius = getRandomNumber(5, 20); //радиус Солнца (от 5 до 20)
             let color = colors[Math.floor(getRandomNumber(0, colors.length - 1))]; //выбираем цвет заливки
             let lightsGradient = ctx.createRadialGradient(x, y, 2, x, y, radius); //создаем радиальный гр для объема
             lightsGradient.addColorStop(0, 'white'); //середина белая

             lightsGradient.addColorStop(1, color); //каемка подобранного цвета из массива
             ctx.beginPath();
             ctx.arc(x, y, radius, 0, (Math.PI / 180) * 360, false);
             ctx.fillStyle = lightsGradient;
             ctx.fill(); //отрисовка кругов, заливка радиальным градиентом
         }
     }


     function drawGroundBlock(initPosY, countOfSteps, fill) { //начальные координаты пера, количество точек для линий
         groundCtx.beginPath();
         groundCtx.moveTo(0, initPosY); //перо установлено в начальные координаты
         let initialOffsetX = 20; //первоначальный сдвиг вправо, рисует первую линию
         let offset = Math.floor(groundCanvas.clientWidth / countOfSteps);
         for (let i = 0; i < countOfSteps; i++) {

             let y = getRandomNumber(initPosY - 20, initPosY + 20); //диапазон расстояний на оси Y где рисуем линию
             groundCtx.lineTo(initialOffsetX, y); //каждый раз ведем линию в точку сдвига по Х, и рандомный Y 
             initialOffsetX += offset; //смещаем координату Х
         }
         groundCtx.lineTo(groundCanvas.clientWidth, groundCanvas.clientHeight); //заканчиваем линию в правом нижнем углу
         groundCtx.lineTo(0, canvas.clientHeight); //идем в левый нижний
         groundCtx.fillStyle = fill; //заливаем
         groundCtx.fill();

     }



     function drawGround() {
         drawGroundBlock(150, 25, groundGradient1);
         drawGroundBlock(190, 30, groundGradient2);
         drawGroundBlock(220, 20, groundGradient3);
         drawGroundBlock(260, 15, groundGradient4);

     }

     groundCtx.clearRect(0, 0, 500, 300);
     drawHeavens();
     drawStars();
     drawLights();
     //setInterval(() => {
     // groundCtx.clearRect(0, 0, 500, 300);
     drawGround();
     // }, 200);   
 }


 //вызов
 changeLandscape.addEventListener('click', () => {

     draw();
 });


 draw();