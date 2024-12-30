import {TArticle} from "../types";

const article: TArticle = {
    id: 'layoutBasics',
    title: 'IC Layout Basics',
    description: 'Description of article 1',
    lastUpdate: new Date('2022-01-01'),

    content: `

## IC Layout Basics 

### Table of Contents
1. [CMOS process](#CMOSprocess)
2. [CMOS Inverter cross-section](#inverterCrossSection)
3. [Mask-related effects, distortion of light](#maskEffects)
4. [CMOS transistors. Fingers and Multipliers](#fingersMultipliers)
5. [Capacitors](#capacitors)
6. [Resistors](#Resistors)



<div id="CMOSprocess"></div>

### 1.CMOS process
Fabrication of the CMOS integrated circuit is a multistep process, that takes a lot of efforts to achieve good performance and yield. Manufacturing of the IC is very similar to cooking a very tall and fancy burger - it starts from the $Si-$substrate (bottom bun), adding different layers to create structures (cheese, lettuce, patty) and covering everything with a top metal and protection oxide (top bun). You can see the simplified manufacturing process on the image below.

<br/> <img src="http://localhost:3000/images/layout/cross-section.png" alt="IC Cross-section" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">IC Cross-section</p> 

<br/> <img src="http://localhost:3000/images/layout/manufacturing.png" alt="IC manufacturing steps" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">IC manufacturing steps</p> 

<div id="inverterCrossSection"></div>

### 2. CMOS Inverter cross-section

<br/> <img src="http://localhost:3000/images/layout/inverter-cross-section.svg" alt="CMOS inverter cross-section" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">CMOS inverter cross-section</p> 

<br/> <img src="http://localhost:3000/images/layout/standard-process-substrate.svg" alt="Substrate connection in standard CMOS process" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Substrate connection in standard CMOS process</p> 

<br/> <img src="http://localhost:3000/images/layout/DNWELL-substrate.svg" alt="Substrate connection in Deep NWELL CMOS process" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Substrate connection in Deep NWELL CMOS process</p> 


<div id="maskEffects"></div>

### 3. Mask-related effects, distortion of light

<br/> <img src="http://localhost:3000/images/layout/photolithography.png" alt="Photolithography process" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Photolithography process</p> 


<br/> <img src="http://localhost:3000/images/layout/photolithography-mask.png" alt="Photolithography process" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Photolithography process</p> 

<br/> <img src="http://localhost:3000/images/layout/OPC.png" alt="OPC effect" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">OPC effect</p> 


<div id="fingersMultipliers"></div>

### 4. CMOS transistors. Fingers and Multipliers

<br/> <img src="http://localhost:3000/images/layout/single-finger-parasitics.svg" alt="Fingers vs Multipliers" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Single-finger device parasitics</p> 

<br/> <img src="http://localhost:3000/images/layout/finger-parasitics.svg" alt="Fingers vs Multipliers" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Multi-finger device parasitics</p> 

<div id="capacitors"></div>

### 5. Capacitors

<br/> <img src="http://localhost:3000/images/layout/capacitor-types.png" alt="Capacitor types" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Capacitor types</p> 

<br/> <img src="http://localhost:3000/images/layout/MIM-cap.png" alt="MIM capacitor" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">MIM capacitor</p> 

<br/> <img src="http://localhost:3000/images/layout/MOM-cap.png" alt="MOM capacitor" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">MOM capacitor</p> 

<br/> <img src="http://localhost:3000/images/layout/capacitor-matching-1.png" alt="Capacitor matching 1" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Capacitor matching</p> 

<br/> <img src="http://localhost:3000/images/layout/capacitor-matching-2.png" alt="Capacitor matching 2" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Capacitor matching</p> 

<br/> <img src="http://localhost:3000/images/layout/capacitor-matching-3.png" alt="Capacitor matching 3" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Capacitor matching</p> 

<br/> <img src="http://localhost:3000/images/layout/capacitor-shielding.png" alt="Capacitor shielding" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Capacitor shielding</p> 


<div id="resistors"></div>

### 6. Resistors
  
<br/> <img src="http://localhost:3000/images/layout/resistor-types-1.svg" alt="Resistor types" style="display: block; margin-inline: auto; width: min(80%, 60rem)" /> 
<p style="display: block; text-align: center">Resistor types</p> 

<br/> <img src="http://localhost:3000/images/layout/resistor-types-2.svg" alt="Resistor types" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Resistor types</p> 

<br/> <img src="http://localhost:3000/images/layout/resistor-area.png" alt="Resistor area" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Resistor area</p> 

`
};

export default article;