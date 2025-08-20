"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Select,
    SelectItem,
} from "@heroui/react";

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

        // Sort ascending (0 → Vin)
        Voltages.sort((a, b) => a - b);

        const Rtot = Vin / Iin;
        const res: number[] = [Voltages[0] / Iin];

        for (let i = 1; i < Voltages.length; i++) {
            res.push((Voltages[i] - Voltages[i - 1]) / Iin);
        }

        res.push(Rtot - res.reduce((a, b) => a + b, 0));

        // Add 0 V (GND) and Vin to the voltage markers
        const voltagesWithEnds = [0, ...Voltages, Vin];

        setRtot(formatWithUnit(Rtot, "Ω"));

        // Build rows
        let resultRows = res.map((r, i) => ({
            resistor: <span>R<sub>{i + 1}</sub></span>,
            value: formatWithUnit(r, "Ω"),
            vout:
                i < voltagesWithEnds.length
                    ? formatWithUnit(voltagesWithEnds[i + 1], "V")
                    : "",
        }));

        // ✅ Reverse order so R1 is at Vin side, last resistor at GND
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
                    <div className="flex gap-2 items-end">
                        <Input
                            label="Vin"
                            type="number"
                            placeholder="Input voltage"
                            value={vin.toString()}
                            onChange={(e) => setVin(parseFloat(e.target.value))}
                            className="w-2/3"
                        />
                        <Select
                            aria-label="Vin unit"
                            selectedKeys={[vinUnit]}
                            onSelectionChange={(keys) =>
                                setVinUnit(Array.from(keys)[0] as string)
                            }
                            className="w-1/3"
                        >
                            {Object.keys(voltageUnits).map((unit) => (
                                <SelectItem key={unit}>{unit}</SelectItem>
                            ))}
                        </Select>
                    </div>

                    {/* Iin */}
                    <div className="flex gap-2 items-end">
                        <Input
                            label="Iin"
                            type="number"
                            placeholder="Total current"
                            value={iin.toString()}
                            onChange={(e) => setIin(parseFloat(e.target.value))}
                            className="w-2/3"
                        />
                        <Select
                            aria-label="Iin unit"
                            selectedKeys={[iinUnit]}
                            onSelectionChange={(keys) =>
                                setIinUnit(Array.from(keys)[0] as string)
                            }
                            className="w-1/3"
                        >
                            {Object.keys(currentUnits).map((unit) => (
                                <SelectItem key={unit}>{unit}</SelectItem>
                            ))}
                        </Select>
                    </div>

                    {/* Vout */}
                    <div className="flex gap-2 items-end">
                        <Input
                            label="Vout(s)"
                            placeholder="Comma-separated"
                            value={voltages}
                            onChange={(e) => setVoltages(e.target.value)}
                            className="w-2/3"
                        />
                        <Select
                            aria-label="Vout unit"
                            selectedKeys={[voutUnit]}
                            onSelectionChange={(keys) =>
                                setVoutUnit(Array.from(keys)[0] as string)
                            }
                            className="w-1/3"
                        >
                            {Object.keys(voltageUnits).map((unit) => (
                                <SelectItem key={unit}>{unit}</SelectItem>
                            ))}
                        </Select>
                    </div>

                    <Button
                        onPress={calculate}
                        className="mb-6 w-full bg-orange-500 text-white hover:bg-orange-600"
                    >
                        Calculate
                    </Button>

                    {results.length > 0 && (
                        <div>
                            <h3 className="font-semibold mb-2 text-center">
                                Total Resistance: {rtot}
                            </h3>
                            <table className="w-full border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                    <th className="p-2 text-left">Resistor</th>
                                    <th className="p-2 text-left">Value</th>
                                    <th className="p-2 text-left">Vout</th>
                                </tr>
                                </thead>
                                <tbody>
                                {results.map((r, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-t border-gray-300 dark:border-gray-700"
                                    >
                                        <td className="p-2">{r.resistor}</td>
                                        <td className="p-2">{r.value}</td>
                                        <td className="p-2">{r.vout}</td>
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
