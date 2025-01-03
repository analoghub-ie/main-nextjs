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
6. [Resistors](#resistors)



<div id="CMOSprocess"></div>

### 1.CMOS process
Fabrication of the CMOS integrated circuit is a multistep process, that takes a lot of efforts to achieve good performance and yield. Manufacturing of the IC is very similar to cooking a very tall and fancy burger - it starts from the $Si-$substrate (bottom bun), adding different layers to create structures (cheese, lettuce, patty) and covering everything with a top metal and protection oxide (top bun). You can see the simplified manufacturing process on the image below.

<br/> <img src="http://localhost:3000/images/layout/cross-section.png" alt="IC Cross-section" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">IC Cross-section</p> 

<br/> <img src="http://localhost:3000/images/layout/manufacturing.png" alt="IC manufacturing steps" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">IC manufacturing steps</p> 

<div id="inverterCrossSection"></div>

### 2. CMOS Inverter cross-section

Let's have a look on a very basic circuit - CMOS inverter in layout. CMOS inverter contains just 2 devices - PMOS and NMOS transistors.
Both devices are manufactured in the substrate of a p-type. In a standard CMOS process, PMOS device is manufactured in NWELL (n-type pocket)
and NMOS is manufactured in p-substrate (or PWELL). P-substrate is connected to ground and NWELL is connected to the supply voltage (VDD).
This measure is used to ensure correct device performance and prevent [latch-up](/category/Layout/article/layLayoutDependentEffects).

<br/> <img src="http://localhost:3000/images/layout/inverter-cross-section.svg" alt="CMOS inverter cross-section" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">CMOS inverter cross-section</p>
 
Because PMOS device is formed in its own well, the body of the PMOS (NWELL) can be connected to any potential, required by design, not neccessarily to VDD.
On the other hand, the body of the NMOS device has to be connected to the ground **only**, because it is formed in a substrate, which should always
be connected to the ground.

> Standard process:
> - PMOS body can be connected to any potential;
> - NMOS body can be connected only to ground (shorted to the substrate);


<br/> <img src="http://localhost:3000/images/layout/standard-process-substrate.svg" alt="Substrate connection in standard CMOS process" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Substrate connection in standard CMOS process</p> 

In a **Deep-NWELL (or triple-well) process**, the PWELL of the NMOS device is separated from the p-substrate by the Deep NWELL, which allows
 designers to connect the body of the NMOS device to any potential, like in PMOS. This allows better design flexibility, but at the cost of the area, 
 occupied by extra wells. Moreover, Deep-NWELL is very effective in insulating sensitive devices from the substrate noise. 
 
 
 <br/> <img src="http://localhost:3000/images/layout/DNWELL-substrate.svg" alt="Substrate connection in Deep NWELL CMOS process" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Substrate connection in Deep NWELL CMOS process</p> 

From the layout designer prospective, these 3 wells (p-sub, NWELL, PWELL) are connected to the following potentials:

- P-sub is connected to ground;
- NWELL is connected to the supply potential (VDD);
- Internal PWELL is connected to any potential required by design. 
 
> Deep NWELL process:
> - PMOS body can be connected to any potential;
> - NMOS body can be connected to any potential;
> - Can be used to insulate sensitive devices from the substrate noise;
> - Requires more layout area;
> - More expensive to manufacture (requires extra mask).




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

In the analog design, we often use large-sized transistors, that help us achieve desired gain or current. Usually,
such transistors have a large $W/L$ ratio which makes them more sensitive to the manufacturing and temperature gradients.
Moreover, matching is often required for such devices. For these purposes, transistors are folded by using fingers or multipliers.
The main difference between fingers and multiplier is that multipliers are separate devices, where fingers are stacked
to form a single device. 


<br/> <img src="http://localhost:3000/images/layout/single-finger-parasitics.svg" alt="Fingers vs Multipliers" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Single-finger device parasitics</p> 

Fingers are serving one more important purpose in analog design - parasitics reduction. When we have a single device
with the width $W_n$ and length $L_n$, the main device parasitics are the source-bulk capacitance $C_{SB} = C_{SB}'$ and the 
drain-bulk capacitance $C_{DB}= C_{DB}'$. If the same device has 2 fingers, $W_n/2$ width each and length $L_n$, then the
 source (or drain) area will be shared between them. This will lead to the parasitics being $C_{SB1} = C_{SB}'/2$, 
 $C_{SB2} = C_{SB}'/2$ and $C_{DB} = C_{DB}'/2$. Therefore, the parasitic capacitance of the drain area is reduced by half, 
 which positively affects the speed of the device. Also, because the drain area is shared, drain resistance is also reduced by half.
 

<br/> <img src="http://localhost:3000/images/layout/finger-parasitics.svg" alt="Fingers vs Multipliers" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Multi-finger device parasitics</p> 

Apart from this, the polysilicon gate of the MOSFET has also some substantial resistance, making the gate voltage potential 
 distribution uneven hereby negatively affecting the performance. In the case of the two-finger device, the gate will 
 look like two hal-sized resistors in parallel, reducing the total resistance by the factor of 2.
 
 > Key points of using fingers:
 > - Reduced parasitic capacitance of the drain/source;
 > - Reduced parasitic resistance of the drain/source;
 > - Reduced gate resistance;
 > - Improved speed and resistance of the device;
 > - Reduced area;
 > - Simplified matching;


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