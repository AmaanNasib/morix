import { Switch } from "@heroui/switch";

interface SwitchInputProps {
    label?: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

export const SwitchInput = ({
    label,
    value,
    onChange,
    ...props
}: SwitchInputProps) => {
    return (
        <div className="flex flex-col gap-2">
            <Switch isSelected={value} size="sm" onValueChange={onChange}>
                {label}
            </Switch>
        </div>
    );
};