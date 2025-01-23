import {TArticle} from "../types";

const article: TArticle = {
    id: 'cadenceAnalysisDC',
    title: 'DC analysis',
    description: 'Description of article 1',
    lastUpdate: new Date('2022-01-01'),
    hideInProd: true,

    content: `
# DC analysis


## DC OP
- Results annotation (print on schematic)
- Results use in calculator
## DC Sweep
    `
};

export default article;
