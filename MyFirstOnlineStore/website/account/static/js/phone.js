var element = document.getElementById('phone');
var maskOptions = {
    mask: '+7(000)000-00-00',
    lazy: false
} 
var mask = new IMask(element, maskOptions);



var element3 = document.getElementById('card');
var maskOptions3 = {
    mask: '0000 0000 0000 0000',
    lazy: false
} 
var mask3 = new IMask(element3, maskOptions3);