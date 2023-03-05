function ProjectedOverlay(map,imageUrl,bounds,opts)
// eslint-disable-next-line no-undef
{google.maps.OverlayView.call(this);this.map_=map;this.url_=imageUrl;this.bounds_=bounds;this.addZ_=opts.addZoom||'';this.id_=opts.id||this.url_;this.percentOpacity_=opts.percentOpacity||50;this.rotation_=opts.rotation||0;this.setMap(map);}
// eslint-disable-next-line no-undef
ProjectedOverlay.prototype=new google.maps.OverlayView();ProjectedOverlay.prototype.createElement=function()
{var panes=this.getPanes();var div=this.div_;if(!div)
{div=this.div_=document.createElement("div");div.style.position="absolute";div.setAttribute('id',this.id_);this.div_=div;this.lastZoom_=-1;if(this.percentOpacity_)
{this.setOpacity(this.percentOpacity_);}
if(this.rotation_)
{this.setRotation(this.rotation_);}
panes.overlayLayer.appendChild(div);}}
ProjectedOverlay.prototype.remove=function()
{if(this.div_)
{this.div_.parentNode.removeChild(this.div_);this.div_=null;this.setMap(null);}}
ProjectedOverlay.prototype.draw=function()
{this.createElement();if(!this.div_)
{return;}
var c1=this.get('projection').fromLatLngToDivPixel(this.bounds_.getSouthWest());var c2=this.get('projection').fromLatLngToDivPixel(this.bounds_.getNorthEast());if(!c1||!c2){return;}this.div_.style.width=Math.abs(c2.x-c1.x)+"px";this.div_.style.height=Math.abs(c2.y-c1.y)+"px";this.div_.style.left=Math.min(c2.x,c1.x)+"px";this.div_.style.top=Math.min(c2.y,c1.y)+"px";if(this.lastZoom_==this.map_.getZoom())
{return;}
this.lastZoom_=this.map_.getZoom();var url=this.url_;if(this.addZ_)
{url+=this.addZ_+this.map_.getZoom();}
this.div_.innerHTML='<img src="'+url+'"  width='+this.div_.style.width+' height='+this.div_.style.height+' >';}
ProjectedOverlay.prototype.setOpacity=function(opacity)
{if(opacity<0)
{opacity=0;}
if(opacity>100)
{opacity=100;}
var c=opacity/100;if(typeof(this.div_.style.filter)=='string')
{this.div_.style.filter='alpha(opacity:'+opacity+')';}
if(typeof(this.div_.style.KHTMLOpacity)=='string')
{this.div_.style.KHTMLOpacity=c;}
if(typeof(this.div_.style.MozOpacity)=='string')
{this.div_.style.MozOpacity=c;}
if(typeof(this.div_.style.opacity)=='string')
{this.div_.style.opacity=c;}}
ProjectedOverlay.prototype.setRotation=function(deg)
{this.div_.style.webkitTransform='rotate('+deg+'deg)';this.div_.style.mozTransform='rotate('+deg+'deg)';this.div_.style.msTransform='rotate('+deg+'deg)';this.div_.style.oTransform='rotate('+deg+'deg)';this.div_.style.transform='rotate('+deg+'deg)';}