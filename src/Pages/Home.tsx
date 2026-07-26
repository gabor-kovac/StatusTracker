import { useEffect, useState } from "react";
import { AppList } from "../Assets/ApplicationData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { SelectScrollable } from "@/Components/SelectScrollable";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/Components/ui/input-group";
import { Search } from "lucide-react";
import { InfoFreshIcon } from "@/Components/InfoFreshIcon";
import FeatureList from "@/Components/FeatureList";
import WikiVersion from "@/Components/WikiVersion";
import type { Application } from '../Types/Application';
import { rcompare, valid } from "semver";

function forgivingSort(versionList: any[]) {
    const notSemver: any[] = versionList.filter(v => !valid(v, true))
    const semver: any[] = versionList.filter(v => valid(v, true)).sort(rcompare);
    return [...semver, ...notSemver]
};

export default function Home() {

    const [applications, setApplications] = useState<Application[]>(AppList);
    const [searchFilter, setSearchFilter] = useState<string>("");

    useEffect(() => {
        if (searchFilter !== "") {
            let filteredApps = AppList.filter((app: Application) => app.name.toLowerCase().includes(searchFilter));
            setApplications(filteredApps);
        } else {
            setApplications(AppList);
        }
    }, [AppList, searchFilter]);

    return (
        <Table>
            <TableHeader className="border-b-3 border-grey-900">
                <TableRow>
                    <TableHead>
                        <div className="flex flex-col p-3">
                            <InputGroup>
                                <InputGroupInput type="search" placeholder="Search application" onChange={(e) => setSearchFilter(e.target.value.toLowerCase())}></InputGroupInput>
                                <InputGroupAddon align="inline-start">
                                    <Search />
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </TableHead>
                </TableRow>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Release</TableHead>
                    <TableHead>Wiki</TableHead>
                    <TableHead>Releases</TableHead>
                    <TableHead>Release Candidates</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Features</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {applications.map((app, index) => (
                <TableRow key={index}>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.version ?? "-"}</TableCell>
                    <TableCell>
                        <div className="flex flex-col items-center">
                            <WikiVersion releaseVersion={app.version} wikiVersion={app.wikiVersion} />
                        </div>
                    </TableCell>
                    <TableCell>
                        <SelectScrollable
                            items={forgivingSort(app.releases).map(release => ({ label: release, value: release }))}
                            onSelect={value => {
                                if (value) {
                                    window.open(`https://github.com/${import.meta.env.VITE_ORGANIZATION_NAME}/${app.name}/releases/${value}`, '_blank');
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <SelectScrollable
                            items={app.releaseCandidates.sort(rcompare).map(rc => ({ label: rc, value: rc }))}
                            onSelect={value => {
                                if (value) {
                                    window.open(`https://github.com/${import.meta.env.VITE_ORGANIZATION_NAME}/${app.name}/tree/${value}`, '_blank');
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <SelectScrollable
                            items={forgivingSort(app.tags).map(tag => ({ label: tag, value: tag }))}
                            onSelect={value => {
                                if (value) {
                                    window.open(`https://github.com/${import.meta.env.VITE_ORGANIZATION_NAME}/${app.name}/tree/${value}`, '_blank');
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <FeatureList applicationName={app.name} features={app.features}></FeatureList>
                    </TableCell>
                    <TableCell>
                        <InfoFreshIcon timestamp={app.updated} />
                    </TableCell>
                </TableRow>
            ))}
            {
            !applications.length && <TableRow><TableCell colSpan={8}>No applications found</TableCell></TableRow>
            }
            </TableBody>
        </Table>
    );
}