export interface ApplicationRelease {
    applicationName: string;
    releases: any[];
    [key: string]: any;
}

export interface Release {
    release: string;
    assetCount?: number;
    tests?: Test[];
    [key: string]: any;
}

export interface Test {
    testFile: string;
    summary: Object;
    dateTime?: Date;
    [key: string]: any;
}