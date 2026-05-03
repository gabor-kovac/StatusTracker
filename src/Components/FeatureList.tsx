import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { PanelTopOpen, CircleAlert } from "lucide-react";
import type { Feature } from "../Types/Application";
import { parseElapsed, dateSort } from "@/Helper/Parsers";

export default function FeatureList({ features }: { features: Feature[] | null }) {

    let lastCommitedFeature: Feature | null = null;
    let lastCommitAge: string;

    if (features != null) {
        const currentTime = new Date().getTime();
        lastCommitedFeature = features.sort((a, b) => dateSort(b.last_commit_date, a.last_commit_date)).at(0);
        if (lastCommitedFeature != null) {
            lastCommitAge = parseElapsed(currentTime - new Date(lastCommitedFeature.last_commit_date).getTime());
        }
    }

    return (
        features?.length ?
            <Dialog>
                <DialogTrigger render={
                    <Button className="w-full" variant="outline">
                        <div className="flex flex-row items-center w-full">
                        <CircleAlert size="16" className="text-orange-500 mr-1"></CircleAlert>
                        <span className="flex flex-grow-1 ml-1">{lastCommitedFeature.branch} - {lastCommitAge} ago</span>
                        <PanelTopOpen data-icon="inline-end" />
                        </div>
                    </Button>
                } />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Feature branches</DialogTitle>
                        <DialogDescription>
                            This dialog has a sticky footer that stays visible while the content
                            scrolls.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                    {features.map((feature, index) => (
                        <p key={index} className="mb-4 leading-normal">
                            {feature.branch}
                        </p>
                    ))}
                    </div>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Close</Button>} />
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            :
            <span>-</span>
    )
}