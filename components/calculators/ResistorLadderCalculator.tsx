"use client";

import React, { useState } from "react";
import {Card, CardHeader, CardBody, NumberInput} from "@heroui/react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";

export default function ResistorLadderCalculator() {
    const [vin, setVin] = useState(1);
    const [iin, setIin] = useState(0.001);
    const [voltages, setVoltages] = useState("0.7, 0.2, 0.4, 0.9");
    const [results, setResults] = useState<any[]>([]);
    const [rtot, setRtot] = useState("");

    const calculate = () => {
        let Vin = Number(vin);
        let Iin = Number(iin);
        let Voltages = voltages
            .split(",")
            .map((v) => Number(v.trim()))
            .filter((v) => !isNaN(v));

        let Rtot = Vin / Iin;
        Voltages.sort((a, b) => a - b);

        let res: number[] = [];
        res[0] = Voltages[0] / Iin;

        for (let i = 1; i < Voltages.length; i++) {
            res[i] = (Voltages[i] - Voltages[i - 1]) / Iin;
        }

        res[Voltages.length] = Rtot - res.reduce((a, b) => a + b, 0);

        res = res.reverse();
        Voltages = [0, ...Voltages].reverse();

        // Format Rtot
        let RtotLabel =
            Math.floor(Rtot / 1e6) > 0
                ? `${(Rtot / 1e6).toFixed(1)} MΩ`
                : Math.floor(Rtot / 1e3) > 0
                    ? `${(Rtot / 1e3).toFixed(1)} kΩ`
                    : `${Rtot.toFixed(1)} Ω`;

        setRtot(RtotLabel);

        // Prepare results array
        let resultRows = res.map((r, i) => {
            let Rlabel =
                Math.floor(r / 1e6) > 0
                    ? `${(r / 1e6).toFixed(1)} MΩ`
                    : Math.floor(r / 1e3) > 0
                        ? `${(r / 1e3).toFixed(1)} kΩ`
                        : `${r.toFixed(1)} Ω`;

            return {
                resistor: `R${i + 1}`,
                value: Rlabel,
                vout: i < Voltages.length - 1 ? `${Voltages[i]} V` : null,
            };
        });

        setResults(resultRows);
    };

    return (
        <Card className="w-full max-w-3xl mx-auto" shadow="none">
            <CardHeader>
                <p className="text-md">Resistor Ladder Calculator</p>

            </CardHeader>
            <CardBody>
                <div className="grid gap-4 mb-6">
                    <div>
                        <label className="block mb-1 font-medium">Vin (V)</label>
                        <NumberInput
                            label="Vin"
                            placeholder="Enter the Vin"
                            value={vin}
                            onValueChange={setVin}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Iin (A)</label>
                        <NumberInput
                            label="Iin"
                            placeholder="Enter the Iin"
                            //step="any"
                            value={iin}
                            onValueChange={setIin}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">
                            Desired Voltages (comma separated)
                        </label>
                        <Input
                            label="Output voltages:"
                            placeholder="Enter the Vout:"
                            value={voltages}
                            onValueChange={setVoltages}
                        />
                    </div>
                </div>

                <Button onPress={calculate} className="mb-6 w-full">
                    Calculate
                </Button>

                {results.length > 0 && (
                    <div>
                        <h3 className="font-semibold mb-2">Total Resistance: {rtot}</h3>
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
                                    <td className="p-2">{r.vout || ""}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}
