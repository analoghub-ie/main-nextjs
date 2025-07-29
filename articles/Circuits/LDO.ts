import {TArticle} from "../types";

const article: TArticle = {
    id: 'circuitsLDO',
    title: 'LDO',
    description: 'LDO topologies and design explained',
    lastUpdate: new Date('2022-01-01'),
    hideInProd: true,

    content: `

##  LDO design
Low-dropout oscillator (LDO) is a very important circuit that helps in achieving better performance of the internal circuits irrespectably of external conditions (supply voltage variation, noise etc.). It is usually used together with bandgap reference to ensure constant output voltage.
LDOs have a variety of topologies and oriented for use with analog or digital circuits.
There are two main LDO topologies: NMOS and PMOS-based.

<br/> <img src="http://localhost:3000/images/circuits/ldo-topologies.svg" alt="LDO topologies" style="display: block; margin-inline: auto; width: min(80%, 80rem)" /> 
<p style="display: block; text-align: center">LDO topologies</p>

A bandgap voltage reference provides a stable reference signal for the regulator. An error amplifier (EA), typically implemented as an OTA (Operational Transconductance Amplifier), detects differences between the feedback voltage and the reference voltage, adjusting the pass-element resistance accordingly.
A feedback resistor network divides the output voltage for comparison with the reference voltage (Vref). The pass device (usually a MOSFET) regulates resistance between the input and output voltages to maintain stability. In practical applications, the pass device is commonly a PMOS transistor. Next, we’ll compare the use of PMOS vs. NMOS topologies:
|                |PMOS\t |NMOS\t |
|----------------|:-------:|:-------:|
|Maximum output voltage\t\t| $$V_{dsat} (\\approx 50-100mV)$$    |$$V_{dd}-V_{th}(\\approx 0.4-0.6V)$$\t |
|PSRR\t \t\t\t\t\t|Low  |High\t |
|Output impedance\t\t\t|Lower  |Higher\t | 
|Area\t \t\t\t\t\t|Bigger  |Smaller\t | 
|Speed\t \t\t\t\t\t|Slower  |Faster\t | 
|Dominant pole location\t \t|Output node  |Gate of pass device\t | 

PMOS LDOs is the most commonly used topology due to their low dropout voltage, while NMOS pass transistors are practical when the supply voltage is significantly higher than the regulated output. In an NMOS configuration, the pass transistor acts as a common drain (source follower) with positive gain, whereas the PMOS operates as a common source with negative feedback. This difference requires the op-amp polarity to be adapted accordingly.

The primary advantage of PMOS LDOs is their lower dropout voltage. The error amplifier output (EA_out) in a PMOS design can swing between GND and Vin-Vth, with dropout voltage primarily dependent on Vds (around 50mV for saturated devices).
In contrast, NMOS LDOs require the output of the error amplifier to be at least $V_{th}$ above the output voltage to turn on the pass transistor. This means the output voltage is inherently limited to at least Vth below the input voltage, with additional margin for loop regulation.
Furthermore, NMOS pass devices are typically high-power or high-voltage transistors designed to handle significant current and voltage, and their threshold voltage (Vth) is often higher than the standard 1V of regular transistors.

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
Using that equation, we can easily calculate the feedback resistor values, knowing the output voltage of an LDO and a reference voltage:

**Feedback resistance calculation example here:**
PSRR - dominated by the gain of amplifier, weakened by Cgs of the pass device
Regulation - defined by the gain of the amplifier
Power consumption - opamp + Iq
Noise - opamp
BW - Cload, Cgs of the pass device, opamp BW


|Amplifier Topology|Regulation| Stability| PSRR| Noise|Power consumption| 
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|Telescopic|Medium\t|High\t  |Medium\t|Low\t  |Low\t\t|
|Folded cascode||||||
|Two-stage||||||
|Gain-boosted||||||
    `
};

export default article;