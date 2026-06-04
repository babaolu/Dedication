// Each transition: { dur(ms), prep(el), out(el,cb), pin(el), in(el) }
// out: animates the CURRENT card away, calls cb when done
// in:  sets initial state of NEXT card (called before it becomes visible)

export const TRANSITIONS = [
  // 0. FADE
  {dur:700,
   prep:el=>{el.style.cssText='opacity:1;transform:none;filter:none;';},
   out:(el,cb)=>{el.style.transition='opacity .65s ease';el.style.opacity='0';setTimeout(cb,650);},
   pin:el=>{el.style.cssText='opacity:0;transform:none;';},
   in:el=>{el.style.transition='opacity .65s ease';el.style.opacity='1';}},

  // 1. SLIDE LEFT
  {dur:750,
   prep:el=>{el.style.cssText='transform:translateX(0);';},
   out:(el,cb)=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateX(-100%)';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:translateX(100%)';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateX(0)';}},

  // 2. SLIDE RIGHT
  {dur:750,
   prep:el=>{el.style.cssText='transform:translateX(0);';},
   out:(el,cb)=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateX(100%)';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:translateX(-100%)';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateX(0)';}},

  // 3. SLIDE UP
  {dur:750,
   prep:el=>{el.style.cssText='transform:translateY(0);';},
   out:(el,cb)=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateY(-100%)';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:translateY(100%)';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateY(0)';}},

  // 4. SLIDE DOWN
  {dur:750,
   prep:el=>{el.style.cssText='transform:translateY(0);';},
   out:(el,cb)=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateY(100%)';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:translateY(-100%)';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateY(0)';}},

  // 5. FLIP HORIZONTAL
  {dur:900,
   prep:el=>{el.style.cssText='transform:rotateY(0deg);transform-style:preserve-3d;';},
   out:(el,cb)=>{el.style.transition='transform .8s ease-in-out';el.style.transform='rotateY(90deg)';setTimeout(cb,400);},
   pin:el=>{el.style.cssText='transform:rotateY(-90deg);transform-style:preserve-3d;';},
   in:el=>{el.style.transition='transform .8s ease-in-out';el.style.transform='rotateY(0deg)';}},

  // 6. FLIP VERTICAL
  {dur:900,
   prep:el=>{el.style.cssText='transform:rotateX(0deg);transform-style:preserve-3d;';},
   out:(el,cb)=>{el.style.transition='transform .8s ease-in-out';el.style.transform='rotateX(90deg)';setTimeout(cb,400);},
   pin:el=>{el.style.cssText='transform:rotateX(-90deg);transform-style:preserve-3d;';},
   in:el=>{el.style.transition='transform .8s ease-in-out';el.style.transform='rotateX(0deg)';}},

  // 7. SCALE DOWN FADE
  {dur:750,
   prep:el=>{el.style.cssText='transform:scale(1);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .65s ease,opacity .65s ease';el.style.transform='scale(.85)';el.style.opacity='0';setTimeout(cb,640);},
   pin:el=>{el.style.cssText='transform:scale(1.12);opacity:0;';},
   in:el=>{el.style.transition='transform .65s ease,opacity .65s ease';el.style.transform='scale(1)';el.style.opacity='1';}},

  // 8. SCALE UP FADE
  {dur:750,
   prep:el=>{el.style.cssText='transform:scale(1);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .65s ease,opacity .65s ease';el.style.transform='scale(1.15)';el.style.opacity='0';setTimeout(cb,640);},
   pin:el=>{el.style.cssText='transform:scale(.85);opacity:0;';},
   in:el=>{el.style.transition='transform .65s ease,opacity .65s ease';el.style.transform='scale(1)';el.style.opacity='1';}},

  // 9. BLUR FADE
  {dur:750,
   prep:el=>{el.style.cssText='opacity:1;filter:blur(0px);';},
   out:(el,cb)=>{el.style.transition='opacity .6s ease,filter .6s ease';el.style.opacity='0';el.style.filter='blur(18px)';setTimeout(cb,600);},
   pin:el=>{el.style.cssText='opacity:0;filter:blur(18px);';},
   in:el=>{el.style.transition='opacity .6s ease,filter .6s ease';el.style.opacity='1';el.style.filter='blur(0px)';}},

  // 10. ROTATE FADE
  {dur:850,
   prep:el=>{el.style.cssText='transform:rotate(0deg) scale(1);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .75s ease,opacity .75s ease';el.style.transform='rotate(-8deg) scale(.9)';el.style.opacity='0';setTimeout(cb,740);},
   pin:el=>{el.style.cssText='transform:rotate(8deg) scale(.9);opacity:0;';},
   in:el=>{el.style.transition='transform .75s ease,opacity .75s ease';el.style.transform='rotate(0deg) scale(1)';el.style.opacity='1';}},

  // 11. WIPE FROM TOP
  {dur:700,
   prep:el=>{el.style.cssText='clip-path:inset(0 0 0 0);';},
   out:(el,cb)=>{el.style.transition='clip-path .65s ease';el.style.clipPath='inset(0 0 100% 0)';setTimeout(cb,650);},
   pin:el=>{el.style.cssText='clip-path:inset(100% 0 0 0);';},
   in:el=>{el.style.transition='clip-path .65s ease';el.style.clipPath='inset(0 0 0 0)';}},

  // 12. WIPE FROM BOTTOM
  {dur:700,
   prep:el=>{el.style.cssText='clip-path:inset(0 0 0 0);';},
   out:(el,cb)=>{el.style.transition='clip-path .65s ease';el.style.clipPath='inset(100% 0 0 0)';setTimeout(cb,650);},
   pin:el=>{el.style.cssText='clip-path:inset(0 0 100% 0)';},
   in:el=>{el.style.transition='clip-path .65s ease';el.style.clipPath='inset(0 0 0 0)';}},

  // 13. WIPE FROM LEFT
  {dur:700,
   prep:el=>{el.style.cssText='clip-path:inset(0 0 0 0)';},
   out:(el,cb)=>{el.style.transition='clip-path .65s ease';el.style.clipPath='inset(0 100% 0 0)';setTimeout(cb,650);},
   pin:el=>{el.style.cssText='clip-path:inset(0 0 0 100%)';},
   in:el=>{el.style.transition='clip-path .65s ease';el.style.clipPath='inset(0 0 0 0)';}},

  // 14. WIPE FROM RIGHT
  {dur:700,
   prep:el=>{el.style.cssText='clip-path:inset(0 0 0 0)';},
   out:(el,cb)=>{el.style.transition='clip-path .65s ease';el.style.clipPath='inset(0 0 0 100%)';setTimeout(cb,650);},
   pin:el=>{el.style.cssText='clip-path:inset(0 100% 0 0)';},
   in:el=>{el.style.transition='clip-path .65s ease';el.style.clipPath='inset(0 0 0 0)';}},

  // 15. DIAGONAL WIPE
  {dur:750,
   prep:el=>{el.style.cssText='clip-path:polygon(0 0,100% 0,100% 100%,0 100%)';},
   out:(el,cb)=>{el.style.transition='clip-path .7s ease';el.style.clipPath='polygon(100% 0,100% 0,100% 100%,100% 100%)';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='clip-path:polygon(0 0,0 0,0 100%,0 100%)';},
   in:el=>{el.style.transition='clip-path .7s ease';el.style.clipPath='polygon(0 0,100% 0,100% 100%,0 100%)';}},

  // 16. ZOOM PUNCH
  {dur:750,
   prep:el=>{el.style.cssText='transform:scale(1);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .35s ease-in,opacity .35s ease-in';el.style.transform='scale(1.4)';el.style.opacity='0';setTimeout(cb,350);},
   pin:el=>{el.style.cssText='transform:scale(0.5);opacity:0;';},
   in:el=>{el.style.transition='transform .55s cubic-bezier(.34,1.56,.64,1),opacity .4s ease';el.style.transform='scale(1)';el.style.opacity='1';}},

  // 17. HINGE DROP (top-left pivot)
  {dur:900,
   prep:el=>{el.style.cssText='transform-origin:top left;transform:rotateZ(0deg);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .8s cubic-bezier(.7,0,1,.7),opacity .8s ease';el.style.transform='rotateZ(10deg) translateY(120%)';el.style.opacity='0';setTimeout(cb,800);},
   pin:el=>{el.style.cssText='transform:translateY(-100%);opacity:0;';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.34,1.2,.64,1),opacity .5s ease';el.style.transform='translateY(0)';el.style.opacity='1';}},

  // 18. NEWSPAPER SPIN
  {dur:900,
   prep:el=>{el.style.cssText='transform:rotate(0deg) scale(1);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .8s ease-in,opacity .5s ease';el.style.transform='rotate(720deg) scale(0)';el.style.opacity='0';setTimeout(cb,800);},
   pin:el=>{el.style.cssText='transform:rotate(-360deg) scale(0);opacity:0;';},
   in:el=>{el.style.transition='transform .8s cubic-bezier(.34,1.2,.64,1),opacity .5s ease';el.style.transform='rotate(0deg) scale(1)';el.style.opacity='1';}},

  // 19. IRIS WIPE (circle expand)
  {dur:750,
   prep:el=>{el.style.cssText='clip-path:circle(75% at 50% 50%)';},
   out:(el,cb)=>{el.style.transition='clip-path .65s ease';el.style.clipPath='circle(0% at 50% 50%)';setTimeout(cb,650);},
   pin:el=>{el.style.cssText='clip-path:circle(0% at 50% 50%)';},
   in:el=>{el.style.transition='clip-path .65s ease';el.style.clipPath='circle(75% at 50% 50%)';}},

  // 20. SHEAR LEFT
  {dur:750,
   prep:el=>{el.style.cssText='transform:skewX(0deg) translateX(0)';},
   out:(el,cb)=>{el.style.transition='transform .65s ease';el.style.transform='skewX(-15deg) translateX(-110%)';setTimeout(cb,650);},
   pin:el=>{el.style.cssText='transform:skewX(15deg) translateX(110%)';},
   in:el=>{el.style.transition='transform .65s ease';el.style.transform='skewX(0deg) translateX(0)';}},

  // 21. SHEAR RIGHT
  {dur:750,
   prep:el=>{el.style.cssText='transform:skewX(0deg) translateX(0)';},
   out:(el,cb)=>{el.style.transition='transform .65s ease';el.style.transform='skewX(15deg) translateX(110%)';setTimeout(cb,650);},
   pin:el=>{el.style.cssText='transform:skewX(-15deg) translateX(-110%)';},
   in:el=>{el.style.transition='transform .65s ease';el.style.transform='skewX(0deg) translateX(0)';}},

  // 22. FOLD DOWN (perspective)
  {dur:900,
   prep:el=>{el.style.cssText='transform-origin:top center;transform:rotateX(0deg);transform-style:preserve-3d;opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .8s ease,opacity .4s ease .4s';el.style.transform='rotateX(-90deg)';el.style.opacity='0';setTimeout(cb,800);},
   pin:el=>{el.style.cssText='transform-origin:bottom center;transform:rotateX(90deg);transform-style:preserve-3d;opacity:0;';},
   in:el=>{el.style.transition='transform .8s ease,opacity .3s ease';el.style.transform='rotateX(0deg)';el.style.opacity='1';}},

  // 23. UNFOLD UP
  {dur:900,
   prep:el=>{el.style.cssText='transform-origin:bottom center;transform:rotateX(0deg);transform-style:preserve-3d;opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .8s ease,opacity .4s ease .4s';el.style.transform='rotateX(90deg)';el.style.opacity='0';setTimeout(cb,800);},
   pin:el=>{el.style.cssText='transform-origin:top center;transform:rotateX(-90deg);transform-style:preserve-3d;opacity:0;';},
   in:el=>{el.style.transition='transform .8s ease,opacity .3s ease';el.style.transform='rotateX(0deg)';el.style.opacity='1';}},

  // 24. CROSS DISSOLVE (both fade simultaneously)
  {dur:800,
   prep:el=>{el.style.cssText='opacity:1;';},
   out:(el,cb)=>{el.style.transition='opacity .75s ease';el.style.opacity='0';setTimeout(cb,750);},
   pin:el=>{el.style.cssText='opacity:0;';},
   in:el=>{el.style.transition='opacity .75s ease';el.style.opacity='1';}},

  // 25. GLITCH SLIDE
  {dur:700,
   prep:el=>{el.style.cssText='transform:translateX(0);filter:none;';},
   out:(el,cb)=>{
     el.style.transition='none';
     let t=0;
     const g=setInterval(()=>{
       t+=80;
       el.style.transform=`translateX(${(Math.random()-.5)*30}px)`;
       el.style.filter=`hue-rotate(${Math.random()*60}deg)`;
       if(t>=400){clearInterval(g);el.style.transition='transform .25s ease,opacity .25s ease';el.style.transform='translateX(-110%)';el.style.opacity='0';setTimeout(cb,250);}
     },80);},
   pin:el=>{el.style.cssText='transform:translateX(110%);opacity:0;';},
   in:el=>{el.style.transition='transform .5s cubic-bezier(.77,0,.175,1),opacity .3s ease';el.style.transform='translateX(0)';el.style.opacity='1';}},

  // 26. BOUNCE IN FROM BOTTOM
  {dur:900,
   prep:el=>{el.style.cssText='transform:translateY(0);';},
   out:(el,cb)=>{el.style.transition='transform .5s ease-in,opacity .4s ease';el.style.transform='translateY(-60px)';el.style.opacity='0';setTimeout(cb,480);},
   pin:el=>{el.style.cssText='transform:translateY(100%);opacity:0;';},
   in:el=>{el.style.transition='transform .8s cubic-bezier(.34,1.56,.64,1),opacity .4s ease';el.style.transform='translateY(0)';el.style.opacity='1';}},

  // 27. CURTAIN SPLIT HORIZONTAL
  {dur:800,
   prep:el=>{el.style.cssText='clip-path:polygon(0 0,100% 0,100% 100%,0 100%)';},
   out:(el,cb)=>{el.style.transition='clip-path .7s ease';el.style.clipPath='polygon(50% 0,50% 0,50% 100%,50% 100%)';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='clip-path:polygon(0 50%,100% 50%,100% 50%,0 50%)';},
   in:el=>{el.style.transition='clip-path .7s ease';el.style.clipPath='polygon(0 0,100% 0,100% 100%,0 100%)';}},

  // 28. CUBE RIGHT
  {dur:900,
   prep:el=>{el.style.cssText='transform:rotateY(0deg) translateZ(0);transform-style:preserve-3d;';},
   out:(el,cb)=>{el.style.transition='transform .8s cubic-bezier(.77,0,.175,1)';el.style.transform='rotateY(-90deg) translateZ(0)';setTimeout(cb,800);},
   pin:el=>{el.style.cssText='transform:rotateY(90deg) translateZ(0);transform-style:preserve-3d;';},
   in:el=>{el.style.transition='transform .8s cubic-bezier(.77,0,.175,1)';el.style.transform='rotateY(0deg) translateZ(0)';}},

  // 29. CUBE LEFT
  {dur:900,
   prep:el=>{el.style.cssText='transform:rotateY(0deg) translateZ(0);transform-style:preserve-3d;';},
   out:(el,cb)=>{el.style.transition='transform .8s cubic-bezier(.77,0,.175,1)';el.style.transform='rotateY(90deg) translateZ(0)';setTimeout(cb,800);},
   pin:el=>{el.style.cssText='transform:rotateY(-90deg) translateZ(0);transform-style:preserve-3d;';},
   in:el=>{el.style.transition='transform .8s cubic-bezier(.77,0,.175,1)';el.style.transform='rotateY(0deg) translateZ(0)';}},

  // 30. RIPPLE BLUR
  {dur:800,
   prep:el=>{el.style.cssText='opacity:1;filter:blur(0px) brightness(1);transform:scale(1);';},
   out:(el,cb)=>{el.style.transition='all .7s ease';el.style.filter='blur(20px) brightness(1.3)';el.style.transform='scale(1.05)';el.style.opacity='0';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='opacity:0;filter:blur(20px) brightness(.7);transform:scale(.95);';},
   in:el=>{el.style.transition='all .7s ease';el.style.filter='blur(0px) brightness(1)';el.style.transform='scale(1)';el.style.opacity='1';}},

  // 31. PAGE TURN RIGHT
  {dur:900,
   prep:el=>{el.style.cssText='transform-origin:left center;transform:rotateY(0deg);transform-style:preserve-3d;';},
   out:(el,cb)=>{el.style.transition='transform .85s ease-in-out';el.style.transform='rotateY(-180deg)';setTimeout(cb,850);},
   pin:el=>{el.style.cssText='transform-origin:right center;transform:rotateY(180deg);transform-style:preserve-3d;';},
   in:el=>{el.style.transition='transform .85s ease-in-out';el.style.transform='rotateY(0deg)';}},

  // 32. PAGE TURN LEFT
  {dur:900,
   prep:el=>{el.style.cssText='transform-origin:right center;transform:rotateY(0deg);transform-style:preserve-3d;';},
   out:(el,cb)=>{el.style.transition='transform .85s ease-in-out';el.style.transform='rotateY(180deg)';setTimeout(cb,850);},
   pin:el=>{el.style.cssText='transform-origin:left center;transform:rotateY(-180deg);transform-style:preserve-3d;';},
   in:el=>{el.style.transition='transform .85s ease-in-out';el.style.transform='rotateY(0deg)';}},

  // 33. ELASTIC SCALE
  {dur:800,
   prep:el=>{el.style.cssText='transform:scale(1);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .4s ease-in,opacity .3s ease';el.style.transform='scale(0.1)';el.style.opacity='0';setTimeout(cb,400);},
   pin:el=>{el.style.cssText='transform:scale(2);opacity:0;';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.34,1.56,.64,1),opacity .4s ease';el.style.transform='scale(1)';el.style.opacity='1';}},

  // 34. FLASH
  {dur:600,
   prep:el=>{el.style.cssText='opacity:1;filter:brightness(1);';},
   out:(el,cb)=>{el.style.transition='filter .15s ease,opacity .15s ease';el.style.filter='brightness(8)';el.style.opacity='0';setTimeout(cb,150);},
   pin:el=>{el.style.cssText='opacity:0;filter:brightness(8);';},
   in:el=>{el.style.transition='opacity .4s ease,filter .4s ease';el.style.opacity='1';el.style.filter='brightness(1)';}},

  // 35. PUSH DOWN
  {dur:750,
   prep:el=>{el.style.cssText='transform:translateY(0)';},
   out:(el,cb)=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateY(100%)';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:translateY(-100%)';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateY(0)';}},

  // 36. PUSH UP
  {dur:750,
   prep:el=>{el.style.cssText='transform:translateY(0)';},
   out:(el,cb)=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateY(-100%)';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:translateY(100%)';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translateY(0)';}},

  // 37. SWING OUT
  {dur:900,
   prep:el=>{el.style.cssText='transform-origin:top center;transform:rotateX(0deg);opacity:1;transform-style:preserve-3d;';},
   out:(el,cb)=>{el.style.transition='transform .8s ease,opacity .5s ease .3s';el.style.transform='rotateX(-120deg)';el.style.opacity='0';setTimeout(cb,800);},
   pin:el=>{el.style.cssText='transform-origin:top center;transform:rotateX(120deg);opacity:0;transform-style:preserve-3d;';},
   in:el=>{el.style.transition='transform .8s cubic-bezier(.34,1.3,.64,1),opacity .4s ease';el.style.transform='rotateX(0deg)';el.style.opacity='1';}},

  // 38. IMPLODE
  {dur:800,
   prep:el=>{el.style.cssText='clip-path:circle(75% at 50% 50%);opacity:1;';},
   out:(el,cb)=>{el.style.transition='clip-path .7s ease,opacity .3s ease .4s';el.style.clipPath='circle(0% at 50% 50%)';el.style.opacity='0';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='clip-path:circle(0% at 50% 50%);opacity:1;';},
   in:el=>{el.style.transition='clip-path .7s ease';el.style.clipPath='circle(75% at 50% 50%)';}},

  // 39. MOSAIC (scale + grid clip simulation)
  {dur:800,
   prep:el=>{el.style.cssText='transform:scale(1);opacity:1;filter:none;';},
   out:(el,cb)=>{el.style.transition='transform .6s ease,opacity .3s ease .3s,filter .6s ease';el.style.transform='scale(.6)';el.style.filter='blur(8px)';el.style.opacity='0';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:scale(1.3);opacity:0;filter:blur(8px);';},
   in:el=>{el.style.transition='transform .65s cubic-bezier(.34,1.3,.64,1),opacity .4s ease,filter .5s ease';el.style.transform='scale(1)';el.style.opacity='1';el.style.filter='blur(0px)';}},

  // 40. TILT LEFT
  {dur:800,
   prep:el=>{el.style.cssText='transform:perspective(800px) rotateY(0deg);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .7s ease,opacity .5s ease';el.style.transform='perspective(800px) rotateY(-60deg) translateX(-40%)';el.style.opacity='0';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:perspective(800px) rotateY(60deg) translateX(40%);opacity:0;';},
   in:el=>{el.style.transition='transform .7s ease,opacity .5s ease';el.style.transform='perspective(800px) rotateY(0deg)';el.style.opacity='1';}},

  // 41. TILT RIGHT
  {dur:800,
   prep:el=>{el.style.cssText='transform:perspective(800px) rotateY(0deg);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .7s ease,opacity .5s ease';el.style.transform='perspective(800px) rotateY(60deg) translateX(40%)';el.style.opacity='0';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:perspective(800px) rotateY(-60deg) translateX(-40%);opacity:0;';},
   in:el=>{el.style.transition='transform .7s ease,opacity .5s ease';el.style.transform='perspective(800px) rotateY(0deg)';el.style.opacity='1';}},

  // 42. FALL AWAY
  {dur:900,
   prep:el=>{el.style.cssText='transform:perspective(600px) translateZ(0) rotateX(0deg);opacity:1;transform-style:preserve-3d;';},
   out:(el,cb)=>{el.style.transition='transform .8s ease,opacity .6s ease';el.style.transform='perspective(600px) translateZ(-400px) rotateX(20deg)';el.style.opacity='0';setTimeout(cb,800);},
   pin:el=>{el.style.cssText='transform:perspective(600px) translateZ(400px) rotateX(-20deg);opacity:0;transform-style:preserve-3d;';},
   in:el=>{el.style.transition='transform .8s ease,opacity .6s ease';el.style.transform='perspective(600px) translateZ(0) rotateX(0deg)';el.style.opacity='1';}},

  // 43. STRETCH HORIZONTAL
  {dur:750,
   prep:el=>{el.style.cssText='transform:scaleX(1);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .5s ease,opacity .3s ease .2s';el.style.transform='scaleX(0)';el.style.opacity='0';setTimeout(cb,500);},
   pin:el=>{el.style.cssText='transform:scaleX(0);opacity:0;';},
   in:el=>{el.style.transition='transform .6s cubic-bezier(.34,1.4,.64,1),opacity .3s ease';el.style.transform='scaleX(1)';el.style.opacity='1';}},

  // 44. STRETCH VERTICAL
  {dur:750,
   prep:el=>{el.style.cssText='transform:scaleY(1);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .5s ease,opacity .3s ease .2s';el.style.transform='scaleY(0)';el.style.opacity='0';setTimeout(cb,500);},
   pin:el=>{el.style.cssText='transform:scaleY(0);opacity:0;';},
   in:el=>{el.style.transition='transform .6s cubic-bezier(.34,1.4,.64,1),opacity .3s ease';el.style.transform='scaleY(1)';el.style.opacity='1';}},

  // 45. DIAGONAL SLIDE
  {dur:750,
   prep:el=>{el.style.cssText='transform:translate(0,0)';},
   out:(el,cb)=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translate(-60%,-60%)';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:translate(60%,60%)';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translate(0,0)';}},

  // 46. SPIN SCALE IN
  {dur:900,
   prep:el=>{el.style.cssText='transform:rotate(0deg) scale(1);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .7s ease-in,opacity .4s ease';el.style.transform='rotate(180deg) scale(0)';el.style.opacity='0';setTimeout(cb,680);},
   pin:el=>{el.style.cssText='transform:rotate(-180deg) scale(0);opacity:0;';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.34,1.4,.64,1),opacity .4s ease';el.style.transform='rotate(0deg) scale(1)';el.style.opacity='1';}},

  // 47. SWIPE DIAGONAL UP-RIGHT
  {dur:750,
   prep:el=>{el.style.cssText='transform:translate(0,0)';},
   out:(el,cb)=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translate(70%,-70%)';setTimeout(cb,700);},
   pin:el=>{el.style.cssText='transform:translate(-70%,70%)';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.77,0,.175,1)';el.style.transform='translate(0,0)';}},

  // 48. CRUMPLE (scale + skew)
  {dur:800,
   prep:el=>{el.style.cssText='transform:scale(1) skewY(0deg);opacity:1;';},
   out:(el,cb)=>{el.style.transition='transform .6s ease,opacity .5s ease';el.style.transform='scale(.3) skewY(20deg)';el.style.opacity='0';setTimeout(cb,600);},
   pin:el=>{el.style.cssText='transform:scale(.3) skewY(-20deg);opacity:0;';},
   in:el=>{el.style.transition='transform .7s cubic-bezier(.34,1.3,.64,1),opacity .5s ease';el.style.transform='scale(1) skewY(0deg)';el.style.opacity='1';}},

  // 49. LUMINANCE WIPE (brightness sweep)
  {dur:800,
   prep:el=>{el.style.cssText='opacity:1;filter:brightness(1)';},
   out:(el,cb)=>{
     el.style.transition='filter .35s ease';el.style.filter='brightness(0)';
     setTimeout(()=>{el.style.opacity='0';cb();},360);},
   pin:el=>{el.style.cssText='opacity:0;filter:brightness(0)';},
   in:el=>{el.style.opacity='1';el.style.filter='brightness(0)';el.style.transition='filter .5s ease';el.style.filter='brightness(1)';}},
];

let tPool = [];

export function pickTransition() {
  if (tPool.length === 0) {
    tPool = Array.from({ length: TRANSITIONS.length }, (_, i) => i);
    // shuffle
    for (let i = tPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tPool[i], tPool[j]] = [tPool[j], tPool[i]];
    }
  }
  return tPool.pop();
}
