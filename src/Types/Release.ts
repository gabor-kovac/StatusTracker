export interface ApplicationRelease {
    applicationName: string;
    releases: Release[];
}

export interface Release {
    release: string;
    assetCount?: number;
    tests?: Test[];
}

export interface Test {
    testFile: string;
    summary: object;
    dateTime?: Date;
}