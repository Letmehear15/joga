window.addEventListener('DOMContentLoaded', () => {
    //tabs
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
    
    // Timer
    let endOfTime = '2020-03-25 18:19:00';

    function getTime(deadLine) {
        let t = Date.parse(deadLine) - Date.parse(new Date());

        let getSecond = Math.floor((t/1000) % 60);
        let getMinute = Math.floor((t/1000/60) % 60);
        let getHours = Math.floor(t/1000/60/60);

        return (
            {
                'total': t,
                's': getSecond,
                'm': getMinute,
                'h': getHours  
            }
        );
    };

    function setTimer(id , deadLine) {
        let timerId = document.getElementById(id),
            second = timerId.querySelector('.seconds'),
            minutes = timerId.querySelector('.minutes'),
            hours = timerId.querySelector('.hours'),
            setTimer = setInterval(start, 1000);

        function start() {
            let property = getTime(deadLine);

            function upGrade(el) {
                if(el < 10) return `0${el}`
                else return el;
            }

            second.textContent = upGrade(property.s);
            minutes.textContent = upGrade(property.m);
            hours.textContent = upGrade(property.h);

            if(property.total <= 0) {
                clearInterval(setTimer);
                
                second.textContent = '00';
                minutes.textContent = '00';
                hours.textContent = '00';
            };

        }
    }
    setTimer('timer', endOfTime)

    //Modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descr = document.querySelectorAll('.description-btn');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden'
    })

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = ''
    })

    descr.forEach(el => {
        el.addEventListener('click', function() {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden'
        })
    })
    // Ajax
    function sendRequest(id) {
        return new Promise((resolve, reject) => {
            let form = document.getElementById(id);
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                let xhr = new XMLHttpRequest();
                xhr.open('POST', '../server.php');

                let data = new FormData(form);
                let obj = {};

                for(let [key,value] of data) {
                    obj[key] = value;
                }
                let json = JSON.stringify(obj);
                xhr.send(json);

                xhr.onreadystatechange = () => {
                    if(xhr.readyState === 4 || xhr.status === 200) {
                        resolve();
                    } else reject()
                }
            });
        })
    };

    sendRequest('form').then(
        () => console.log('succes'),
        () => console.log('error')
    );
    sendRequest('main-form').then(
        () => console.log('succes'),
        () => console.log('error')
    );

    //Slider

    let currentSlide = 1;
    let slids = document.querySelectorAll('.slider-item');
    let dotWrap = document.querySelector('.slider-dots');
    let dots = document.querySelectorAll('.dot');
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    
    showSlide(currentSlide)

    function showSlide(n) {

        if(n > slids.length) {
            currentSlide = 1;
        }
        if(n < 1) {
            currentSlide = slids.length;
        }

        slids.forEach((el) => el.style.display = 'none');
        dots.forEach((el) => el.classList.remove('dot-active'));

        slids[currentSlide - 1].style.display = 'block';
        dots[currentSlide - 1].classList.add('dot-active');
    }

    function nextSlide() {
        showSlide(++currentSlide);
    }
    function prevSlide() {
        showSlide(--currentSlide);
    }
    next.addEventListener('click', ()=>nextSlide());
    prev.addEventListener('click', ()=>prevSlide());

    dotWrap.addEventListener('click', (e) => {
        for(let i = 0; i < dots.length; i++) {
            if(e.target.classList.contains('dot') && e.target == dots[i]) {
                showSlide(currentSlide = i+1);
            }
        }
    })

    //Calc

    let persons = document.querySelectorAll('.counter-block-input')[0];
    let days = document.querySelectorAll('.counter-block-input')[1];
    let base = document.querySelector('#select');
    let totalPrice = document.querySelector('#total');
    let total = 0;

    totalPrice.textContent = 0;

    persons.addEventListener('input', function() {
        let a = +this.value;
        total = (a + (+days.value));

        if(days.value == '' || persons.value == '') totalPrice.textContent = 0;
        else totalPrice.textContent = total;
    })
    days.addEventListener('input', function() {
        let a = +this.value;
        total = (a + (+persons.value));

        if(persons.value == '' || days.value == '') totalPrice.textContent = 0;
        else totalPrice.textContent = total;
    })

    base.addEventListener('input', function() {
        totalPrice.textContent = total * (+this.value);
    })
})