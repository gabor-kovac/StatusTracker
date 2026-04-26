import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"



export type SelectItems = {
    label: string;
    value: string | null;
}

export function SelectScrollable({ items, onSelect }: { items: SelectItems[], onSelect?: (value: string | null) => void }) {
    return (
        <Select items={items} onValueChange={onSelect}>
            <SelectTrigger className="w-full max-w-64">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
