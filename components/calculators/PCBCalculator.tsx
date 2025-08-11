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
    const [width, setWidth] = useState(0.5e-3);
    const [thickness, setThickness] = useState(35e-6);
    const [height, setHeight] = useState(0.4e-3);

    const results = useMemo(() => {
        const ro = 1.724e-8;
        const alpha = 3.9e-3;
        const eps_r = 4.46;
        const B = 2 * height + thickness;

        let R_lumped: number, C_lumped: number, L_lumped: number, Z: number;

        if (type === "microstrip") {
            if (width / height >= 7.475 - 1.25 * (thickness / height)) {
                return { error: "Please check geometry of the trace." };
            }
            R_lumped = (1e3 * ro * (1 + alpha * (temp - 25))) / (thickness * width);
            C_lumped =
                (26.378 * (eps_r + 1.41)) /
                Math.log(5.98 * height / (0.8 * width + thickness));
            L_lumped =
                199.65 * Math.log(5.98 * height / (0.8 * width + thickness));
            Z =
                (87 * Math.log(5.98 * height / (0.8 * width + thickness))) /
                Math.sqrt(eps_r + 1.41);
        } else {
            if (width / B >= 2.375 - 1.25 * (thickness / B)) {
                return { error: "Please check geometry of the trace." };
            }
            R_lumped = (1e3 * ro * (1 + alpha * (temp - 25))) / (thickness * width);
            C_lumped =
                (39.37 * eps_r * Math.SQRT2) /
                Math.log(1.9 * B / (0.8 * width + thickness));
            L_lumped =
                199.8425 * Math.log(1.9 * B / (0.8 * width + thickness));
            Z =
                (60 * Math.log(1.9 * B / (0.8 * width + thickness))) /
                Math.sqrt(eps_r);
        }

        return {
            R: R_lumped * length,
            C: C_lumped * length,
            L: L_lumped * length,
            Z,
        };
    }, [type, temp, length, width, thickness, height]);

    return (
        <Card className="max-w-xl w-full">
            <CardHeader>
                <h2 className="text-2xl font-semibold">
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
                >
                    <SelectItem key="microstrip">Microstrip</SelectItem>
                    <SelectItem key="stripline">Stripline</SelectItem>
                </Select>
                <Input
                    label="Temperature (°C)"
                    type="number"
                    value={temp.toString()}
                    onChange={(e) => setTemp(parseFloat(e.target.value))}
                />
                <Input
                    label="Length (m)"
                    type="number"
                    value={length.toString()}
                    onChange={(e) => setLength(parseFloat(e.target.value))}
                />
                <Input
                    label="Width (m)"
                    type="number"
                    value={width.toString()}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                />
                <Input
                    label="Thickness (m)"
                    type="number"
                    value={thickness.toString()}
                    onChange={(e) => setThickness(parseFloat(e.target.value))}
                />
                <Input
                    label="Height (m)"
                    type="number"
                    value={height.toString()}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                />
            </CardBody>
            <CardFooter className="space-y-2 flex flex-col">
                {results.error ? (
                    <p className="text-red-600 font-medium">{results.error}</p>
                ) : (
                    <>
                        <p>R = {results.R!.toFixed(6)} mΩ</p>
                        <p>C = {results.C!.toFixed(6)} pF</p>
                        <p>L = {results.L!.toFixed(6)} nH</p>
                        <p>Z = {results.Z!.toFixed(6)} Ω</p>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
