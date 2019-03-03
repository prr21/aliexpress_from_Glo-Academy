window.addEventListener('DOMContentLoaded', () => {

    const loadGoods = async (url, callback) => {
        await fetch(url)
            .then(response => response.json())
            .then(json => createGood(json.goods))
    
        callback();
    }

    // Вызов загрузки товаров из json файла
    loadGoods('js/db.json', defaultScript);
})

// Создание нового товара
function createGood(goods){
    let goodWrap = document.querySelector('.goods__wrapper');

    goods.forEach(item => {
        let good = document.createElement('div');

        good.classList.add('goods__item');
        
        good.innerHTML = `
            <img class="goods__img" src="${item.url}" alt="phone">
                <div class="goods__colors">Доступно цветов: 4</div>
                <div class="goods__title">${item.title}</div>
                <div class="goods__price">
                    <span>${item.price}</span> руб/шт
                </div>
            <button class="goods__btn">Добавить в корзину</button>`

        goodWrap.appendChild(good)
    });
}

function defaultScript(){
    const   cartWrapper = document.querySelector('.cart__wrapper'),
            cart = document.querySelector('.cart'),
            close = document.querySelector('.cart__close'),
            open = document.querySelector('#cart'),
            goodsBtn = document.querySelectorAll('.goods__btn'),
            products = document.querySelectorAll('.goods__item'),
            confirm = document.querySelector('.confirm'),
            badge = document.querySelector('.nav__badge'),
            totalCost = document.querySelector('.cart__total > span'),
            empty = cartWrapper.querySelector('.empty'),
            titles = document.querySelectorAll('.goods__title');

    // Появление корзины
    open.addEventListener('click', openCart);

    function openCart(){
        cart.classList.add('show')
        document.body.style.overflow = 'hidden';
    }

    // Закрытие корзины
    close.addEventListener('click', closeCart);

    function closeCart(){
        cart.classList.remove('show')
        document.body.style.overflow = 'auto';
    }

    // Добавление продукта в корзину
    goodsBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {

            let item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div');
            
            trigger.remove();

            showConfirm(); //Анимация корзины

            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);
            
            countBadge(); //Увеличить счётчик корзины
            calcPrice() //Подсчитать сумму товаров
            removeFromCart() //Объявить об обработчике событий

            if(empty) empty.style.display = 'none';
        })    
    });

    // Сокращение описания товара
    titles.forEach((item) => {
        if (item.textContent.length > 50) {
            item.textContent = item.textContent.slice(0,50) + '...';
        } 
    })
    
    // Анимация появления корзины
    function showConfirm(){
        let count = 100;

        var intervalId = setInterval(() => {
            if(count != 10){
                confirm.style.cssText = 
                    `display: block;
                    transform: translateY(-${count}px);
                    opacity: .${count}`
                count-=2;

            } else {
                confirm.style.display = 'none';
                clearInterval(intervalId);
            }
        }, 15);
    }

    // Смена кол-во товаров на счетчике корзины
        function countBadge(){
        let items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = items.length;
    }

    // Подсчёт итоговой стоимости
    function calcPrice(){
        let price = cartWrapper.querySelectorAll('.goods__price > span'),
            total = 0;

        price.forEach((item) => {
            total += +item.textContent;
        })
        totalCost.textContent = total;
    }

    // Удаление товара из корзины
    function removeFromCart(){
        let removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');

        removeBtn.forEach((btn) => {
            btn.addEventListener('click', function() {
                btn.parentElement.remove();

                countBadge(); //Уменьшить счётчик корзины
                calcPrice(); //Подсчитать сумму товаров
                
                if(!cartWrapper.querySelectorAll('.goods__item').length) empty.style.display = '';
            });
        });
    }
};