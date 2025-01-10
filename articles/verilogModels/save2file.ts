import {TArticle} from "../types";

const article: TArticle = {
    id: 'save2file',
    title: 'Veriliog-A for saving sim results to file',
    description: 'Veriliog-A for saving sim results to file',
    lastUpdate: new Date('2022-01-01'),

    content: `
## ADC
This article contains Verilog-A model for saving simulation results to *.txt* file.


**Usage:**

1. Create a new cell in Library Manager named *save2file* and select cell type *Verilog A*;
2. Copy and paste the code provided;
3. Modify *path* variable to define the path to the output text file;
4. Perform *Check and Save*;
5. A cell symbol will be created;
6. Instantiate *save2file* cell into your design;
7. Perform *Check and Save* and run the simulation.

</br>


> **Cell name:** save2file

> **Model type:** Verilog-A

<pre><code class="language-verilog">
// Verilog-A file for saving sim data to .txt
// Authors: I.Smirnov,  M.Gaidukov
// Source: AnalogHub.ie

\`include "constants.vams"
\`include "disciplines.vams"

module save2file(smp,in);
input smp, in;
voltage smp, in;

parameter real vdd = 1;
parameter real vth = vdd/2;
parameter real montecarlo = 0;
parameter string file_nm = "idle";
parameter string path = "";                     // "YOUR_PATH/FILENAME.txt"

integer fp = 0;
integer file_number;
string file_number_str;
analog begin
  @(initial_step) begin
    if (montecarlo > 0.5) begin
      file_number = {$random} % 1000;
      $sformat(file_number_str,"%d",file_number);
      fp = $fopen({path,file_nm,"_mc_",file_number_str,".txt"},"w");
    end
    else begin
//      $sformat(file_nm_string,"%d",file_nm);
      fp = $fopen({path,file_nm,".txt"},"w");
    end
  end
  @(cross(V(smp)-vth,+1)) begin
    $fwrite(fp,"%e ",V(in));
    $fwrite(fp,"\\n");
  end
end
endmodule
</code></pre>


> Authors: I. Smirnov, M. Gaidukov

    `
};

export default article;