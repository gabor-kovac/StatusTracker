import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppList } from "../Assets/ApplicationData";
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { SelectScrollable, type SelectItems } from "@/Components/SelectScrollable";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/Components/ui/input-group";
import { List, Search, PanelTopOpen } from "lucide-react";
import { InfoFreshIcon } from "@/Components/InfoFreshIcon";
import WikiVersion from "@/Components/WikiVersion";
import type { Application } from '../Types/Application';

export default function Home() {

    const [applications, setApplications] = useState<Application[]>(AppList);
    const [searchFilter, setSearchFilter] = useState<string>("");

    useEffect(() => {
        if (searchFilter !== "") {
            console.log("Search filter:", searchFilter);
            let filteredApps = AppList.filter((app: Application) => app.name.toLowerCase().includes(searchFilter));
            console.log(filteredApps);
            setApplications(filteredApps);
        } else {
            setApplications(AppList);
        }
    }, [AppList, searchFilter]);

    return (
        <Table>
            <TableHeader className="border-b-3 border-grey-900">
                <TableRow>
                    <div className="flex flex-col p-3">
                        <InputGroup>
                            <InputGroupInput type="search" placeholder="Search application" onChange={(e) => setSearchFilter(e.target.value.toLowerCase())}></InputGroupInput>
                            <InputGroupAddon align="inline-start">
                                <Search />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <TableHead colSpan={6}></TableHead>
                    <TableHead>
                        <Button size="lg">
                            <Link to="/releases">Releases</Link>
                            <List data-icon="inline-end" />
                        </Button>
                    </TableHead>
                </TableRow>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Release</TableHead>
                    <TableHead>Wiki</TableHead>
                    <TableHead>Release Candidates</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
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
                            items={app.releaseCandidates.map(rc => ({ label: rc, value: rc }))}
                            onSelect={value => {
                                if (value) {
                                    window.open(`https://github.com/${import.meta.env.VITE_ORGANIZATION_NAME}/${app.name}/tree/${value}`, '_blank');
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <SelectScrollable
                            items={app.tags.map(tag => ({ label: tag, value: tag }))}
                            onSelect={value => {
                                if (value) {
                                    window.open(`https://github.com/${import.meta.env.VITE_ORGANIZATION_NAME}/${app.name}/tree/${value}`, '_blank');
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        {
                        app.features?.length ?
                        <Button>
                            Open features
                            <PanelTopOpen data-icon="inline-end" />
                        </Button>
                        :
                        <span>-</span>
                        }
                    </TableCell>
                    <TableCell>
                        <InfoFreshIcon timestamp={app.updated} />
                    </TableCell>
                    <TableCell>
                        
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