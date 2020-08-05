
class Slider{
    constructor({el, active, duration, direction}){
        this.active = active;
       
        if(typeof el == 'string') this.el = document.querySelectorAll(el);
        else if(el instanceof HTMLElement) this.el = el;
        this.sliderParent = this.el[active].parentElement;
        this.prev = document.querySelector('.slider__prev');
        this.next = document.querySelector('.slider__next');
        this.direction = direction.toUpperCase() == 'X' ? 'X' : 'Y'; 
        this.width = this.el[active].clientWidth;
        this.height = this.el[active].clientHeight;
        this.duration = duration != undefined && duration >=300 ? duration : 500;
        this.moveSize = this.direction == 'Y' ? this.height : this.width;
        this.sliderParent.style = `
        position: relative;
        width: ${this.width}px;
        height: ${this.height}px;
        overflow: hidden;
    `;
    this.el.forEach(item=>{
        item.style = `
        position: absolute;
        width: ${this.width}px;
        height: ${this.height}px;
        `;
        if(item != this.el[this.active]){
            item.style.transform = `translate${this.direction}(${this.moveSize}px)`;
        }
        if(item == this.el[this.el.length - 1]){
            item.style.transform = `translate${this.direction}(${this.moveSize*-1}px)`;
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
            item.style.transform = `translate${this.direction}(${btnLeftorRight*-1}px)`;
        }
    })
    this.el[this.active].style.transition = `${this.duration}ms`;
    this.el[this.active].style.transform = `translate${this.direction}(${btnLeftorRight}px)`;

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
    playAudio = document.querySelector('.play-music audio');
playAudioBtn.addEventListener('click', function(e){
    e.preventDefault();
    if(playAudio.paused){
        playAudio.play();
        playAudioBtn.src = './images/pause.png';
    }
    else{
        playAudio.pause();
        playAudioBtn.src = './images/play.png';
    }
})