import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { PanelTopOpen, CircleAlert } from "lucide-react";
import type { Feature } from "../Types/Application";
import { parseElapsed, dateSort } from "@/Helper/Parsers";
import { useState } from "react";
import Paginator from "@/Components/ui/paginator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"

const PAGINATE_SIZE = 5;

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

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil((features?.length || 0) / PAGINATE_SIZE);
    const currentFeatures = features?.slice((currentPage - 1) * PAGINATE_SIZE, currentPage * PAGINATE_SIZE);

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
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Feature branches</DialogTitle>
                </DialogHeader>
                <Card className="w-full py-0 border-0">
                    <CardContent className="px-0 border-0">
                        <Accordion>
                        {currentFeatures?.map((feature, index) => (
                            <AccordionItem key={feature.branch+index}>
                                <AccordionTrigger>{feature.branch}</AccordionTrigger>
                                <AccordionContent>
                                    <span className="leading-normal">This is a feature branch ...</span>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                    </CardContent>
                </Card>
                <DialogFooter>
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                        showPreviousNext />
                    <DialogClose render={<Button variant="outline">Close</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
        :
        <span>-</span>
    )
}