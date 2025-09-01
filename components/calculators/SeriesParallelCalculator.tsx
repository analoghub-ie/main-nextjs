"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { Divider } from "@heroui/react";
import UnitSelect from "./UnitSelect";

type Result = {
    target: number;
    unit: number;
    counts: number[];
    total: number;
    accuracyPct: number;
};

const UNIT_OPTIONS = ["Ω", "kΩ", "MΩ"];
const MAX_GROUPS = 1000; // fixed constant

// --- helpers ---
function fmt(num: number, digits = 3) {
    return Number(num.toFixed(digits));
}

function formatSmartOhms(value: number): string {
    if (Math.abs(value) >= 1e6) return fmt(value / 1e6, 3) + " MΩ";
    if (Math.abs(value) >= 1e3) return fmt(value / 1e3, 3) + " kΩ";
    return fmt(value, 3) + " Ω";
}

function convertFromUnit(value: number, unit: string) {
    switch (unit) {
        case "kΩ":
            return value * 1e3;
        case "MΩ":
            return value * 1e6;
        default:
            return value;
    }
}

export default function SeriesParallelCalculator() {
    const [rUnit, setRUnit] = useState<number>(1000);
    const [rUnitUnit, setRUnitUnit] = useState<string>("Ω");
    const [targetsText, setTargetsText] = useState<string>(
        "1750,2250,1250,2250"
    );
    const [targetsUnit, setTargetsUnit] = useState<string>("Ω");
    const [accuracyTolerance, setAccuracyTolerance] = useState<number>(1);
    const [results, setResults] = useState<Result[] | null>(null);

    const parseTargets = (text: string, unit: string) =>
        text
            .split(/[ ,;]+/)
            .map((s) => parseFloat(s.trim()))
            .filter((n) => !isNaN(n) && n > 0)
            .map((n) => convertFromUnit(n, unit));

    const compute = (
        rUnit: number,
        targets: number[],
        tolerance: number
    ) => {
        const results: Result[] = [];
        for (const target of targets) {
            let x = target;
            const counts = new Array(MAX_GROUPS).fill(0);

            for (let i = 1; i <= MAX_GROUPS; i++) {
                const segR = rUnit / i;
                const howMany = Math.floor(x / segR);
                counts[i - 1] = howMany;
                x -= howMany * segR;
                if (x < (target / 100) * tolerance) break;
            }

            let total = counts.reduce(
                (sum, c, i) => sum + c * (rUnit / (i + 1)),
                0
            );
            const acc =
                100 - Math.abs((target - total) / target) * 100; // accuracy definition

            let lastNonZero = counts.length - 1;
            while (lastNonZero > 0 && counts[lastNonZero] === 0) lastNonZero--;

            results.push({
                target,
                unit: rUnit,
                counts: counts.slice(0, lastNonZero + 1),
                total,
                accuracyPct: acc,
            });
        }
        return results;
    };

    const onCompute = (e?: React.FormEvent) => {
        e?.preventDefault();
        const parsedTargets = parseTargets(targetsText, targetsUnit);
        if (!parsedTargets.length)
            return alert("Enter at least one target resistance");
        setResults(
            compute(
                convertFromUnit(rUnit, rUnitUnit),
                parsedTargets,
                accuracyTolerance
            )
        );
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card className="bg-background text-text">
                <CardHeader className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold text-primary">
                        Series–Parallel Resistor Calculator
                    </h1>
                </CardHeader>
                <CardBody>
                    <form onSubmit={onCompute} className="grid grid-cols-1 gap-4">
                        {/* Unit resistor */}
                        <div className="flex gap-2 w-full">
                            <Input
                                label="Unit resistor"
                                type="number"
                                step="any"
                                value={String(rUnit)}
                                onChange={(e) => setRUnit(parseFloat(e.target.value))}
                                className="w-2/3"
                                size="lg"
                            />
                            <UnitSelect
                                label="Units"
                                value={rUnitUnit}
                                options={UNIT_OPTIONS}
                                onChange={setRUnitUnit}
                            />
                        </div>

                        {/* Target resistances */}
                        <div className="flex gap-2 w-full">
                            <Input
                                label="Target resistances"
                                value={targetsText}
                                onChange={(e) => setTargetsText(e.target.value)}
                                className="w-2/3"
                                size="lg"
                            />
                            <UnitSelect
                                label="Units"
                                value={targetsUnit}
                                options={UNIT_OPTIONS}
                                onChange={setTargetsUnit}
                            />
                        </div>

                        {/* Accuracy tolerance */}
                        <div className="w-full">
                            <Input
                                label="Accuracy tolerance (%)"
                                type="number"
                                step="any"
                                value={String(accuracyTolerance)}
                                onChange={(e) =>
                                    setAccuracyTolerance(parseFloat(e.target.value))
                                }
                                className="w-full"
                                size="lg"
                            />
                        </div>

                        {/* Centered button */}
                        <div className="flex justify-center w-full">
                            <Button
                                type="submit"
                                color="primary"
                                className="mb-6 w-full bg-primary text-white hover:bg-primary/80"
                            >
                                Calculate
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>

            {/* Results */}
            {results &&
                results.map((r, idx) => (
                    <Card key={idx} className="bg-background text-text">
                        <CardHeader>
                            <div
                                className={`w-full text-sm text-center font-semibold ${
                                    r.accuracyPct >= 100 - accuracyTolerance
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                Accuracy: {fmt(r.accuracyPct, 2)}% (tolerance ≥{" "}
                                {fmt(100 - accuracyTolerance, 2)}%)
                            </div>
                        </CardHeader>

                        <Divider className="bg-secondary/20" />
                        <CardBody>
                            <table className="w-full text-sm border-collapse text-center">
                                <thead>
                                <tr className="border-b border-secondary/30 bg-secondary/10">
                                    <th className="p-2 text-secondary">
                                        Type of connection
                                    </th>
                                    <th className="p-2 text-secondary">
                                        Number of resistors
                                    </th>
                                    <th className="p-2 text-secondary">
                                        Total resistance
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {r.counts[0] > 0 && (
                                    <tr className="hover:bg-primary/10 transition-colors">
                                        <td className="p-2">Series</td>
                                        <td className="p-2 text-primary font-medium">
                                            {r.counts[0]}
                                        </td>
                                        <td className="p-2 text-primary font-medium">
                                            {formatSmartOhms((r.counts[0] ?? 0) * r.unit)}
                                        </td>
                                    </tr>
                                )}
                                {r.counts.slice(1).map(
                                    (c, i) =>
                                        c > 0 && (
                                            <tr
                                                key={i}
                                                className="hover:bg-primary/10 transition-colors"
                                            >
                                                <td className="p-2">{i + 2} in Parallel</td>
                                                <td className="p-2 text-primary font-medium">
                                                    {c}
                                                </td>
                                                <td className="p-2 text-primary font-medium">
                                                    {formatSmartOhms(
                                                        c * (r.unit / (i + 2))
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                )}
                                </tbody>
                            </table>

                            {/* Target + Total achieved moved to bottom */}
                            <Divider className="bg-secondary/20 my-4" />
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-sm text-secondary">Target</div>
                                    <div className="text-lg font-semibold text-primary">
                                        {formatSmartOhms(r.target)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-secondary">
                                        Total achieved
                                    </div>
                                    <div className="text-lg font-semibold text-primary">
                                        {formatSmartOhms(r.total)}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
        </div>
    );
}
