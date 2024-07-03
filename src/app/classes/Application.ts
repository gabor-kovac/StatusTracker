export interface Application {
	[key: string]: any;
	name: string | null;
	version: string | null;
	wikiVersion: string | null;
	releaseCandidates: string[];
	tags: string[];
	features: Feature[] | undefined;
}

export interface Feature {
	[key: string]: any,
	branch: string,
	last_commit_date: string,
	last_commit_message?: string,
	last_commit_author: string,
	last_commit_scan_result?: string,
	last_commit_scan_url?: string,
	last_commit_scan_date?: string,
	pull_requests: PullRequest[] | null
}

export interface PullRequest {
	[key: string]: any,
	pr_number: number | null,
	pr_title: string | null,
	pr_author: Author | null,
	created_at: string
}

export interface Author {
	login: string | null
}

