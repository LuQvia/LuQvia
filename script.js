const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(!id||id==='#')return;const t=document.querySelector(id);if(!t)return;e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}));
const revealTargets=document.querySelectorAll('.card,.service-card,.process-grid>div,.sample-highlight>div,.notice-box,.seo-box');
if('IntersectionObserver'in window){revealTargets.forEach(el=>el.classList.add('reveal'));const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});revealTargets.forEach(el=>observer.observe(el));}

(function(){
  function emit(name,params){
    params=params||{};
    if(typeof window.gtag==='function') window.gtag('event',name,params);
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push(Object.assign({event:name},params));
  }
  var type=document.querySelector('meta[name="luqvia:content_type"]');
  if(type&&type.content==='area'){
    var area=document.querySelector('meta[name="luqvia:area"]');
    var pref=document.querySelector('meta[name="luqvia:prefecture"]');
    emit('area_page_view',{area_name:area?area.content:'',prefecture:pref?pref.content:'',page_path:location.pathname});
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[data-cta]'); if(!a)return;
    var area=document.querySelector('meta[name="luqvia:area"]');
    emit('lead_cta_click',{cta_type:a.dataset.cta||'unknown',area_name:area?area.content:'',link_url:a.href,page_path:location.pathname});
  });
})();

// LuQvia Revenue Foundation v3.1
(function(){
  function pushEvent(name,params){
    params=params||{};
    if(typeof window.gtag==='function') window.gtag('event',name,params);
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push(Object.assign({event:name},params));
  }
  var content=document.querySelector('meta[name="luqvia:content_type"]');
  if(content&&content.content==='article'){
    pushEvent('article_view',{page_title:document.title,page_path:location.pathname});
  }
  if(location.pathname.indexOf('/works/')===0&&location.pathname!=='/works/'){
    pushEvent('case_study_view',{page_title:document.title,page_path:location.pathname});
  }
  if(location.pathname==='/price/'||location.pathname==='/price/index.html'){
    pushEvent('pricing_view',{page_path:location.pathname});
  }
})();
