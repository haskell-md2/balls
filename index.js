//классы

class Vecotor{
    constructor(x,y){
        this._x = x;
        this._y = y;
    }

    getX(){
        return this._x;
    }

    getY(){
        return this._y;
    }

    getOxCosinus(){
        return this._x/Math.sqrt(this._x**2 + this._y**2);
    }

    getOxSinus(){
        return this._y/Math.sqrt(this._x**2 + this._y**2);
    }
}

class Ball{
    constructor(startX, startY,radius,velocity,direction){
        this._x = startX;
        this._y = startY;
        this._r = radius;
        this._dir = direction;
        this._v = velocity;
        this._vx  = this._v * this._dir.getOxCosinus();
        this._vy = this._v * this._dir.getOxSinus();

    }

    getDirection(){
        return this._dir;
    }

    setDirection(dir,v){
        this._dir = dir;
        this._v = v; 
        this._updateVel();
        this._x += this._vx  * dt *4;
        this._y += this._vy  * dt *4;
    }




    getV(){
        return this._v;
    }

    getX(){
        return this._x;
    }

    getY(){
        return this._y;
    }

    _updateVel(){
        this._vx  = this._v * this._dir.getOxCosinus();
        this._vy = this._v * this._dir.getOxSinus();
    }

    _onBorders(){
        if(this._x > w-this._r){
            
            this._dir = new Vecotor(-this._dir.getX(),this._dir.getY());
            this._x = w - this._r;
            this._updateVel();

        }else if(this._x < 0+this._r){
            
            this._dir = new Vecotor(-this._dir.getX(),this._dir.getY());
            this._x = this._r;
            this._updateVel();

        }
        
        if(this._y > h-this._r){
           
            this._dir = new Vecotor(this._dir.getX(),-this._dir.getY());
            this._y = h - this._r;
            this._updateVel();
        }else if(this._y < this._r){
           
            this._dir = new Vecotor(this._dir.getX(),-this._dir.getY());
            this._y = this._r;
            this._updateVel();
        }
    }

    _render(){
        ctx.beginPath();
        ctx.arc(this._x,this._y,this._r,0,2*Math.PI);
        ctx.fill();
        
    }

    _phys(){
        this._onBorders();
        this._x += this._vx  * dt;
        this._y += this._vy  * dt;
        
    }

    update(){
        this._render();
        this._phys();
    }
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const w = canvas.width;
const h = canvas.height;
const framesPerSecond = 60;
const dt = 1/60;

const defualtVelocity = 500;
const defualtR = 20;
const ballsAmount = 10;


let Balls = [];


for(let i = 0; i < ballsAmount; i++){
    Balls.push(new Ball(randomInt(0+defualtR ,w-defualtR),randomInt(0+defualtR ,h-defualtR),defualtR,randomInt(100,defualtVelocity),new Vecotor(randomInt(-100,100)/100,randomInt(-100,100)/100)));
}

// Balls.push(new Ball(100,100,defualtR,10000,new Vecotor(randomInt(-100,100)/100,randomInt(-100,100)/100)));
// Balls.push(new Ball(230,100,defualtR,defualtVelocity,new Vecotor(randomInt(-100,100)/100,randomInt(-100,100)/100)));
// Balls.push(new Ball(100,50,defualtR,defualtVelocity,new Vecotor(randomInt(-100,100)/100,randomInt(-100,100)/100)));
// Balls.push(new Ball(100,100,defualtR,defualtVelocity,new Vecotor(10,10)));
// Balls.push(new Ball(200,200,defualtR,defualtVelocity,new Vecotor(-10,-10)));

// Balls.push(new Ball(100,100,defualtR,defualtVelocity,new Vecotor(10,10)));
// Balls.push(new Ball(290,100,defualtR,defualtVelocity,new Vecotor(-10,10)));


let collisedPairs = []

function main(){

    ctx.clearRect(0,0,w,h);


    //check collisions
    for(let i = 0; i<Balls.length - 1; i++){
        
            for(let j = i+1; j<Balls.length; j++){

                let x1 = Balls[i].getX();
                let y1 = Balls[i].getY();

                let x2 = Balls[j].getX();
                let y2 = Balls[j].getY();

                
                    if(Math.sqrt((x1 - x2)**2 + (y1 - y2)**2) < defualtR){
                        let d1 = Balls[i].getDirection();
                        let d2 = Balls[i].getDirection();

                        let nv = Balls[i].getV() + Balls[j].getV();

                        Balls[i].setDirection(new Vecotor(-d1.getX(),-d1.getY()),nv/2);
                        Balls[j].setDirection(new Vecotor(d2.getX(),d2.getY()),nv/2);

                    }
     
            }
        
    }

    Balls.forEach((el) =>{
        el.update();
    })

    window.requestAnimationFrame(main);
}

window.requestAnimationFrame(main);



function randomInt(min,max){
    return Math.random() * (max - min) + min;
}

function print(p){
    console.log(p);
}