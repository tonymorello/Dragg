Dragg.js
========

Dragg is a simple and lightweight jQuery plugin that turns any html elements (such as div, img or p) into draggable (and droppable) elements.
Dragg is what HTML5 "Drag and Drop" should have been, providing a basic structure for your to expand and customize in your applications.

How it works
------------
To set an element as "draggable" call the plugin `dragg()` on the jQuery selector. Profit.
The selected element can now be dragged around your page, now you need to set what you want to happen in the 3 stages of the "drag and drop" action `onStart`, `onDrag`, `onDrop` via callbacks.

### onSart
Is the first callback to be fired and has as default selector (this) the **original** element that was set as draggable.
At this stage you may generally want to collect some information about the item you want to drag.

Additionally a `dragstart` event is fired on the same selector.
### onDrag
This callback is fired as soon as the mouse starts moving when dragging the element to its destination and it keeps firing as long as the mouse moves. Its default selector is the element directly under the mouse pointer at that point in time.
During this stage you may want to highlight the target element or check whether the area you are currently on is your "drop zone".

Additionally 2 events are fired, the `drag` event fired on the element that is being dragged around and the `dragover` event is fired upon the element directly underneath the mouse pointer at that point in time. 

### onDrop
This is the last callback and it's fired when the mouse button is released. Its default selector is the element directly under the mouse at the time of the "drop".

Finally an additional `drop` event is fired on the same "target" element.

In Action!
----------

Let's see how the plugin works in a practical example...

```
<div id="containerA" style="margin:5px;heigh:200px;width:200px;">
  <img id="image" src="milo.jpg" />
</div>

<div id="containerB" style="margin:5px;heigh:100px;width:100px;"></div>

<script>
  $('#image').dragg();
</script>
```

So we have 2 div's, the first one contains a picture to which we are giving the "drag and drop" ability by calling the plugin.

Right now the picture can be moved around but nothing happens. We need can listen for 4 events to obtain the desired behavior during each stage.

```
var content;
$(document).on('dragstart', '#image', function(e){
  content=$(this).clone();
});
```

When the `dragstart` event is fired on our draggable element we can store a clone of that element in a variable...

```
$(document).on('drag', '#helper', function(e){
  $(this).css('opacity' : 0.5);
});
```

While dragging we can listen for the `drag` event to be fired on our helper and, for example, lower its opacity to make it see-through...

```
$(document).on('dragover', '#containerB', function(e){
  $(this).css('background-color' : '#ff0000');
});
```

The `dragover` event can be used to fire a function on the target element in this case we are going to highlight the target area changing the background color.

```
$(document).on('drop', #containerB', function(e){
  $('this').html(content);
  $('#image).remove();
});
```

Finally the `drop` event is used to determine what action to perform on the element "drop". In this case we transfer the previously stored content to the target div and remove the original selector.

