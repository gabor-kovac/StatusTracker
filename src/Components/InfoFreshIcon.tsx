import { ClockCheck, ClockFading, CircleQuestionMark } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

enum Freshness {
    Fresh = "fresh",
    Stale = "stale",
    Unknown = "unknown"
}

function howFresh(timestamp?: number | null): Freshness {
    if(timestamp === undefined || timestamp === null) {
        return Freshness.Unknown;
    }
    const now = Date.now();
    const parsedTimestamp = timestamp ?? 0;
    const warningThreshold = parseInt(import.meta.env.VITE_BRANCH_AGE_WARNING_MS) || 3024000000; // Default to 35 days in milliseconds
    const delta = now - parsedTimestamp;

    if (delta < warningThreshold) {
        return Freshness.Fresh;
    } else {
        return Freshness.Stale;
    }
}

export function InfoFreshIcon({ timestamp }: { timestamp?: number | null }) {

    const dateParsed = new Date(timestamp!).toDateString();
    const freshness = howFresh(timestamp);

    return (
        <Tooltip>
            <TooltipTrigger>
                {freshness === Freshness.Fresh && <ClockCheck className="text-green-500" /> }
                {freshness === Freshness.Stale && <ClockFading className="text-orange-500" />}
                {freshness === Freshness.Unknown && <CircleQuestionMark className="text-cyan-500" />}
            </TooltipTrigger>
            <TooltipContent>
                {freshness === Freshness.Fresh && <p>Info is fresh: {dateParsed} </p>}
                {freshness === Freshness.Stale && <p>Info is stale: {dateParsed}</p>}
                {freshness === Freshness.Unknown && <p>Info freshness unknown</p>}
            </TooltipContent>
        </Tooltip>
    )
}
