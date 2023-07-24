// Inicio do projeto Canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 570
const gravity = 1.5

// função do jogador (player/personagem)
class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 0
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 10
        this.height = 10
    }
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height, )
    }
    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }else{
            this.velocity.y = 0
        }

    }
}
const image = new Image() 
image.src = './images/platform.png'

// Função para a plataforma 
class Platform {
    constructor(x, y, image){
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = 580
        this.height = 125
        
    }
    draw(){
        c.drawImage(image, this.position.x, this.position.y)
        // c.fillStyle = '#ccc'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height, )
    }
}

const player = new Player()
const platforms = [new Platform(-1, 450, image), new Platform(image.width -2, 450, image )]

const keys = {
    left: {
        pressed: false
    },
    // up: {
    //      pressed: false
    //  },
    right: {
        pressed: false
    }
    // down: {
    //     pressed: false
    // }
}
let scrollOffset = 0

// função para animação (movimento)
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    platforms.forEach((platform) =>{
        platform.draw()
    })
    player.update()
    // Condicionais das teclas direita e esquerda
    if (keys.right.pressed) { 
        player.velocity.x = 5
    } else if (keys.left.pressed){
        player.velocity.x = -5
    } else{
        player.velocity.x = 0
    }
    
    //Condicional da posição da plataforma refente ao jogador
    if (keys.right.pressed) {
        scrollOffset += 5
        platforms.forEach((platform) =>{
            platform.position.x -= 5
        })
    } else if(keys.left.pressed){
        scrollOffset -= 5
        platforms.forEach((platform) =>{
            platform.position.x += 5
        })
    }

    //Condicional da posição do jogador refente a plataforma
    platforms.forEach((platform) =>{
        if(player.position.y + player.height <= platform.position.y && player.position.y +  player.height + player.velocity.y >= platform.position.y  && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width ){
            player.velocity.y = 0
        }
    })
   
}
animate()

// função para quando soltar a tecla
addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 37: //Key LEFT
            keys.left.pressed = true
            break;
        case 38: //Key UP
            player.velocity.y -= 20
            break;
        case 39: //Key RIGHT
            keys.right.pressed = true
            break;
        case 40: //Key DOWN
            
            break;
        default:
            break;
    }
})

// função para quando soltar a tecla
addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 37: //Key LEFT
            keys.left.pressed = false
            break;
        case 38: //Key UP
            player.velocity.y = 0
            break;
        case 39: //Key RIGHT
            keys.right.pressed = false
            break;
        case 40: //Key DOWN

            break;
        default:
            break;
    }    
})

