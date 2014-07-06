(function( $ ){
	
	$.fn.dragg = function(options) {
		
		var options	= options || {};
		var onStart	= options.onStart	|| function(){}
		var onDrag	= options.onDrag	|| function(){}
		var onDrop	= options.onDrop	|| function(){}
		
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
			hover;
		
		this.on('mousedown', function(e){
			
			if (e.target == this){
				
				if($.isFunction(onStart)) {
					onStart.call(this);
				}
				
				mouse = 'down';
				
				e.stopPropagation();
				
				pY = e.pageY;
				pX = e.pageX;
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
				});
				
				clone.attr('id', 'dragging');
				
				clone.appendTo('body');
				
				$('body').mousemove(function(e){
					
					e.preventDefault();
					
					if(mouse == 'down'){
												
						pY = e.pageY;
						pX = e.pageX;
						
						left = pX - grabX;
						top = pY - grabY;
						
						$('#dragging').hide();
						hover = document.elementFromPoint(pX, pY);
						$('#dragging').show();
						
						$('#dragging').css({
							'left' : left,
							'top' : top
						});
						
						if($.isFunction(onDrag)) {
							onDrag.call(hover);
						}
					}
									
				});
				
				$('body').mouseup(function(e){
					
					mouse = 'up';
					if($.isFunction(onDrop)) {
						$('body').one('mouseover', function(e){
							onDrop.call($(e.target));
						});
					}
					
					clone.remove();
					original.css('visibility', 'visible');
										
				});
			
			}
						
		});
				
	}
	
})( jQuery );