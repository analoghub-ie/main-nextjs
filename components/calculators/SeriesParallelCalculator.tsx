"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { Divider } from "@heroui/react";

type Result = {
    target: number;
    unit: number;
    counts: number[];
    total: number;
    accuracyPct: number;
};

export default function SeriesParallelCalculator() {
    const [rUnit, setRUnit] = useState<number>(1000);
    const [targetsText, setTargetsText] = useState<string>("1750,2250,1250,2250");
    const [N, setN] = useState<number>(1000);
    const [accuracyPct, setAccuracyPct] = useState<number>(1);
    const [results, setResults] = useState<Result[] | null>(null);

    const parseTargets = (text: string) =>
        text
            .split(/[ ,;]+/)
            .map((s) => Number(s.trim()))
            .filter((n) => !isNaN(n) && n > 0);

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
            results.push({ target, unit: rUnit, counts: counts.slice(0, lastNonZero + 1), total, accuracyPct: acc });
        }
        return results;
    };

    const onCompute = (e?: React.FormEvent) => {
        e?.preventDefault();
        const targets = parseTargets(targetsText);
        if (!targets.length) return alert("Enter at least one target resistance");
        setResults(compute(rUnit, targets, N, accuracyPct));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Series–Parallel Resistor Calculator</h1>
                    <p className="text-sm text-default-500">Ported from AnalogHub.ie MATLAB script</p>
                </CardHeader>
                <CardBody>
                    <form onSubmit={onCompute} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Unit resistor (Ω)" type="number" value={String(rUnit)} onChange={(e) => setRUnit(Number(e.target.value))} />
                        <Input label="Max groups (N)" type="number" value={String(N)} onChange={(e) => setN(Number(e.target.value))} />
                        <Input label="Target resistances (Ω)" className="md:col-span-2" value={targetsText} onChange={(e) => setTargetsText(e.target.value)} />
                        <Input label="Accuracy (% tolerance)" type="number" value={String(accuracyPct)} onChange={(e) => setAccuracyPct(Number(e.target.value))} />
                        <div className="flex items-end gap-2">
                            <Button type="submit" color="primary">Compute</Button>
                            <Button type="button" variant="bordered" onClick={() => { setRUnit(1000); setTargetsText("1750,2250,1250,2250"); setN(1000); setAccuracyPct(1); setResults(null); }}>Reset</Button>
                        </div>
                    </form>
                </CardBody>
            </Card>

            {results && results.map((r, idx) => (
                <Card key={idx}>
                    <CardHeader className="flex justify-between">
                        <div>
                            <div className="text-sm text-default-500">Target</div>
                            <div className="text-lg font-semibold">{r.target} Ω</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-default-500">Total achieved</div>
                            <div className="text-lg font-semibold">{r.total.toFixed(6)} Ω</div>
                            <div className="text-sm text-default-500">Accuracy: {r.accuracyPct.toFixed(6)}%</div>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <div className="text-sm">- Resistors in series: <strong>{r.counts[0] ?? 0}</strong> [ {(r.counts[0] ?? 0) * r.unit} Ω ]</div>
                        {r.counts.slice(1).map((c, i) => c > 0 && (
                            <div key={i} className="text-sm">
                                - {i + 2} in parallel: <strong>{c}</strong> [ {c * (r.unit / (i + 2))} Ω total ]
                            </div>
                        ))}
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
