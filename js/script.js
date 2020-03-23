window.addEventListener('DOMContentLoaded', () => {

    let info = document.querySelector('.info-header');
    let btn = info.querySelectorAll('.info-header-tab');
    let tabs = document.querySelectorAll('.info-tabcontent');

    function hide (a) {
        for(let i = a; i < tabs.length; i++) {
            tabs[i].classList.remove('show');
            tabs[i].classList.add('hide');
        }
    }
    
    hide(1);
    
    function addDisplay(b) {
        if(tabs[b].classList.contains('hide')) {
            tabs[b].classList.remove('hide');
            tabs[b].classList.add('show');
            
        }
    }
    
    info.addEventListener('click', (e) => {
        let target = e.target;
        if(target.classList.contains('info-header-tab')) {
            for(let i = 0; i < btn.length; i++) {
                if(target == btn[i]) {
                    hide(0);
                    addDisplay(i);
                }
            }
        }
    })
})