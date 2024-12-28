import {TArticle} from "../types";

const article: TArticle = {
    id: 'layLayoutDependentEffects',
    title: 'Layout-Dependant Effects',
    description: 'Description of article 1',
    lastUpdate: new Date('2022-01-01'),

    content: `
## Layout-dependent effects (LOD, WPE, Latch-up, Electromigration)  
### Table of Contents  
1. [Latch-up](#Latchup)  
2. [Length of Diffusion (LOD)](#LOD)  
3. [Well Proximity Effect (WPE)](#WPE)  
4. [Electromigration](#EM)
  
<div id="Latchup"></div>

### 1. Latchup  

**Latch-up** is a short circuit/low impedance channel generated between the power and ground rails of a MOSFET circuit, causing IC being inoperable or damaged. It is caused by the formation of the BJT network with a positive feedback. 

**Latch-Up triggers:**  
- Power up  
- Overshoot voltages and currents  
- Substrate noise  
- ESD occurrences  

<br/> 
<img src="http://localhost:3000/images/layout/latchup.svg" alt="Latchup1" style="display: block; margin-inline: auto; width: min(80%, 60rem)" />  
<p style="display: block; text-align: center">Latch-up in CMOS technology (CMOS inverter example)</p>

Let's have a look on a simple circuit example - CMOS inverter. In such a circuit we have one NMOS device formed in a p-substrate and a NMOS device formed in NWELL. Parasitic NPN device is formed by the **n-type** source terminal of NMOS, **p-type** substrate and **n-type** NWELL. Parasitic PNP is formed by the **p-type** source terminal of PMOS, **n-type** NMELL and **p-type** substrate. Of course, both NWELL and p-substrate are lightly-doped meaning that they have some substantial resistance. Equivalent circuit of a parasitics BJT network is shown on a picture above. Parasitic resistors $R_{nwell}$ and  $R_{substrate}$ can create a voltage drop during trigger event hereby allowing current flow through BJTs.  This parasitic structure forms a positive feedback, so the current will keep flowing even when trigger is removed, so the IC has to be powered off to restore normal operation.

> **Latch-up key points:**  
> - State of an IC when it is made inoperable by a parasitic shorting of VDD and VSS;  
> - Triggering of a Low Impedance *High Current state* between supplies;  
> - High Current State remains even when trigger signal is removed.  
 
 
 As we can see, the main reason for the latch-up is the parasitic resistance of the substrate and NWELL, which allows parasitic BJTs to open during trigger event. As soon as we cannot control the triggers, our primary task would be to reduce the parasitic resistance of the NWELL and substrate. This can be done relatively easily by adding a guard ring of the corresponding type around PMOS and NMOS devices to ensure a strong VDD/VSS potential of the NWELL/substrate and reducing the NWELL/substrate resistance. 
 
 
> **Latch-up prevention:**  
> - Guard rings has a lot of contacts, providing a strong VDD/Ground potential;  
> - Guard rings add more parallel resistance to the NWELL/Substrate, thereby reducing parasitic resistors;  
> - NWELL/substrate potentials are held around VDD/Ground, no positive feedback is formed.  
  
<br/> <img src="http://localhost:3000/images/layout/latchup-prevention.svg" alt="Latchup Prevention" style="display: block; margin-inline: auto; width: min(80%, 55rem)" /> 
<p style="display: block; text-align: center">Latch-up prevention by adding Guard Rings</p> 

<div id="LOD"></div>

### 2. Length of Diffusion (LOD)  

**Length Of Diffusion effect (LOD)** - is the manufacturing effect, which induces stress to the edges of the diffusion area during Shallow Trench Insulation (STI) formation.   


<br/> <img src="http://localhost:3000/images/layout/LOD.svg" alt="LOD in layout" style="display: block; margin-inline: auto; width: min(80%, 40rem)" />  
<p style="display: block; text-align: center">LOD effect in CMOS technology</p>

The key steps of the STI process involve etching a pattern of trenches in the silicon, depositing one or more dielectric materials (such as silicon dioxide) to fill the trenches, and removing the excess dielectric using a technique such as chemical-mechanical planarization. These processes incude acid and temperature impact on the wafer. STI becomes compressive when the wafer is cooled down, and this leads to the increased holes mobility and decreased electron mobility. Hence, this will improve the performance of the PMOS and degrade the performance of NMOS devices.  


> **LOD key points:**  
> - LOD is the result of the STI formation;  
> - STI becomes compressive as the wafer cools down;  
> - The width of STI (active to active spacing) has a strong impact on determining stress;  
> - LOD improves holes mobility and decreases electron mobility.  


**LOD effect** can be **prevented** by distancing devices away from the WELL edge (guard ring). This is usually done by placing dummy devices around the circuit devices, in which case your curcuit devices will also benefit from the equal edge effects (each device will have the same neighbours).

<br/> <img src="http://localhost:3000/images/layout/LOD-prevention.svg" alt="LOD prevention in layout" style="display: block; margin-inline: auto; width: min(80%, 40rem)" />  
<p style="display: block; text-align: center">LOD prevention</p>

<div id="WPE"></div>
  
###  3. Well Proximity Effect (WPE)  


**Well proximity effect (WPE)** – is the effect due to lateral non-uniformity in well doping which causes the MOSFET threshold voltages and other electrical characteristics to vary with the distance of the transistor to the well edge.  


<br/> <img src="http://localhost:3000/images/layout/WPE.svg" alt="WPE in layout" style="display: block; margin-inline: auto; width: min(80%, 40rem)" />  
<p style="display: block; text-align: center">WPE effect in CMOS technology</p>
 
 
The photoresist masks are placed to protect unused areas during N+ or P+  implantation process. During ion implantation process,  high-energy ions are bombarding the desired areas, equally distributed across the desired area apart from the edges, where a lot of high-energy ions are reflected from the well photoresist, forming dopants gradient. This difference in dopants concentration will cause a discrepancy between devices, located within the area of the WELL. This may lead to a different speed/$g_m$/$V_{th}$ etc. of the devices which can be especially critical for the structures like differential pairs and current mirrors.  


> **WPE key points:**  
> - WPE is the result of the N+/P+ area formation;  
> - WPE introduces dopants gradient;  
> - Dopants gradient makes devices within WELL unequal;  


**WPE effect** can be **prevented** by distancing devices away from the WELL edge (guard ring). This is usually done by placing dummy devices around the circuit devices, in which case your curcuit devices will also benefit from the equal edge effects (each device will have the same neighbours).


<br/> <img src="http://localhost:3000/images/layout/WPE-prevention.svg" alt="WPE in layout" style="display: block; margin-inline: auto; width: min(80%, 40rem)" />
<p style="display: block; text-align: center">WPE effect prevention by adding dummies</p>

So, in summary:

> **WPE/LOD prevention:**  
> - Do not place critical devices close to the well edge (guard ring);  
> - Surround your circuit devices with dummy devices to protect the from LOD/WPE and to ensure similar edge conditions for all devices;


<br/> <img src="http://localhost:3000/images/layout/WPE-LOD-prevention.svg" alt="WPE/LOD prevention in layout" style="display: block; margin-inline: auto; width: min(80%, 50rem)" />  
<p style="display: block; text-align: center">Prevention of LOD and WPE effects</p>
 
<div id="EM"></div> 
 
<div id="Electromigration"></div>

### 4. Electromigration    
#### 4.1 Failure mechanisms  
**Electromigration** - is an electrical effect where electrons on an IC interconnect give some momentum to the atoms that make up the wire. This happens through low energy collisions and subsequent scattering. As a result, the interconnect deforms over time as atoms are moved along the interconnect towards the cathode. This causes pits to appear in the wire closer to the anode, and small metal bumps begin to grow along the surface of the wire closer to the cathode.  

<br/> <img src="http://localhost:3000/images/layout/electromigration-mechanism.svg" alt="Electromigration in layout" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Electromigration mechanism</p>


> **Electromigration key points:**  
> - Occurs at very high current densities (usually >$10kA/cm^2$);  
> - Usually caused by the incorrect wire width for a give current density.


<br/> <img src="http://localhost:3000/images/layout/electromigration.gif" alt="Electromigration in layout" style="display: block; margin-inline: auto; width: min(80%, 35rem)" /> 
<p style="display: block; text-align: center">Electromigration process in CMOS technology</p>


#### 4.2 Types of failures 

 
- **Void:** If the incoming ion flux is lesser than the outgoing ion flux, It will create a void in interconnect. A void can lead a discontinuity in the interconnect and result an open circuit.  
- **Hillock:** If incoming ion flux is greater than the outgoing ion flux, It will cause the accumulation of ions and create a hillock in the interconnect. A hillock can increase the width of a metal interconnect and touch the neighbouring metal interconnect which may result in a short circuit.


<br/> <img src="http://localhost:3000/images/layout/hillock-void.png" alt="Hillocks and voids" style="display: block; margin-inline: auto; width: min(80%, 35rem)" /> 
<p style="display: block; text-align: center">Hillocks and voids</p>


#### 4.3 Electromigration prevention 

 On order to prevent electromigration, designers should strictly follow the manufacturer recommendation for the wire width (because the thickness is specified by the process and cannot be changed) according to the current flowing through the wire. As a sanity check for the layout design, EM/IR analysis can be performed (i.e. using Candence Voltus tool).

> **Rule of thumb:**  
> - Calculate width by using vendor-provided formula + 10%;  
> - Note that the EM is worse at high temperature.

> **Electromigration prevention techniques:** 
> - Increase the metal width to reduce the current density;
> - Use metal stitching (2 or more metal in parallel, connected by vias);
> - Reduce the frequency;  
> - Lower the supply voltage;  
> - Keep the wire length short;  
> - Reduce the buffer size in clock lines;  
> - Avoid path shapes that could lead to inhomogeneous current flow.

`
};

export default article;