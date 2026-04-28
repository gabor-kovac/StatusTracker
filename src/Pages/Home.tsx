import { Link } from "react-router-dom";
import { AppList } from "../Assets/ApplicationData";
import { Button } from "@/Components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/Components/ui/combobox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { SelectScrollable, type SelectItems } from "@/Components/SelectScrollable";
import { List  } from "lucide-react";
import { InfoFreshIcon } from "@/Components/InfoFreshIcon";
import WikiVersion from "@/Components/WikiVersion";

export default function Home() {
    return (
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Release</TableHead>
                    <TableHead className="text-center">Wiki</TableHead>
                    <TableHead className="text-center">Release Candidates</TableHead>
                    <TableHead className="text-center">Tags</TableHead>
                    <TableHead className="text-center">Features</TableHead>
                    <TableHead className="text-center">
                        <Button size="lg">
                            <Link to="/releases">Releases</Link>
                            <List data-icon="inline-end" />
                        </Button>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {AppList.map((app, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center">{app.name}</TableCell>
                        <TableCell className="text-center">{app.version ?? "-"}</TableCell>
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
                        <TableCell>Open features</TableCell>
                        <TableCell>
                            <InfoFreshIcon timestamp={app.updated} />
                        </TableCell>
                        <TableCell>compat</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
       
    );
}