import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { useState } from "react"

export type SelectItems = {
    label: string;
    value: string | null;
}

export function SelectScrollable({ items, onSelect }: { items: SelectItems[], onSelect?: (value: string | null) => void }) {
    const [selected, setSelected] = useState<string | null>(items.at(0)?.value ?? null);

    const handleChange = (value: string | null) => {
        setSelected(value);
        onSelect?.(value);
    };

    return (
        items.length > 0 ?
        <Select value={selected} onValueChange={handleChange}>
            <SelectTrigger className="w-full max-w-64">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem className="text-center" key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        :
        <span>-</span>
    )
}
