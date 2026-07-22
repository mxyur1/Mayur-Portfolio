  // Waveform visual — irregular bar heights, mirrored around center
  (function(){
    const svg = document.getElementById('waveform');
    if(!svg) return;
    const NS = "http://www.w3.org/2000/svg";
    const bars = 90;
    const w = 800, h = 60, mid = h/2, gap = w/bars;
    for(let i=0;i<bars;i++){
      const amp = (Math.sin(i*0.45) * 0.5 + Math.random()*0.6 + 0.3) * (mid*0.85);
      const rect = document.createElementNS(NS,'rect');
      rect.setAttribute('x', (i*gap + gap*0.25).toFixed(1));
      rect.setAttribute('width', Math.max(1.4, gap*0.5).toFixed(1));
      rect.setAttribute('y', (mid - amp).toFixed(1));
      rect.setAttribute('height', (amp*2).toFixed(1));
      rect.setAttribute('rx', '1.2');
      rect.setAttribute('class','wf-bar');
      rect.setAttribute('opacity', (0.45 + Math.random()*0.55).toFixed(2));
      svg.appendChild(rect);
    }
  })();

  // Scroll reveal — progressive enhancement, never blocks content from showing
  (function(){
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(!('IntersectionObserver' in window)) return;
    document.body.classList.add('js-anim');
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold:0.12 });
    els.forEach(e=>io.observe(e));
    // Safety net: force-reveal anything still hidden after 2.5s, no matter what
    setTimeout(()=>{ els.forEach(e=>e.classList.add('in')); }, 2500);
  })();

  // Side-nav: highlight the dot for whichever section is currently in view
  (function(){
    const links = document.querySelectorAll('#sideNav a');
    if(!links.length || !('IntersectionObserver' in window)) return;
    const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const byId = {};
    links.forEach(a => { byId[a.getAttribute('href')] = a; });
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        const id = '#' + en.target.id;
        if(en.isIntersecting && byId[id]){
          links.forEach(a => a.classList.remove('active'));
          byId[id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));
  })();