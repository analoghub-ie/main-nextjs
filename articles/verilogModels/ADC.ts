import {TArticle} from "../types";

const article: TArticle = {
    id: 'ADC',
    title: 'ADC model',
    description: 'Verilog-A model for an ADC',
    lastUpdate: new Date('2022-01-01'),

    content: `
## ADC
This article contains Verilog-A model for an Analog-to-Digital Converter (ADC).


**Usage:**

1. Create a new cell in Library Manager named *ADC* and select cell type *Verilog A*;
2. Copy and paste the code provided;
3. Modify *bits* variable to define ADC resolution;
4. Specify *vmin* and *vmax *variables to define the input signal swing;
5. Specify *vdd* and *vss* variables to define output voltage levels;
6. Specify *tt* and *td* variables to define rising/falling edge times and output signal delay;
7. Specify *dir* variable to be +1 for rising and -1 for falling clock edge triggering;
8. Perform *Check and Save*;
9. A cell symbol will be created;
10. Instantiate *ADC* cell into your design;
11. Perform *Check and Save* and run the simulation.

</br>


> **Cell name:** ADC

> **Model type:** Verilog-A

<pre><code class="language-verilog">   


</code></pre>

    `
};

export default article;