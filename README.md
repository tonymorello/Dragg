Dragg.js
========

Dragg is a simple and lightweight jQuery plugin that turns any html elements (such as div, img or p) into draggable (and droppable) elements.
Dragg is what HTML5 "Drag and Drop" should have been, providing a basic structure for you to expand and customize in your web applications.

How it works
------------
To set an element as "draggable" call the plugin `dragg()` on the jQuery selector.
The selected element can now be dragged around your page, now you need to set what you want to happen in the 3 stages of the "drag and drop" action `onStart`, `onDrag`, `onDrop` via callbacks and/or custom events.

### onSart
Is the first stage and callback to be fired and has as default selector (this) the **original** element that was set as draggable.
At this stage you may generally want to collect some information about the item you want to drag.

Also a `dragstart` event is triggered on the same selector.

### onDrag
This callback is fired as soon as the mouse starts moving when dragging the element to its destination and it keeps firing as long as the mouse moves. Its default selector is the element directly under the mouse pointer at that point in time.
During this stage you may want to highlight the target element or check whether the area you are currently on is your "drop zone".

3 events are fired during this stage, the `drag` event is triggered on the helper that is being dragged around and the `dragin` event is triggered when the mouse enters any of the html elements on the page and `dragout` when the mouse leaves them.

### onDrop
This is the last stage and callback and it's fired when the mouse button is released. The callback's default selector is the element directly under the mouse at the time of the "drop".

Finally the `drop` event is triggered on the original element.

In Action!
----------

Let's see how the plugin works in a practical example using all of the custom events provided...

![](http://www.morellowebdesign.com/samples/dragg/dragg1.jpg)

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

![](http://www.morellowebdesign.com/samples/dragg/dragg2.jpg)

When the `dragstart` event is fired on our draggable element we can store a clone of that element in a variable...


```
$(document).on('drag', '#helper', function(e){
  $(this).css('opacity' : 0.5);
});
```

While dragging we can listen for the `drag` event to be fired on our helper and, for example, lower its opacity to make it see-through...

![](http://www.morellowebdesign.com/samples/dragg/dragg3.jpg) ![](http://www.morellowebdesign.com/samples/dragg/dragg4.jpg)

```
$(document).on('dragin', '#containerB', function(e){
  $(this).css('background-color' : '#ff0000');
});

$(document).on('dragout', '#containerB', function(e){
  $(this).css('background-color' : '');
});
```

The `dragin` event can be used to fire a function on the target element in this case we are going to highlight the target area changing the background color.

The `dragout` event has the opposite pourpose, it is fired upon leaving the target area and in our example it's used to reset the background color to the original one.

![](http://www.morellowebdesign.com/samples/dragg/dragg5.jpg)

```
$(document).on('drop', #containerB', function(e){
  $('this').html(content);
  $('#image).remove();
});
```

Finally the `drop` event is used to determine what action to perform on the element "drop". In this case we transfer the previously stored content to the target div and remove the original selector.

SEE THE **[DEMO HERE](http://www.morellowebdesign.com/samples/dragg/)**
