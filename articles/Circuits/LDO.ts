import {TArticle} from "../types";

const article: TArticle = {
    id: 'circuitsLDO',
    title: 'LDO',
    description: 'Description of article 1',
    lastUpdate: new Date(),

    content: `

##  LDO design
Low-dropout oscillator (LDO) is a very important circuit that helps in achieving better performance of the internal circuits irrespectably of external conditions (supply voltage variation, noise etc.). It is usually used together with bandgap reference to ensure constant output voltage.
LDOs have a variety of topologies and oriented for use with analog or digital circuits.
There are two main LDO topologies: NMOS and PMOS-based.
![LDO topologies](PASTEURLHERE/images/LDO_topologies.svg)

Let's compare the topologies:
|                |PMOS\t |NMOS\t |
|----------------|-------|-------|
|Maximum output voltage\t\t| $$V_{dsat} (\\approx 50-100mV)$$    |$$V_{dd}-V_{th}(\\approx 0.4-0.6V)$$\t |
|PSRR\t \t\t\t\t\t|Low  |High\t |
|Output impedance\t\t\t|Lower  |Higher\t | 
|Area\t \t\t\t\t\t|Bigger  |Smaller\t | 
|Speed\t \t\t\t\t\t|Slower  |Faster\t | 
|Dominant pole location\t \t|Output node  |Gate of pass device\t | 
    `
};

export default article;