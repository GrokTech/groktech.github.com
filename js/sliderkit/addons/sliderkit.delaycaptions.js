/*  
 *  Slider Kit Delay Captions - 2011/09/23
 *  http://www.kyrielles.net/sliderkit
 *  
 *  Copyright (c) 2010-2011 Alan Frog
 *  Licensed under the GNU General Public License
 *  See <license.txt> or <http://www.gnu.org/licenses/>
 *  
 *  Requires : jQuery Slider Kit v1.7.1+
 * 
 */
(function( $ ) {

	SliderKit.prototype.DelayCaptions = (function( params ) {
		
		var obj = this,
			settings = {
				delay:400,
				position:"bottom",
				transition:"sliding",
				duration:300,
				easing:"",
				hold:false
			},
			csslib = {
				textbox:obj.options.cssprefix+"-panel-textbox"
			},
			domObjWidth = obj.domObj.width(),
			txtboxes = $( "."+csslib.textbox, obj.domObj ),
			txtboxWidth = txtboxes.width();
		
		// Check if there is any textbox in the slider
		if( txtboxes.size() == 0 ){
			obj._errorReport("DelayCaptions #01", this.options.debug, 0);
			return false;
		}
		
		// Merge settings
		settings = $.extend( {}, settings, params );		
		
		// Textbox Size
		var txtboxSize = (settings.position == "top" || settings.position == "bottom") ? txtboxes.height() : settings.position == "left" ? txtboxWidth : settings.position == "right" ? domObjWidth : 0;		
		if( txtboxSize == 0 ){
			obj._errorReport( "DelayCaptions #02", this.options.debug, 0 );
			return false;
		}
		
		// Default textbox position
		else{
			txtboxes.css( {top:"", bottom:"0", left:"", right:""} );
		}
		
		// Transition settings
		var animParam = "";
		
		switch ( settings.transition ) {
			case "sliding" :
				var cssOp = settings.position == "right" ? "" : "-";
				var cssPos = settings.position == "right" ? "left" : settings.position;		
				switch ( settings.position ) {
					case "top": animParam = {top: "+=" + txtboxSize}; break;
					case "bottom": animParam = {bottom: "+=" + txtboxSize}; break;
					case "left": animParam = {left: "+=" + txtboxSize}; break;
					case "right": animParam = {left: "-=" + txtboxWidth}; break;
				}
			break;
			case "fading" :
				animParam = {"opacity":"show"};
			break;
		}
		
		var clearAnim = function(){
			if( obj.txtBoxTimer != null ){
				clearTimeout( obj.txtBoxTimer );
			}
		};

		// Before panel animation
		var textboxPos = function(){
		
			// Stop previous timeout
			clearAnim();
			
			var currTxtBox = $( "."+csslib.textbox, obj.currPanel );
			
			// Apply the animation only if a textbox exists in the current panel
			if( currTxtBox.size() > 0 ){
				switch ( settings.transition ) {
					case "fading" :
						txtboxes.hide();
					break;
					case "sliding" :			
						currTxtBox.css( cssPos, cssOp + txtboxSize + "px" );
					break;
				}
			}
		};
		// Store the function into the callback list
		obj.panelAnteFns.push( textboxPos );
		
		// After panel animation function	
		var textboxAnim = function( currTxtBox ){
		
			// Prevents script to switch while textbox is animating
			obj.textboxRunning = true;

			// Run animation
			currTxtBox.stop().animate(
				animParam, 
				settings.duration, 
				settings.easing, 
				function(){
					obj.textboxRunning = false;
					
					// Free the panel transition
					if( settings.hold ) {
						obj.animating = false;
					}
				}
			);
		};
		
		// After panel animation callback
		var textboxShow = function(){
			
			// Stop previous timeout
			clearAnim();
			
			var currTxtBox = $( "."+csslib.textbox, obj.currPanel );

			// Apply the animation only if a textbox exists in the current panel
			if( currTxtBox.size() > 0 ){
			
				// Prevents '_change()' function to trigger during textbox animation
				if( settings.hold ) {
					obj.animating = true;
				}

				// Delay the animation
				if( !obj.textboxRunning ){
					obj.txtBoxTimer = setTimeout( function(){ textboxAnim( currTxtBox ) }, settings.delay );
				}
			}
		};
		// Store the function into the callback list
		obj.panelPostFns.push( textboxShow );
		
    });

})( jQuery );