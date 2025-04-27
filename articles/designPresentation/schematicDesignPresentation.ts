import {TArticle} from "../types";

const article: TArticle = {
    id: 'schematicDesignPresentation',
    title: 'Schematic Design Presentation',
    description: 'Creating clean and informative schematic diagrams for Analog IC design',
    lastUpdate: new Date('2025-04-26'),
    hideInProd: true,
    content: `
   

### Contents:
1. [Block Diagrams](#blockDiagrams)
2. [Schematic diagrams](#schematicDiagrams)
3. [Cadence Virtuoso Schematic export](#virtuosoExport)

<div id="blockDiagrams"></div>

### 1. Block Diagrams


<div id="schematicDiagrams"></div>

### 2. Schematic Symbols
How many times we've seen ugly drawings in papers, design presentations and guides?

<br/> <img src="http://localhost:3000/images/designPresentation/schDiagramBad.png" disableinvert alt="Looks terrible, isn't it?" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">Looks terrible, isn't it?</p> 

Designers and researchers use different software to present their designs or ideas - Visio, PowerPoint, CorelDraw etc.
Most of this software is not free and not available for everyone. After months of searching for a solution, I've decided 
to create a symbol library for an open-source [Inkscape](https://inkscape.org/), that allows to create vector drawings 
and export them in any suitable format, which is very handy. 



**How to use:**
1. [Download the source file]()
2. Paste the file into the following directory (create one if it doesn't exist):

- **Windows:** *C:\\Users\\username\\AppData\\Roaming\\inkscape\\symbols*

- **Linux:** *~/.config/inkscape/symbols*

- **macOS:** */Users/username/.config/inkscape/symbol*

3. Open the symbols bar: **Object -> Symbols -> AnalogHub-symbols**
4. Drag and Drop the symbol you need or use search.

**Guidelines:**
- Default line thickness is **0.75px**
- Default text size is **3pt**
- Do not resize the individual elements!
- If there is a need to modify symbol, press Ctrl+Shift+G to ungroup
- Always use grid
- Enable snapping!
- Grid on/off by # key
- Export drawings in *.svg* or *.pdf* format to preserve image quality
- Increase DPI during export to 1500 to improve image quality

If you have any suggestions or want any other symbols to be added, please send an email to: contact@analoghub.ie

<div id="virtuosoExport"></div>

### 3. Cadence Virtuoso Schematic Export
- Disable grid
- Increase line thickness
- Change background (if neccessary)
- Use scaling for large designs 
    
    `
};

export default article;