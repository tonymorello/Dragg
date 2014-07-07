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
