import {TArticle} from "../types";

const article: TArticle = {
    id: 'solderDotWarning',
    title: 'How to get rid of solder dot warning (intersection of 4 wires) in Cadence Virtuoso',
    description: 'How to get rid of solder warning (intersection of 4 wires) in Cadence Virtuoso',
    lastUpdate: new Date('2022-01-01'),
    hideInProd: false,
    content: `


## How to get rid of solder warning (intersection of 4 wires) in Cadence Virtuoso?

<br/> <img src="http://localhost:3000/images/cadenceTricks/solder-dot-issue.png" disableinvert alt="Solder dot warning" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Solder dot warning</p> 

<br/> <img src="http://localhost:3000/images/cadenceTricks/solder-dot-fix.png" disableinvert alt="Solder dot warning fix" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Solder dot warning fix</p> 

##  7. Renumerating instances in Cadence Virtuoso

<br/> <img src="http://localhost:3000/images/cadenceTricks/renumerating-instances-1.png" disableinvert alt="Renumerating instances (before)" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Renumerating instances (before)</p> 

<br/> <img src="http://localhost:3000/images/cadenceTricks/renumerating-instances-2.png" disableinvert alt="Renumerating instances (after)" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Renumerating instances (after)</p> 

`
};

export default article;