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
import usefulMaterials from "@/articles/usefulMaterials/usefulMaterialsSchematic";
import noiseAnalysis from "@/articles/circuitAnalysis/noiseAnalysis";
import layoutViewer from "@/articles/designPresentation/layoutViewer";
import simulationHacks from "@/articles/simulationHacks/simulationHacks";
import cadenceEnvironmentSetup from "@/articles/cadenceEnvironmentSetup/cadenceEnvironmentSetup";
import {siteConfig} from "@/config/site";
import printableCheatsheets from "@/articles/usefulMaterials/printableCheatsheets";
import schematicDiagram from "@/articles/designPresentation/schematicDesignPresentation";
import analysisCorner from "@/articles/cadenceAnalysis/analysisCorner";
import analysisExtracted from "@/articles/cadenceAnalysis/analysisExtracted";
import analysisMonteCarlo from "@/articles/cadenceAnalysis/analysisMonteCarlo";
import parallelSimulations from "@/articles/cadenceTricks/parallelSimulations";
import usefulMaterialsSchematic from "@/articles/usefulMaterials/usefulMaterialsSchematic";
import usefulMaterialsLayout from "@/articles/usefulMaterials/usefulMaterialsLayout";
import exportGDS from "@/articles/cadenceTricks/exportGDS";
import displayParamsVerilogA from "@/articles/cadenceTricks/displayParamsVerilogA";
import HPF from "@/articles/verilogModels/HPF";
import thickerLinesCadence from "@/articles/cadenceTricks/thickerLinesCadence";
import solderDotWarning from "@/articles/cadenceTricks/solderDotWarning";
import schematicInterview from "@/articles/interviewQuestions/schematicInterview";
import sarADC from "@/articles/Circuits/sarADC";
import counter from "@/articles/verilogModels/counter";
import renumberInstances from "@/articles/cadenceTricks/renumberInstances";
import skilllIdeSetup from "@/articles/SKILL/skilllIdeSetup";
import cmosInverterLayout from "@/articles/Layout/cmosInverterLayout";
import commonDRC from "@/articles/Layout/commonDRC";
import extractingLib from "@/articles/SKILL/extractingLib";
import skillBindkeysSetup from "@/articles/SKILL/skillBindkeysSetup";
import schematicDesignPractices from "@/articles/goodDesignPractices/schematicDesignPractices";
import schematicDesignChecks from "@/articles/goodDesignPractices/schematicDesignChecks";
import layoutDesignChecks from "@/articles/goodDesignPractices/layoutDesignChecks";
import skillCreateForms from "@/articles/SKILL/skillCreateForms";
import schematicDesignPresentation from "@/articles/designPresentation/schematicDesignPresentation";
import skillExternalTools from "@/articles/SKILL/skillExternalTools";
import handlingWarnings from "@/articles/SKILL/handlingWarnings";

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
            LDO, sarADC,
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
            cadenceAnalysisEMIR, cadenceAnalysisDC,analysisPAC, analysisCorner, analysisMonteCarlo,analysisExtracted,
        ]
    },

    {
        id: 'Layout',
        title: 'Layout',
        articles: [
            layoutDependentEffects, layoutBasics, layoutMatching, layoutEditorSettings, cmosInverterLayout, commonDRC,
        ]
    },


    {
        id: 'verilogModels',
        title: 'VERILOG-A MODELS',
        articles: [
            bin2therm, dec2bin, vcoModel, dec2therm, levelShifter, LPF, HPF, nonoverlapClk, PWM, comparator, ADC, DAC,
            save2file, counter,
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
        title: 'Cadence Virtuoso Tricks',
        articles: [ netNaming, hotkeysVirtuoso, parallelSimulations, exportGDS, displayParamsVerilogA,
            thickerLinesCadence, solderDotWarning, renumberInstances,

        ]
    },


    {
        id: 'usefulMaterials',
        title: 'Useful materials',
        hideInProd: false,
        articles: [ usefulMaterialsSchematic, usefulMaterialsLayout, printableCheatsheets,

        ]
    },


    {
        id: 'designPresentation',
        title: 'Design Presentation',
        articles: [ layoutViewer, schematicDesignPresentation,

        ]
    },


    {
        id: 'simulationHacks',
        title: 'Simulation Hacks',
        hideInProd: false,
        articles: [ simulationHacks,

        ]
    },


    {
        id: 'cadenceEnvironmentSetup',
        title: 'Setting Up Cadence Environment',
        hideInProd: true,
        articles: [ cadenceEnvironmentSetup,

        ]
    },


    {
        id: 'interviewQuestions',
        title: 'Interview Questions',
        hideInProd: true,
        articles: [ schematicInterview,

        ]
    },

    {
        id: 'skill',
        title: 'SKILL',
        hideInProd: false,
        articles: [ skilllIdeSetup, extractingLib, skillBindkeysSetup, skillCreateForms, skillExternalTools, handlingWarnings,

        ]
    },

    {
        id: 'goodDesignPractices',
        title: 'Good Design Practices',
        hideInProd: true,
        articles: [ schematicDesignPractices, schematicDesignChecks, layoutDesignChecks, schematicDesignPresentation,

        ]
    },


    // {
    //     id: 'printableCheatsheets',
    //     title: 'Printable Cheatsheets',
    //     hideInProd: true,
    //     articles: [ printableCheatsheets,
    //
    //     ]
    // }
];

export const allFilteredArticles = articles
    .filter(e => !e.hideInProd || siteConfig.env.dev) // hide dev categories in prod
    .map(e => ({
        ...e,
        articles: e.articles
            .filter(e => !e.hideInProd || siteConfig.env.dev) // hide dev articles in prod
            .sort((a, b) => a.title.localeCompare(b.title)) // sort by title
    }))
    .filter(e => e.articles.length) // hide empty categories
    .sort((a, b) => a.title.localeCompare(b.title))
