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
import { CircleAlert, GitCommitVertical, CircleUserRound, Clock, GitPullRequest, ChevronDown } from "lucide-react";
import type { Feature, PullRequest } from "../Types/Application";
import { dateSort, sinceDate, elapsedMoreThan } from "@/Helper/Parsers";
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
  CardContent
} from "@/Components/ui/card"

const PAGINATE_SIZE = 5;
const WARN_FEATURE_AGE_DAYS = 10;
const WARN_COMMIT_AGE_DAYS = 5;

function checkFeatures(features: Feature[]): boolean {
    let hasOldFeature = false;
    let hasOldCommit = false;
    
    features.forEach(feature => {
        if(elapsedMoreThan(feature.lastCommitDate, WARN_FEATURE_AGE_DAYS))
        {
            hasOldFeature = true;
        }

        feature.pullRequests?.forEach(pr => {
            if(elapsedMoreThan(pr.createdAt, WARN_COMMIT_AGE_DAYS))
            {
                hasOldCommit = true;
            }
        });
    });

    return hasOldFeature || hasOldCommit;
}

export default function FeatureList({ features }: { features: Feature[] | undefined }) {

    let lastCommitedFeature: Feature | undefined = undefined;

    if (features != null && features.length > 0) {
        lastCommitedFeature = [...features].sort((a, b) => dateSort(b.lastCommitDate, a.lastCommitDate)).at(0);
    }

    const [currentPage, setCurrentPage] = useState(1);

    const repoUrl = "https://github.com/org/repo";

    const totalPages = Math.ceil((features?.length || 0) / PAGINATE_SIZE);
    const currentFeatures = features?.slice((currentPage - 1) * PAGINATE_SIZE, currentPage * PAGINATE_SIZE);

    return (
        features?.length ?
        <Dialog>
            <DialogTrigger render={
                <Button className="w-full" variant="outline">
                    <div className="flex flex-row items-center w-full">
                        {
                        checkFeatures(features) &&
                        <CircleAlert size="16" className="text-orange-500 mr-1"></CircleAlert>
                        }
                        <span className="flex flex-grow-1 mx-1">
                            {lastCommitedFeature ? `${lastCommitedFeature.branch} - ${sinceDate(lastCommitedFeature.lastCommitDate)} ago` : "-"}
                        </span>
                        <ChevronDown data-icon="inline-end" />
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
                                <AccordionTrigger className="gap-0 items-center">
                                    {feature.branch}
                                    {
                                    (elapsedMoreThan(feature.lastCommitDate, WARN_FEATURE_AGE_DAYS) || 
                                    feature.pullRequests?.some(pr => elapsedMoreThan(pr.createdAt, WARN_COMMIT_AGE_DAYS))) &&
                                    <>
                                    <div className="flex-1"></div>
                                    <Clock color="#ff6900" size="19" className=" mr-2" />
                                    </>
                                    }
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col gap-1">
                                    <div className="flex flex-row items-center gap-1.5"><GitCommitVertical color="#b99c1d" size="20" /><b>Last commit</b><a href={repoUrl+"/commit/"+feature.lastCommitSha} target="_blank">{feature.lastCommitMessage}</a></div>
                                    <div className="flex flex-row items-center gap-1.5"><CircleUserRound color="#198754" size="20" /><b>Last commit author</b>{feature.lastCommitAuthor}</div>
                                    <div className="flex flex-row items-center gap-1.5"><Clock color="#0795b1" size="20" /><b>Last commited</b>{sinceDate(feature.lastCommitDate)} ago</div>
                                    {
                                    feature.pullRequests != null && feature.pullRequests.length === 0 ?
                                    <div className="flex flex-row items-center gap-1.5"><GitPullRequest color="#0765b1" size="20" /><b>No open pull requests</b></div>
                                    :
                                    <>
                                    <div className="flex flex-row items-center gap-1.5"><GitPullRequest color="#0765b1" size="20" /><b>Open pull requests</b>{feature.pullRequests!.length}</div>
                                    <div className="flex flex-col border-1 rounded-lg mt-2 divide-y px-2 py-1">
                                        {
                                        feature.pullRequests != null && feature.pullRequests?.map((pullRequest: PullRequest, index: number) => (
                                        <div key={index+"_pr"} className="flex flex-row items-center justify-between">
                                            <div className="flex flex-col p-1">
                                                <a href={repoUrl+"/pull/"+pullRequest.number} target="_blank">#{pullRequest.number} - {pullRequest.title}</a>
                                                <span>created {sinceDate(pullRequest.createdAt)} ago by {pullRequest.author!.login}</span>
                                            </div>
                                            {
                                            elapsedMoreThan(pullRequest.createdAt, WARN_COMMIT_AGE_DAYS) && 
                                            <Clock color="#ff6900" size="19" className="mr-2" />
                                            }
                                        </div>
                                        ))}
                                    </div>
                                    </>
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        </Accordion>
                    </CardContent>
                </Card>
                <DialogFooter>
                    {
                    totalPages > 1 &&
                    <Paginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                        showPreviousNext />
                    }
                    <DialogClose render={<Button variant="outline">Close</Button>} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
        :
        <span>-</span>
    )
}