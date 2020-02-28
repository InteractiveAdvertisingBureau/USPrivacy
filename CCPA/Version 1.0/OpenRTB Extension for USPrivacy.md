![iab tech lab](https://user-images.githubusercontent.com/19175352/38649177-0d37d17c-3daa-11e8-8934-f0fb47919716.png)
# OpenRTB Extension for US Privacy
### **(For CCPA Compliance)**
**Final Version 1 | March 2020**



**Table of Contents**
- [Version History](#version-history)
- [Introduction](#introduction)
  - [License](#license)
  - [Disclaimer](#disclaimer)
  - [About IAB Tech Lab](#about-iab-tech-lab)
  - [About IAB CCPA Compliance Framework](#about-iab-ccpa-compliance-framework)
- [Extension Object: us_privacy attribute](#extension-object)
  - [Examples](#examples)
  - [Notes](#notes)
  

## Version History:

| Date | Version | Comments |
| :-- | :-- | :-- |
| March 2020 | 1.0 | Added final bracket in example and final wording edits |
| November 18, 2019 | 1.0 | Published final public version. |
| October 2019 | 1.0 | Draft for public comment. Version 1 ONLY supports CCPA compliance. |


## Introduction

This document specifies how to pass the IAB US Privacy String using OpenRTB, compatible with OpenRTB versions 2.X and 3.0.

When using OpenRTB, bidders need to know whether personal data in a bid request is subject to the California Consumer Privacy Act (CCPA) so they can respond accordingly.  IAB Tech Lab developed the US Privacy String to store privacy and choice signals in compliance with CCPA. This document outlines how to communicate those signals using OpenRTB.

The solution involves adding an attribute to a nested extension object in OpenRTB. To successfully communicate signals in the US Privacy String, the new attribute must be implemented correctly and bidders must know how to find, read, and respond within the guidelines of the US Privacy String and any applicable governance. 

The OpenRTB Extension for US Privacy was developed by IAB Tech Lab’s CCPA/US Privacy Technical working group and reviewed by IAB Tech Lab’s OpenRTB Working Group. 

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
THE MINIMUM PERMITTED UNDER SUCH LAW. THE PRODUCTS AND SERVICES DO NOT CONSTITUTE BUSINESS OR LEGAL ADVICE. TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU
AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS,
REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.

### About IAB Tech Lab

About IAB Technology Laboratory
The IAB Technology Laboratory (Tech Lab) is a non-profit consortium that engages a member
community globally to develop foundational technology and standards that enable growth and
trust in the digital media ecosystem. Comprised of digital publishers, ad technology firms,
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


## Extension Object: us_privacy attribute

The signals in a US Privacy string can be communicated in OpenRTB bid requests using “ext” objects.  In versions 2.2 and newer, use the “ext” object nested within the “Regs” object. In versions 2.0-2.1, use the “ext” object nested within the “User” object. 


| Field | Scope | Type | Default | Description |
| :-- | :-- | :-- |:-- |:-- |
| us_privacy | **optional** | string | - | Must follow the [US Privacy string format](https://github.com/wittjill/USPrivacy/blob/master/CCPA/Version%201.0/US%20Privacy%20String.md). |
   


### Examples:
The following examples provide sample code with a US Privacy String that meets the conditions described in each case.

A digital property has determined that US Privacy applies to the transaction and:
* The digital property is using version 1 of the US Privacy string specification. (1)
* The digital property has provided explicit user notice. (Y)
* The user has not made a choice to opt out of sale. (N)
* The transaction is not intended to operate within the IAB Limited Service Agreement. (N)

```
{
"Regs": {
"ext": {
"us_privacy": "1YNN"
}
}
}
```

A digital property has determined that US Privacy applies to the transaction and: 
* The digital property is using version 1 of the US Privacy string specification. (1)
* The digital property has not provided explicit user notice. (N)
* The user has made a choice to opt out of sale. (Y)
* The transaction is not intended to operate within the IAB Limited Service Agreement. (N)

```
{
"Regs": {
"ext": {
"us_privacy": "1NYN"
}
}
}
```

A digital property has determined that US Privacy does not apply to the transaction and is signaling this using version 1 of the US Privacy string specification. (1---)

```
{
"Regs": {
"ext": {
"us_privacy": "1---"
}
}
}
```

### Notes

**URL Parameters**

This extension does not cover use cases where a service requires US Privacy signals but cannot access the OpenRTB bid request. Details for URL-based services that require US Privacy signals can be found in the [US Privacy string](https://github.com/wittjill/USPrivacy/blob/master/CCPA/Version%201.0/US%20Privacy%20String.md) specification.
