# Data Deletion Request Handling

## Summary

This specification provides a way for a publisher to communicate to downstream parties about a consumer's request to delete their data. 

In particular, Section 1798.105(c) of the California Consumer Protection Act (CCPA) states that "[a] business that receives a verifiable consumer request from a consumer to delete the consumer's personal information [shall] . . direct any service providers to delete the consumer's personal information from their records." 

In response to this directive in the CCPA, this specification offers the technical means for publishers to communicate deletion requests to their service providers. All service providers covered by IAB Privacy LLC's Limited Service Provider Agreement (LSPA) and any other providers who receive the signal for deletion requests are then enabled to comply and delete the specified consumer data.

While this specification provides the technical means for compliance in cases where CCPA applies, implementations may exist to support deletion requests outside CCPA governance. 


### Relevant Documents

[Limited Service Provider Agreement](https://www.iabprivacy.com/lspa-2019-12.pdf) (12-2-19 version)


## How it Works

Any ad tech company (vendor) supporting the US Privacy framework, exposes a JavaScript resource for each service they offer. The vendor hosts a URL that provides this resource and also serves as a unique identifier for the resource. The URL is made public to a maintained LSPA signatories list and to non-signatories via the vendor's method of choice.

Publishers working with any services provided by these vendors consume the exposed JavaScript and embed it on their properties where consumers can request deletion of their personal data. If data deletion is requested, all vendor javascript on the publisher property is notified. Vendors then respond by deleting the relevant personal data and signaling any affected vendors downstream.


### Multiple Services

For vendors that provide multiple services, a URL is provided for each service. A publisher may use any of those services but not necessarily all of them. When a consumer requests data deletion, only the scripts provided on the page will trigger the delete request back to the vendor. Vendors can then delete the personal data, in accordance with their practices, for each service provided on the publisher property where the request originated.


### Deletion

The technical solution detailed in this specification provides the means to signal consumer requests for data deletion. Companies supporting the US Privacy Framework (i.e., service providers) will respond to the signals by deleting the consumer's relevant personal data to the extent required by CCPA. The process for deletion depends on the company's technology and operational practices in place. _How_ a vendor deletes a consumer's personal data is out of scope for this specification.


### Non-web Environments

If the consumer initiates a data deletion request from a non-web environment, the request can be propagated through the same javascript resource described above by directing the user to a publisher webpage to complete the deletion request. The request can be associated to the device from where it originated using defined parameters.


## Deletion Signaling

Deletion signaling uses two commands: `registerDeletion` and `performDeletion`. The first command, `registerDeletion`, is executed by the vendor script when the publisher loads it on a given page or property. This registers the vendor script to receive the signal sent by the `performDeletion` call. The second command, `performDeletion`, is executed by the publisher if a consumer requests data deletion and signals the vendor that a consumer has requested that their personal data be deleted.  


### Sample Workflow
1. Publisher loads scripts provided by vendors. 
2. The vendors' scripts execute `registerDeletion` at load.
3. When a data deletion request is made by the user on the page, the publisher executes `performDeletion`, which executes all vendors' deletion scripts that have been registered with` registerDeletion.`
4. Vendors perform deletion asynchronously, in accordance with their technology and operational practices. 


### How should publishers load vendor scripts?

Vendors need access to the publisher domain to get a user identifier to associate with a delete request. In order for vendors to do so, the vendor scripts described in this specification must be loaded _directly _on the publisher domain normally used for collecting data and serving ads and not on a separate or generic domain. For safety, the vendor scripts can be loaded in an iframe, provided the following conditions are met:
*   The iframe is hosted on the publisher domain
*   If the iframe sandbox parameter is provided, the following restrictions are lifted:
    *   `allow-scripts`
    *   `allow-storage-access-by-user-activation`


## registerDeletion

This command registers a vendor-specific callback function at the API. When the publisher loads the vendor deletion script, those scripts must execute `registerDeletion`. 

This command is an update to the existing `__uspapi` function with the following syntax: 

```
__usapi("registerDeletion", version, performDeletionFunction)
```

Upon execution, the vendor script is registered to receive the signal sent by the call to `performDeletion`.


## performDeletion

The publisher, or its CMP where applicable, calls this command based on some user delete action to initiate the deletion process. The command communicates to vendors that a specified user has requested that their personal data be deleted by calling the `performDeletionFunction` registered during the call to `registerDeletion`. 

This command is an update to the existing `__uspapi` function with the following syntax: 

```
__usapi("performDeletion", version, null, identifiers)
```

The callback parameter of the `__uspapi` is not used in this case and can remain null. The `identifiers` parameter is only required when handling non-web deletion requests and is further explained in the following section. 


### Identifying Data to Delete in Non-web Environments

When operating in a non-web environment, data deletion requests are handled by sending the user to a web page where they can complete the request to have their data deleted. Vendors need certain information to correctly identify the data to delete:  the platform name, the unique app identifier used in the app store, and the device identifier for that platform / store. 

The `performDeletion` command includes a parameter for identifiers. Using the `identifiers` parameter, publishers can pass multiple items, each with the required fields: `platform`, `app_identifier`, and `user_identifier`. These details should be passed from the app context to the delete webpage and then along with the request from the page. Below are a few examples of that information:

```
identifiers {
  ...
  "platform": "ios-app-store",
  "app_identifier": "01234567891446075923",
  "user_identifier": "AEA12347583AACD-A123667-A418AABC-AB123806-1242AEAACB12AB1234548606"
}
...
{
  "platform": "android-play-store",
  "app_identifier": "com.acmeinc.acmeapp",
  "user_identifier": "aaaacdda123802ae-11fb191c-1247abad-12340794ad123394ac123912"
...
}
```

```
Note: For purposes of this explanation, a "bundle id" is used for (iOS) and a "package" for (Android).
```

### Common Platform / Stores identifiers

These identifiers can be used for the "platform" field where applicable. Otherwise, the platform field can include an arbitrary value.

<table>
  <tr>
   <td>Android Google Play Store
   </td>
   <td>android-play-store
   </td>
  </tr>
  <tr>
   <td>Android Amazon Store
   </td>
   <td>android-amazon-store
   </td>
  </tr>
  <tr>
   <td>iOS App Store
   </td>
   <td>ios-app-store
   </td>
  </tr>
  <tr>
   <td>Samsung App Store
   </td>
   <td>samsung-app-store
   </td>
  </tr>
  <tr>
   <td>Huawei app store
   </td>
   <td>huawei-app-store
   </td>
  </tr>
  <tr>
   <td>Sony apps
   </td>
   <td>sony-app-store
   </td>
  </tr>
  <tr>
   <td>LG smartworld
   </td>
   <td>lg-app-store
   </td>
  </tr>
</table>


## Example Implementation

Publisher site setup:

```
<html>
  <head>
    <script>
      //API provided by the publisher or CMP:
      function uspapi_addFrame()
      {
       if(!window.frames['__uspapiLocator'])
       {
        if(document.body)
        {
         var i = document.createElement('iframe');
         i.style.cssText = 'display:none';
         i.name = '__uspapiLocator';
         document.body.appendChild(i);
        }
        else
        {
         window.setTimeout('uspapi_addFrame()', 10);
        }
       }
      }
      
      function uspapi_stub()
      {
       var b = arguments;
       __uspapi.a = __uspapi.a || [];
       if(!b.length)
       {
        return __uspapi.a;
       }
       else
       {
        __uspapi.a.push([].slice.apply(b));
       }
      }
      
      function uspapi_msghandler(event)
      {
       var msgIsString = typeof event.data === 'string';
       try
       {
        var json = msgIsString ? JSON.parse(event.data) : event.data;
       }
       catch(e)
       {
        var json = null;
       }
       if(typeof (json) === 'object' && json !== null && '__uspapiCall' in json)
       {
        var i = json.__uspapiCall;
        window.__uspapi(i.command, i.version, function (retValue, success) 
        {
         var returnMsg = {
         '__uspapiReturn': {
          'returnValue': retValue,
          'success'    : success,
          'callId'     : i.callId
          }
         };
         event.source.postMessage(msgIsString ? JSON.stringify(returnMsg) : returnMsg, '*');
        }, i.parameter);
       }
      }
      
      uspapi_addFrame();
      if(!('__uspapi' in window) || 
         (typeof (window['__uspapi']) !== 'function' && 
          typeof (window['__uspapi']) !== 'object' && 
          (typeof (window['__uspapi']) === 'undefined' || 
           window['__uspapi'] !== null)))
      {
       window['__uspapi'] = uspapi_stub;
       window['__uspapi'].msgHandler = uspapi_msghandler;
       if(window.addEventListener)
       {
        window.addEventListener('message', uspapi_msghandler, false);
       }
       else
       {
        window.attachEvent('onmessage', uspapi_msghandler);
       }
      }
    </script>
    <!-- include the vendor deletion scripts into the page: -->
    <script src="https://vendorx.com/ccpa-delete-function.js"></script>
  </head>
  <body>
    <button id="ccpa-delete">Delete my personal data</button>
    <script>
      document.getElementById('ccpa-delete').addEventListener('click', function ()
      {
       __uspapi('performDeletion', 1, null);
      }, false);
    </script>
  </body>
</html>
```

Vendor script (at `https://vendorx.com/ccpa-delete-function.js`)

```
// find the __uspapi frame
var f = window;
var cmpFrame;
var cmpCallbacks = {};
while (!cmpFrame) {
  try {
    if (f.frames['__uspapiLocator']) {
      cmpFrame = f;
    }
  } catch (e) {}
  if (f === window.top) {
    break;
  }
  f = f.parent;
}

/* Set up a __uspapi function to do the postMessage and
stash the callback.
This function behaves (from the caller's perspective)
identically to the in-frame __uspapi call */
window.__uspapi = function(cmd, ver, callback, param) {
  if (!cmpFrame) {
    callback({
      msg: '__uspapi not found'
    }, false);
    return;
  }

  var callId = Math.random() + '';
  var msg = {
    __uspapiCall: {
      command: cmd,
      parameter: param,
      version: ver,
      callId: callId
    }
  };
  cmpCallbacks[callId] = callback;
  cmpFrame.postMessage(msg, '*');
};

window.addEventListener('message', function(event) {
  var json = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
  if (json.__uspapiReturn) {
    var i = json.__uspapiReturn;
    cmpCallbacks[i.callId](i.returnValue, i.success);
    delete cmpCallbacks[i.callId];
  }
}, false);


function vendorXDeletion() {
  //... do some deletion work …
  return;
}

__uspapi('registerDeletion', 1, vendorXDeletion);

```
