"use client";

import { useState, useMemo } from "react";
import {
    HeroUIProvider,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Select,
    SelectItem,
} from "@heroui/react";
import UnitSelect from "./UnitSelect";

function formatWithSI(value: number, unit: string): string {
    if (!isFinite(value)) return "NaN";
    if (value === 0) return `0 ${unit}`;

    const prefixes: Record<string, string> = {
        "-15": "f",
        "-12": "p",
        "-9": "n",
        "-6": "µ",
        "-3": "m",
        "0": "",
        "3": "k",
        "6": "M",
        "9": "G",
    };

    const exp = Math.floor(Math.log10(Math.abs(value)) / 3) * 3;
    const scaled = value / Math.pow(10, exp);
    const prefix = prefixes[exp.toString()] ?? `e${exp}`;

    return `${scaled.toFixed(3)} ${prefix}${unit}`;
}


export default function PCBCalculatorPage() {
    return (
        <HeroUIProvider>
            <main className="p-6 flex justify-center">
                <PCBCalculator />
            </main>
        </HeroUIProvider>
    );
}

function PCBCalculator() {
    const [type, setType] = useState<"microstrip" | "stripline">("microstrip");
    const [temp, setTemp] = useState(25);

    const [length, setLength] = useState(1e-3);
    const [lengthUnit, setLengthUnit] = useState("m");

    const [width, setWidth] = useState(0.5e-3);
    const [widthUnit, setWidthUnit] = useState("m");

    const [thickness, setThickness] = useState(35e-6);
    const [thicknessUnit, setThicknessUnit] = useState("m");

    const [height, setHeight] = useState(0.4e-3);
    const [heightUnit, setHeightUnit] = useState("m");

    const lengthUnits: Record<string, number> = {
        m: 1,
        mm: 1e-3,
        µm: 1e-6,
        nm: 1e-9,
    };

    const results = useMemo(() => {
        const ro = 1.724e-8;
        const alpha = 3.9e-3;
        const eps_r = 4.46;

        const L = length * lengthUnits[lengthUnit];
        const W = width * lengthUnits[widthUnit];
        const T = thickness * lengthUnits[thicknessUnit];
        const H = height * lengthUnits[heightUnit];

        const B = 2 * H + T;

        let R_lumped: number, C_lumped: number, L_lumped: number, Z: number;

        if (type === "microstrip") {
            if (W / H >= 7.475 - 1.25 * (T / H)) {
                return { error: "Please check geometry of the trace." };
            }
            R_lumped = (1e3 * ro * (1 + alpha * (temp - 25))) / (T * W);
            C_lumped =
                (26.378 * (eps_r + 1.41)) / Math.log(5.98 * H / (0.8 * W + T));
            L_lumped = 199.65 * Math.log(5.98 * H / (0.8 * W + T));
            Z =
                (87 * Math.log(5.98 * H / (0.8 * W + T))) /
                Math.sqrt(eps_r + 1.41);
        } else {
            if (W / B >= 2.375 - 1.25 * (T / B)) {
                return { error: "Please check geometry of the trace." };
            }
            R_lumped = (1e3 * ro * (1 + alpha * (temp - 25))) / (T * W);
            C_lumped =
                (39.37 * eps_r * Math.SQRT2) / Math.log(1.9 * B / (0.8 * W + T));
            L_lumped = 199.8425 * Math.log(1.9 * B / (0.8 * W + T));
            Z =
                (60 * Math.log(1.9 * B / (0.8 * W + T))) / Math.sqrt(eps_r);
        }

        return {
            R: R_lumped * L,
            C: C_lumped * L,
            L: L_lumped * L,
            Z,
        };
    }, [
        type,
        temp,
        length,
        width,
        thickness,
        height,
        lengthUnit,
        widthUnit,
        thicknessUnit,
        heightUnit,
    ]);

    return (
        <Card className="w-full max-w-2xl bg-background text-text shadow-none">
            <CardHeader>
                <h2 className="text-2xl font-bold text-center text-primary">
                    PCB Lumped Parameters Calculator
                </h2>
            </CardHeader>
            <CardBody className="space-y-4">
                <Select
                    label="Type"
                    selectedKeys={[type]}
                    onSelectionChange={(keys) =>
                        setType(Array.from(keys)[0] as "microstrip" | "stripline")
                    }
                    className="w-full"
                >
                    <SelectItem key="microstrip">Microstrip</SelectItem>
                    <SelectItem key="stripline">Stripline</SelectItem>
                </Select>

                <Input
                    label="Temperature (°C)"
                    type="number"
                    step="any"
                    value={temp.toString()}
                    onChange={(e) => setTemp(parseFloat(e.target.value))}
                />

                {/* Geometry Inputs */}
                {[
                    { label: "Length", value: length, setter: setLength, unit: lengthUnit, setUnit: setLengthUnit },
                    { label: "Width", value: width, setter: setWidth, unit: widthUnit, setUnit: setWidthUnit },
                    { label: "Thickness", value: thickness, setter: setThickness, unit: thicknessUnit, setUnit: setThicknessUnit },
                    { label: "Height", value: height, setter: setHeight, unit: heightUnit, setUnit: setHeightUnit },
                ].map((f) => (
                    <div key={f.label} className="flex items-stretch gap-2 w-full">
                        <Input
                            label={f.label}
                            type="number"
                            step="any"
                            value={f.value.toString()}
                            onChange={(e) => f.setter(parseFloat(e.target.value))}
                            className="w-2/3"
                        />
                        <UnitSelect
                            label="Units"
                            value={f.unit}
                            options={Object.keys(lengthUnits)}
                            onChange={f.setUnit}
                        />
                    </div>
                ))}
            </CardBody>

            <CardFooter className="space-y-2 flex flex-col text-center">
                {results.error ? (
                    <p className="text-red-600 font-medium">{results.error}</p>
                ) : (
                    <>
                        <p>
                            <span className="font-semibold text-secondary">R = </span>
                            <span className="text-primary">{formatWithSI(results.R!, "Ω")}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-secondary">C = </span>
                            <span className="text-primary">{formatWithSI(results.C!, "F")}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-secondary">L = </span>
                            <span className="text-primary">{formatWithSI(results.L!, "H")}</span>
                        </p>
                        <p>
                            <span className="font-semibold text-secondary">Z = </span>
                            <span className="text-primary">{results.Z!.toFixed(3)} Ω</span>
                        </p>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
