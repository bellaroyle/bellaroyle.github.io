const canvas = document.querySelector('#make-me-cool');
//https://github.com/ImBaedin/Thpace

const settings = {
    colors: ['#9383c8', '#b9dcf2', '#9383c8'],
    triangleSize: 100,
    pointAnimationX: 50,
    pointAnimationY: 50,
    pointAnimationSpeed: 15000
};

Thpace.create(canvas, settings);