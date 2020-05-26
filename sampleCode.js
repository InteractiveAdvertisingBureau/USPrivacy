((win) => {

  /**
   * The details of this function will be proprietary to each Vendor.
   */
  const deletePersonalData = () => {

    // ... do some proprietary deletion work …

  };

  const command = 'registerDeletion';
  const version = 1;

  /**
   * If this script is executing at the top level then the
   * usp api can be called directly instead of using a
   * postMessage call.
   */
  if (win === win.top) {

    /**
     * note: you may want some error handling here in case,
     * for whatever reason, the __usapi doesn't exist.
     */
    win.__uspapi(command, version, deletePersonalData);

  } else {

    /**
     * Because this script is operating in an iframe,
     * postMessage will need to be used to register the
     * deletePersonalData function.
     */

    let uspapiFrame;
    let frame = win;

    /**
     * Starting with the current Window, search up each
     * parent frame until the frame with the name
     * '__uspapiLocator' is found or there are no more
     * parent frames.
     */
    while (frame) {

      try {

        // this throws an error if it's undefined
        if (frame.frames['__uspapiLocator']) {

          // found
          uspapiFrame = frame;
          break;

        }

      } catch (ignore) {}

      if (frame === win.top) {

        // there are no more parents
        break;

      }

      // go up
      frame = frame.parent;

    }

    if (uspapiFrame) {

      /**
       * The frame containing the __uspapi api has been
       * discovered, but because of this script is
       * executing within and iframe, it can not access
       * the method directly and so it needs to use the
       * postMessage method defined in the USP API spec.
       *
       * First a listener needs to be set up to listen
       * for the callback, then the postMessage call
       * will need to be executed on the frame that
       * contains the __uspapi function.
       */
      win.addEventListener('message', () => {

        let json = {};

        try {

          /**
           * Because this is somewhat of an "open
           * channel" all messages will be received
           * not all will be JSON and so this part is
           * wrapped in a try/catch and will ignore
           * any errors in parsing
           */
          json = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        } catch (ignore) {}

        if (json.__tcfapiReturn) {

          // should be executed at window scope
          deletePersonalData();

        } // else this is some message we don't recognize

      }, false);

      uspapiFrame.postMessage({
        __uspapiCall: {
          command: command,
          version: version,
          callId: 1,
        },
      }, '*');

    } else {

      // Error, no way to call the uspapi from this iframe...

    }

  }

})(window);
