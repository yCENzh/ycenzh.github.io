// head.js

// Google Tag Manager script
const gtmHeadScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KBW38GKC');`

// Clarity script
const clarityScript = `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "tk5sr19x6c");`

export const headConfig = [
  // Google Tag Manager
  ['script', {}, gtmHeadScript],
  
  // Clarity
  ['script', { type: 'text/javascript' }, clarityScript],
  
  // 你可以在这里添加更多的 head 配置
  // 例如：favicon, meta tags 等
  // ['link', { rel: 'icon', href: '/favicon.ico' }],
  // ['meta', { name: 'author', content: 'Your Name' }],
]