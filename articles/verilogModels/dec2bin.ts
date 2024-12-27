import {TArticle} from "../types";

const article: TArticle = {
    id: 'dec2bin',
    title: 'Decimal to Binary Encoder',
    description: 'Description of article 1',
    lastUpdate: new Date('2022-01-01'),

    content: `
## Decimal-to-Binary Encoder
This page contains Verilog-A model of the decimal to binary encoder. 
</br>

**Usage:**

1. Create a new cell in Library Manager named *dec2bin* and select cell type *Verilog A*;
2. Copy and paste the code provided;
3. Specify *binary_bits* variable to be the desired binary bits number;
4. Perform *Check and Save*;
5. A cell symbol will be created;
6. Instantiate *dec2bin* cell into your design;
7. Perform *Check and Save* and run the simulation.


<pre><code class="language-verilog">
// Decimal number to binary code converter
// LSB is [0]
// Change binary_bits variable for your needs!
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"
\`define binary_bits 8\t\t\t\t// define number of binary bits here

module dec2bin(out);
output [\`binary_bits-1:0] out;
voltage [\`binary_bits-1:0] out;

parameter real decimal_number = 5;
parameter real vdd = 1.0;\t\t\t// voltage level of logic 1 (V)
parameter real vss = 0;\t\t\t\t// voltage level of logic 0 (V)
real dout[\`binary_bits-1:0];\t\t// internal result variable
genvar i;
real x;
real z;

analog begin
// Converting decimal to binary using modulus of 2
\tx = decimal_number;
while (x!=0) begin
\tfor (i = 0; i <\`binary_bits; i = i + 1) begin
\t\tz = x/2.0;
\t\tx = floor(z);\t
\t\tdout[i] = ceil(z - x);
\tend
end

// Plotting outputs
for (i=0; i<\`binary_bits; i=i+1)
\t    V(out[i]) <+ transition(dout[i]*vdd,0,0);
end

endmodule
</code></pre>
         
        `
};

export default article;