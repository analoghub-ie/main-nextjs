import {TArticle} from "../types";

const article: TArticle = {
    id: 'commonDRC',
    title: 'Common DRC errors and fixes',
    description: 'This article describes common DRC errors and fixes',
    lastUpdate: new Date('2025-01-04'),
    hideInProd: true,
    content: `

## Common DRC errors and fixes

### Table of Contents
1. [NWell Spacing errors (NW.S.1, NW.S.2)](#nwellSpacingDRC)
2. [PP/NP Spacing errors (PP.S.1, PP.S.2)](#ppSpacingDRC)

<div id="nwellSpacingDRC"></div>

### 1. NWell Spacing errors (NW.S.1, NW.S.2)

In this example we are getting NW spacing error due to 2 reasons:

- NW of the devices don’t have connection to guard ring;
- All NW are considered to have different potentials.


<br/> <img src="http://localhost:3000/images/layout/nwSpacingDRC-1.png" alt="NWell spacing DRC error" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">NWell spacing DRC error</p>
 
Spacing DRC can be fixed by combining NW of the guard ring and device:

<br/> <img src="http://localhost:3000/images/layout/nwSpacingDRC-2.png" alt="NWell spacing DRC error [Solution]" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">NWell spacing DRC error [Solution]</p> 

 > **Note:** 
 > - Guard ring NWELL should be connected to the NWELL of the device(s) to ensure body connection of the device.

<br/> <img src="http://localhost:3000/images/layout/nwSpacingDRC-3.png" alt="NWell spacing DRC error [Solution]" style="display: block; margin-inline: auto; width: min(80%, 60rem)" /> 
<p style="display: block; text-align: center">NWell spacing DRC error [Solution]</p> 

<div id="ppSpacingDRC"></div>

### 2. PP/NP Spacing errors (PP.S.1, PP.S.2)

Spacing DRC for PP/NP usually happens because of insufficient spacing between devices.

<br/> <img src="http://localhost:3000/images/layout/ppSpacingDRC-1.png" alt="PP/NP spacing DRC error" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">PP/NP spacing DRC error</p>

> **Solution:**
> - Increase the spacing between devices;
> - Combine PP/NP layers for devices.

<br/> <img src="http://localhost:3000/images/layout/ppSpacingDRC-2.png" alt="PP/NP spacing DRC error [Solution]" style="display: block; margin-inline: auto; width: min(80%, 60rem)" /> 
<p style="display: block; text-align: center">PP/NP spacing DRC error [Solution]</p>


`
};

export default article;