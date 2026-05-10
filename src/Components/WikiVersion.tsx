import { CircleAlert, CircleCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

enum VersionStatus {
    Unknown,
    OK,
    Outdated
}

type WikiVersionProps = {
    releaseVersion?: string | null;
    wikiVersion?: string | null;
}

export default function WikiVersion({ releaseVersion, wikiVersion }: WikiVersionProps) {

    let status: VersionStatus = VersionStatus.Unknown;
    let versionNotice: string = "Wiki version is unknown!";
    let versionColor: string = "text-red-500";

    if(!(releaseVersion === null && wikiVersion === null)) {
        if(releaseVersion === wikiVersion) {
            versionNotice = "Wiki version is up to date";
            status = VersionStatus.OK;
            versionColor = "text-green-500";
        } else {
            versionNotice = "Does not match release version!";
            status = VersionStatus.Outdated;
            versionColor = "text-orange-500";
        }
    }

    return (
        <Tooltip>
            <TooltipTrigger>
                <p className={`inline-block relative ${versionColor} mr-4`}>
                    {wikiVersion ?? "Error"}
                    {status === VersionStatus.OK ? 
                    <CircleCheck size="16" className="absolute top-[-10px] right-[-18px]" /> :
                    <CircleAlert size="16" className="absolute top-[-10px] right-[-18px]" />}
                </p>
            </TooltipTrigger>
            <TooltipContent>
                <p>{versionNotice}</p>
            </TooltipContent>
        </Tooltip>
    )
}