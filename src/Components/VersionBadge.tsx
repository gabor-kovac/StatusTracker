import { Badge } from "@/Components/ui/badge";

export default function VersionBadge({version}: { version: string }) {
    return (
        <Badge variant="outline">Status Tracker {version}</Badge>
    );
}