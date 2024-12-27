import article1 from "./category1/article1.ts";
import article2 from "./category2/article2.ts";
import LDO from "./Circuits/LDO.ts";
import circuitAnalysisTransferFunction from "./circuitAnalysis/transferFunctions.ts";
import cadenceAnalysisEMIR from "./cadenceAnalysis/analysisEMIR.ts";
import cadenceAnalysisDC from "./cadenceAnalysis/analysisDC.ts";
import {TCategory} from "./types.ts";
import analysisPAC from "./cadenceAnalysis/analysisPAC.ts";
import bin2therm from "./verilogModels/bin2therm.ts";
import dec2bin from "./verilogModels/dec2bin.ts";
import vcoModel from "./verilogModels/VCO.ts";
import layLayoutDependentEffects from "./Layout/layLayoutDependentEffects.ts";

export const articles: TCategory[] = [
    {
        id: 'category1',
        title: 'Category 1',
        articles: [
            article1,
        ]
    },
    {
        id: 'category2',
        title: 'Category 2',
        articles: [
            article2,
        ]
    },

    {
        id: 'Circuits',
        title: 'circuits',
        articles: [
            LDO,
        ]
    },

    {
        id: 'circuitAnalysis',
        title: 'Circuit analysis',
        articles: [
            circuitAnalysisTransferFunction,
        ]
    },

    {
        id: 'cadenceAnalysis',
        title: 'Cadence analysis',
        articles: [
            cadenceAnalysisEMIR, cadenceAnalysisDC,analysisPAC,
        ]
    },

    {
        id: 'Layout',
        title: 'Layout',
        articles: [
            layLayoutDependentEffects,
        ]
    },


    {
        id: 'verilogModels',
        title: 'Verilog-A models',
        articles: [
            bin2therm, dec2bin, vcoModel,
        ]
    }
];
