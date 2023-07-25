// Inicio do projeto Canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 570
const gravity = 1.5

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
        }// else{
        //     this.velocity.y = 0
        // }
    }
}
//busca o caminho dos arquivos de umagem
const image = new Image() 
image.src = './images/platform.png'
const imagHills = new Image() 
imagHills.src = './images/hills.png'
const imageBackground = new Image() 
imageBackground.src = './images/background.png'
const imagePlatformSmallTall = new Image() 
imagePlatformSmallTall.src = './images/platformSmallTall.png'

// Função para a plataforma 
class Platform {
    constructor(x, y, image){
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = 580
        this.height = image
    }

    draw(){
        c.drawImage(image, this.position.x, this.position.y)
    }
}
class PlatformSmallTall {
    constructor(x, y, imagePlatformSmallTall){
        this.position = {
            x,
            y
        }
        this.platformSmallTall = imagePlatformSmallTall
        this.width = 290
        this.height = imagePlatformSmallTall
    }

    draw(){
        c.drawImage(imagePlatformSmallTall, this.position.x, this.position.y)
    }
}
// Função do fundo da tela
class Background {
    constructor(x, y, imageBackground){
        this.position = {
            x,
            y
        }
        this.background = imageBackground
        this.width = imageBackground
        this.height = imageBackground
    }
    draw(){
        c.drawImage(imageBackground, this.position.x, this.position.y)
        // c.fillStyle = '#ccc'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height, )
    }
}
// Função das colinas (imagems da montanhas)
class Hills {
    constructor(x, y, imagHills){
        this.position = {
            x,
            y
        }
        this.hills = imagHills
        this.width = imagHills
        this.height = imagHills
    }
    draw(){
        c.drawImage(imagHills, this.position.x, this.position.y)
    }
}

let player = new Player()
let platforms = []
let platformSmallTall = []
let hills = []
let background = []
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
     platforms = [new Platform(-100 , 450, image), new Platform(image.width, 450, image ), new Platform(image.width +688, 450, image )]
     platformSmallTall = [new PlatformSmallTall(2000, 150, imagePlatformSmallTall)]
     hills = [new Hills(0, 0, imagHills)]
     background = [new Background(0, 0, imageBackground)]
    
     scrollOffset = 0
}

// função para animação (movimento)
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = "white"
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    //mostra as imagens na tela   
    background.forEach((backgrounds) =>{
        backgrounds.draw()
    })
    hills.forEach((hill) =>{
        hill.draw()
    })
    platformSmallTall.forEach((platformSmallTal) =>{
        platformSmallTal.draw()
    })
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
    
    // condicional de vitoria
    if (scrollOffset == 1450){
        alert("Você Gahou")
        init()
        
    }

    // condicional de derrota
    if (player.position.y > canvas.height){
        alert("Você Perdeu")
        init()
    }
    //Condicional da posição da plataforma refente ao jogador
    if (keys.right.pressed) {
        scrollOffset += player.speed
        platforms.forEach((platform) =>{
            platform.position.x -= player.speed
        })
        hills.forEach((hill) =>{
            hill.position.x -= player.speed
        })
        platformSmallTall.forEach((platformSmallTal) =>{
            platformSmallTal.position.x -= player.speed
        })
    } else if(keys.left.pressed){
        scrollOffset -= player.speed
        platforms.forEach((platform) =>{
            platform.position.x += player.speed
        })
        hills.forEach((hill) =>{
            hill.position.x += player.speed
        })
        platformSmallTall.forEach((platformSmallTal) =>{
            platformSmallTal.position.x += player.speed
        })
    }

    //Condicional da posição do jogador refente a plataforma
    platforms.forEach((platform) =>{
        if(player.position.y + player.height <= platform.position.y && player.position.y +  player.height + player.velocity.y >= platform.position.y  && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width ){
            player.velocity.y = 0
        }
    })
    platformSmallTall.forEach((platformSmallTal) =>{
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

