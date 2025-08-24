import {TArticle} from "../types";
const article: TArticle = {
    id: 'circuitsLDO',
    title: 'LDO',
    description: 'LDO topologies and design explained',
    lastUpdate: new Date('2022-01-01'),
    hideInProd: true,
    content: `

##  Low-dropout oscillator (LDO)

### Table of Contents
1. [LDO basics](#ldoBasics)
explain basic principles of operation
- LDO types (capless, w/external cap, PMOS/NMOS based)
- LDO stability



<div id="ldoBasics"></div>

## 1. LDO basics

**Low-dropout oscillator (LDO)** -  is a critical part in ICs, that helps in achieving better 
performance of the internal circuits irrespective of external conditions (supply voltage variation, noise etc.). 
It is usually used together with the bandgap reference to ensure constant output voltage. LDOs have a variety of topologies 
and oriented for use with analog or digital circuits. There are two main LDO topologies: NMOS and PMOS-based.

<br/> <img src="http://localhost:3000/images/circuits/ldo-topologies.svg" alt="LDO topologies" style="display: block; margin-inline: auto; width: min(80%, 80rem)" /> 
<p style="display: block; text-align: center">LDO topologies</p>

A bandgap voltage reference provides a stable reference signal for the regulator. An error amplifier (EA), typically 
implemented as an OTA (Operational Transconductance Amplifier), detects differences between the feedback voltage and the 
reference voltage, adjusting the pass-element resistance accordingly.
A feedback resistor network divides the output voltage for comparison with the reference voltage (Vref). The pass device 
(usually a MOSFET) regulates resistance between the input and output voltages to maintain stability. In practical 
applications, the pass device is commonly a PMOS transistor. Next, we’ll compare the use of PMOS vs. NMOS topologies:

|                |PMOS\t |NMOS\t |
|----------------|:-------:|:-------:|
|Maximum output voltage\t\t| $$V_{dsat} (\\approx 50-100mV)$$    |$$V_{dd}-V_{th}(\\approx 0.4-0.6V)$$\t |
|PSRR\t \t\t\t\t\t|Low  |High\t |
|Output impedance\t\t\t|Lower  |Higher\t | 
|Area\t \t\t\t\t\t|Bigger  |Smaller\t | 
|Speed\t \t\t\t\t\t|Slower  |Faster\t | 
|Dominant pole location\t \t|Output node  |Gate of pass device\t | 

PMOS LDOs is the most commonly used topology due to their low dropout voltage, while NMOS pass transistors are practical 
when the supply voltage is significantly higher than the regulated output. In an NMOS configuration, the pass transistor 
acts as a common drain (source follower) with positive gain, whereas the PMOS operates as a common source with negative 
feedback. This difference requires the op-amp polarity to be adapted accordingly.

The primary advantage of PMOS LDOs is their lower dropout voltage. The error amplifier output (EA_out) in a PMOS design 
can swing between GND and Vin-Vth, with dropout voltage primarily dependent on Vds (around 50mV for saturated devices).
In contrast, NMOS LDOs require the output of the error amplifier to be at least $V_{th}$ above the output voltage to 
turn on the pass transistor. This means the output voltage is inherently limited to at least Vth below the input voltage, 
with additional margin for loop regulation.
Furthermore, NMOS pass devices are typically high-power or high-voltage transistors designed to handle significant 
current and voltage, and their threshold voltage (Vth) is often higher than the standard 1V of regular transistors.

<br/> <img src="http://localhost:3000/images/circuits/ldo-parasitics-simple.svg" alt="LDO parasitics simplified" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">LDO parasitics simplified</p>

To calculate the parasitic parameters of the PCB trace you can use [this MATLAB script](/category/matlabScripts/article/pcbTraceCalculator).
<br/> <img src="http://localhost:3000/images/circuits/ldo-parasitics-full.svg" alt="LDO parasitics model" style="display: block; margin-inline: auto; width: min(80%, 80rem)" /> 
<p style="display: block; text-align: center">LDO parasitics model</p>


---
**New material here:**
Using a voltage divider equation, we get:
$$
V_{fb} = V_{out}\\frac{R_2}{R_1 + R_2}
$$
Knowing that $V_{fb} = V_{ref}$ and assuming feedback resistors ratio to be $R_2 = kR_1$ , we can rewrite the equation:
$$
V_{ref}  = V_{out}\\frac{kR_1}{R_1 + kR_1}
$$
Solving for $k$, we get:
$$
k = \\frac{\\frac{V_{ref}}{V_{out}}}{1 - \\frac{V_{ref}}{V_{out}}}
$$
Using that equation, we can easily calculate the feedback resistor values, knowing the output voltage of an LDO and a 
reference voltage:

**Feedback resistance calculation example here:**

PSRR - dominated by the gain of amplifier, weakened by Cgs of the pass device
Regulation - defined by the gain of the amplifier
Power consumption - opamp + Iq
Noise - opamp
BW - Cload, Cgs of the pass device, opamp BW


|Amplifier Topology|Regulation| Stability| PSRR| Noise|Power consumption| 
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|Telescopic|Medium|High|Medium|Low|Low|
|Folded cascode||||||
|Two-stage||||||
|Gain-boosted||||||



--- 
> **Feedback resistor highlights:**
> - Use **low-mismatch resistors**, such as polysilicon resistors;
> - **Make resistors** as **wide** as possible to reduce mismatch;
> - Use **unit-sized segments**; connect resistors in parallel or in series, if needed;
> - **[Match](http://localhost:3000/category/Layout/article/layoutMatchingPatterns)** feedback resistors in layout; 
> - Total **resistance defines quiescent current ($$I_q$$)** - a trade-off between stability and power consumption;


Amplifier error:  
$$V_{out} = A(V_{+}-V_{-})$$  
$$V_{-}=V_{out}$$  
$$V_{+}=V_{in}$$  
$$V_{out} = AV_{+}-AV_{out}$$  
$$(1+A)V_{out}=AV_{in}$$  
$$V_{out} = \\frac{A}{1+A}V_{in}$$  
  
For $$A=40dB$$  the gain error is:  
$$\\delta A = \\frac{10'000}{1+10'000} = 0.9999$$  
So for $$Vref = 1.2V$$  it translates into $$\\delta V_{out} = 1.9988V$$ , which means an error of 0.01%


---
### New material here:
**New material here:**
Using a voltage divider equation, we get:
$$
V_{fb} = V_{out}\\frac{R_2}{R_1 + R_2}
$$
Knowing that $V_{fb} = V_{ref}$ and assuming feedback resistors ratio to be $R_2 = kR_1$ , we can rewrite the equation:
$$
V_{ref}  = V_{out}\\frac{kR_1}{R_1 + kR_1}
$$
Solving for $k$, we get:
$$
k = \\frac{\\frac{V_{ref}}{V_{out}}}{1 - \\frac{V_{ref}}{V_{out}}}
$$
Using that equation, we can easily calculate the feedback resistor values, knowing the output voltage of an LDO and a reference voltage:
The quiscent current is defined:
$$
I_Q = \\frac{V_{out}}{R_{fb}}
$$

So the full equation will look like:
$$
\\begin{cases}  
k =  \\frac{V_{ref}/V_{out}}{1 - V_{ref}/V_{out}} \\\\
R_1 = \\frac{V_{out}}{I_Q(1+k)} \\\\
R_2 = kR_1 \\\\
\\end{cases}
$$  

**Feedback resistance calculation example here:**



|Amplifier Topology|Regulation| Stability| PSRR| Noise|Power consumption| 
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|Telescopic|Medium\t|High\t  |Medium\t|Low\t  |Low\t\t|
|Folded cascode|Medium|High|Medium|Medium|Medium|
|Two-stage|High|Low|High|Low|Medium|
|Gain-boosted|High|Medium|High|Medium|High|

-- > **Feedback resistor highlights:**  
> - Use **low-mismatch resistors**, such as polysilicon resistors;  
> - **Make resistors** as **wide** as possible to reduce mismatch;  
> - Use **unit-sized segments**; connect resistors in parallel or in series, if needed;  
> - **[Match](http://localhost:3000/category/Layout/article/layoutMatchingPatterns)** feedback resistors in layout; > - Total **resistance defines quiescent current ($$I_q$$)** - a trade-off between stability and power consumption;  
  
  
**Principle of operation:**
Let's have a look on a simplified NMOS-based LDO to understand its operation. The LDO consists of **three main parts**:
- Error amplifier
- Pass transistor
- Feedback resistance

Let's assume that $V_{dd} = 1.8V$, $V_{ref} = 1.2V$, gain of the error amplifier is $A_{EA} = 40dB$.
In the beginning, the output voltage $V_{out} = 0V$. Then $V_{fb} = 0V$, so then the negative input of the error amplifier $(V_{-})$ is also $0V$. Then, the output voltage of the amplifier $V_c$ becomes:
$$
V_c = A_{EA}*(V_{+} - V_{-}) = 10'000*(1.2-0) = 120V \\Rightarrow 1.8V
$$ 
> **Note:** The output voltage of the amplifier is clamped at $V_{dd}$ and equals to 1.8V

Then, the $V_{gs}$ of the pass device becomes $1.8V$ and the transistor is fully open, conducting current. $V_{out}$ and hence $V_{fb}$ are now rising, the difference between error amplifier inputs reduces and leads to the reduced $V_{c}$. When the system settles:
$$
V_{out} = V_{fb} =V_{ref} = 1.2V
$$



Amplifier error:  
$$
V_{out} = A_{EA}(V_{+}-V_{-})
$$  

$$
\\begin{cases}  
V_{-}=V_{out} \\\\ 
V_{+}=V_{in} \\\\  
\\end{cases}
$$  


$$V_{out} = A_{EA}V_{+}-A_{EA}V_{out}$$  
$$(1+A_{EA})V_{out}=A_{EA}V_{in}$$  
$$V_{out} = \\frac{A_{EA}}{1+A_{EA}}V_{in}$$  
  
For $$A_{EA}=40dB$$  the gain error is:  
$$\\Delta A_{EA} = \\frac{10'000}{1+10'000} = 0.9999$$  
So for $$V_{ref} = 1.2V$$  it translates into $$\\Delta V_{out} = 1.9988V$$ , which means an error of 0.01%

---

**Adding Vref error:**

$$
\\Delta V_{ref} = \\pm 0.5\\% \\Rightarrow 1\\%
$$

$$
V_{out}  = (Gain \\ error)(V_{ref} \\ error)V_{ref}
$$

$$
V_{out}  = \\left(\\frac{A_{EA}}{1+A_{EA}} \\right) (1-\\Delta V_{ref})V_{ref}
$$

$$
V_{out}  = \\left(\\frac{10'000}{1+10'000} \\right) (1-0.01)1.2
$$

$$
V_{out}  = 1.18788 V
$$

$$
\\epsilon = 1.01\\%
$$

> **Gain error sources:**
> - Gain error of the amplifier
> - Reference voltage variation
>  - Feedback resistance mismatch

> **Summary**
> - **PSRR** - dominated by the gain of amplifier, weakened by Cgs of the pass device
> - **Regulation** - defined by the gain of the amplifier
> - **Power consumption** - opamp + Iq
> - **Noise** - opamp
> - **BW** - Cload, Cgs of the pass device, opamp BW
> - **Stability** - 

> **LDO Design hints:**
> - **PSRR** - increase amplifier gain
> - **Regulation** - Increase amplifier gain
> - **Transient response** - Increase $$C_{out}$$ to adress fast-switching loads
> - **Power consumption** - Reduce amplifier's power consumption, reduce $$I_Q$$
> - **Noise** - Reduce amplifier's noise
> - **Bandwidth** - Cload, Cgs of the pass device, increase amplifier's BW
> - **Stability** - use single-stage amplifier, increase $$I_{Q}$$


$$
\\begin{cases}  
3x + 5y + z = 3 \\\\  
7x - 2y + 4z = 4 \\\\  
-6x + 3y + 2z = 2  
\\end{cases}
$$


---
Poles:
$$
\\omega_{p1} = \\frac{1}{R_{out}C_L} 
$$
$$
\\omega_{p2} = \\frac{1}{r_{EA}C_{gs}} 
$$

Load current variation causes the variation in pole location:
$$
\\omega_{p1} = \\frac{1}{R_{out}C_L} \\approx \\frac{1}{r_{ds}C_L} = \\frac{I_{L}}{(V_{out}-V_{dd})C_L}
$$

$$
R_{out} = r_{ds}||(R_1+R_2)||R_{L}
$$

$$
\\beta = \\frac{R_2}{R_1 + R_2}
$$


Transfer function:
$$
T(s) = A_{EA} g_{mp} R_{out} \\beta \\frac{1}{ \\left(1 + \\frac{s}{\\omega_{p1}} \\right) \\left(1 + \\frac{s}{\\omega_{p2}} \\right)}
$$

$$
T(s) =  \\frac{ A_{EA} g_{mp} R_{out} \\beta }{ \\left( \\frac{1}{ \\omega_{p1} \\omega_{p2}} \\right) s^2  + \\left( \\frac{1}{ \\omega_{p1}} + \\frac{1}{ \\omega_{p2}} \\right) s + 1}
$$

---
### Ways to compensate

In the previous chapter we saw that the load pole $\\omega _{p2}$ moves, when the load is changing. This effect lead to change in phase margin, which can lead to unstable condition (oscillations). There are two main ways to compensate this effect:
- Zero insertion 
- $C_{gs}$ shielding through buffer

2.1 ESR

$$
\\omega_{p1} = \\frac{1}{R_{out} C_L}
$$

$$
\\omega_{p2} = \\frac{1}{r_{EA} C_{gs}}
$$

$$
\\omega_{z} = \\frac{1}{R_{ESR} C_{L}}
$$

$$
PM = \\arctan \\left(\\frac{\\omega_{UGF}}{\\omega_z} \\right)
$$

2.2 Using a buffer

$$
\\omega_{p2} = \\frac{1}{C_{gs} R_{o,EA}}
$$

Two high-frequency poles:
$$
\\omega_{p2,A} = \\frac{1}{C_{B} R_{o,EA}}
$$

$$
\\omega_{p2,B} = \\frac{1}{C_{gs} R_{o,EA}}
$$

---

#### LDO equations summary:
1. **Feedback resistor ration through Vref, Vout and Iq:**
$$
\\begin{cases}  
k =  \\frac{V_{ref}/V_{out}}{1 - V_{ref}/V_{out}} \\\\
\\\\
R_1 = \\frac{V_{out}}{I_Q(1+k)} \\\\
\\\\
R_2 = kR_1 \\\\
\\end{cases}
$$  

2. **Regulation error due to gain and Vref errors:**
$$
\\Delta V_{out}  = V_{ref} - \\left(\\frac{A_{EA}}{1+A_{EA}} \\right) (1-\\Delta V_{ref})V_{ref}
$$


---

#### LDO Parasitics 



|Parasitics|R| L| C|
|:-------:|:-------:|:-------:|:-------:|
|Bondwire* | $\\approx 50m\\Omega /mm$| $\\approx 5nH /mm$  | -\t|
|Package** |$50m\\Omega$\t|$1.119 nH$\t  |$352 fF$\t|
|PCB trace***|$4.93\\Omega$\t|$2.1 nH$\t  |\t$1.47pF$|

> **Notes:**
> *For a typical golden bondwire, (*1mil* diameter). Typical bondwire length is *3-5mm*.
> **Values are provided for the [QFN-20 package ](https://www.ti.com/lit/an/scba017d/scba017d.pdf?ts=1755636160382)
> ***For a typical PCB trace (*W = 1mm, L = 10mm, thickness = 35um*). To calculate different geometries, use this 
[calculator](https://localhost:3000/category/matlabScripts/article/pcbTraceCalculator).


**IMAGES**

<br/> <img src="http://localhost:3000/images/circuits/ldoCurrentDivision.svg" alt="LDO parasitics model" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Current division</p>

<br/> <img src="http://localhost:3000/images/circuits/ldoRegulation1.svg" alt="LDO parasitics model" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Regulation 1</p>

<br/> <img src="http://localhost:3000/images/circuits/ldoRegulation2.svg" alt="LDO parasitics model" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Regulation 2</p>

<br/> <img src="http://localhost:3000/images/circuits/ldoRegulation3.svg" alt="LDO parasitics model" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Regulation 3</p>

<br/> <img src="http://localhost:3000/images/circuits/ldoRegulationLoad.svg" alt="LDO parasitics model" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Load Regulation</p>

<br/> <img src="http://localhost:3000/images/circuits/ldoLoadVariation.svg" alt="LDO parasitics model" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Load variation</p>

<br/> <img src="http://localhost:3000/images/circuits/ldoZeroAdding.svg" alt="LDO parasitics model" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Adding zero for compensation</p>

<br/> <img src="http://localhost:3000/images/circuits/ldoBufAdding.svg" alt="LDO parasitics model" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Adding buffer for compensation</p>

    `
};

export default article;