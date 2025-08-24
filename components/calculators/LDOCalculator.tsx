"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    NumberInput,
    Select,
    SelectItem,
} from "@heroui/react";

export default function LDOCalculator() {
    const [Vref, setVref] = useState<number>(0.6);
    const [VrefUnit, setVrefUnit] = useState("V");

    const [Vout, setVout] = useState<number>(1.2);
    const [VoutUnit, setVoutUnit] = useState("V");

    const [IqValue, setIqValue] = useState<number>(1);
    const [IqUnit, setIqUnit] = useState("mA");

    const [R1, setR1] = useState("");
    const [R2, setR2] = useState("");
    const [k, setK] = useState("");
    const [errors, setErrors] = useState<string[]>([]);

    const [showResults, setShowResults] = useState(true);

    const currentUnits: Record<string, number> = {
        A: 1,
        mA: 1e-3,
        µA: 1e-6,
        nA: 1e-9,
        pA: 1e-12,
    };

    const voltageUnits: Record<string, number> = {
        V: 1,
        mV: 1e-3,
    };

    const formatWithUnit = (value: number, base: "Ω") => {
        const prefixes = [
            { limit: 1e9, factor: 1e9, symbol: "G" },
            { limit: 1e6, factor: 1e6, symbol: "M" },
            { limit: 1e3, factor: 1e3, symbol: "k" },
            { limit: 1, factor: 1, symbol: "" },
            { limit: 1e-3, factor: 1e-3, symbol: "m" },
            { limit: 1e-6, factor: 1e-6, symbol: "µ" },
            { limit: 1e-9, factor: 1e-9, symbol: "n" },
        ];

        for (let p of prefixes) {
            if (Math.abs(value) >= p.limit) {
                return `${parseFloat((value / p.factor).toPrecision(3))} ${p.symbol}${base}`;
            }
        }
        return `${value} ${base}`;
    };

    const formatK = (val: number) => parseFloat(val.toPrecision(3)).toString();

    useEffect(() => {
        const newErrors: string[] = [];

        const VrefNum = Vref * voltageUnits[VrefUnit];
        const VoutNum = Vout * voltageUnits[VoutUnit];
        const IqAmps = IqValue * currentUnits[IqUnit];

        if (isNaN(VrefNum) || VrefNum <= 0) newErrors.push("Reference voltage must be > 0.");
        if (isNaN(VoutNum) || VoutNum <= 0) newErrors.push("Output voltage must be > 0.");
        if (VoutNum <= VrefNum) newErrors.push("Output voltage must be greater than reference voltage.");
        if (isNaN(IqAmps) || IqAmps <= 0) newErrors.push("Quiescent current must be > 0.");

        if (newErrors.length > 0) {
            setErrors(newErrors);
            setK("");
            setR1("");
            setR2("");
            return;
        }

        const kVal = VoutNum / VrefNum - 1;
        const Rtot = VoutNum / IqAmps;

        const R2Val = Rtot / (1 + kVal);
        const R1Val = kVal * R2Val;

        setErrors([]);
        setK(formatK(kVal));
        setR1(formatWithUnit(R1Val, "Ω"));
        setR2(formatWithUnit(R2Val, "Ω"));
    }, [Vref, VrefUnit, Vout, VoutUnit, IqValue, IqUnit]);

    const InputRow = ({
                          label,
                          value,
                          onChange,
                          unit,
                          onUnitChange,
                          units,
                      }: {
        label: string;
        value: number;
        onChange: (val: number) => void;
        unit: string;
        onUnitChange: (unit: string) => void;
        units: Record<string, number>;
    }) => (
        <div className="flex items-stretch gap-2 w-full">
            <NumberInput
                hideStepper
                className="flex-1"
                label={label}
                value={value}
                onValueChange={onChange}
                size="lg"
                min={0}
            />
            <Select
                label="Units"
                selectedKeys={new Set([unit])}
                onSelectionChange={(keys) => onUnitChange(Array.from(keys)[0] as string)}
                className="w-28"
                size="lg"
            >
                {Object.keys(units).map((u) => (
                    <SelectItem key={u}>{u}</SelectItem>
                ))}
            </Select>
        </div>
    );

    return (
        <Card className="w-full max-w-3xl mx-auto" shadow="none">
            <CardHeader>
                <p className="text-xl font-bold text-center w-full">
                    LDO Feedback Resistance Calculator
                </p>
            </CardHeader>
            <CardBody>
                <div className="grid gap-4 mb-6">
                    <InputRow
                        label="Reference Voltage"
                        value={Vref}
                        onChange={setVref}
                        unit={VrefUnit}
                        onUnitChange={setVrefUnit}
                        units={voltageUnits}
                    />
                    <InputRow
                        label="Output Voltage"
                        value={Vout}
                        onChange={setVout}
                        unit={VoutUnit}
                        onUnitChange={setVoutUnit}
                        units={voltageUnits}
                    />
                    <InputRow
                        label="Quiescent Current"
                        value={IqValue}
                        onChange={setIqValue}
                        unit={IqUnit}
                        onUnitChange={setIqUnit}
                        units={currentUnits}
                    />

                    <button
                        className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                        onClick={() => setShowResults((prev) => !prev)}
                    >
                        {showResults ? "Hide Results" : "Show Results"}
                    </button>

                    {errors.length > 0 && (
                        <div className="text-red-500 text-sm space-y-1">
                            {errors.map((err, i) => (
                                <p key={i}>{err}</p>
                            ))}
                        </div>
                    )}

                    {showResults && R1 && R2 && (
                        <div className="w-full">
                            <table className="w-full table-auto border-collapse text-center rounded-xl overflow-hidden shadow-sm">
                                <thead>
                                <tr className="border-b border-secondary/30 bg-secondary/10">
                                    <th className="py-3 px-4 text-secondary text-base lg:text-lg font-medium">
                                        Resistor
                                    </th>
                                    <th className="py-3 px-4 text-secondary text-base lg:text-lg font-medium">
                                        Value
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="text-base lg:text-lg">
                                <tr className="border-t border-secondary/30 hover:bg-primary/10 transition-colors">
                                    <td className="py-3 px-4">R1</td>
                                    <td className="py-3 px-4 text-primary font-semibold">{R1}</td>
                                </tr>
                                <tr className="border-t border-secondary/30 hover:bg-primary/10 transition-colors">
                                    <td className="py-3 px-4">R2</td>
                                    <td className="py-3 px-4 text-primary font-semibold">{R2}</td>
                                </tr>
                                <tr className="border-t border-secondary/30 hover:bg-primary/10 transition-colors">
                                    <td className="py-3 px-4">k = R1 / R2</td>
                                    <td className="py-3 px-4 text-primary font-semibold">{k}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
