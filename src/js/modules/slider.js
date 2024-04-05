"use strict";

import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default function(){

    const prevNav = document.querySelector('.c-gallery-slide__slidenav__item.is-prev');
    const nextNav = document.querySelector('.c-gallery-slide__slidenav__item.is-next');

    const mvSwiper = new Swiper('.swiper01', {
        speed: 1000,
        spaceBetween: 10,
        loop: true, // ループ有効
        slidesPerView: 'auto', // 一度に表示する枚数
        allowTouchMove: false, // スワイプ無効
        centeredSlides: true, // 中央揃え
        autoplay: {
            delay: 4000, // 途切れなくループ
        },
        navigation: {
            prevEl: prevNav,
            nextEl: nextNav,
        },
    });

}