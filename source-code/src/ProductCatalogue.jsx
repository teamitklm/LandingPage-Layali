import React,{useRef,useState} from 'react';

const base=import.meta.env.BASE_URL+'assets/';
const collections=['Jejak Cinta','Kaulah Yang Utama','Mukena Hajar Safa Marwa','Muara Sujud','Bunga Gradasi'];
const mukena=[['600f4',11,1,150,286,114.29,-10.33,-14.29,144.84],['7765e',74,1,152,286,118.61,-9.93,-14.36,149.49],['a9b49',139,0,151,287,113.95,-9.44,-13.95,144.23],['5e4db',203,1,149,286,114.2,-10.27,-14.2,146.08],['57126',0,91,151,288,114.12,-10.2,-14.12,145.04],['b6738',68,91,154,294,114.37,-10.23,-14.37,145.45],['ceb8d',141,91,154,294,114.2,-10.24,-14.2,145.66],['9efb2',244,91,124,292,101.56,-2.1,-1.56,102.11]];
function Crop({file,x,y,w,h,ih,ix,iy,iw,rotate=0}){return <div className="collection-crop" style={{left:x,top:y,width:w,height:h,transform:`rotate(${rotate}deg)`}}><img src={base+file+'.webp'} alt="" draggable="false" style={{height:ih+'%',left:ix+'%',top:iy+'%',width:iw+'%'}}/></div>}
function Artwork({index}){return <div className="collection-artboard">
 {index===0&&<Crop file="32338" x={0} y={13} w={448} h={364} ih={208.15} ix={-9.37} iy={-71.64} iw={112.68}/>}
 {index===1&&<Crop file="6f72a" x={53} y={0} w={341} h={384} ih={153.55} ix={-8.85} iy={-36.72} iw={115.68}/>}
 {index===2&&<div className="collection-mukena">{mukena.map(([file,x,y,w,h,ih,ix,iy,iw])=><Crop key={file} {...{file,x,y,w,h,ih,ix,iy,iw}}/>)}</div>}
 {index===3&&<Crop file="21acc" x={77} y={7} w={293.412} h={382.163} ih={134.3} ix={-5.9} iy={-14.44} iw={116.62} rotate={-.66}/>}
 {index===4&&<Crop file="cac59" x={115} y={7} w={218} h={381} ih={125.39} ix={-24.34} iy={-15.88} iw={145.85}/>}
 </div>}
export default function ProductCatalogue({mobile=false}){
 const track=useRef(null),drag=useRef(null),moved=useRef(false);const[progress,setProgress]=useState(0);const step=mobile?193:474;
 function go(delta){track.current.scrollBy({left:delta*step,behavior:'smooth'})}
 return <section className={'product-carousel '+(mobile?'mobile-products':'desktop-products')} aria-label="Katalog koleksi Layali" aria-roledescription="carousel">
 <div className="product-track" ref={track} tabIndex={0} onScroll={()=>{const el=track.current;setProgress(el.scrollLeft/(el.scrollWidth-el.clientWidth)||0)}}
 onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();go(e.key==='ArrowRight'?1:-1)}}}
 onPointerDown={e=>{moved.current=false;if(e.pointerType!=='mouse')return;const el=track.current;drag.current={x:e.clientX,left:el.scrollLeft,scale:el.getBoundingClientRect().width/el.offsetWidth};el.classList.add('dragging')}}
 onPointerMove={e=>{if(drag.current){const dx=(e.clientX-drag.current.x)/drag.current.scale;if(Math.abs(dx)>6){moved.current=true;if(!track.current.hasPointerCapture(e.pointerId))track.current.setPointerCapture(e.pointerId);}track.current.scrollLeft=drag.current.left-dx}}}
 onPointerUp={e=>{if(!drag.current)return;drag.current=null;track.current.classList.remove('dragging');if(track.current.hasPointerCapture(e.pointerId))track.current.releasePointerCapture(e.pointerId)}}
 onPointerCancel={()=>{drag.current=null;track.current.classList.remove('dragging')}}
 onClickCapture={e=>{if(moved.current){e.preventDefault();e.stopPropagation()}}}>
 {collections.map((name,index)=><article className="collection-card" key={name} aria-label={`${index+1} dari 5: ${name}`}><div className="collection-art"><Artwork index={index}/></div><div className="collection-caption"><img className="collection-flower flower-left" src={base+'aa1c7.webp'} alt="" draggable="false"/><button data-collection={name} onClick={()=>window.open('https://wa.me/6281234226384?text='+encodeURIComponent('Halo Layali, saya ingin informasi tentang '+name+'.'),'_blank','noopener,noreferrer')}>{mobile?name.replace('Mukena ',''):name}</button><img className="collection-flower flower-right" src={base+'aa1c7.webp'} alt="" draggable="false"/></div></article>)}
 </div><div className="collection-controls"><button aria-label="Koleksi sebelumnya" disabled={progress<.01} onClick={()=>go(-1)}>‹</button><input aria-label="Posisi katalog koleksi" type="range" min="0" max="100" value={Math.round(progress*100)} onChange={e=>{const el=track.current;el.scrollLeft=(el.scrollWidth-el.clientWidth)*Number(e.target.value)/100}}/><button aria-label="Koleksi berikutnya" disabled={progress>.99} onClick={()=>go(1)}>›</button></div>
 </section>
}
