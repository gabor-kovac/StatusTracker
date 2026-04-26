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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { SelectScrollable, type SelectItems } from "@/Components/SelectScrollable";
import { List  } from "lucide-react";
import { InfoFreshIcon } from "@/Components/InfoFreshIcon";

// <Button size="lg">
//     <Link to="/releases">Releases</Link>
// </Button>

const northAmerica = [
    { label: "Eastern Standard Time", value: "est" },
    { label: "Central Standard Time", value: "cst" },
    { label: "Mountain Standard Time", value: "mst" },
    { label: "Pacific Standard Time", value: "pst" },
    { label: "Alaska Standard Time", value: "akst" },
    { label: "Hawaii Standard Time", value: "hst" },
]

const europeAfrica = [
    { label: "Greenwich Mean Time", value: "gmt" },
    { label: "Central European Time", value: "cet" },
    { label: "Eastern European Time", value: "eet" },
    { label: "Western European Summer Time", value: "west" },
    { label: "Central Africa Time", value: "cat" },
    { label: "East Africa Time", value: "eat" },
]

const asia = [
    { label: "Moscow Time", value: "msk" },
    { label: "India Standard Time", value: "ist" },
    { label: "China Standard Time", value: "cst_china" },
    { label: "Japan Standard Time", value: "jst" },
    { label: "Korea Standard Time", value: "kst" },
    { label: "Indonesia Central Standard Time", value: "ist_indonesia" },
]

const australiaPacific = [
    { label: "Australian Western Standard Time", value: "awst" },
    { label: "Australian Central Standard Time", value: "acst" },
    { label: "Australian Eastern Standard Time", value: "aest" },
    { label: "New Zealand Standard Time", value: "nzst" },
    { label: "Fiji Time", value: "fjt" },
]

const southAmerica = [
    { label: "Argentina Time", value: "art" },
    { label: "Bolivia Time", value: "bot" },
    { label: "Brasilia Time", value: "brt" },
    { label: "Chile Standard Time", value: "clt" },
]

const items: SelectItems[] = [
    { label: "Select a timezone", value: null },
    ...northAmerica,
    ...europeAfrica,
    ...asia,
    ...australiaPacific,
    ...southAmerica,
]

export default function Home() {
    return (
        
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Release</TableHead>
                    <TableHead>Wiki</TableHead>
                    <TableHead>Release Candidates</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>
                        <Button size="lg">
                            <List />
                            <Link to="/releases">Releases</Link>
                        </Button>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {AppList.map((app, index) => (
                    <TableRow key={index}>
                        <TableCell>{app.name}</TableCell>
                        <TableCell>{app.version}</TableCell>
                        <TableCell>{app.wikiVersion}</TableCell>
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
                        <TableCell>{app.features.map((feature, idx) => <div key={idx}>{feature.branch}</div>)}</TableCell>
                        <TableCell>
                            <InfoFreshIcon timestamp={app.updated} />
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
       
    );
}