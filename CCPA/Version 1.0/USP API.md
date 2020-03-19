![iab tech lab](https://user-images.githubusercontent.com/19175352/38649177-0d37d17c-3daa-11e8-8934-f0fb47919716.png)
# US Privacy User Signal Mechanism “USP API”

### **(CCPA Compliance Mechanism)**
**Final Version 1 | March 2020**


**Table of Contents**
- [Version History](#version-history)
- [Introduction](#introduction)
  - [License](#license)
  - [Disclaimer](#disclaimer)
  - [About IAB Tech Lab](#about-iab-tech-lab)
  - [About IAB CCPA Compliance Framework](#about-iab-ccpa-compliance-framework)
- [Requirements for US Privacy User Signal API](#requirements-for-us-privacy-user-signal-api)
- [What are you required to support?](#what-are-you-required-to-support)
- [What baseline functionality is required?](#what-baseline-functionality-is-required)
- [Where should the string be stored?](#where-should-the-string-be-stored)
- [How is the API exposed?](#how-is-the-api-exposed)
- [getUSPData](#getuspdata)
- [In-app support](#in-app-support)
- [How can vendors that use iframes call the API from an iframe?](#how-can-vendors-that-use-iframes-call-the-api-from-an-iframe)
  - [Via SafeFrames](#via-safeframes)
  - [Without SafeFrames, using postMessage](#without-safeframes-using-postmessage)


## Version History:

| Date | Version | Comments |
| :-- | :-- | :-- |
| March 2020 | 1.0 | Fixed error in uspData Object example and description |
| November 20, 2019 | 1.0 | Fixed error referencing in-app key. Correct key is “IABUSPrivacy_String” |
| November 18, 2019 | 1.0 | Published final public version. Added SafeFrame, iFrame support. |
| October 2019 | 1.0 | Draft for public comment. Version 1 ONLY supports CCPA compliance. |


## Introduction

The US Privacy API (USP API) is a lightweight API used to communicate signals represented in the US Privacy String, documented separately. 

Initially prompted by regulation in the California Consumer Privacy Act (CCPA), the US Privacy String and this API were created to support compliance with the CCPA. As concern for consumer privacy grows, additional governance in the US may increase. The US Privacy String was designed for adding support for any future governance as needed. 

The USP API is designed to help digital properties (web, in-app, or other media platforms) collect consumer privacy signals and communicate those signals created and stored in the US Privacy String. Parties that work with the digital property can then access these signals and react according to any applicable governance.


### License

US Privacy String and API technical specifications governed by the IAB Tech Lab is licensed
under a Creative Commons Attribution 3.0 License. To view a copy of this license, visit
[creativecommons.org/licenses/by/3.0/](https://creativecommons.org/licenses/by/3.0/) or write to Creative Commons, 171 Second Street, Suite 300, San Francisco, CA 94105, USA.

### Disclaimer

THE STANDARDS, THE SPECIFICATIONS, THE MEASUREMENT GUIDELINES, AND ANY OTHER
MATERIALS OR SERVICES PROVIDED TO OR USED BY YOU HEREUNDER (THE “PRODUCTS AND
SERVICES”) ARE PROVIDED “AS IS” AND “AS AVAILABLE,” AND IAB TECHNOLOGY LABORATORY,
INC. (“TECH LAB”) MAKES NO WARRANTY WITH RESPECT TO THE SAME AND HEREBY
DISCLAIMS ANY AND ALL EXPRESS, IMPLIED, OR STATUTORY WARRANTIES, INCLUDING,
WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE, AVAILABILITY, ERROR-FREE OR UNINTERRUPTED OPERATION, AND ANY
WARRANTIES ARISING FROM A COURSE OF DEALING, COURSE OF PERFORMANCE, OR USAGE
OF TRADE. TO THE EXTENT THAT TECH LAB MAY NOT AS A MATTER OF APPLICABLE LAW
DISCLAIM ANY IMPLIED WARRANTY, THE SCOPE AND DURATION OF SUCH WARRANTY WILL BE
THE MINIMUM PERMITTED UNDER SUCH LAW. THE PRODUCTS AND SERVICES DO NOT
CONSTITUTE BUSINESS OR LEGAL ADVICE. TECH LAB DOES NOT WARRANT THAT THE
PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU
AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS,
REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE
FOR COMPLIANCE WITH THE SAME.

### About IAB Tech Lab

The IAB Technology Laboratory (Tech Lab) is a non-profit consortium that engages a member
community globally to develop foundational technology and standards that enable growth and
trust in the digital media ecosystem.. Comprised of digital publishers, ad technology firms,
agencies, marketers, and other member companies, IAB Tech Lab focuses on improving the
digital advertising supply chain, measurement, and consumer experiences, while promoting
responsible use of data. Its work includes the OpenRTB real-time bidding protocol, ads.txt
anti-fraud specification, Open Measurement SDK for viewability and verification, VAST video
specification, and DigiTrust identity service. Board members include ExtremeReach, Facebook,
Google, GroupM, Hearst Digital Media, Index Exchange, Integral Ad Science, LinkedIn,
LiveRamp, MediaMath, Microsoft, Oracle Data Cloud, Pandora, PubMatic, Quantcast, Rakuten
Marketing, Telaria, The Trade Desk, Verizon Media Group, Xandr, and Yahoo! Japan.

Established in 2014, the IAB Tech Lab is headquartered in New York City with staff in San
Francisco, Seattle, and London. Learn more at https://www.iabtechlab.com.


### About IAB CCPA Compliance Framework

The IAB CCPA Compliance Framework comprises of policy and technical work to support CCPA compliance. This document is the work product of the IAB Tech Lab’s CCPA/US Privacy Technical Working Group. Policy requirements were developed by a legal affairs group at IAB in the US. The technical specifications documents refer to the guidance within IAB CCPA Compliance Framework Policies.

More information about the Framework is available at [iab.com/guidelines/ccpa-framework](https://iab.com/guidelines/ccpa-framework)


## Requirements for US Privacy User Signal API

The US Privacy Signal component follows design patterns found in similar privacy compliance frameworks. The design pattern includes how the component is loaded into web pages or native apps and how vendors interact with the USP API. The USP component shall be loaded onto a digital property’s site or app.

## What are you required to support?

To support sending and receiving of the US Privacy String within the US API, the following functionalities are required:
* Desktop JavaScript API support
* Mobile local storage support, and an API (optionally Swift or Java, etc.)
* Macro support (see US Privacy String specification for details)

## What baseline functionality is required?

As a baseline, digital properties must create a US Privacy String and make it available to vendors using this API. The created String communicates signals as compliant with the regulation that applies. 

For example, in the case of CCPA, the String communicates wether CCPA applies in the given transaction, whether explicit notice was given to the consumer, the consumer's choice on opt-out of sale of data, and whether the transaction is operating under the IAB Limited Service Provider Agreement (LSPA).

## Where should the string be stored?

The digital property operating the USP API is responsible for storing the US Privacy String. The recommendation is to store the String in a first-party cookie named "usprivacy" where the API library can read it and write to it. In case storing on a 1st party cookie is not possible or practical (such as on mobile native or if cookies are disabled), a different storage method should be adopted. The API provides individual methods to modify the value of each different section of the string.

## How is the API exposed?

The API is exposed using the following API function:

**`__uspapi(Command, Version, Callback)`**

`__uspapi()` **must always be a function** at all times, even at initialization, because the API must be able to handle calls at all times.

The implementation must also provide a proxy for `postMessage` events targeted to the `__uspapi` interface sent from within nested iframes. See guidance in this specification [below](#how-can-vendors-that-use-iframes-call-the-API-from-an-iframe).

At a minimum, the implementation must support the following API command:
`'getUSPData'`.

## getUSPData

| Argument Name | Type | Optional | Value |
| :-- | :-- | :-- | :-- |
| command | string |  | `'getUSPData'` |
| version | number |  | US Privacy spec version |
| callback | function |  | `function(uspData: uspdata, success: boolean)` |



Example:
```javascript
__uspapi('getUSPData', 1 , (uspData, success) => {
if(success) {
// do something with uspData
} else {
// do something else
}
});
```

If US Privacy does not apply to this user in this context then the string in uspData object will contain “1---”.

The callback shall be called immediately and without any asynchronous logic with whatever information is available in the current state of the library.

A value of `false` will be passed as the value to the `success` argument to the callback when no uspData
object could be returned.

The `callback` shall be invoked only once per api call with this command.

uspData Object
```javascript
{
"version": 1, /* number indicating the US Privacy spec
version */
"uspString": "1YNN" /* string; not applicable: “1---” */
}
```

## In-app support

The encoded string and any related information must be stored on [NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults#1664798?language=objc) (iOS) or
[SharedPreferences](https://developer.android.com/training/data-storage/shared-preferences.html) (Android). This allows:
- Vendors to easily access the string information when they need to;
- The string and any related information to be persisted across app sessions;
- Pre-parsing of the string to enable all typical use-cases, with flexibility to act according to the user’s choices.


Here is the list of the key value pairs provided:
| Key/Field | Scope | Values | Description |
| :-- | :-- | :-- | :-- |
| IABUSPrivacy_String | optional | <p>String</p><p>E.g. "1YNN"</p> | <p>Aligns with IAB OpenRTB CCPA Advisory.</p><p>The String encodes all choices and information.</p> |


## How can vendors that use iframes call the API from an iframe?

There are two ways to request the US Privacy String from a parent or ancestor’s frame: Via SafeFrames and without SafeFrames, using postMessage.

### Via SafeFrames

When SafeFrames are used to proxy API requests no changes are required for the USP API or the vendor. SafeFrame implementations should either allow post messages or implement a proxy `__uspapi()` interface for a caller script within a sandbox that would otherwise be blocked. This proxy interface internally uses the SafeFrame messaging protocol to interface with the full implementation of the API on the publisher's top frame and proxies responses back to the sandboxed caller. If allowing postMessage, vendors will not be required to accommodate any special protocols; they will simply use the postMessage method without SafeFrame. 

If not allowing or blocking postMessage and therefore implementing the proxy method, vendors will see a local- to- the- sandboxed- iframe- scope `__uspapi()` proxy method that must behave the same as the asynchronous `__uspapi()` full implementation method on the main publisher’s top frame.

### Without SafeFrames, using postMessage

The [pwindow.postMessage()](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) method may be used from a child iframe to make requests send calls to from a parent's (or any ancestor's) frame's API. To locate an ancestor frame capable of responding to postMessage() API calls search for an ancestor frame that has a child frame named `'__uspapiLocator'`.

**Sent Message**
The sent message should follow the form outlined below. The _command,parameter_ and _version_ object properties correspond to their namesake parameters defined as method argument parameters for the `__uspapi()` method. The “sent message” also requires a unique _callId_ property to help match the request with a response.

```javascript
{
 __uspapiCall:
 {
 command: " command ",
 parameter:  parameter,
 version : version,
 callId: uniqueId
 }
}
```

The returned message shall follow the form outlined below. The _returnValue_ object property shall be the corresponding US Privacy String object for the _command_ used upon sending the “sent message”. The success object property shall reflect 
the `__uspapi()` success callback argument and the _callId_ will correspond to the “sent message” unique id passed in the _callId_ property.

```javascript
{
 __uspapiReturn:
 {
 returnValue: returnValue,
 success: boolean,
 callId: uniqueId
 }
}
```
