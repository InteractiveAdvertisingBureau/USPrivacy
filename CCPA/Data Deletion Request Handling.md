# Data Deletion Request Handling

## Summary

This specification defines the Data Deletion Request (DDR), which is the mechanism by which the IAB CCPA Compliance Framework complies with Section 1798.105(c) of the California Consumer Protection Act (CCPA) which states _"[a] business that receives a verifiable consumer request from a consumer to delete the consumer's personal information [shall] . . direct any service providers to delete the consumer's personal information from their records."_  The DDR is a technical contract between a Publisher and Vendors in order to enable a consumer on a Publisher's digital property to direct Vendors to delete the consumer's personal information from their records.  As stated, the DDR exists primarily to comply with CCPA but may be used for deletion requests outside the domain of CCPA governance.

The technical solution detailed in this specification provides the means to signal consumer requests for data deletion. Companies supporting the US Privacy Framework (i.e., service providers) will respond to the signals by deleting the consumer's relevant personal data to the extent required by CCPA. The process for deletion depends on the company's technology and operational practices in place. _How_ a Vendor deletes a consumer's personal data is out of scope for this specification.


### Relevant Documents

[Limited Service Provider Agreement](https://www.iabprivacy.com/lspa-2019-12.pdf) (12-2-19 version)
[First Amended Limited Service Provider Agreement](https://www.iabprivacy.com/firstamendedlspa.pdf) (06-7-21 version)


## How it Works

Every Vendor that provides a service for a Publisher must host a JavaScript file for that Publisher.  The Publisher must include the Vendor-provided JavaScript file as a `script` html element with a `src` attribute equal to the Vendor's specified hosting URL on every page that the Publisher intends to invoke the Data Deletion Request (eg. `<script src="https://www.vendor-123.com/privacy/ddr.js"></script>`). The Vendor-hosted JavaScript registers a Vendor-proprietary callback function with the [USP API](./USP%20API.md) to be invoked if a deletion request occurs.

## USP API Commands

A Data Deletion Request is accomplished by the [`registerDeletion`](#registerdeletion) and [`performDeletion`](#performdeletion) Commands invoked on the [USP API](./USP%20API.md).

 * [`registerDeletion`](#registerdeletion) is executed by the [Vendor-hosted script](#how-it-works) upon load (immediately), which registers the Vendor-proprietary callback to be invoked when the [`performDeletion`](#performdeletion) is invoked.
 * [`performDeletion`](#performdeletion) is staged to execute by a Publisher upon a consumer taking action to request personal data be deleted.  The [USP API](./USP%20API.md) will call all Vendor callbacks registered with the [`registerDeletion`](#registerdeletion) Command.

### `registerDeletion`

This Command registers a Vendor-specific callback function with the [USP API](./USP%20API.md). The callback will only be called when the [`performDeletion`](#performdeletion) Command is invoked.

| Argument Name | Type | Value |
| :-- | :-- | :-- |
| command | string | `'registerDeletion'` |
| version | number | US Privacy spec version |
| callback | function | `function()` |

*Example*

```JavaScript

__uspapi("registerDeletion", version, (identifiers) => {

  // do proprietary delete stuff

})

```

### `performDeletion`

The Publisher, or its CMP where applicable, invokes this Command when a consumer action to initiate the deletion process occurs. The Command invokes all callbacks registered via the [`registerDeletion`](#registerdeletion) Command in no specified order.

| Argument Name | Type | Optional | Value |
| :-- | :-- | :-- | :-- |
| command | string |  | `'registerDeletion'` |
| version | number |  | US Privacy spec version |
| callback | null |  | no callback |
| param | [`Identifiers`](#identifiers) | X | Optional [`Identifiers`](#identifiers) object for [In-App](#in-app) |

*Example*

```JavaScript

__uspapi("performDeletion", version, null, {
  "platform": "ios",
  "app_identifier": "01234567891446075923",
  "user_identifier": "AEA12347583AACD-A123667-A418AABC-AB123806-1242AEAACB12AB1234548606"
})

```

The callback parameter of the `__uspapi` is not used in this case and shall be passed as null. The `Identifiers` argument is only required when handling [in-app](#in-app) deletion requests.

#### In-App

When operating in an in-app environment that leverages WebViews (Mobile, CTV, etc), cookies do not persist beyond a session. Without persistant cookies, Vendors will need more information to correctly identify the consumer and the assosciated data to delete.  When WebView limitations exist, A Publisher shall invoke the [`performDeletion`](#performdeletion) with an [`Identifiers`](#identifiers) object as an argument for the Param.  This [`Identifiers`](#identifiers) object will contain the platform name, the unique app identifier used in the app store, and the device identifier for that platform / store. A Publisher shall open a WebView with a web page where a consumer can complete the request to have their data deleted.

##### `Identifiers`

The [`performDeletion`](#performdeletion) Command may be invoked with an optional `Identifiers` arguments as the Param. A hosting app passes app-specific identifier information to the WebView that invokes the [`performDeletion`](#performdeletion) Command so that it may construct an `Identifiers` object to apply as an agrument.


```JavaScript
/**
 * "platform": string // see table
 * "app_id": string // platform specific app identifier
 * "user_id": string // IDFA on apple, or AAID on android platforms
 */
{
  "platform": "ios",
  "app_identifier": "01234567891446075923",
  "user_identifier": "AEA12347583AACD-A123667-A418AABC-AB123806-1242AEAACB12AB1234548606"
}
```

##### Platforms

The following is the list of platform identifiers.

| Platform Name | Store | Identifier |
| :-- | :-- | :-- |
| Android | Google Play Store | `"google"` |
| Android | Amazon Store | `"amazon"` |
| iOS | App Store | `"ios"` |
| Samsung | App Store | `"samsung"` |
| Huawei | App Store | `"huawei"` |
| Sony | App Store | `"sony"` |
| LG | App Store | `"lg"` |

## Examples

### Example Publisher Script

In this example, the Publisher has an Array of strings.  Each of those strings contains a URL to a Vendor delete script src.  This Publisher also has a CCPA delete button with the class name `ccpa-delete` on their page.  First the script will append all of the Vendor scripts to the body of the document and then stage a listener to listen for a user clicking the ccpa-delete button.  When the user clicks that button, the handler function will call the `'performDeletion'` Command on the `__uspapi` function.

```JavaScript

// Add all Vendor scripts; this is just an array of string sources
vendorDeleteScriptSources.forEach((vendorDeleteScriptSource) => {

  const scriptElement = document.createElement("script");
  scriptElement.src = vendorDeleteScriptSource;

  document.body.appendChild(scriptElement);

});

function onCCPADelete() {

   __uspapi('performDeletion', 1);

}

const ccpaDeleteButton = document.getElementsByClassName('ccpa-delete')[0];

ccpaDeleteButton.addEventListener('click', onCCPADelete);

```

### Example Vendor Script

Below is an example script demonstrating how a vendor script can properly handle receiving the data deletion directive request from the consumer.

```JavaScript

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

```
