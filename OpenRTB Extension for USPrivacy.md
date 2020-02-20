![iab tech lab](https://user-images.githubusercontent.com/19175352/38649177-0d37d17c-3daa-11e8-8934-f0fb47919716.png)
# OpenRTB Extension for U.S. Privacy
### **(For CCPA Compliance)**
**Final Version 1 | November 20, 2019**



*Table of Contents**
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
| February 2020 | 1.0 | Added final bracket in example |
| November 18, 2019 | 1.0 | Published final public version. |
| October 2019 | 1.0 | Draft for public comment. Version 1 ONLY supports CCPA compliance. |


## Introduction

For support of the IAB CCPA Compliance Framework, this document specifies how to pass information pertaining to CCPA within OpenRTB. This document outlines a mechanism to support communication of U.S. Privacy signals within the scope of CCPA compliance. This document is the work product of the IAB Tech Lab’s CCPA/U.S. Privacy Technical Working Group, and reviewed by members of IAB Tech Lab’s OpenRTB Working Group. Policy requirements were developed by a legal affairs group at IAB in the US.

Participants in Real Time Bidding need to know when personal data in the bid request is subject to U.S. Privacy rule. Digital Properties and intermediaries need a way to pass on U.S. Privacy signals through the current RTB ecosystem.

This document proposes that bid requests shall optionally include U.S. Privacy transparency and choice signals representing the relationship and status between a consumer and the Digital Property.

As an extension object, this extension could be used with version 2.X or 3.0 of the IAB Tech Lab’s OpenRTB protocol.


### License

U.S. Privacy String and API technical specifications governed by the IAB Tech Lab is licensed
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

The IAB CCPA Compliance Framework comprises of policy and technical work to support CCPA compliance. This document is the work product of the ​IAB Tech Lab’s CCPA/U.S. Privacy Technical Working Group. Policy requirements were developed by a legal affairs group at IAB in the US. The technical specifications documents refer to the guidance within IAB CCPA Compliance Framework Policies.

More information about the Framework is available at [iab.com/guidelines/ccpa-framework](https://iab.com/guidelines/ccpa-framework)


## Extension Object: us_privacy attribute

Publish an OpenRTB Advisory defining a new attribute “us_privacy” within the BidRequest object, through which the Digital Property, or its ad technology vendor, may define the regulatory context governing personal data contained within the bid request and any subsequent related transactions. For OpenRTB v2.2+, the “us_privacy” attribute should be added into the “ext” object within the “Regs” object. For OpenRTB v2.0-2.1, the “us_privacy” attribute can be added into the “ext” object within the “User” object.


| Field | Scope | Type | Default | Description |
| :-- | :-- | :-- |:-- |:-- |
| us_privacy | **optional** | string | - | Must follow the [U.S. Privacy string format](https://github.com/wittjill/USPrivacy/blob/master/US%20Privacy%20String.md). |
   


### Examples:

A Digital Property has determined that U.S. Privacy applies to the transaction. The Digital Property is using version 1 of the U.S. Privacy string specification. The Digital Property has provided explicit user notice. The user has not made a choice to opt out of sale.

```
{
"Regs": {
"ext": {
"us_privacy": "1YNN"
}
}
}
```

A Digital Property has determined that U.S. Privacy applies to the transaction. The Digital Property is using version 1 of the U.S. Privacy string specification. The Digital Property has not provided explicit user notice. The user has made a choice to opt out of sale.

```
{
"Regs": {
"ext": {
"us_privacy": "1NYN"
}
}
}
```

A Digital Property has determined that U.S. Privacy does not apply to the transaction and is signaling this using version 1 of the U.S. Privacy string specification.

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
This extension does not cover use cases where a service requires U.S. Privacy signals but cannot access the OpenRTB bid request. Details for URL-based services that require U.S. Privacy signals can be found in the [U.S. Privacy string](https://github.com/wittjill/USPrivacy/blob/master/US%20Privacy%20String.md) specification.
