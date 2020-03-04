![iab tech lab](https://user-images.githubusercontent.com/19175352/38649177-0d37d17c-3daa-11e8-8934-f0fb47919716.png)
# US Privacy String

### **(CCPA Opt-Out Storage Format)**
**Final Version 1 | March 2020**


**Table of Contents**
- [Version History](#version-history)
- [Introduction](#introduction)
  - [License](#license)
  - [Disclaimer](#disclaimer)
  - [About IAB Tech Lab](#about-iab-tech-lab)
  - [About IAB CCPA Compliance Framework](#about-iab-ccpa-compliance-framework)
- [What information is stored in a US Privacy String?](#what-information-is-stored-in-a-us-privacy-string)
- [Who should create a US Privacy String?](#who-should-create-a-us-privacy-string)
- [When should a US Privacy String be created?](#when-should-a-us-privacy-string-be-created)
- [How should a US Privacy String be used?](#how-should-a-us-privacy-string-be-used)
- [US Privacy String Format](#us-privacy-string-format)
  - [Examples](#examples)
- [URL Parameters](#url-parameters)

## Version History:

| Date | Version | Comments |
| :-- | :-- | :-- |
| March 2020 | 1.0 | Clarification on accepted uses of "-". |
| November 2019 | 1.0 | Published final public version. Added support for Limited Service Provider Agreement (LSPA) signal. |
| October 2019 | 1.0 | Draft for public comment. Version 1 ONLY supports CCPA compliance. |

## Introduction

The IAB Tech Lab’s US Privacy String communicates signals regarding consumer privacy and choice under US privacy regulation. Version 1 supports requirements made under the California Consumer Privacy Act (CCPA). 

As the concern for consumer privacy grows, regional governance in the US may increase. The US Privacy String was created to allow for updates as needed.

If US privacy regulations apply, digital property owners (websites, apps, or other media platforms) are expected to provide consumer privacy signals to all parties that intend to exchange data on a given transaction (such as displaying an impression). Parties receiving the signal use the information to determine whether they’re allowed to process the consumer’s personal data.

To facilitate CCPA compliance, version 1 of the US Privacy String signals whether or not the regulation applies in a given transaction, whether “explicit notice” was given, and what choice the consumer made (if any).

The String format enables digital properties to store and maintain a consumer’s privacy preference and transmit that data to relevant parties. Parties receiving the data are expected to act on it in accordance with any relevant governance.

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


## What information is stored in a US Privacy String?

Version 1 of the US Privacy String supports CCPA Compliance, which contains the following information:

1. **Version:** the version number of the US Privacy String provided.
2. **Status of notice given:** whether the digital property provided “explicit notice and opportunity to opt-out of sale of data.”
3. **User preference:** whether the user has opted out of the sale of their personal data.
4. **LSPA coverage:** whether the digital property is operating under a signed Limited Service Provider Agreement (LSPA) with the IAB.

## Who should create a US Privacy string?

Digital property owners are responsible for generating, persisting, and passing the US Privacy string.

## When should a US Privacy string be created?

When a sale of data may occur, for example on an impression opportunity, the string should be created. A string can be created to indicate CCPA applies, or to signal the digital property owner has determined that CCPA does not apply.

## How should a US Privacy String be used?

For each digital transaction (such as displaying an impression) the digital property is expected to send the US Privacy String as a payload with each digital unit of merchandise (typically a single impression) to all parties who use personal data on their properties. Receiving parties use the information to determine whether they are allowed to process the consumer’s personal data in the transaction.


## US Privacy String Format

The US Privacy string consists of the following components.

| String Component | Expected Values | Definition |
|:--|:--|:--|
| Specification Version | <p>**Number**</p><p>(1 char in string)</p> | The version of this string specification used to encode the string |
| Explicit Notice/Opportunity to Opt Out | <p>**ENUM**</p><p>(**N** = No, **Y** = Yes, **-** = Not Applicable)</p> | Has explicit notice been provided as required by 1798.115(d) of the CCPA and the opportunity to opt out of the sale of their data pursuant to 1798.120 and 1798.135 of the CCPA |
| Opt-Out Sale | <p>**ENUM**</p><p>(**N** = No, **Y** = Yes, **-** = Not Applicable. For use ONLY when CCPA does not apply.)</p> | Has user opted-out of the sale of his or her personal information pursuant to 1798.120 and 1798. **If CCPA applies, only Y (yes) or N (no) can be used.** |
| LSPA Covered Transaction | <p>**ENUM**</p><p>(**N** = No, **Y** = Yes, **-** = Not Applicable)</p> | Publisher is a signatory to the IAB Limited Service Provider Agreement(LSPA) and the publisher declares that the transaction is covered as a “Covered Opt Out Transaction” or a “Non Opt Out Transaction” as those terms are defined in the Agreement. |


In situations where the digital property has determined that the consumer does not fall within a US Privacy jurisdiction (such as CCPA), the digital property may signal this with hyphens in the second, third, and fourth character positions in the following manner: “1---”. Otherwise, when signals are present, the consumer falls within a US Privacy jurisdiction. The hyphen character may also be used to signal an unknown state in the second (Explicit Notice) and fourth (LSPA Covered Transaction) character positions. <p> **NOTE:** The third character position (Opt-Out Sale) cannot be unknown (must never include a hyphen) when CCPA applies.</p>

### Examples

The following examples provide a sample US Privacy String that represents the stated conditions. In all but the last example, a digital property has determined to use a US Privacy String and that CCPA applies to the transaction. 

**Example 1 meets the following conditions:**

* Version 1 of the US Privacy string is being used. (1) 
* The digital property has provided explicit user notice. (Y) 
* The user has NOT made a choice to opt out of sale. (N)
* The digital property is not operating under the Limited Service Provider Agreement. (N)

**1YNN**


**Example 2 meets the following conditions:**

* Version 1 of the US Privacy string is being used. (1) 
* The digital property has NOT provided explicit user notice. (N) 
* The user has made a choice to opt out of sale. (Y)
* The digital property is not operating under the Limited Service Provider Agreement. (N)

**1NYN**


**Example 3: Digital property ousources string creation**

In this example the digital property has asked a vendor to create a US Privacy String on their behalf, knowing only whether the user has opted of sale of personal data.

* Version 1 of the US Privacy string is being used. (1) 
* The status of provided explicit user notice is unknown. (-) 
* The user has made a choice to opt out of sale. (Y)
* The status of operating under the Limited Service Provider Agreement is unknown. (-)

**1-Y-**


**Example 4: CCPA does not apply**

In this example, a digital property has determined to use a US Privacy String and that CCPA does
not apply to the transaction.

**1---**


### URL Parameters

A URL-based service that requires US Privacy signals should accept a US Privacy String according to the following conditions and URL parameters:

* The digital property creating the URL should ensure that the `us_privacy` parameter exists only once in the URL.
* The URL-based service accepting the request is capable of interpreting the US Privacy String and propagating it to other services.

| URL Parameter | Possible Values | Default | Description |
|:--|:--|:--|:--|
| us_privacy | string | N/A | URL-encoded US Privacy string format as specified above. |

Optionally, substitution macros can be used with the following naming convention:
**${US_PRIVACY}**
