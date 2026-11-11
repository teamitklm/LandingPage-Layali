import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import Desktop from './LayaliDesktop';
import Mobile from './LayaliMobile';
import DesktopCatalog from './DesktopCatalog';
import './design.css';
import './app.css';

const contact='https://wa.me/6281234226384';
function App(){
 const [width,setWidth]=useState(window.innerWidth),[menu,setMenu]=useState(false),[notice,setNotice]=useState(''),[catalog,setCatalog]=useState(false);
 const menuPanel=useRef(null);
 const stage=useRef(null);const view=new URLSearchParams(window.location.search).get('view');const mobile=view==='mobile' || (width<768 && view!=='desktop'),base=mobile?412:1440,scale=Math.min(width/base,view==='mobile'?1:1.15);
 useEffect(()=>{const resize=()=>setWidth(window.innerWidth);window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize)},[]);
 useEffect(()=>{if(!menu)return;const previous=document.activeElement;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';menuPanel.current?.querySelector('button')?.focus();return()=>{document.body.style.overflow=overflow;previous?.focus()}},[menu]);
 function scrollToText(pattern){const el=[...stage.current.querySelectorAll('p')].find(p=>pattern.test(p.textContent));el?.scrollIntoView({behavior:'smooth',block:'center'});setMenu(false)}
 function activate(text){
  if(/tentang|kenalan|about/i.test(text))scrollToText(/Kenalan Lebih Dekat/);
  else if(text==='Kemitraan')scrollToText(/Jadi Mitra/);
  else if(text==='Free Seminar')scrollToText(/Ingin punya/);
  else if(/katalog|koleksi|mukena|sarimbit/i.test(text))scrollToText(/Bunda, Ada Koleksi/);
  else if(/testimoni/i.test(text))scrollToText(/masih penasaran/);
  else if(/instagram/i.test(text))window.open('https://www.instagram.com/layali.ofc/','_blank','noopener,noreferrer');
  else if(/facebook/i.test(text))window.open('https://www.facebook.com/','_blank','noopener,noreferrer');
  else if(/tiktok|titktok/i.test(text))window.open('https://www.tiktok.com/@lailibrand','_blank','noopener,noreferrer');
  else if(/shipping|privacy|term|wishlist|compare|subscribe/i.test(text))setNotice('Silakan hubungi tim Layali untuk informasi '+text+'.');
  else window.open(contact+'?text='+encodeURIComponent('Halo Layali, saya ingin informasi tentang '+text+'.'),'_blank','noopener,noreferrer');
 }
 useEffect(()=>{
  const root=stage.current;
  const pattern=/^(About Us|Free Seminar|Marketplace|Tentang Kami|Katalog|Kemitraan|Testimoni|Jelajahi Sekarang|Jelajahi Koleksi|Jejak Cinta|Kaulah Yang Utama|Mukena Hajar Safa Marwa|.*[Ll]ihat [Kk]oleksi.*|.*[Mm]ukena.*[Ss]eries.*|Gabung.*|Konsultasi.*|Daftar Seminar Gratis|Facebook|Instagram|Tiktok|Titktok|Shipping & Return|Privacy Policy|Term of Use|Wishlist|Compare|Subscribe)$/;
  const clean=[];
  for(const el of root.querySelectorAll('p')){const text=el.textContent.trim();if(!pattern.test(text)||text.length>65)continue;el.setAttribute('role','button');el.setAttribute('tabindex','0');el.classList.add('action');const click=()=>activate(text),key=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();click()}};el.addEventListener('click',click);el.addEventListener('keydown',key);clean.push(()=>{el.removeEventListener('click',click);el.removeEventListener('keydown',key)})}
  const hamburger=root.querySelector('[data-node-id="112:8"]');if(hamburger){hamburger.setAttribute('role','button');hamburger.setAttribute('aria-label','Buka navigasi');hamburger.tabIndex=0;const fn=()=>setMenu(v=>!v);hamburger.addEventListener('click',fn);clean.push(()=>hamburger.removeEventListener('click',fn))}
  return()=>clean.forEach(f=>f());
 },[mobile]);
 return <><main inert={menu} aria-label="Layali" style={{height:(mobile?3955:8281)*scale,width:base*scale,margin:'auto',position:'relative',overflow:'hidden'}}><div ref={stage} className="design-stage" style={{width:base,height:mobile?3955:8281,transform:`scale(${scale})`,transformOrigin:'top left'}}>{mobile?<Mobile/>:<Desktop/>}{!mobile&&<DesktopCatalog onSelect={name=>scrollToText(new RegExp(name.replace('Mukena ','')))}/>} </div></main>{menu&&<nav ref={menuPanel} className="mobile-menu-panel" aria-label="Navigasi" style={{width:base*scale,maxWidth:'100vw'}} onKeyDown={e=>{if(e.key==='Escape')setMenu(false);if(e.key==='Tab'){const buttons=[...menuPanel.current.querySelectorAll('button')];if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===buttons.at(-1)){e.preventDefault();buttons[0].focus()}}}}>
  <div className="mobile-menu-header"><img src={import.meta.env.BASE_URL + "assets/12517.webp"} alt="Layali"/><button className="menu-toggle" aria-label="Tutup navigasi" aria-expanded="true" onClick={()=>{setMenu(false);setCatalog(false)}}><span/><span/><span/></button></div>
  <div className="mobile-menu-links"><button onClick={()=>activate('About Us')}>About Us</button>
  <button aria-expanded={catalog} aria-controls="catalog-menu" onClick={()=>setCatalog(v=>!v)}>Katalog <span className={'catalog-chevron '+(catalog?'expanded':'')}/></button>
  {catalog&&<div id="catalog-menu" className="catalog-submenu">{['Jejak Cinta','Kaulah Yang Utama','Mukena Hajar Safa Marwa'].map(t=><button key={t} onClick={()=>{scrollToText(new RegExp(t.replace('Mukena ','')));setCatalog(false)}}>{t.replace('Mukena ','')}</button>)}</div>}
  {['Kemitraan','Free Seminar','Marketplace'].map(t=><button key={t} onClick={()=>{activate(t);setMenu(false);setCatalog(false)}}>{t}</button>)}</div></nav>}{notice&&<div className="dialog" role="dialog" aria-modal="true"><p>{notice}</p><a href={contact} target="_blank" rel="noreferrer">Hubungi Layali</a><button onClick={()=>setNotice('')}>Tutup</button></div>}</>
}
createRoot(document.getElementById('root')).render(<App/>);


