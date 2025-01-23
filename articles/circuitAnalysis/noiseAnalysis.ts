import {TArticle} from "../types";

const article: TArticle = {
    id: 'noiseAnalysis',
    title: 'Noise analysis',
    description: 'This article describes',
    lastUpdate: new Date('2022-01-01'),

    content: `
    
## Contents:

1. [Noise basics](#noiseBasics);
1.1 Thermal noise. Noise Spectral density. 
<div id="noiseBasics"></div>

<br/> <img src="http://localhost:3000/images/circuitAnalysis/resistor-noise.svg" alt="Thermal noise in a resistor" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Thermal noise in a resistor</p>  

$$
S_{n}(f) = 4kTR [V^2/Hz]
$$
, where $K_{B}=1.38*10^{-23}[J/K]$ is the Boltsmann's constant.


$$
\\sqrt{\\overline{V_{n}^2}} = 4kTR\\Delta f [V];
$$



    `
};

export default article;