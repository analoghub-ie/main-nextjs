import {TArticle} from "../types";

const article: TArticle = {
    id: 'layoutMatching',
    title: 'Matching in layout',
    description: 'This article describes matching techniques in layout, matching patterns and design impact',
    lastUpdate: new Date('2025-01-04'),
    content: `

## Matching in layout 

### Table of Contents
1. [Introduction](#introduction)
2. [Matching techniques](#matchingTechniques)
3. [Dummies](#dummies)


<div id="introduction"></div>
## Introduction


<div id="placement"></div>


## Placement



<br/> <img src="http://localhost:3000/images/layout/wrong-placement-example-1.svg" alt="Examples of the wrong placement" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Examples of the wrong placement</p>        


<br/> <img src="http://localhost:3000/images/layout/wrong-placement-example-2.svg" alt="Examples of the wrong placement in respect of the agressor" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Examples of the wrong placement in respect of the agressor</p>  


<div id="matching"></div>

## Matching


<br/> <img src="http://localhost:3000/images/layout/gradient-no-matching.svg" alt="Gradient impact on unmatched devices" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient impact on unmatched devices</p>     

<br/> <img src="http://localhost:3000/images/layout/gradient-with-matching.svg" alt="Gradient impact on the matched devices" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient impact on the matched devices</p>      

<div id="gradients"></div>

<br/> <img src="http://localhost:3000/images/layout/dummy-gradients.svg" alt="Gradient impact on the matched devices" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient impact on the matched devices</p>      

<br/> <img src="http://localhost:3000/images/layout/dummy-wpe.svg" alt="Gradient impact on the matched devices" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient impact on the matched devices</p>  

<br/> <img src="http://localhost:3000/images/layout/dummy-wpe-gradients.svg" alt="Gradient and WPE impact on the matched devices" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Gradient and WPE impact on the matched devices</p>  

<div id="parasitics"></div>

## Dummy parasitics


<br/> <img src="http://localhost:3000/images/layout/dummy-spaced-parasitics.svg" alt="Spaced dummy placement" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Spaced dummy placement</p>  

<br/> <img src="http://localhost:3000/images/layout/dummy-abutted-parasitics.svg" alt="Abutted dummy placement" style="display: block; margin-inline: auto; width: min(80%, 50rem)" /> 
<p style="display: block; text-align: center">Abutted dummy placement</p>  


        `
};

export default article;