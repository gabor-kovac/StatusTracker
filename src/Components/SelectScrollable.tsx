import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

export type SelectItems = {
    label: string;
    value: string | null;
}

export function SelectScrollable({ items, onSelect }: { items: SelectItems[], onSelect?: (value: string | null) => void }) {
    return (
        items.length > 0 ?
        <Select items={items} onValueChange={onSelect} defaultValue={items.at(0).value}>
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
