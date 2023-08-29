const wrapper = document.querySelector('.wrapper');
const singUpLink = document.querySelector('.singUp-link');
const singInLink = document.querySelector('.singIn-link');


singUpLink.addEventListener('click', () => {
    wrapper.classList.add('animate-singIn');
    wrapper.classList.remove('animate-singUp');
});


singInLink.addEventListener('click', () => {
    wrapper.classList.add('animate-singUp');
    wrapper.classList.remove('animate-singIn');
});

