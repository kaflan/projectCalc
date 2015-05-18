/**
 * Created by kaflan on 17.05.15.
 */
console.log('To begin');
window.addEventListener('load', function(){
    var c1 = document.querySelector('.c1');
    var c2 = document.querySelector('.c2');
    var c3 = document.querySelector('.c3');
    var foo = function(e){
        e.preventDefault();
        console.log('work');
        alert('Click to button');
    };
    var lala = function(e){
        e.preventDefault();
        c1.removeEventListener('click', foo);
        c2.removeEventListener('click', foo);
    };
    console.log('to listener');
    c1.addEventListener('click', foo);

    c2.addEventListener('click', lala);

    c3.addEventListener('click', function(e){
        e.preventDefault();
        alert("I\'m clicked to work Listener");


        c1.addEventListener('click', foo);
        c2.addEventListener('click', foo);

    });

});