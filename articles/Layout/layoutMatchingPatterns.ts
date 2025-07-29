import {TArticle} from "../types";

const article: TArticle = {
    id: 'layoutMatchingPatterns',
    title: 'Matching patterns',
    description: 'This article describes matching patterns like interdigitation and common centroid',
    lastUpdate: new Date('2025-07-25'),
    hideInProd: true,
    content: `

## Matching patterns in layout

### Table of Contents
1. [Introduction](#introduction)
2. [Matching techniques](#matchingTechniques)
3. [Placement](#placement)
4. [Dummies](#dummies)

<div id="introduction"></div>

## 1. Introduction

In the previous [article](/category/Layout/article/layoutMatching) 
we spoke about matching and why it is important in analog layout. In this article we will dive deeper into matching 
patterns, such as interdigitation and common centroid and how to create your own matching pattern in layout. We will 
also discuss some practical aspects of matching.

|Subcircuit type|Interdigitation|Common Centroid|
|---------------|:-----:|:---------------:|
|Biasing circuit|✔|\t\t\t\t|
|Current mirror |✔\t\t\t\t|\t\t\t\t|
|Current sources array|\t\t\t|✔\t\t\t\t|
|Differential pair|\t\t\t\t|✔\t\t\t\t|
|R/C ladder\t\t|✔\t\t\t\t|\t\t\t\t|
|Resistive ADC/DAC array|\t\t|✔\t\t\t\t|
|Capacitive ADC/DAC array|\t\t|✔\t\t\t\t|
|Bandgap BJT array|\t\t\t\t|✔\t\t\t\t|


### Matching procedure
1. Define the purpose and type of the structure (current mirror/diff. pair etc.)
2. Define the type of matching required (interdigitation/common centroid)
3. Check/select unit element sizing:

3a. **NMOS/PMOS transistors:**
- All devices have the same length
- Minimum-sized device has at least 2 fingers and (if possible) 2 multipliers
- Other devices have at least 2 fingers

3b. **Capacitive/resistive arrays:**
- All devices are multiples of the unit-sized device

3c. **BJT arrays:**
- All devices are multiples of the unit-sized device


4. Shape an array as close as possible to the square
5. Estimate main routing lines and reserve space for them between array elements
6. Apply proper matching pattern to the array
7. Surround the array with dummies and adjust their size for area efficiency
8. Place the guard ring and add a PWELL/NWELL layer
9. Combine N+/P+ areas to avoid spacing DRCs.



### Golden Rules of Matching:
1. **Geometry** – Every segment of the array should be unit-sized and have the same geometry;
2. **Symmetry** – Array segments should be placed symmetrically for both X- and Y-axes; Orientation of all devices should be the same;
3. **Coincidence** – Geometrical centres of the array should coincide;
4. **Compactness** – The array should be as compact as possible, ideally square-shaped;
5. **Distribution** – Array segments should be distributed as evenly as possible;
6. **Positioning** – Matched array should be placed as far as possible from potential agressors (high current/frequency blocks etc.)
7. **Edging** – Array segments should be surrounded by dummies to ensure equal edge conditions for core devices and protect from [layout-dependent effects](/category/Layout/article/layoutDependentEffects).

### Matching guide:
//#### Choosing matching pattern:
//**Interdigitation:** simple current mirrors, biasing circuits

//**Common centroid:** precise current mirrors, differential pairs, R/C arrays, BJT arrays (Bandgap)

#### Abutted/separated:
**Abutted:** current mirrors (benefit of reduced $$R_{ds}$$), biasing circuits

**Separated:** differential pairs (to reduce parasitic dummy capacitor impact), R/C arrays for ADC/DAC, BJT arrays

#### Interdigitation matching procedure:
1. Make sure the smallest device has at least 2 multipliers and 2 fingers (in case of MOS device);
2. Each device has the same finger width and length. Use multipliers to achieve the required total width;
3. Place the smallest device in the center of the pattern;
4. Keep adding devices on the left and on the right, starting from the smallest devices.

<br/> <img src="http://localhost:3000/images/layout/interdigitation1.svg" alt="Interdigitation1" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Interdigitation1</p> 

<br/> <img src="http://localhost:3000/images/layout/interdigitation2.svg" alt="Interdigitation1" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Interdigitation2</p>

<br/> <img src="http://localhost:3000/images/layout/interdigitation3.svg" alt="Interdigitation1" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Interdigitation3</p> 

<br/> <img src="http://localhost:3000/images/layout/interdigitation3Gradient.svg" alt="Interdigitation1" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Interdigitation gradient</p>  

#### Common centroid procedure
1. Make sure all devices are unit-sized;
2. Make sure every device has at least 2 fingers and 2 multipliers;
3. Assign one letter to each device and count its multipliers;
4. Draw a vertical and horizontal axis; the intersection would be the center of our array;



5. Imagine two diagonal cuts, $D_1$ and $D_2$ as shown below:
6. Take the smallest device and place two multipliers in the center on $D_1$; if this device has more than 2 multipliers, place them too, but on $D_2$

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep1.svg" alt="Place the smallest device on diagonal" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Place the smallest device on diagonal</p>  

7. Take the next smallest device and place two multipliers on the opposite diagonal.

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep2.svg" alt="Place next device on the opposite diagonal" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Place next device on the opposite diagonal</p>  

8. Repeat the process, moving from the smallest to the largest device, placing 2 devices on one diagonal at a time.

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep3.svg" alt="Keep placing the devices interleaving the diagonals" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Keep placing the devices interleaving the diagonals </p>  


Now we have two possible options how to place segment of the device $$C$$:
<br/> <img src="http://localhost:3000/images/layout/layoutCCStep4.svg" alt="Gradient types" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center"></p>  

Let's fill the remaining segments of $$C$$:

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep5.svg" alt="Gradient types" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center"></p>  

And add dummies to complete the pattern:

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep6.svg" alt="Gradient types" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center"></p>  

Now, let's verify our patterns and check if it works as a matched array. We will follow the same procedure as for 
interdigitation pattern, but apply the gradient in two directions as shown below:

<br/> <img src="http://localhost:3000/images/layout/layoutCCStep7.svg" alt="Gradient types" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Applying 2D gradient to both arrays</p>  

The total impact for each segment will be defined as a sum of gradient for $$X$$ and $$Y$$ axes. For example, for the 
first array, the impact for the first $$A$$ segment will be:

$$
A_1 = 3+2
$$

$$
A_2 = 2+3
$$


--------

Interdigitation 1D gradient calculation:
$$
A = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36
$$

$$
B = 2 + 3 + 6 + 7 = 18
$$

$$
C = 1 + 4 + 5 + 8 = 18
$$

Taking into account the sizes of the devices, we can see that the impact is equal:

$$
2C = 2B = A
$$

        `
};

export default article;