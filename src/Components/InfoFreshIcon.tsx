import { ClockCheck, ClockFading, CircleQuestionMark } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

type Freshness = 'fresh' | 'stale' | 'unknown';

function howFresh(timestamp?: number | null): Freshness {
    if(timestamp === undefined || timestamp === null) {
        return 'unknown';
    }
    const now = Date.now();
    const parsedTimestamp = timestamp ?? 0;
    const warningThreshold = parseInt(import.meta.env.VITE_BRANCH_AGE_WARNING_MS) || 3024000000; // Default to 35 days in milliseconds
    const delta = now - parsedTimestamp;

    if (delta < warningThreshold) {
        return 'fresh';
    } else {
        return 'stale';
    }
}

export function InfoFreshIcon({ timestamp }: { timestamp?: number | null }) {

    const dateParsed = new Date(timestamp!).toDateString();
    const freshness = howFresh(timestamp);

    return (
        <Tooltip>
            <TooltipTrigger>
                {freshness === 'fresh' && <ClockCheck size="18" className="text-green-500" /> }
                {freshness === 'stale' && <ClockFading size="18" className="text-orange-500" />}
                {freshness === 'unknown' && <CircleQuestionMark size="18" className="text-cyan-500" />}
            </TooltipTrigger>
            <TooltipContent>
                {freshness === 'fresh' && <p>Info is fresh: {dateParsed} </p>}
                {freshness === 'stale' && <p>Info is stale: {dateParsed}</p>}
                {freshness === 'unknown' && <p>Info freshness unknown</p>}
            </TooltipContent>
        </Tooltip>
    )
}
