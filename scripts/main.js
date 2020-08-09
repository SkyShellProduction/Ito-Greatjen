
class Slider{
    constructor({el, active, duration, direction}){
        this.active = active;
       
        if(typeof el == 'string') this.el = document.querySelectorAll(el);
        else if(el instanceof HTMLElement) this.el = el;
        this.sliderParent = this.el[active].parentElement;
        this.prev = document.querySelector('.slider__prev');
        this.next = document.querySelector('.slider__next');
        this.direction = direction.toUpperCase() == 'X' ? 'X' : 'Y'; 
        this.width = this.sliderParent.clientWidth;
        this.height = this.sliderParent.clientHeight;
        this.duration = duration != undefined && duration >=300 ? duration : 500;
        this.moveSize = this.direction == 'Y' ? this.height : this.width;

    this.el.forEach(item=>{
        item.style.width = this.width + 'px';
        item.style.height = this.height + 'px';

        if(item != this.el[this.active]){
            item.style.transform = `translate${this.direction}(${this.moveSize}px) rotateY(-35deg)`;
            item.style.filter = 'blur(5px)';
        }
        if(item == this.el[this.el.length - 1]){
            item.style.transform = `translate${this.direction}(${this.moveSize*-1}px) rotateY(35deg)`;
            item.style.filter = 'blur(5px)';
        }
    });
    this.next.addEventListener('click', ()=>this.move(this.next));
    this.prev.addEventListener('click', ()=>this.move(this.prev));
}
move(btn){
    let btnLeftorRight = btn === this.next ? this.moveSize*-1 : this.moveSize;
    this.el.forEach(item=>{
        item.style.transition = '0ms';
        if(item != this.el[this.active]){
            item.style.transform = `translate${this.direction}(${btnLeftorRight*-1}px) rotateY(-35deg)`;
            item.style.filter = 'none'
        }
    })
    this.el[this.active].style.transition = `${this.duration}ms`;
    this.el[this.active].style.transform = `translate${this.direction}(${btnLeftorRight}px) rotateY(35deg)`;

    if(btn == this.next){
        this.active++;
        if(this.active >= this.el.length){
            this.active = 0;
        }
    }
    else if(btn == this.prev){
        this.active--;
        if(this.active < 0){
            this.active = this.el.length - 1;
        }
    }
    this.el[this.active].style.transition = `${this.duration}ms`;
    this.el[this.active].style.transform = `translate${this.direction}(${0})`;
}
};
const sliderFisrt = new Slider({
    el: '.slider__content',
    active: 0,
    duration: 400,
    direction: 'x'
});

let playAudioBtn = document.querySelector('.play'),
    playAudio = document.querySelector('.play-music audio'),
    audioVisualize = document.querySelector('.listen-info .abs');
playAudioBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(playAudio.paused){
        playAudio.play();
        playAudioBtn.src = './images/pause.png';
        audioVisualize.style.display = 'block';
    }
    else{
        playAudio.pause();
        playAudioBtn.src = './images/play.png';
        audioVisualize.style.display = 'none';
    }
})

