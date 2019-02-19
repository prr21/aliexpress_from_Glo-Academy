window.addEventListener('DOMContentLoaded', () => {

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

            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);

            if(empty) empty.style.display = 'none';
        })    
    });



})

