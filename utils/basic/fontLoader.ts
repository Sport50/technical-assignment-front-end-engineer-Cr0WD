import { SomeObject } from '@interfaces/SomeObject'

const fontLoader = ({ fontFile, fontFamily }: SomeObject<string>) =>
	`;(function() {
  function addFont() {
    const e = document.createElement('style');
    document.head.appendChild(e);
    e.textContent = localStorage.preloaded_font;
  }
  const fontExists = !!localStorage.preloaded_font && localStorage.preloaded_font.includes('${fontFamily}');
  if (fontExists){
    addFont();
    return;
  } 
  fetch('${fontFile}').then(t=>t.text()).then(t=>{
    localStorage.setItem('preloaded_font', t);
    addFont();
  });
})()`
		.replace(/\n/g, ``)
		.replace(/ {2,}/g, ``)

export default fontLoader
