import {TArticle} from "../types";

const article: TArticle = {
    id: 'layoutEditorSettings',
    title: 'Layout editor settings and tricks',
    description: 'This article describes how to properly set Layout Editor and use it efficiently',
    lastUpdate: new Date('2025-01-04'),
    content: `

## Layout editor settings and tricks

### Table of Contents
1. [Basic Layout editor settings](#basicSettings)
2. [DRD settings](#drdSettings)

<div id="basicSettings"></div>

### 1. Basic Layout editor settings

To prevent DRC errors and simplify layout, check the following setting in Layout Editor (hotkey E):
1. ***Pin Names***  - to display pin names on layout;
2. ***Net Expressions*** - to display net expressions on nets;
3. ***Grid controls*** - check that spacings are the same as recommended by the manufacturer - 
that would prevent *"Off-grid"* errors which are extremely hard and time-taking to fix!
4. ***Enable Dimming*** - to highlight the object when selecting it.

<br/> <img src="http://localhost:3000/images/layout/layout-editor-settings-1.svg" alt="Basic layout editor settings" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Basic layout editor settings</p> 

<div id="drdSettings"></div>

### 2. DRD settings

Next, let's focus on a very important palette - DRD (Design-Rule-Driven). This setting will stop you from violating the 
spacing-related DRC rules and will significantly reduce the amount of DRC violations. This palette has 3 main options:
- DRD off;
- DRD Warning On
- DRD Stop On.

<br/> <img src="http://localhost:3000/images/layout/layout-editor-settings-2.svg" alt="Basic layout editor settings" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Basic layout editor settings</p>

If the **DRD** option is **off**, it will allow you to violate all spacing-related DRC rules:

<br/> <img src="http://localhost:3000/images/layout/drd-off.gif" disableinvert alt="DRD off" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">DRD off</p> 

If the **DRD** option is set to **Warning On**, then it will still allow the designer to violate spacing-related DRC rules, 
but you will see a halo with the description of the violated rule:

<br/> <img src="http://localhost:3000/images/layout/drd-warning.gif" disableinvert alt="DRD warning on" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">DRD warning on</p>

If the **DRD** option is set to **Stop On**, then it will not allow to violate spacing-related DRC rules:

<br/> <img src="http://localhost:3000/images/layout/drd-stop.gif" disableinvert alt="DRD stop on" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">DRD stop on</p>  
        
        `
};

export default article;