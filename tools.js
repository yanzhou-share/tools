/**
*
*by shine
*20150312
*/
var Tools = Tools || (function(){
	var __ = {};

	/**get indexof array*/
	Array.prototype.indexOf = function(value) {
		for (var i = 0, l = this.length; i < l; i++) {
			if(this[i] == value)	return i;
		};

		return -1;
	};

	/**remove the value from array*/
	Array.prototype.remove = function(value){
		var index = this.indexOf(value);

		if(index >- 1){
			this.splice(index, 1);
		}

		return this;
	}

	/**async to load css file*/
	__.loadCssFile = function (path) {
		var _ele = document.createElement("link");
		_ele.setAttribute('rel', 'stylesheet');
		_ele.setAttribute('type','text/css');
		_ele.setAttribute('href', path);
		document.getElementByTagName('head')[0].appendChild(_ele);
	}

	/**async to load js file*/
	__.loadJsFile = function (path) {
		var _ele = document.createElement("script");
		_ele.setAttribute('type','text/javascript');
		_ele.setAttribute("src", path);
		_ele.setAttribute("defer","defer");
		document.getElementByTagName('head')[0].appendChild(_ele);
	}

	/**get length chars and when the string is too long will show....*/
	__.getCharLength = function(value, len){
		if(!value){return 0;}

		var nLength = value.length, lenValue = "",
			a = 0,
			sign = 0,
			lower = 0;

		for (var n = 0; n < nLength && n < len; n++) {
			lenValue +=	value.charAt(n);	
			a = getCharLength(value.charAt(n));

			if(a == 2){
				len -= 1;
			} else if(a == 1.5){
				sign += 1;
			} else if(a == 1){
				lower += 1;
			}

			if(sign >= 2 || n >= len){
				len -= 1;
				sign = 0;
			}

			if(lower >= 3){
				len -= 1;
				lower = 0;
			}
		};	

		lenValue = lenValue.substring(0, len);

		if(nLength > len)	return lenValue + "...";
		else return lenValue + ".";
	}
	/**replace < or >*/
	__.replaceHtmlTag = function (value) {
		return value.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
	}

	/**get cookie**/
	__.getCookie = function (name) {
		var cookie_start = document.cookie.indexOf(name),
			cookie_end = document.cookie.indexOf(";", cookie_start);
		return cookie_start == -1 ? '' : unescape(document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length)));
	}

	/**set cookie**/
	__.setCookie = function (cookieName, cookieValue, seconds, path, domain, secure) {
		__.deleteCookie(cookieName);
		var expires = new Date();
		expires.setTime(expires.getTime() + seconds);
		document.cookie = escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '/')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
	}

	/**delete cookie**/
	__.deleteCookie = function (name,path,domain) {
		if(name){
			document.cookie = name + "=" +
      		((path) ? "; path=" + path : "") +
      		((domain) ? "; domain=" + domain : "") +
      		"; expires=Thu, 01-Jan-70 00:00:01 GMT";
		}
	}


	function getCharLength (str) {
		if("abcdefghizklmnopqrstuvwxyz0123456789".indexOf(str) != -1){
			return 1;
		}
		if("ABCDEFGHIZKLNOPQRSTUVXYZ".indexOf(str) != -1){
			return 1.5;
		}
		if(str == 'W' || str == 'M'){
			return 2;
		}

		return str.replace(/[^\x00-xff]/g,"aa").length;
	}

	return __;	
})();
