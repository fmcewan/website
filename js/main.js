// General functions

const sleep = (milliseconds) => {
    return new Promise(resolve => setTImeout(resolve, milliseconds));
}

// Fade in animation

const fadeInElements = document.querySelectorAll('.scroll');

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("appear", entry.isIntersecting)
            // if (entry.isIntersecting) {
            //     observer.unobserve(entry.target)
            // }
        }) 
    }, {
        threshold: 1,
    }
)

fadeInElements.forEach(element => {
    observer.observe(element);
})

// Typewriting effect

var typewriterText = document.getElementById('typewriter');

var typewriter = new Typewriter(typewriterText, {
    strings: ['Developer', 'Mathematician', 'Workaholic'],
    autoStart: true,
    loop: true,
    delay: 150
})