import {TArticle} from "../types";

const article: TArticle = {
    id: 'usefulMaterials',
    title: 'Useful links, books and sources',
    description: 'This is a compilation of the useful links, books and sources for Analog IC Designers',
    lastUpdate: new Date('2022-01-01'),

    content: `
    
## Contents:

1. [Analog IC Design Theory Videos](#analogVideos);
2. [Analog IC Design Books](#analogDesignBooks);

<div id="analogDesignVideos"></div>

## 1. Analog IC Design Theory Videos

 - [Analog IC Design by Prof. B. Razavi, Part1](https://www.youtube.com/watch?v=yQDfVJzEymI&list=PLyYrySVqmyVPzvVlPW-TTzHhNWg1J_0LU);
 - [Analog IC Design by Prof. B. Razavi, Part2](https://www.youtube.com/watch?v=pK2elUcXWzs&list=PLO4mxQzfcml_56XSGcA8ULOv7qEtZd0Hy);
 - [Circuit Analysis for Analog Designers, IIT Madras by Prof. Shanthi Pavan](https://nptel.ac.in/courses/117106148);
 
 
## 2. Analog Design Books

## 3. Layout tutorials
- [Layout Tutorials Playlist (AnalogHub)](https://www.youtube.com/watch?v=hm_Q0dSpx1I&list=PL0oLvNvFrW9xbe26NgdX-HsknCJ4ioGT7)

<div id="analogDesignBooks"></div>

## Schematic design


    `
};

export default article;