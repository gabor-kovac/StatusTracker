import { useEffect, useRef, useState } from "react";

export interface ReloadServiceProps {
    refreshIntervalSeconds: number
}

interface HashResponse {
    sha: string
}

export default function ReloadService({refreshIntervalSeconds}: ReloadServiceProps) {

    const initialCommit = useRef<string | null>(null);
    const [updateAvailable, setUpdateAvailable] = useState(false);

    console.log("Refresh interval set at: " + refreshIntervalSeconds + "s");

    useEffect(() => {
        const checkHash = async () => {
            var response = await fetch('hash.json', { cache: "no-store" });
            if (response != null) {
                var responseJson = await response.json();
                if (responseJson != null && responseJson as HashResponse) {
                    var hashObject = responseJson as HashResponse;
                    if(hashObject != null)
                    {
                        console.log("Hash was: ");
                        console.log(hashObject.sha);
                    }
                    if (!initialCommit.current) {
                        initialCommit.current = hashObject.sha;
                        console.log("Setting initial commit sha to: "+hashObject.sha);
                        return;
                    }

                    if (hashObject.sha !== initialCommit.current) {
                        console.log("Hash mismatch, please reload page!");
                        setUpdateAvailable(true);
                        clearInterval(interval);
                    }
                }
            }
        }

        const interval = setInterval(checkHash, refreshIntervalSeconds * 1000);

        return () => clearInterval(interval);

    }, []);

    return updateAvailable;
}