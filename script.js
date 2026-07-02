document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener("click",e=>{
      const href=a.getAttribute("href");
      if(!href || href==="#") return;
      const t=document.querySelector(href);
      if(!t) return;
      e.preventDefault();
      t.scrollIntoView({behavior:"smooth",block:"start"});
      closeMobileDrawer();
    });
  });

  const btn=document.querySelector(".mobile-menu-btn");
  const drawer=document.querySelector(".mobile-drawer");
  const closeBtn=document.querySelector(".mobile-drawer-close");
  const backdrop=document.querySelector(".drawer-backdrop");

  function openMobileDrawer(){
    if(!drawer) return;
    drawer.classList.add("open");
    if(backdrop) backdrop.classList.add("show");
    drawer.setAttribute("aria-hidden","false");
    if(btn) btn.setAttribute("aria-expanded","true");
    document.body.style.overflow="hidden";
  }
  function closeMobileDrawer(){
    if(!drawer) return;
    drawer.classList.remove("open");
    if(backdrop) backdrop.classList.remove("show");
    drawer.setAttribute("aria-hidden","true");
    if(btn) btn.setAttribute("aria-expanded","false");
    document.body.style.overflow="";
  }
  window.closeMobileDrawer=closeMobileDrawer;
  if(btn){
    btn.addEventListener("click",()=>{
      if(drawer && drawer.classList.contains("open")) closeMobileDrawer();
      else openMobileDrawer();
    });
  }
  if(closeBtn) closeBtn.addEventListener("click",closeMobileDrawer);
  if(backdrop) backdrop.addEventListener("click",closeMobileDrawer);
  document.querySelectorAll(".mobile-drawer a").forEach(a=>a.addEventListener("click",closeMobileDrawer));
  document.addEventListener("keydown",e=>{if(e.key==="Escape") closeMobileDrawer();});
});
