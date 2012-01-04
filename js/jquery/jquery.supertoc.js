/**
 *	Super TOC! v1.0 - Table Of Content jQuery plugin
 *  http://www.kyrielles.net/
 *  
 *  Copyright (c) 2010-2011 Alan Frog
 *  Licensed under the GNU General Public License
 *  See <license.txt> or <http://www.gnu.org/licenses/>
 *  
 *  Requires: jQuery <http://jquery.com/>
 */
(function($){
	$.fn.superToc = function( options ){

		// Default settings
		var settings = {
			headings:"h1,h2,h3"
		};
		
		var clean = function(s){
			var r=s.toLowerCase();
			r = r.replace(/\s/g,"");
			r = r.replace(/[������]/g,"a");
			r = r.replace(/�/g,"ae");
			r = r.replace(/�/g,"c");
			r = r.replace(/[����]/g,"e");
			r = r.replace(/[����]/g,"i");
			r = r.replace(/�/g,"n");                
			r = r.replace(/[�����]/g,"o");
			r = r.replace(/�/g,"oe");
			r = r.replace(/[����]/g,"u");
			r = r.replace(/[��]/g,"y");
			r = r.replace(/\W/g,"");
			r = r.replace(/\W/g,"");
			return r;
		};
			
		// Applying plugin
		return this.each( function() {
		
			// Client settings
			if ( options ) { 
				$.extend( settings, options );
			}

			//var self = this;
			var domObj = $( this );
			var toc = "";
			
			$( settings.headings, domObj ).each(function(){
				var curtag = $( this );
				var tagId = curtag.attr( "id" );
				var tagText = curtag.text();				
				var tagType = curtag.get(0).tagName.toLowerCase();												
				
				if( !tagId ){
					tagId = "TOC"+ clean(tagText);
					curtag.attr( "id", tagId );
				}
				
				toc += '<li class="toc-'+tagType+'"><a href="#'+tagId+'">'+tagText+'</a></li>';
			});
			
			domObj.append('<div class="supertoc"><ul>'+toc+'</ul></div>');

		});
	};
})( jQuery );