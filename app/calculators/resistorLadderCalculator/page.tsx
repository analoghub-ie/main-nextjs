import React from "react";

import ResistorLadderCalculator from "@/components/calculators/ResistorLadderCalculator";
import SeriesParallelCalculator from "@/components/calculators/SeriesParallelCalculator";
import PCBCalculator from "@/components/calculators/PCBCalculator";

export const metadata = {
    title: "Resistor Ladder Calculator",
    description: "Interactive resistor ladder calculator for voltage divider networks.",
};

export default function ResistorLadderCalculatorPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8 text-center">
                Resistor Ladder Calculator
            </h1>
            <ResistorLadderCalculator/>

            <h1 className="text-3xl font-bold mb-8 text-center">
                Series-Parallel Calculator
            </h1>
            <SeriesParallelCalculator/>

            <h1 className="text-3xl font-bold mb-8 text-center">
                PCB Calculator
            </h1>
            <PCBCalculator/>
        </main>
    );
}