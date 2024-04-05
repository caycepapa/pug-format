"use strict";

import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
gsap.registerPlugin(ScrollTrigger, CustomEase);


export default function(){

    window.addEventListener('load',function(){

        var loading = document.getElementById('loading');

        var fadeIn = document.getElementsByName("fadeIn");

        /*-----------------------------------------
        キャラインサート設定
        -----------------------------------------*/
        for(var i = 0; i < fadeIn.length; i++){

            var fadeInTl = gsap.timeline({
                repeat:0,
                delay:0.5,
                scrollTrigger:{
                    trigger: fadeIn[i],
                    start: 'top 90%',
                },
            });
            
            fadeInTl.fromTo(fadeIn[i], 1, {
                opacity: 0,
                filter: 'blur(10px)',
            },{
                opacity: 1,
                filter: 'blur(0px)',
            });
        }


        var mvTxt = document.getElementsByName("mvTxt");
        
        for(var i = 0; i < mvTxt.length; i++){

            var mvTxtTl = gsap.timeline({
                repeat:0,
                delay:0.5,
            });

            mvTxtTl.to(loading, 1, {
                opacity: 0,
                display: 'none',
            });
            
            mvTxtTl.fromTo(mvTxt[i], 1, {
                opacity: 0,
                filter: 'blur(10px)',
            },{
                opacity: 1,
                filter: 'blur(0px)',
                delay: i ,
            });
        }

        var logoMark = document.getElementsByName("logoMark");
        var logoType = document.getElementsByName("logoType");

        for(var i = 0; i < logoMark.length; i++){
                
                var logoMarkTl = gsap.timeline({
                    repeat:0,
                    delay:0.5,
                    scrollTrigger:{
                        trigger: logoMark[i],
                        start: 'top 90%',
                    },
                });

                logoMarkTl.fromTo(logoMark[i], 0.5, {
                    opacity: 0,
                    scale: 0.7,
                    rotate: '-450deg',
                },{
                    delay: 1,
                    scale: 0.7,
                    rotate: '-450deg',
                    opacity: 1,
                });
                
                logoMarkTl.fromTo(logoMark[i], 0.4, {
                    rotate: '-450deg',
                    scale: 0.7,
                },{
                    scale: 1,
                    delay: 1,
                    ease:"power5.in",
                    rotate: '0deg',
                });

                logoMarkTl.fromTo(logoType[i], 1, {
                    opacity: 0,
                    filter: 'blur(10px)',
                },{
                    opacity: 1,
                    filter: 'blur(0px)',
                    delay: 0.5,
                });
            }

    });

}