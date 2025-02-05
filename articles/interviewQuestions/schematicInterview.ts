import {TArticle} from "../types";

const article: TArticle = {
    id: 'schematicInterview',
    title: 'Analog Design Interview Questions',
    description: 'Analog Design Interview Questions',
    lastUpdate: new Date('2022-01-01'),
    hideInProd: true,
    content: `

### Table of Contents:
1. [RC-networks questions](#RCNetworks)
1. [OpAmp circuits questions](#opampNetworks)



<div id="RCNetworks"></div>

### 1. RC-networks questions
#### 1.1 LPF-filter transfer function and Bode Plot:
**Question:** Write down the transfer function for the following circuit and draw a Bode plot:

<br/> 
<img src="http://localhost:3000/images/interviewQuestions/LPF-question.svg" alt="LPF schematic" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">LPF schematic</p>

<!--Spoiler-->
<details> 
  <summary> SOLUTION: </summary>
  That's a very simple circuit that can be represented as a voltage divider:
  Replacing the capacitor with the $X_C = \\frac{1}{j \\omega C}$ we get:
  
  $$ 
  A_V = \\frac{V_{in}}{V_{out}} = \\frac{1}{2\\pi RC}
  $$
   <br/> 
   <img src="http://localhost:3000/images/interviewQuestions/LPF-bode.svg" alt="LPF Bode Plot" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
    <p style="display: block; text-align: center">LPF Bode Plot</p>

</details>

### 2. OpAmp-based networks questions
<div id="opampNetworks"></div>
  
`
};

export default article;