import React from 'react';

const links=[
 {name:'Facebook',href:'https://www.facebook.com/',mobileLeft:51,desktopTop:188,desktopLeft:648},
 {name:'Instagram',href:'https://www.instagram.com/layali.ofc/',mobileLeft:162.55,desktopTop:631,desktopLeft:647},
 {name:'TikTok',href:'https://www.tiktok.com/@lailibrand',mobileLeft:274,desktopTop:410,desktopLeft:647},
];

export default function SocialLinks({mobile=false}) {
 return links.map(link=><a key={link.name} className={'social-button-link '+(mobile?'mobile-social-link':'desktop-social-link')} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`Buka ${link.name} Layali (tab baru)`} style={mobile?{left:link.mobileLeft,top:2415,width:87.797,height:69.9}:{left:link.desktopLeft,top:link.desktopTop,width:204,height:204}}/>);
}
