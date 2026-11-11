import React, {useRef, useState} from 'react';
import reviews from './testimonials.json';

export default function Testimonials({mobile=false}) {
 const track=useRef(null), drag=useRef(null);
 const [active,setActive]=useState(0);
 function go(index){
  const el=track.current;
  const target=el.children[index].offsetLeft-(mobile?17:94);
  el.scrollTo({left:Math.min(target,el.scrollWidth-el.clientWidth),behavior:'smooth'});
 }
 function update(){
  const el=track.current,step=mobile?412:747;
  setActive(el.scrollLeft>=el.scrollWidth-el.clientWidth-2?2:Math.min(2,Math.round(el.scrollLeft/step)));
 }
 return <section className={'testimonials-carousel '+(mobile?'is-mobile':'is-desktop')} aria-label="Cerita keluarga Layali" aria-roledescription="carousel">
  <div ref={track} className="testimonials-track" onScroll={update} tabIndex={0}
   onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(Math.max(0,Math.min(2,active+(e.key==='ArrowRight'?1:-1))))}}}
   onPointerDown={e=>{if(e.pointerType!=='mouse')return;const el=track.current;drag.current={x:e.clientX,left:el.scrollLeft,scale:el.getBoundingClientRect().width/el.offsetWidth};el.setPointerCapture(e.pointerId);el.classList.add('dragging')}}
   onPointerMove={e=>{if(drag.current){track.current.scrollLeft=drag.current.left-(e.clientX-drag.current.x)/drag.current.scale}}}
   onPointerUp={e=>{if(!drag.current)return;drag.current=null;track.current.classList.remove('dragging');track.current.releasePointerCapture(e.pointerId)}}
   onPointerCancel={()=>{drag.current=null;track.current.classList.remove('dragging')}}>
   {reviews.map((r,i)=><article className="testimonial-card" key={r.name} role="group" aria-roledescription="slide" aria-label={`${i+1} dari 3`}>
    <span className="testimonial-quote-mark" aria-hidden="true">“</span>
    <header><strong>{r.name}</strong><p>{r.role}</p></header><blockquote>{r.quote}</blockquote>
   </article>)}
  </div>
  <div className="testimonial-controls">
   <button aria-label="Testimoni sebelumnya" disabled={active===0} onClick={()=>go(active-1)}>‹</button>
   {reviews.map((r,i)=><button key={r.name} className={'testimonial-dot '+(active===i?'active':'')} aria-label={`Lihat testimoni ${r.name}`} aria-current={active===i?'true':undefined} onClick={()=>go(i)}/>)}
   <button aria-label="Testimoni berikutnya" disabled={active===2} onClick={()=>go(active+1)}>›</button>
  </div>
 </section>
}
