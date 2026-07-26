export interface Application {
	name: string;
	version: string | null;
	updated?: number | null;
	wikiVersion: string | null;
	releases: string[];
	releaseCandidates: string[];
	tags: string[];
	features?: Feature[];
}

export interface Feature {
	branch: string,
	lastCommitSha: string,
	lastCommitMessage?: string,
	lastCommitDate: string,
	lastCommitAuthor: string,
	pullRequests?: PullRequest[]
}

export interface PullRequest {
	number: number | null,
	title: string | null,
	author: Author | null,
	createdAt: string
}

export interface Author {
	login: string | null
}

