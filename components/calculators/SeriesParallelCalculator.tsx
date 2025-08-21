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

function convertToUnit(value: number, unit: string) {
    switch (unit) {
        case "kΩ":
            return value / 1e3;
        case "MΩ":
            return value / 1e6;
        default:
            return value;
    }
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
    const [targetsText, setTargetsText] = useState<string>("1750,2250,1250,2250");
    const [targetsUnit, setTargetsUnit] = useState<string>("Ω");
    const [N, setN] = useState<number>(1000);
    const [accuracyPct, setAccuracyPct] = useState<number>(1);
    const [results, setResults] = useState<Result[] | null>(null);

    const parseTargets = (text: string, unit: string) =>
        text
            .split(/[ ,;]+/)
            .map((s) => Number(s.trim()))
            .filter((n) => !isNaN(n) && n > 0)
            .map((n) => convertFromUnit(n, unit));

    const compute = (rUnit: number, targets: number[], maxN: number, accPct: number) => {
        const results: Result[] = [];
        for (const target of targets) {
            let x = target;
            const counts = new Array(maxN).fill(0);

            for (let i = 1; i <= maxN; i++) {
                const segR = rUnit / i;
                const howMany = Math.floor(x / segR);
                counts[i - 1] = howMany;
                x -= howMany * segR;
                if (x < (target / 100) * accPct) break;
            }

            let total = counts.reduce((sum, c, i) => sum + c * (rUnit / (i + 1)), 0);
            const acc = 100 - ((target - total) / target) * 100;
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
        if (!parsedTargets.length) return alert("Enter at least one target resistance");
        setResults(compute(convertFromUnit(rUnit, rUnitUnit), parsedTargets, N, accuracyPct));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card className="bg-background text-text">
                <CardHeader className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-primary">Series–Parallel Resistor Calculator</h1>
                    <p className="text-sm text-secondary">Ported from AnalogHub.ie MATLAB script</p>
                </CardHeader>
                <CardBody>
                    <form onSubmit={onCompute} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex gap-2 w-full">
                            <Input
                                label="Unit resistor"
                                type="number"
                                value={String(rUnit)}
                                onChange={(e) => setRUnit(Number(e.target.value))}
                                className="w-full"
                            />
                            <UnitSelect label="Unit" value={rUnitUnit} options={UNIT_OPTIONS} onChange={setRUnitUnit} />
                        </div>
                        <Input
                            label="Max groups (N)"
                            type="number"
                            value={String(N)}
                            onChange={(e) => setN(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex gap-2 md:col-span-2 w-full">
                            <Input
                                label="Target resistances"
                                value={targetsText}
                                onChange={(e) => setTargetsText(e.target.value)}
                                className="w-full"
                            />
                            <UnitSelect label="Unit" value={targetsUnit} options={UNIT_OPTIONS} onChange={setTargetsUnit} />
                        </div>
                        <Input
                            label="Accuracy (% tolerance)"
                            type="number"
                            value={String(accuracyPct)}
                            onChange={(e) => setAccuracyPct(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex items-end gap-2">
                            <Button type="submit" color="primary" className="bg-primary text-white">
                                Compute
                            </Button>
                        </div>
                    </form>
                </CardBody>
            </Card>

            {results &&
                results.map((r, idx) => (
                    <Card key={idx} className="bg-background text-text">
                        <CardHeader className="flex justify-between">
                            <div>
                                <div className="text-sm text-secondary">Target</div>
                                <div className="text-lg font-semibold text-primary">
                                    {convertToUnit(r.target, targetsUnit).toPrecision(3)} {targetsUnit}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-secondary">Total achieved</div>
                                <div className="text-lg font-semibold text-primary">
                                    {convertToUnit(r.total, targetsUnit).toPrecision(3)} {targetsUnit}
                                </div>
                                <div className="text-sm text-secondary">Accuracy: {r.accuracyPct.toFixed(1)}%</div>
                            </div>
                        </CardHeader>
                        <Divider className="bg-secondary/20" />
                        <CardBody>
                            <table className="w-full text-sm border-collapse text-center">
                                <thead>
                                <tr className="border-b border-secondary/30 bg-secondary/10">
                                    <th className="p-2 text-secondary">Type of connection</th>
                                    <th className="p-2 text-secondary">Number of resistors</th>
                                    <th className="p-2 text-secondary">Total resistance</th>
                                </tr>
                                </thead>
                                <tbody>
                                {r.counts[0] > 0 && (
                                    <tr className="hover:bg-primary/10 transition-colors">
                                        <td className="p-2">Series</td>
                                        <td className="p-2 text-primary font-medium">{r.counts[0]}</td>
                                        <td className="p-2 text-primary font-medium">
                                            {convertToUnit((r.counts[0] ?? 0) * r.unit, targetsUnit).toPrecision(3)} {targetsUnit}
                                        </td>
                                    </tr>
                                )}
                                {r.counts.slice(1).map(
                                    (c, i) =>
                                        c > 0 && (
                                            <tr key={i} className="hover:bg-primary/10 transition-colors">
                                                <td className="p-2">{i + 2} in Parallel</td>
                                                <td className="p-2 text-primary font-medium">{c}</td>
                                                <td className="p-2 text-primary font-medium">
                                                    {convertToUnit(c * (r.unit / (i + 2)), targetsUnit).toPrecision(3)} {targetsUnit}
                                                </td>
                                            </tr>
                                        )
                                )}
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                ))}
        </div>
    );
}
