import article1 from "./category1/article1";
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
import dec2therm from "@/articles/verilogModels/dec2therm";
import levelShifter from "@/articles/verilogModels/levelShifter";
import LPF from "@/articles/verilogModels/LPF";
import nonoverlapClk from "@/articles/verilogModels/nonoverlapClk";


export const articles: TCategory[] = [
    {
        id: 'category1',
        title: 'Category 1',
        onlyDev: true,
        articles: [
            article1,
        ]
    },

    {
        id: 'Circuits',
        title: 'Circuits',
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
            bin2therm, dec2bin, vcoModel, dec2therm, levelShifter, LPF, nonoverlapClk,
        ]
    }
];
