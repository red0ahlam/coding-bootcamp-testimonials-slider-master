const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.previous');
const review = document.querySelector('.paragraph');
const reviewerName = document.querySelector('.reviewer-name');
const reviewerJob = document.querySelector('.reviewer-job');
const reviewerImage = document.querySelector('.reviewer');
const carouselText = document.querySelector('.carousel-text');
const carouselImage = document.querySelector('.carousel-image');
const carousel = document.querySelector('.carousel');
let slide = 0;

let images = ["images/image-tanya.jpg","images/image-john.jpg"];

function animate (animated,animation,duration) {
    animated.classList.add(animation);
    setTimeout(()=> {
        animated.classList.remove(animation); 
    }, duration)
}

function changeText (slide,reviewers) {
    animate(carouselText,"opacity-zero",400);
    animate(carouselImage,"scaleup",400);
    review.innerHTML = ` “ ${reviewers[slide].review} ”` ;
    reviewerName.innerHTML = reviewers[slide].name;
    reviewerJob.innerHTML = reviewers[slide].job;
    reviewerImage.setAttribute('src',images[slide]);
    reviewerImage.setAttribute('alt',`image of ${reviewers[slide].name}`)
    carousel.setAttribute('aria-label', ` slide ${slide+1} of 2`)
}

nextButton.addEventListener('click', ()=> {
    let xhr = new XMLHttpRequest();

    xhr.open('GET','reviewers.json',true);

    xhr.onload = function() {
        if(this.status == 200) {
            let data = this.responseText;
            data = JSON.parse(data);
            let reviewers = data.reviewers;
            
            if (reviewers.length == (slide + 1)) {
                slide = 0;
                changeText (slide,reviewers);
            }else {
                slide++;
                changeText (slide,reviewers);
            }
        }
    }

    xhr.send();
});


prevButton.addEventListener('click', ()=> {
    let xhr = new XMLHttpRequest();

    xhr.open('GET','reviewers.json',true);

    xhr.onload = function() {
        if(this.status == 200) {
            let data = this.responseText;
            data = JSON.parse(data);
            let reviewers = data.reviewers;
            
            if (slide == 0) {
                slide = reviewers.length - 1;
                changeText (slide,reviewers);
            }else {
                slide--;
                changeText (slide,reviewers);
            }
        }
    }

    xhr.send();
});
