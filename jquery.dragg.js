(function( $ ){
	
	var runDragg = function(options){
		
		var pY,
			pX,
			offset,
			width,
			height,
			left,
			top,
			grabY,
			grabX,
			clone,
			original,
			mouse,
			hover,
			old_hover,
			target;
		
		$(document).mousemove(function(e) {
            pY = e.pageY;
			pX = e.pageX;
        });
		
		$(this).mousedown(function(e){
			
			e.preventDefault();
			
			if (e.target == this){
				
				if($.isFunction(options.onStart)) {
					options.onStart.call(this);
				}
				
				e.stopPropagation();
				
				mouse = 'down';
				
				offset = $(this).offset();
				width = $(this).width();
				height = $(this).height();
				
				grabY = pY - offset.top;
				grabX = pX - offset.left;
				
				original = $(this);
				clone = $(this).clone();
				
				original.css('visibility' , 'hidden');
							
				clone.css({
					'position' : 'absolute',
					'z-index' : 1000,
					'width' : width,
					'left' : offset.left,
					'top' : offset.top,
				}).attr('id', options.helper).appendTo('body');
				
				$(this).trigger('dragstart');
				
				$('*').mousemove(function(e){
					
					e.preventDefault();
					
					if(mouse == 'down'){
						
						left = pX - grabX;
						top = pY - grabY;
						
						clone.hide();
						old_hover = hover;
						hover = document.elementFromPoint(pX, pY);
						clone.show();
						
						clone.css({
							'left' : left,
							'top' : top
						});
						
						if($.isFunction(options.onDrag)) {
							options.onDrag.call(hover);
						}
						
						$(clone).trigger('drag');
						
						if(old_hover!=hover){
							$(hover).trigger('dragin');
							$(old_hover).trigger('dragout');
						}
					}
				});
				
				$(document).one('mouseup', function(e){
					mouse = 'up';
					if($.isFunction(options.onDrop)) {
						options.onDrop.call($(hover));
					}						
					clone.remove();
					original.css('visibility', '');
					target = document.elementFromPoint(e.pageX, e.pageY);
					$(target).trigger('drop');
				});
			
			}
						
		});
		
	}
	
	var methods = {
		
		init : function(options){
			return this.each(function(e){
				runDragg.call(this, options);
			});
		},
		destroy: function(options) {
			return $(this).each(function() {
				$(this).off('mousedown');
			});
		}
		
	}
	
	$.fn.dragg = function(method, options) {
		
		if(!method || jQuery.isPlainObject(method) || !methods[method]){
			options = method;
			method = 'init';
		}
		
		var defaults = {
			helper	:	'helper',
			onStart	:	function(){},
			onDrag	:	function(){},
			onDrop	:	function(){}
		}; 
		
		var options = $.extend({}, defaults, options);
		
		return methods[method].call(this, options);
		
	}
	
})( jQuery );