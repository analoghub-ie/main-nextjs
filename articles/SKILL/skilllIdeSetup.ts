import {TArticle} from "../types";

const article: TArticle = {
    id: 'skillIdeSetup',
    title: 'Setting Up SKILL IDE in Cadence Virtuoso Environment',
    description: 'Setting Up SKILL IDE in Cadence Virtuoso Environment',
    lastUpdate: new Date('2022-01-01'),
    hideInProd: false,
    content: `

### Contents:
1. [Writing SKILL Code](#writingSkill)
2. [Invoking SKILL IDE](#invokeSkillIde)
3. [Writing Your First Program](#firstSkillProgram)
4. [Exploring SKILL Functions](#exploreSkillFunctions)


## Setting Up SKILL IDE in Cadence Virtuoso Environment
This guide will show you how to set up the SKILL IDE within Cadence's Virtuoso environment, enabling you to write and 
execute SKILL programming language scripts to create custom tools and automate tasks.

<div id="writingSkill"></div>

### 1. Writing SKILL Code
You can write SKILL code using any text editor, as long as you save the code with a .il file extension. For example, a 
file might be named *move_pins.il*. However, using the dedicated SKILL IDE is recommended due to its built-in features 
that enhance coding efficiency, such as breakpoints, error highlighting, and name completion.

<div id="invokeSkillIde"></div>

### 2. Invoking SKILL IDE
To open the SKILL IDE, go to ***CIW -> Tools -> SKILL IDE…***

<br/> <img src="http://localhost:3000/images/skill/invokeSkill.png" disableinvert alt="Invoking SKILL IDE" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">Invoking SKILL IDE</p> 

<div id="firstSkillProgram"></div>

### 3. Writing Your First Program

To test the setup, start by writing a simple program, such as the classic "Hello, World!" example.

<br/> <img src="http://localhost:3000/images/skill/helloWorldSkill.png" disableinvert alt="Hello World using SKILL" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Hello World using SKILL</p> 

To load and execute your SKILL code:
1.\tSave your script with a .il extension.
2.\tIn the SKILL IDE, click the curly-arrow icon to load the file.
3.\tAfter loading, the output will be displayed in the CIW.

<br/> <img src="http://localhost:3000/images/skill/loadCodeSkill.png" disableinvert alt="Loading SKILL code" style="display: block; margin-inline: auto; width: min(80%, 40rem)" /> 
<p style="display: block; text-align: center">Loading SKILL code</p> 


Note: You can also write and execute SKILL code directly in the CIW, though using the SKILL IDE provides additional 
functionalities that streamline the development process.

<br/> <img src="http://localhost:3000/images/skill/outputSkill.png" disableinvert alt="SKILL code output" style="display: block; margin-inline: auto; width: min(80%, 30rem)" /> 
<p style="display: block; text-align: center">SKILL code output</p> 

<div id="exploreSkillFunctions"></div>

### 4. Exploring SKILL Functions
To delve deeper into the SKILL programming language, refer to Cadence's forums and official documentation. 
Additionally, the SKILL API Finder is a valuable tool for discovering functions and their descriptions.
To open API Finder, go to **CIW -> Tools -> SKILL API Finder**

<br/> <img src="http://localhost:3000/images/skill/skillApiFinder.png" disableinvert alt="SKILL API finder" style="display: block; margin-inline: auto; width: min(80%, 20rem)" /> 
<p style="display: block; text-align: center">SKILL API finder</p> 

This will open a window where you can search for any SKILL function and view its description. For detailed documentation, 
click on "More Info..." to access comprehensive information about each function.

<br/> <img src="http://localhost:3000/images/skill/skillDocumentation.png" disableinvert alt="SKILL Documentation View" style="display: block; margin-inline: auto; width: min(80%, 25rem)" /> 
<p style="display: block; text-align: center">SKILL Documentation View</p> 

`
};

export default article;