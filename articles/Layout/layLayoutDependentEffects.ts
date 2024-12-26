import {TArticle} from "../types";

const article: TArticle = {
    id: 'layLayoutDependentEffects',
    title: 'Layout-Dependant Effects',
    description: 'Description of article 1',
    lastUpdate: new Date(),

    content: `
## Layout-dependent effects (LOD, WPE, Latch-up, Gradients)
### Table of Contents
1. [Latch-up](#Latch-up)
2. [Length of Diffusion (LOD)](#Length-of-Diffusion-(LOD))
3. [Well Proximity Effect (WPE)](#Well=Proximity-Effect-(WPE))
4. [Prevention of WPE and LOD Effects](#Prevention-of-WPE-and-LOD-Effects)

### Latchup

> **Latch-up key points:**
> - State of an IC when it is made inoperable by a parasitic shorting of VDD and VSS;
> - Triggering of a Low Impedance High Current state between supplies;
> - High Current State remains even when trigger signal is removed.

<br/>  
<img src="PASTEURLHERE/images/layout/latchup.svg" alt="Latchup1" style="display: block; margin-inline: auto; height: 20rem" />

**Latch-Up triggers:**
- Power up
- Overshoot voltages and currents
- Substrate noise
- ESD occurrences

- Parasitic resistors $R_{nwell}$ and  $R_{substrate}$ can create a voltage drop during trigger event hereby opening the BJTs;
- This structure forms a positive feedback circuit, so current will keep flowing even when trigger is removed;
- Circuit has to be powered off to restore normal operation.

> **Latch-up prevention:**
> - Guard rings has a lot of contacts, providing a strong VDD/Ground potential;
> - Guard rings add more parallel resistance to the NWELL/Substrate, thereby reducing parasitic resistors;
> - Substrate potentials are hold around VDD/Ground,  no positive feedback is formed.

<br/>  
<img src="PASTEURLHERE/images/layout/latchup-prevention.svg" alt="Latchup Prevention" style="display: block; margin-inline: auto; height: 20rem" />

### Length of Diffusion (LOD)
**Length Of Diffusion effect (LOD)** - is the manufacturing effect, which induces stress to the edges of the diffusion area during Shallow Trench Insulation (STI) formation. 

<br/>  
<img src="PASTEURLHERE/images/layout/LOD.svg" alt="LOD in layout" style="display: block; margin-inline: auto; height: 30rem" />

The key steps of the STI process involve etching a pattern of trenches in the silicon, depositing one or more dielectric materials (such as silicon dioxide) to fill the trenches, and removing the excess dielectric using a technique such as chemical-mechanical planarization. These processes incude acid and temperature impact on the wafer. STI becomes compressive when the wafer is cooled down, and this leads to the increased holes mobility and decreased electron mobility. Hence, this will improve the performance of the PMOS and degrade the performance of NMOS devices.

> **LOD key points:**
> - LOD is the result of the STI formation;
> - STI becomes compressive as the wafer cools down;
> - The width of STI (active to active spacing) has a strong impact on determining stress;
> - LOD improves holes mobility and decreases electron mobility.

###  Well Proximity Effect (WPE)
**Well proximity effect (WPE)** – is the effect due to lateral non-uniformity in well doping and causes the MOSFET threshold voltages and other electrical characteristics to vary with the distance of the transistor to the well edge.

<br/>  
<img src="PASTEURLHERE/images/layout/WPE.svg" alt="WPE in layout" style="display: block; margin-inline: auto; height: 30rem" />

The photoresist masks are to protect unused areas during N+ or P+  implantation process. During ion implantation process,  high-energy ions are bombarding the desired areas. Ions are equally distributed across the desired area apart from the edges, where lot of high-energy ions are reflected from the well photoresist, forming dopants gradient.

<br/>  
<img src="PASTEURLHERE/images/layout/WPE-prevention.svg" alt="WPE in layout" style="display: block; margin-inline: auto; height: 30rem" />

This difference in dopants concentration will cause a discrepancy between devices, located within the area of the WELL. This may lead to a different speed/$g_m$ etc. of the devices which can be especially critical for the structures like differential pairs and current mirrors.

> **WPE key points:**
> - WPE is the result of the N+/P+ area formation;
> - WPE introduces dopants gradient;
> - Dopants gradient makes devices within WELL unequal;
 
### Prevention of WPE and LOD Effects


<br/>  
<img src="PASTEURLHERE/images/layout/WPE-LOD-prevention.png" alt="WPE in layout" style="display: block; margin-inline: auto; height: 30rem" />


### Electromigration

## Failure mechanisms
EM is an electrical effect whereby electrons on an IC interconnect give
some momentum to the atoms that make up the wire. This happens through low energy collisions and subsequent scattering. As a result, the
interconnect deforms over time as atoms are moved along the interconnect towards the cathode. This causes pits to appear in the wire closer to the anode, and small metal bumps begin to grow along the surface of the wire closer to the cathode.
- This occurs at very high current densities (usually >10,000 A/cm2);
- As EM occurs in one region of the wire, the cross-sectional area
decreases, and the current density increases;

### Types of failures
-  Void: If the incoming ion flux is lesser than the outgoing ion flux, It will create a void in interconnect. A void can lead a discontinuity in the interconnect and result an open circuit.
- Hillock: If incoming ion flux is greater than the outgoing ion flux, It will cause the accumulation of ions and create a hillock in the interconnect. A hillock can increase the width of a metal interconnect and touch the neighbouring metal interconnect which may result in a short circuit.

## EM prevention
The following techniques could be used to prevent the EM issue:
- Increase the metal width to reduce the current density
- Reduce the frequency;
- Lower the supply voltage;
- Keep the wire length short;
- Reduce the buffer size in clock lines;
- Avoid path shapes that could lead to inhomogeneous current flow.

`
};

export default article;