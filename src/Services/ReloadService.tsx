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

    useEffect(() => {
        const checkHash = async () => {
            var response = await fetch('/StatusTracker/hash.json', { cache: "no-store" });
            if (response != null) {
                var responseJson = await response.json();
                if (responseJson != null && responseJson as HashResponse) {
                    var hashObject = responseJson as HashResponse;
                    if (!initialCommit.current) {
                        initialCommit.current = hashObject.sha;
                        return;
                    }
                    if (hashObject.sha !== initialCommit.current) {
                        setUpdateAvailable(true);
                        clearInterval(interval);
                    }
                }
            }
        }
        checkHash();
        const interval = setInterval(checkHash, refreshIntervalSeconds * 1000);

        return () => clearInterval(interval);

    }, []);

    return updateAvailable;
}