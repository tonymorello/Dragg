(function( $ ){
	
	$.fn.dragg = function(options) {
		
		this.each(function(e){
			dragg(this, options);
			
		});
		
		
		function dragg(element, options){
			
			var defaults = {
				helper	:	'helper',
				onStart	:	function(){},
				onDrag	:	function(){},
				onDrop	:	function(){}
			}; 
			
			var options = $.extend({}, defaults, options); 
			
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
				old_hover;
			
			$(element).mousedown(function(e){
				
				if (e.target == element){
					
					if($.isFunction(options.onStart)) {
						options.onStart.call(element);
					}
					
					$(element).trigger('dragstart');
					
					mouse = 'down';
					
					e.stopPropagation();
					
					pY = e.pageY;
					pX = e.pageX;
					offset = $(element).offset();
					width = $(element).width();
					height = $(element).height();
					
					grabY = pY - offset.top;
					grabX = pX - offset.left;
					
					original = $(element);
					clone = $(element).clone();
					
					original.css('visibility' , 'hidden');
								
					clone.css({
						'position' : 'absolute',
						'z-index' : 1000,
						'width' : width,
						'left' : offset.left,
						'top' : offset.top,
					});
					
					clone.attr('id', options.helper);
					
					clone.appendTo('body');
					
					$('body').mousemove(function(e){
						
						e.preventDefault();
						
						if(mouse == 'down'){
													
							pY = e.pageY;
							pX = e.pageX;
							
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
					
					$('body').one('mouseup', function(e){
						
						mouse = 'up';
						
						$(hover).trigger('drop');
						
						if($.isFunction(options.onDrop)) {
							options.onDrop.call($(hover));
						}						
						
						clone.remove();
						original.css('visibility', '');
											
					});
				
				}
							
			});
			
		}
				
	}
	
})( jQuery );