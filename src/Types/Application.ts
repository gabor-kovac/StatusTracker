export interface Application {
	name: string;
	version: string | null;
	updated?: number;
	wikiVersion: string | null;
	releaseCandidates: string[];
	tags: string[];
	features?: Feature[];
}

export interface Feature {
	branch: string,
	last_commit_sha: string,
	last_commit_message?: string,
	last_commit_date: string,
	last_commit_author: string,
	last_commit_scan_result?: string,
	last_commit_scan_date?: string,
	pull_requests?: PullRequest[]
}

export interface PullRequest {
	pr_number: number | null,
	pr_title: string | null,
	pr_author: Author | null,
	created_at: string
}

export interface Author {
	login: string | null
}

