"use client";

import React from "react";
import { Select, SelectItem } from "@heroui/react";

interface UnitSelectProps {
    label?: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

export default function UnitSelect({ label, value, options, onChange }: UnitSelectProps) {
    return (
        <Select
            label={label}                               // ✅ same as Input label
            aria-label={label}
            selectedKeys={[value]}
            onSelectionChange={(keys) => onChange(Array.from(keys)[0] as string)}
            className="w-1/3"
            size={"lg"}
        >
            {options.map((unit) => (
                <SelectItem key={unit}>{unit}</SelectItem>
            ))}
        </Select>
    );
}
