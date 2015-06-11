window.addEventListener('load',  function(){
    console.log('load complete');
    var cell = document.querySelectorAll('.cell'),
        clickUse,
        startNewGame = document.querySelector('.startNewGame'),
        winnerMessage = document.querySelector('.winner-message');
        startNewGame.addEventListener('click', function(e){
        e.preventDefault();
            for(var i = 0;i < cell.length; i++){
            cell[i].classList.remove('o');
            cell[i].classList.remove('x');
                console.log('finish');
            }
    });
    for(var i = 0; i < cell.length; i++){
        cell[i].addEventListener('click', function(e){
            for(var i = 0; i < cell.length; i++){
                     e.preventDefault();

                clickUse  = e.target.classList.add('x');
                if(clickUse){
                    clickUse = e.target.classList.add('o');


                } else{

                    console.log(' not ok');

                }


                 }

            });

    }
    /*


    */
});
