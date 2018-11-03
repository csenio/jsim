var canvas = document.querySelector("canvas")
var c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize',function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})


var keyState = {};    
window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);    
window.addEventListener('keyup',function(e){
    keyState[e.keyCode || e.which] = false;
},true);


// modal + question inteligence
// function modal(){
    
// }

//player movement + wall inteligence
var player = {
    x: 650,
    y: 220,
    width: 40,
    height: 40,
    life: 6
}

function Wall(name,x,y,width,height){
    this.name = name
    this.x = x;
    this.y = y
    this.width = width
    this.height = height
}


var topleftwall = new Wall("topleftwall", 0, 150, 800, 10)
var topmiddlewall = new Wall("topmiddlewall", 790, 0, 10, 150)
var toprightwall = new Wall("toprightwall", 800, 0, window.innerWidth-800,10)
var leftwall = new Wall("leftwall", 0, 160, 10, window.innerHeight - 160)
var rightwall = new Wall("rightwall", window.innerWidth-10, 10, 10, window.innerHeight)
var bottomwall = new Wall("bottomwall",0,window.innerHeight-10,window.innerWidth,10)
var teacherdesk = new Wall("teacherdesk", 1000, 150, 250, 90 )
var studentdeskright = new Wall("studentdeskright", 1250, 400, 90, 250 )
var studentdeskleft = new Wall("studentdeskleft", 850, 400, 90, 250 )
var tadesktop = new Wall("tadesktop", 10, 350, 250, 90 )
var tadeskbot = new Wall("tadeskbot", 10, 550, 250, 90 )


var jesco = new Person("jesco", 1370, 590)
var matt = new Person("matt", 1370, 510)
var ana = new Person("ana", 1370, 430)
var dea = new Person("dea", 1170, 430)
var david = new Person("david", 1170, 510)
var jude = new Person("jude", 1170, 590)


var obstacles = []
var persons = []
var active = []
persons.push(jesco,matt,ana,jude,dea,david)
active.push(jesco, ana)
// c.fillStyle = this.color 

function Person(name,x,y){
    this.name = name;
    this.x = x
    this.y = y
    this.width = 50
    this.height = 50
    this.color = '#393E41'
}

obstacles.push(topleftwall, toprightwall,topmiddlewall,leftwall,rightwall,bottomwall,teacherdesk,studentdeskleft,studentdeskright,tadesktop,tadeskbot)

// var leftspeed = 1



function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight)

    let leftspeed = 5
    let rightspeed = 5
    let upspeed = 5
    let downspeed = 5

    var padding = 10

    for(let i = 0;i<player.life;i++){
        c.fillStyle = 'red'
        c.fillRect(padding,10,40,40)
        padding+=50
    }


for(i of obstacles){
    // graphics
    c.fillStyle = 'black'
    c.fillRect(i.x,i.y,i.width,i.height)
    // physics
    if(player.y <= i.y + i.height && player.y > i.y || player.y + player.height  <= i.y+i.height && player.y + player.height > i.y){
        if(player.x -(leftspeed+1)< i.x + i.width && player.x > i.x){
            leftspeed = 0
        }else if(player.x + player.width +(rightspeed+1) > i.x && player.x + player.width < i.x + i.width){
            rightspeed = 0
        }
    }

    if(player.x <= i.x + i.width && player.x > i.x || player.x + player.width  <= i.x+i.width && player.x + player.width > i.x){
        if(player.y -(upspeed+1) < i.y + i.height && player.y > i.y){
            upspeed = 0
        }else  if(player.y + player.height +(downspeed+1)> i.y && player.y + player.height < i.y + i.height){
            downspeed = 0
        }
    }
}

    if(keyState[37] || keyState[65]) {
        // console.log('left')
        player.x-=leftspeed
    }
    if(keyState[39] || keyState[68]) {
        // console.log('right')
        player.x+=rightspeed
    }
    if(keyState[38] || keyState[87]) {
        // console.log('up')
        player.y-=upspeed
    }
    if(keyState[40] || keyState[83]) {
        // console.log('down')
        player.y+=downspeed
    }
   
    c.fillStyle = 'green'
    c.fillRect(player.x,player.y,player.width,player.height) 

    for(i of persons){
        c.fillStyle = i.color
        c.strokeRect(i.x,i.y,i.width, i.height)
        // c.fillStyle = i.color
        // c.stroke()
    }
    
    for(i of active){
        c.fillRect(i.x,i.y,i.width, i.height)

        if(player.x < i.x + i.width &&
            player.x + player.width > i.x &&
            player.y < i.y + i.height &&
            player.height + player.y > i.y){
                // console.log(active.indexOf(active.find(e => e.name == i.name)))
                active.splice(active.indexOf(active.find(e => e.name == i.name)),1)
                popup()
                // active.splice(0,1)
            }
    }
    


    // c.strokeRekt(x,y,20,20)
}

animate()

function Question(question,wronganswer1,wronganswer2,rightAnswer){
    this.question = question;
    this.allAnswers = [wronganswer1,wronganswer2,rightAnswer];
    this.rightAnswer = rightAnswer
}

var questionList = []

questionList.push(
    new Question("what is the answer???","it's b","no this one","it's a"),
    new Question("what is the b???","b","this one","aaaaaaaaa"),
    new Question("what is the c???","b","grrrr one","bbbbbbbbb")
)

function popup(){
    var modal = document.getElementById('myModal');
    var question = document.querySelector(".question")
    shuffle(questionList)[0]
    let currentQuestions = shuffle(questionList[0].allAnswers)
    var answers = document.querySelectorAll(".answers")
    for(i in answers){
        
        answers[i].textContent = currentQuestions[i]
        answers[i].onclick = function(e){
            if(e.target.textContent == questionList[0].rightAnswer){
                modal.style.display = "none";
            }else{
                player.life--
                modal.style.display = "none";
            }
            console.log(e.target.textContent == questionList[0].rightAnswer)
        }
    }
    
    question.textContent = questionList[0].question


    function modaler() {
        modal.style.display = "block";
    }

    modaler()
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
