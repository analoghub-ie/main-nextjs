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
import layoutDependentEffects from "./Layout/layoutDependentEffects";
import dec2therm from "@/articles/verilogModels/dec2therm";
import levelShifter from "@/articles/verilogModels/levelShifter";
import LPF from "@/articles/verilogModels/LPF";
import nonoverlapClk from "@/articles/verilogModels/nonoverlapClk";
import PWM from "@/articles/verilogModels/PWM";
import comparator from "@/articles/verilogModels/comparator";
import ADC from "@/articles/verilogModels/ADC";
import pcbTraceCalculator from "@/articles/matlabScripts/pcbTraceCalculator";
import layoutBasics from "@/articles/Layout/layoutBasics";
import layoutMatching from "@/articles/Layout/layoutMatching";
import DAC from "@/articles/verilogModels/DAC";
import layoutEditorSettings from "@/articles/Layout/layoutEditorSettings";
import save2file from "@/articles/verilogModels/save2file";
import netNaming from "@/articles/cadenceTricks/netNaming";
import hotkeysVirtuoso from "@/articles/cadenceTricks/hotkeysVirtuoso";
import usefulMaterials from "@/articles/usefulMaterials/usefulMaterials";
import noiseAnalysis from "@/articles/circuitAnalysis/noiseAnalysis";
import layoutViewer from "@/articles/designPresentation/layoutViewer";
import simulationHacks from "@/articles/simulationHacks/simulationHacks";
import cadenceEnvironmentSetup from "@/articles/cadenceEnvironmentSetup/cadenceEnvironmentSetup";
import {siteConfig} from "@/config/site";


const articles: TCategory[] = [
    {
        id: 'category1',
        title: 'Category 1',
        hideInProd: true,
        articles: [
            article1,
        ]
    },

    {
        id: 'Circuits',
        title: 'Circuits',
        hideInProd: true,
        articles: [
            LDO,
        ]
    },

    {
        id: 'circuitAnalysis',
        title: 'Circuit analysis',
        hideInProd: true,
        articles: [
            circuitAnalysisTransferFunction, noiseAnalysis,
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
            layoutDependentEffects, layoutBasics, layoutMatching, layoutEditorSettings,
        ]
    },


    {
        id: 'verilogModels',
        title: 'Verilog-A models',
        articles: [
            bin2therm, dec2bin, vcoModel, dec2therm, levelShifter, LPF, nonoverlapClk, PWM, comparator, ADC, DAC, save2file,
        ]
    },


    {
        id: 'matlabScripts',
        title: 'MATLAB scripts',
        articles: [
            pcbTraceCalculator,
        ]
    },


    {
        id: 'skillScripts',
        title: 'SKILL scripts',
        hideInProd: true,
        articles: [

        ]
    },


    {
        id: 'cadenceTricks',
        title: 'Cadence Virtuoso tricks',
        articles: [ netNaming, hotkeysVirtuoso,

        ]
    },


    {
        id: 'usefulMaterials',
        title: 'Useful links, books and sources',
        hideInProd: true,
        articles: [ usefulMaterials,

        ]
    },


    {
        id: 'designPresentation',
        title: 'Design Presentation',
        articles: [ layoutViewer,

        ]
    },


    {
        id: 'simulationHacks',
        title: 'Simulation Hacks',
        hideInProd: true,
        articles: [ simulationHacks,

        ]
    },


    {
        id: 'cadenceEnvironmentSetup',
        title: 'Setting Up Cadence Environment',
        hideInProd: true,
        articles: [ cadenceEnvironmentSetup,

        ]
    }
];

export const allFilteredArticles = articles
    .filter(e => !e.hideInProd || siteConfig.env.dev) // hide dev categories in prod
    .map(e => ({...e, articles: e.articles.filter(e => !e.hideInProd || siteConfig.env.dev).sort((a, b) => a.title.localeCompare(b.title))})) // hide dev articles in prod
    .filter(e => e.articles.length) // hide empty categories
    .sort((a, b) => a.title.localeCompare(b.title))