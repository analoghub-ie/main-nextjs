import {TArticle} from "../types";

const article: TArticle = {
    id: 'levelShifter',
    title: 'Level shifter model',
    description: 'Verilog-A model for level shifter (digital)',
    lastUpdate: new Date('2022-01-01'),

    content: `
## Digital Level Shifter
This article contains Verilog-A model for a digital Level Shifter.


**Usage:**

1. Create a new cell in Library Manager named *level_shifter* and select cell type *Verilog A*;
2. Copy and paste the code provided;
3. Specify *input_swing* variable to be the output swing;
4. Specify *t_edge* and *t_delay* variables to be the rising/falling time and delay of the output waveform;
5. Perform *Check and Save*;
6. A cell symbol will be created;
7. Instantiate *level_shifter* cell into your design;
8. Perform *Check and Save* and run the simulation.

</br>

> **Cell name:** level_shifter

> **Model type:** Verilog-A

<pre><code class="language-verilog">    
// Digital level shifter
// Takes differential input - connect your signal to inp, reference to inn
// Output will be level-shifted to the "low" and "high" levels
// Author: A. Sidun
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"

module level_shifter (inp, inn, outn, outp, low, high);
    input inp, inn, low, high;
    output outp, outn;
    electrical inp, inn, outp, outn, low, high;
\tinteger d_outp, d_outn;             // logic output state

   \tparameter real input_swing = 5.0;   // define input singnal swing
\tparameter real t_edge = 1e-9;
\tparameter real t_delay = 1e-9;

analog begin
@(initial_step) begin
    d_outp = 0;
    d_outn = 1;
    end

@(cross(V(inp)-V(inn) - 0.5*input_swing,0)) begin
    if (V(inp)-V(inn)>0.5*input_swing) begin
        d_outp = 1;
        d_outn = 0;
    end
    else begin
        d_outp = 0;
        d_outn = 1;
end // end if

end // end cross

V(outp) <+ V(high)*transition(d_outp,t_delay,t_edge) + V(low)*transition(d_outn,t_delay,t_edge);
V(outn) <+ V(high)*transition(d_outn,t_delay,t_edge) + V(low)*transition(d_outp,t_delay,t_edge);

end //analog begin
endmodule
</code></pre>

    `
};

export default article;