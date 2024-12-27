import article1 from "./category1/article1";
import article2 from "./category2/article2";
import LDO from "./Circuits/LDO";
import circuitAnalysisTransferFunction from "./circuitAnalysis/transferFunctions";
import cadenceAnalysisEMIR from "./cadenceAnalysis/analysisEMIR";
import cadenceAnalysisDC from "./cadenceAnalysis/analysisDC";
import {TCategory} from "./types";
import analysisPAC from "./cadenceAnalysis/analysisPAC";
import bin2therm from "./verilogModels/bin2therm";
import dec2bin from "./verilogModels/dec2bin";
import vcoModel from "./verilogModels/VCO";
import layLayoutDependentEffects from "./Layout/layLayoutDependentEffects";

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
