"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
} from "@heroui/react";
import UnitSelect from "./UnitSelect";

export default function ResistorLadderCalculator() {
    const [vin, setVin] = useState<number>(1);
    const [vinUnit, setVinUnit] = useState("V");
    const [iin, setIin] = useState<number>(1);
    const [iinUnit, setIinUnit] = useState("mA");
    const [voltages, setVoltages] = useState("0.7, 0.2, 0.4, 0.9");
    const [voutUnit, setVoutUnit] = useState("V");
    const [results, setResults] = useState<any[]>([]);
    const [rtot, setRtot] = useState("");

    const currentUnits: Record<string, number> = {
        A: 1,
        mA: 1e-3,
        uA: 1e-6,
        nA: 1e-9,
        pA: 1e-12,
    };

    const voltageUnits: Record<string, number> = {
        V: 1,
        mV: 1e-3,
        uV: 1e-6,
        nV: 1e-9,
    };

    const formatWithUnit = (value: number, base: "Ω" | "V") => {
        const prefixes =
            base === "Ω"
                ? [
                    { limit: 1e9, factor: 1e9, symbol: "G" },
                    { limit: 1e6, factor: 1e6, symbol: "M" },
                    { limit: 1e3, factor: 1e3, symbol: "k" },
                    { limit: 1, factor: 1, symbol: "" },
                    { limit: 1e-3, factor: 1e-3, symbol: "m" },
                    { limit: 1e-6, factor: 1e-6, symbol: "µ" },
                    { limit: 1e-9, factor: 1e-9, symbol: "n" },
                ]
                : [
                    { limit: 1, factor: 1, symbol: "" },
                    { limit: 1e-3, factor: 1e-3, symbol: "m" },
                    { limit: 1e-6, factor: 1e-6, symbol: "µ" },
                    { limit: 1e-9, factor: 1e-9, symbol: "n" },
                ];

        for (let p of prefixes) {
            if (Math.abs(value) >= p.limit) {
                return `${(value / p.factor).toPrecision(3)} ${p.symbol}${base}`;
            }
        }
        return `${value} ${base}`;
    };

    const calculate = () => {
        const Vin = vin * voltageUnits[vinUnit];
        const Iin = iin * currentUnits[iinUnit];

        let Voltages = voltages
            .split(",")
            .map((v) => Number(v.trim()) * voltageUnits[voutUnit])
            .filter((v) => !isNaN(v));

        if (isNaN(Vin) || isNaN(Iin) || Iin <= 0) {
            alert("Please enter valid Vin and Iin > 0");
            return;
        }

        if (Voltages.length === 0) {
            alert("Please enter at least one valid voltage.");
            return;
        }

        Voltages.sort((a, b) => a - b);

        const Rtot = Vin / Iin;
        const res: number[] = [Voltages[0] / Iin];

        for (let i = 1; i < Voltages.length; i++) {
            res.push((Voltages[i] - Voltages[i - 1]) / Iin);
        }

        res.push(Rtot - res.reduce((a, b) => a + b, 0));

        const voltagesWithEnds = [0, ...Voltages, Vin];

        setRtot(formatWithUnit(Rtot, "Ω"));

        let resultRows = res.map((r, i) => ({
            resistor: <span>R<sub>{i + 1}</sub></span>,
            value: formatWithUnit(r, "Ω"),
            vout:
                i < voltagesWithEnds.length
                    ? formatWithUnit(voltagesWithEnds[i + 1], "V")
                    : "",
        }));

        resultRows = resultRows.reverse();

        setResults(resultRows);
    };

    return (
        <Card className="w-full max-w-3xl mx-auto" shadow="none">
            <CardHeader>
                <p className="text-md font-bold text-center w-full">
                    Resistor Ladder Calculator
                </p>
            </CardHeader>
            <CardBody>
                <div className="grid gap-4 mb-6">
                    {/* Vin */}
                    <div className="flex items-stretch gap-2 w-full">
                        <Input
                            label="Vin"
                            type="number"
                            placeholder="Input voltage"
                            value={vin.toString()}
                            onChange={(e) => setVin(parseFloat(e.target.value))}
                            className="w-2/3 h-[56px]"
                        />
                        <UnitSelect
                            label="Vin unit"
                            value={vinUnit}
                            options={Object.keys(voltageUnits)}
                            onChange={setVinUnit}
                        />
                    </div>

                    {/* Iin */}
                    <div className="flex items-stretch gap-2 w-full">
                        <Input
                            label="Iin"
                            type="number"
                            placeholder="Total current"
                            value={iin.toString()}
                            onChange={(e) => setIin(parseFloat(e.target.value))}
                            className="w-2/3 h-[56px]"
                        />
                        <UnitSelect
                            label="Iin unit"
                            value={iinUnit}
                            options={Object.keys(currentUnits)}
                            onChange={setIinUnit}
                        />
                    </div>

                    {/* Vout */}
                    <div className="flex items-stretch gap-2 w-full">
                        <Input
                            label="Vout(s)"
                            placeholder="Comma-separated"
                            value={voltages}
                            onChange={(e) => setVoltages(e.target.value)}
                            className="w-2/3 h-[56px]"
                        />
                        <UnitSelect
                            label="Vout unit"
                            value={voutUnit}
                            options={Object.keys(voltageUnits)}
                            onChange={setVoutUnit}
                        />
                    </div>

                    <Button
                        onPress={calculate}
                        className="mb-6 w-full bg-primary text-white hover:bg-primary/80"
                    >
                        Calculate
                    </Button>

                    {results.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2 text-center">
                                Total Resistance: {rtot}
                            </h3>
                            <table className="w-full text-sm border-collapse text-center rounded-md overflow-hidden">
                                <thead>
                                <tr className="border-b border-secondary/30 bg-secondary/10">
                                    <th className="p-2 text-secondary">Resistor</th>
                                    <th className="p-2 text-secondary">Value</th>
                                    <th className="p-2 text-secondary">Vout</th>
                                </tr>
                                </thead>
                                <tbody>
                                {results.map((r, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-t border-secondary/30 hover:bg-primary/10 transition-colors"
                                    >
                                        <td className="p-2">{r.resistor}</td>
                                        <td className="p-2 text-primary font-medium">{r.value}</td>
                                        <td className="p-2 text-primary font-medium">{r.vout}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
