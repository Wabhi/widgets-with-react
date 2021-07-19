/**
 * Handle cross browser event handling
 * */
 const eventUtil = {
    // Add an Event
    addEvent: function (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        // IE Event Handler
        element.attachEvent('on' + type, handler);
      } else {
        // DOM0 level
        element['on' + type] = handler;
      }
    },
    // Remove an Event
    removeEvent: function (element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler);
      } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler);
      } else {
        element['on' + type] = null;
      }
    },
  };
  export default eventUtil;