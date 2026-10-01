const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.primary-nav');

if(menuButton&&nav){
  menuButton.addEventListener('click',()=>{
    const open=menuButton.getAttribute('aria-expanded')==='true';
    menuButton.setAttribute('aria-expanded',String(!open));
    menuButton.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');
    nav.classList.toggle('is-open',!open);
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label','Abrir menu');
  }));
}

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -30px 0px'});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('year').textContent=new Date().getFullYear();

document.querySelectorAll('[data-cta]').forEach(link=>{
  link.addEventListener('click',()=>{
    const eventName='cta_click';
    const cta=link.dataset.cta;
    if(window.dataLayer&&Array.isArray(window.dataLayer)){
      window.dataLayer.push({event:eventName,cta});
    }
  });
});