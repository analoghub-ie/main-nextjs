"use client";

import React, { useState, useEffect } from "react";
import { Input, Card, CardHeader, CardBody, Select, SelectItem } from "@heroui/react";

export default function LDOCalculator() {
    const [Vref, setVref] = useState(0.6);
    const [Vout, setVout] = useState(1.2);
    const [IqValue, setIqValue] = useState(1); // raw numeric input
    const [IqUnit, setIqUnit] = useState("mA"); // mA, µA, nA, pA

    const [R1, setR1] = useState("");
    const [R2, setR2] = useState("");
    const [k, setK] = useState("");

    // Convert Iq to amps
    const getIqInAmps = () => {
        switch (IqUnit) {
            case "pA": return IqValue * 1e-12;
            case "nA": return IqValue * 1e-9;
            case "µA": return IqValue * 1e-6;
            case "mA": return IqValue * 1e-3;
            default: return IqValue;
        }
    };

    useEffect(() => {
        const IqAmps = getIqInAmps();

        if (Vout > 0 && IqAmps > 0) {
            const kVal = (Vref / Vout) / (1 - Vref / Vout);
            const R1Val = Vout / (IqAmps * (1 + kVal));
            const R2Val = kVal * R1Val;

            setK(kVal.toFixed(4));
            setR1(formatResistance(R1Val));
            setR2(formatResistance(R2Val));
        } else {
            setK("");
            setR1("");
            setR2("");
        }
    }, [Vref, Vout, IqValue, IqUnit]);

    const formatResistance = (R: number) => {
        if (Math.floor(R / 1e6) > 0) return (R / 1e6).toFixed(3) + " MΩ";
        if (Math.floor(R / 1e3) > 0) return (R / 1e3).toFixed(3) + " kΩ";
        return R.toFixed(3) + " Ω";
    };

    return (
        // <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <h2 className="text-lg font-bold">LDO Feedback Resistance Calculator</h2>
                </CardHeader>
                <CardBody className="space-y-4">
                    <Input
                        label="Reference Voltage (Vref)"
                        type="number"
                        value={Vref.toString()}
                        onChange={(e) => setVref(parseFloat(e.target.value) || 0)}
                    />
                    <Input
                        label="Output Voltage (Vout)"
                        type="number"
                        value={Vout.toString()}
                        onChange={(e) => setVout(parseFloat(e.target.value) || 0)}
                    />

                    <div className="flex gap-2">
                        <Input
                            label="Quiescent Current (Iq)"
                            type="number"
                            value={IqValue.toString()}
                            onChange={(e) => setIqValue(parseFloat(e.target.value) || 0)}
                            className="flex-1"
                        />
                        <Select
                            label="Unit"
                            selectedKeys={new Set([IqUnit])}
                            onSelectionChange={(keys) => setIqUnit(Array.from(keys)[0] as string)}
                            className="w-28"
                        >
                            <SelectItem key="pA">pA</SelectItem>
                            <SelectItem key="nA">nA</SelectItem>
                            <SelectItem key="µA">µA</SelectItem>
                            <SelectItem key="mA">mA</SelectItem>
                            <SelectItem key="A">A</SelectItem>
                        </Select>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                        <p><strong>R1:</strong> {R1 || "--"}</p>
                        <p><strong>R2:</strong> {R2 || "--"}</p>
                        <p><strong>Resistor ratio (k):</strong> {k || "--"}</p>
                    </div>
                </CardBody>
            </Card>
        //</div>
    );
}
