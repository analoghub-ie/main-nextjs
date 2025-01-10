import {TArticle} from "../types";

const article: TArticle = {
    id: 'cadenceTricksRenamingNets',
    title: 'How to rename all nets in Cadence Virtuoso?',
    description: 'This article describes how to rename all nets in Cadence Virtuoso',
    lastUpdate: new Date('2022-01-01'),

    content: `

### List of tricks
1. [How to rename multiple nets simultaniously?](#multipleNetsRename)
2. [How to create a bus?](#busNaming)
3. [How to edit net name directly in Cadence Virtuoso?](#directNetEditing)

<div id="multipleNetsRename"></div>


## How to rename all nets in Cadence Virtuoso?
This is how to rename multiple nets in Cadence Virtuoso.
1. Have your schematic with the multiple nets that you want to rename simultaniously:

<br/> <img src="http://localhost:3000/images/cadenceTricks/renaming-multiple-nets-1.png" alt="Original schematic with multiple nets" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Original schematic with multiple nets</p> 

2. Create a pin named same as your current net name (Press *P* and enter the net name you have in the schematic):
<br/> <img src="http://localhost:3000/images/cadenceTricks/renaming-multiple-nets-2.png" alt="Creating a pin with the same net name" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Creating a pin with the same net name</p> 

Add the pin to the schematic and press *Check and Save* (or *Shift+X*).

3. Change the pin name to the desired net name:
You can select the created pin and press **Q hotkey** to open properties and edit the name of the pin or select pin name and press **T** to edit-in-place:

<br/> <img src="http://localhost:3000/images/cadenceTricks/renaming-multiple-nets-3.png" alt="Renaming a pin to a target name" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Renaming a pin to a target name</p> 

Change the name of the pin to the *target net name* and perform *Check and Save*. All your nets are now renamed.




<div id="busNaming"></div>

## 1. How to create a bus in Cadence Virtuoso?

1. First, press **L** hotkey to create a wire name:

<br/> <img src="http://localhost:3000/images/cadenceTricks/bus-naming-1.png" alt="Bus nets" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Bus nets</p> 

2. Then, create a bus name and add an index, according to the number of nets (in this example we have 4 nets so the net 
index is <0:3> or <1:4>) and select options *Expand Bus Names* and *Attach to Multiple Wires*:

<br/> <img src="http://localhost:3000/images/cadenceTricks/bus-naming-2.png" alt="Adding bus name" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Adding bus name</p> 

3. Then, click on the first net of the bus and stretch till the las one:

<br/> <img src="http://localhost:3000/images/cadenceTricks/bus-naming-3.png" alt="Stretching a bus name" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Stretching a bus name</p> 

4. Bus has been created!

<br/> <img src="http://localhost:3000/images/cadenceTricks/bus-naming-4.png" alt="Bus naming results" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Bus naming results</p> 

<div id="directNetEditing"></div>

## 2. How to edit net name directly in Cadence Virtuoso?

Select the net name and press **T hotkey**. Now you can enter net name directly:

<br/> <img src="http://localhost:3000/images/cadenceTricks/direct-net-editing.png" alt="Bus nets" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Bus nets</p> 
    

`
};

export default article;