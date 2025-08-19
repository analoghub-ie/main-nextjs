// UnitSelect.tsx
"use client";

import React from "react";
import { Select, SelectItem } from "@heroui/react";

interface UnitSelectProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

export default function UnitSelect({ label, value, options, onChange }: UnitSelectProps) {
    return (
        <div className="w-1/3 flex flex-col">
            <span className="text-sm mb-1">{label}</span>
            <Select
                aria-label={label}
                selectedKeys={[value]}
                onSelectionChange={(keys) => onChange(Array.from(keys)[0] as string)}
                className="h-10"
            >
                {options.map((unit) => (
                    <SelectItem key={unit}>{unit}</SelectItem>
                ))}
            </Select>
        </div>
    );
}