import {TArticle} from "../types";

const article: TArticle = {
    id: 'article1',
    title: 'Article 1',
    description: 'Description of article 1',
    lastUpdate: new Date(),

    content: `
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6

<br/>

<pre><code class="language-js">
var name = "World";
console.warn("Hello, " + name + "!")
</code></pre>

<pre><code class="language-lisp">
procedure(helloWorld()
  let((name)
    name = "World"
    printf("Hello, %s!\\\\n" name)
  )
)
</code></pre>

<pre><code class="language-verilog">
\`include "discipline.h"

module helloWorld;
  electrical in, out;

  analog begin
    @(initial_step) $display("Hello, World!");
  end
endmodule
</code></pre>

<pre><code class="language-bash">#!/bin/bash
name="World"
echo "Hello, $name!"
</code></pre>

<br/>

<div style="display: block; margin-inline: auto; width: min(90%, 100rem); aspect-ratio: 16/9">
    <iframe 
        src="https://www.youtube.com/embed/F4EArOqNNSU" 
        alt="3D GDS viewer from the IC Design Group, University of Twente" 
        style="width: 100%; height: 100%; border: none;">
    </iframe>
</div>

<br/>

<h6 style="text-align: center;">Центрированный h6</h6>

<br/>

I think I'll use it to format all of my documents from now on. It's a lot easier to read than HTML.

<br/>

**Bold**  
*Italic*  
~~Strikethrough~~  

<br/>

Ordere list:
- Item 1
- Item 2
    1. Item 1
    2. Item 2
        1. Item 3
- Item 3

<br/>

Unordered list:
1. Item 1
2. Item 2
    - 1
    - 2
    - 3
3. Item 3  

<br/>

> Sidetext
>> Sidetext
> Sidetext

<br/>

Link [Analoghub](http://analoghub.ie/)

<br/>

TABLE:
| |Title 1|Title 2|Title 3|Title 4|Title 5|Title 6|Title 7|Title 8|
|-|-------|-------|-------|-------|-------|-------|-------|-------|
|A|xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |
|B|xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |
|C|xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |xxx    |

<br/>

LaTeX (FORMULAS):
$$
\\Gamma(z) = \\int_0^\\infty t^{z-1}e^{-t}dt\\,.
$$

<br/>

Image 1: ![AnalogHub](PASTEURLHERE/images/activity.svg)  

<br/>

Image 2:
<img src="PASTEURLHERE/images/activity.svg" alt="AnalogHub" style="display: block; margin-inline: auto; width: min(80%, 20rem)" />
<iframe width="928" height="522" src="https://www.youtube.com/embed/nKa9xSz4z84" title="Inkscape create symbols" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
`
};

export default article;