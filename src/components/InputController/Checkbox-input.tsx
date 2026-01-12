import { Checkbox } from "@heroui/react";

interface CheckboxInputProps {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export default function CheckboxInput({
    label,
    value,
    onChange,

}: CheckboxInputProps) {

    return (
        <div className="flex flex-col gap-2">
            <Checkbox isSelected={value} onValueChange={onChange}>
                {label} {value ? "Selected" : "Not Selected"}
            </Checkbox>
        </div>
    );
}

