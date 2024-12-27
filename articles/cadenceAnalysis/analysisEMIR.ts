import {TArticle} from "../types.ts";

const article: TArticle = {
    id: 'cadenceAnalysisEMIR',
    title: 'EM/IR analysis',
    description: 'Description of article 1',
    lastUpdate: new Date(),

    content: `
# EM/IR analysis
This page describes how to perform Electromigration (EM) analysisin Cadence Virtuoso (Voltus). 
EM analysis become important for example during the design of high-current circuits, such as LDO. IR analysis is important whne designing power rails, ESD protection etc.
Metal routing in IC design have a limited current capacity before it will fail. You can read more about electromigration here:

> ***link-to-EM***


## EM analysis setup
Workflow:
1. Extract your design using Calibre PEX  to *.dspf*;
2. Configure simulator for performing EM/IR analysis;
3. Use files *dfii_tsmc65.map* and  *tsmc65.emDataFile* for setting visual representation.

### 1. Extracting the design

>- Use usual rules files from TSMC;
>- Make sure that extraction type is set to *R+C+CC*;
>- Make sure that the output format of the file is *.dspf*.

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-extraction.png" alt="PEX settings for EMIR analysis" style="display: block; margin-inline: auto; height: 30rem" />

Extract the whole design, or only specific nets you need: 

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-net-selection.png" alt="Net selection for EMIR analysis" style="display: block; margin-inline: auto; height: 30rem" />

- Go to the PEX options tab;
- Provide ground name;
- Check that checkboxes are activated as shown.

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-PEX-options.png" alt="PEX options for EMIR analysis" style="display: block; margin-inline: auto; height: 30rem" />

- Go to the Reduction and CC tab;
- Check that the reduction is disabled.

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-PEX-reduction.png" alt="PEX reduction for EMIR analysis" style="display: block; margin-inline: auto; height: 40rem" />


### 2. Setting the analysis

- Go to the ADE L;
- Provide extracted *.dspf* file using *Simulation files* menu.

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-simulation-files.png" alt="Providing dspf for EMIR analysis" style="display: block; margin-inline: auto; height: 30rem" />

- Set type to Dynamic;
- Select instances/nets for the analysis;
- Set the EM/IR analysis options;
- Click Add/Modify;
- Add EM file (tsmc65.emDataFile).

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-ADEL.png" alt="EMIR analysis settings1" style="display: block; margin-inline: auto; height: 30rem" />

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-setup-1.png" alt="EMIR analysis settings2" style="display: block; margin-inline: auto; height: 30rem" />


- Set solver method to direct;
- Select full transient or time window for EM estimation;
- Click *Add/Modify*.

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-setup-2.png" alt="EMIR analysis settings2" style="display: block; margin-inline: auto; height: 30rem" />

- Add the *.dspf* file;
- Click *Run*;
- After run is finished, click *Apply*.

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-setup-3.png" alt="EMIR analysis settings3" style="display: block; margin-inline: auto; height: 30rem" />

- Check the temperature and process corner;
- Check that simulator is set to *aps emir*;
- Run the simulation.

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-setup-4.png" alt="EMIR analysis settings4" style="display: block; margin-inline: auto; height: 30rem" />

### Display the results

- After simulation is finished, go to:  
*Results  → EM/IR data → Layout analysis*;
- Select the layout view.

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-display-1.png" alt="EMIR analysis display settings" style="display: block; margin-inline: auto; height: 40rem" />

- You will see a heatmap of the violations on your layout.
> N.B. If the average density is more than 1, that means that the layout is not satisfying EM rules.

<br/>  
<img src="http://localhost:3000/images/cadenceAnalysis/EMIR-display-3.png" alt="EMIR analysis results example" style="display: block; margin-inline: auto; height: 40rem" />
    `
};

export default article;