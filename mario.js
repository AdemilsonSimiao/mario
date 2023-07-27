// Inicio do projeto Canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 570
const gravity = 1.5

//busca o caminho dos arquivos de umagem

let platform= './images/platform.png'
let hills = './images/hills.png'
let background = './images/background.png'
let platformSmallTall = './images/platformSmallTall.png'

let spriteRunLeft = './images/spriteRunLeft.png'
let spriteRunRight = './images/spriteRunRight.png'
let spriteStandLeft = './images/spriteStandLeft.png'
let spriteStandRight = './images/spriteStandRight.png'
function createImage(params) {
    let result = new Image() 
    result.src = params
    return result
}

// função do jogador (player/personagem)
class Player {
    constructor(){
        this.speed = 10
        this.position = {
            x: 100,
            y: 0
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 66
        this.height = 150
        this.frames = 0
        this.sprites = {
            stand: {
                right: createImage(spriteStandRight),
                left: createImage(spriteStandLeft),
                cropWidth: 177,
                width: 66
            },
             run: {
                right: createImage(spriteRunRight),
                left: createImage(spriteRunLeft),
                cropWidth: 340,
                width: 127.875
            }
           
        }
        this.currentSprite = this.sprites.stand.right
        this.currentCropWidth = 177
    }
    draw(){
        c.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, 400, this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.frames++
        if (this.frames > 28){
            this.frames = 0
        }
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }// else{
        //     this.velocity.y = 0
        // }
    }
}

// Função para a plataforma 
class Platform {
    constructor(x, y, image){
        this.position = {
            x,
            y
        }
        this.image = createImage(platform)
        this.width = 580
        this.height = this.image
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
class PlatformSmallTall {
    constructor(x, y, image){
        this.position = {
            x,
            y
        }
        this.image = createImage(platformSmallTall)
        this.width = 290
        this.height = this.image
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
// Função do fundo da tela
class Background {
    constructor(x, y, image){
        this.position = {
            x,
            y
        }
        this.image = createImage(background)
        this.width = this.image
        this.height = this.image
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
        // c.fillStyle = '#ccc'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height, )
    }
}
// Função das colinas (imagems da montanhas)
class Hills {
    constructor(x, y, image){
        this.position = {
            x,
            y
        }
        this.image = createImage(hills)
        this.width = this.image
        this.height = this.image
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

let player = new Player()
let platforms = []
let platformSmallTal = []
let hill = []
let backgrounds = []
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

// função de reiniciar o jogo
function init() {
    
     player = new Player()
     platforms = [new Platform(-10 , 450, createImage(platform)), new Platform(createImage(platform).width, 450, createImage(platform) ), new Platform(createImage(platform).width +688, 450, createImage(platform) )]
     platformSmallTal = [new PlatformSmallTall(2000, 150, createImage(platformSmallTall))]
     hill = [new Hills(0, 0, createImage(hills))]
     backgrounds = [new Background(0, 0, createImage(background))]
    
     scrollOffset = 0
}

// função para animação (movimento)
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    //mostra as imagens na tela   
    backgrounds.forEach((backgrounds) =>{
        backgrounds.draw()
    })
    hill.forEach((hill) =>{
        hill.draw()
    })
    platformSmallTal.forEach((platformSmallTal) =>{
        platformSmallTal.draw()
    })
    platforms.forEach((platform) =>{
        platform.draw()
    })
    player.update()
    
    // Condicionais das teclas direita e esquerda
    if (keys.right.pressed && player.position.x < 10) { 
        player.velocity.x = player.speed
        player.velocity.x = -player.speed
    //} else if ((keys.left.pressed && player.position.x > 10) || (keys.left.pressed && scrollOffset === 0 && player.position.velocity.x > 0)){
    } else{
        player.velocity.x = 0
    }
    
    //Condicional da posição da plataforma refente ao jogador
    if (keys.right.pressed) {
        scrollOffset += player.speed
        platforms.forEach((platform) =>{
            platform.position.x -= player.speed
        })
        hill.forEach((hill) =>{
            hill.position.x -= player.speed
        })
        platformSmallTal.forEach((platformSmallTal) =>{
            platformSmallTal.position.x -= player.speed
        })
    } else if(keys.left.pressed && scrollOffset > 0){
        scrollOffset -= player.speed

        platforms.forEach((platform) =>{
            platform.position.x += player.speed
        })
        hill.forEach((hill) =>{
            hill.position.x += player.speed
        })
        platformSmallTal.forEach((platformSmallTal) =>{
            platformSmallTal.position.x += player.speed
        })
    }
     // condicional de vitoria
     if (scrollOffset == 2000){
        alert("Você Gahou")
        init()
        
    }

    // condicional de derrota
    if (player.position.y > canvas.height){
        alert("Você Perdeu")
        init()
    }

    //Condicional da posição do jogador refente a plataforma
    platforms.forEach((platform) =>{
        if(player.position.y + player.height <= platform.position.y && player.position.y +  player.height + player.velocity.y >= platform.position.y  && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width ){
            player.velocity.y = 0
        }
    })
    platformSmallTal.forEach((platformSmallTal) =>{
        if(player.position.y + player.height <= platformSmallTal.position.y && player.position.y +  player.height + player.velocity.y >= platformSmallTal.position.y  && player.position.x + player.width >= platformSmallTal.position.x && player.position.x <= platformSmallTal.position.x + platformSmallTal.width ){
            player.velocity.y = 0
        }
    })
}
animate()
init()
// função para quando soltar a tecla
addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 37: //Key LEFT
            keys.left.pressed = true
            player.currentSprite = player.sprites.run.left
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
            break;
        case 38: //Key UP
            player.velocity.y -= 20
            break;
        case 39: //Key RIGHT
            keys.right.pressed = true
            player.currentSprite = player.sprites.run.right
            player.currentCropWidth = player.sprites.run.cropWidth
            player.width = player.sprites.run.width
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
            player.currentSprite = player.sprites.stand.left
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break;
        case 38: //Key UP
            player.velocity.y = 0
            break;
        case 39: //Key RIGHT
            keys.right.pressed = false
            player.currentSprite = player.sprites.stand.right
            player.currentCropWidth = player.sprites.stand.cropWidth
            player.width = player.sprites.stand.width
            break;
        case 40: //Key DOWN

            break;
        default:
            break;
    }    
})

