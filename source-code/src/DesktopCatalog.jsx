import React, {useEffect, useRef, useState} from 'react';

const collections=['Jejak Cinta','Kaulah Yang Utama','Mukena Hajar Safa Marwa'];

export default function DesktopCatalog({onSelect}) {
 const [open,setOpen]=useState(false);
 const root=useRef(null), trigger=useRef(null);
 useEffect(()=>{
  if(!open)return;
  const outside=e=>{if(!root.current?.contains(e.target))setOpen(false)};
  document.addEventListener('pointerdown',outside);
  return()=>document.removeEventListener('pointerdown',outside);
 },[open]);
 function move(e){
  if(e.key==='Escape'){setOpen(false);trigger.current.focus({preventScroll:true});return}
  if(!['ArrowDown','ArrowUp','Home','End'].includes(e.key))return;
  e.preventDefault();setOpen(true);
  requestAnimationFrame(()=>{
   const links=[...root.current.querySelectorAll('.desktop-catalog-links button')];
   const current=links.indexOf(document.activeElement);
   const index=e.key==='Home'?0:e.key==='End'?links.length-1:e.key==='ArrowDown'?(current+1)%links.length:current<=0?links.length-1:current-1;
   links[index]?.focus();
  });
 }
 return <div className="desktop-catalog" ref={root} onKeyDown={move} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false)}}>
  <button ref={trigger} className="desktop-catalog-trigger" aria-expanded={open} aria-controls="desktop-catalog-links" onClick={()=>setOpen(v=>!v)}>Katalog <span className={'catalog-chevron '+(open?'expanded':'')}/></button>
  {open&&<div id="desktop-catalog-links" className="desktop-catalog-links">{collections.map(name=><button key={name} onClick={()=>{onSelect(name);setOpen(false);trigger.current.focus({preventScroll:true})}}>{name}</button>)}</div>}
 </div>
}
