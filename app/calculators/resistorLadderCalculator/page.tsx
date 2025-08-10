import React from "react";
import ResistorLadderCalculator from "@/components/calculators/ResistorLadderCalculator";

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
            <ResistorLadderCalculator />
        </main>
    );
}