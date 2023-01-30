/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
	"/oauth/github/login": {
		get: {
			responses: {
				/** @description Default Response */
				200: never;
			};
		};
	};
	"/oauth/github": {
		get: {
			responses: {
				/** @description Default Response */
				200: never;
			};
		};
	};
	"/auth/me": {
		/** @description Get currently logged-in user */
		get: {
			/** @description Get currently logged-in user */
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								/** Format: date-time */
								createdAt: string;
								/** Format: date-time */
								updatedAt: string;
								keepMeSignedIn: boolean;
								/** Format: date-time */
								validUntil: string;
								_user: {
									id: number;
									email: string;
									firstName: string | null;
									lastName: string | null;
									_roleId: string;
									/** Format: date-time */
									createdAt: string;
									/** Format: date-time */
									updatedAt: string;
									socialLogin: {
										[key: string]: (string | number) | undefined;
									};
								};
							};
						};
					};
				};
			};
		};
		/** @description Log out */
		delete: {
			/** @description Log out */
			responses: {
				/** @description Default Response */
				204: {
					content: {
						"application/json": Record<string, never>;
					};
				};
			};
		};
	};
	"/questions": {
		get: {
			parameters?: {
				query?: {
					category?: "html" | "css" | "js" | "angular" | "react" | "git" | "other";
					status?: "pending" | "accepted";
					level?: string;
					limit?: number;
					offset?: number;
					orderBy?: "acceptedAt" | "level" | "votesCount" | "updatedAt";
					order?: "asc" | "desc";
					userId?: number;
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								id: number;
								question: string;
								_categoryId: "html" | "css" | "js" | "angular" | "react" | "git" | "other";
								_levelId: "junior" | "mid" | "senior";
								_statusId: "pending" | "accepted";
								/** Format: date-time */
								acceptedAt?: string;
								/** Format: date-time */
								updatedAt?: string;
								votesCount: number;
							}[];
							meta: {
								total: number;
							};
						};
					};
				};
			};
		};
		post: {
			requestBody: {
				content: {
					"application/json": {
						question: string;
						level: "junior" | "mid" | "senior";
						category: "html" | "css" | "js" | "angular" | "react" | "git" | "other";
					};
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								id: number;
								question: string;
								_categoryId: "html" | "css" | "js" | "angular" | "react" | "git" | "other";
								_levelId: "junior" | "mid" | "senior";
								_statusId: "pending" | "accepted";
								/** Format: date-time */
								acceptedAt?: string;
								/** Format: date-time */
								updatedAt?: string;
								votesCount: number;
							};
						};
					};
				};
			};
		};
	};
	"/questions/votes": {
		get: {
			parameters?: {
				query?: {
					category?: "html" | "css" | "js" | "angular" | "react" | "git" | "other";
					status?: "pending" | "accepted";
					level?: string;
					limit?: number;
					offset?: number;
					orderBy?: "acceptedAt" | "level" | "votesCount" | "updatedAt";
					order?: "asc" | "desc";
					userId?: number;
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								id: number;
								votesCount: number;
								currentUserVotedOn: boolean;
							}[];
						};
					};
				};
			};
		};
	};
	"/questions/{id}/votes": {
		get: {
			parameters: {
				path: {
					id: number;
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								id: number;
								votesCount: number;
								currentUserVotedOn: boolean;
							};
						};
					};
				};
			};
		};
		post: {
			parameters: {
				path: {
					id: number;
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								userId: number;
								questionId: number;
							};
						};
					};
				};
			};
		};
		delete: {
			parameters: {
				path: {
					id: number;
				};
			};
			responses: {
				/** @description Default Response */
				204: {
					content: {
						"application/json": boolean & true;
					};
				};
			};
		};
	};
	"/questions/{id}": {
		get: {
			parameters: {
				path: {
					id: number;
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								id: number;
								question: string;
								_categoryId: "html" | "css" | "js" | "angular" | "react" | "git" | "other";
								_levelId: "junior" | "mid" | "senior";
								_statusId: "pending" | "accepted";
								/** Format: date-time */
								acceptedAt?: string;
								/** Format: date-time */
								updatedAt?: string;
								votesCount: number;
							};
						};
					};
				};
			};
		};
		delete: {
			parameters: {
				path: {
					id: number;
				};
			};
			responses: {
				/** @description Default Response */
				200: never;
			};
		};
		patch: {
			parameters: {
				path: {
					id: number;
				};
			};
			requestBody?: {
				content: {
					"application/json": {
						question?: string;
						level?: "junior" | "mid" | "senior";
						category?: "html" | "css" | "js" | "angular" | "react" | "git" | "other";
						status?: "pending" | "accepted";
					};
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								id: number;
								question: string;
								_categoryId: "html" | "css" | "js" | "angular" | "react" | "git" | "other";
								_levelId: "junior" | "mid" | "senior";
								_statusId: "pending" | "accepted";
								/** Format: date-time */
								acceptedAt?: string;
								/** Format: date-time */
								updatedAt?: string;
								votesCount: number;
							};
						};
					};
				};
			};
		};
	};
	"/answers": {
		get: {
			parameters?: {
				query?: {
					limit?: number;
					offset?: number;
					orderBy?: "createdAt" | "updatedAt" | "votesCount";
					order?: "asc" | "desc";
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								id: number;
								content: string;
								sources: string[];
								/** Format: date-time */
								createdAt: string;
								/** Format: date-time */
								updatedAt: string;
								createdBy: {
									id: number;
									firstName: string | null;
									lastName: string | null;
									socialLogin: {
										[key: string]: (string | number) | undefined;
									};
								};
								votesCount: number;
							}[];
							meta: {
								total: number;
							};
						};
					};
				};
			};
		};
	};
	"/questions/{id}/answers": {
		get: {
			parameters: {
				path: {
					id: number;
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								id: number;
								content: string;
								sources: string[];
								/** Format: date-time */
								createdAt: string;
								votesCount: number;
								currentUserVotedOn: boolean;
								createdBy: {
									id: number;
									firstName: string | null;
									lastName: string | null;
									socialLogin: {
										[key: string]: (string | number) | undefined;
									};
								};
							}[];
						};
					};
				};
			};
		};
		post: {
			parameters: {
				path: {
					id: number;
				};
			};
			requestBody: {
				content: {
					"application/json": {
						content: string;
						sources: string[];
					};
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								id: number;
								content: string;
								sources: string[];
								/** Format: date-time */
								createdAt: string;
								votesCount: number;
								currentUserVotedOn: boolean;
								createdBy: {
									id: number;
									firstName: string | null;
									lastName: string | null;
									socialLogin: {
										[key: string]: (string | number) | undefined;
									};
								};
							};
						};
					};
				};
			};
		};
	};
	"/answers/{id}": {
		delete: {
			parameters: {
				path: {
					id: number;
				};
			};
			responses: {
				/** @description Default Response */
				204: {
					content: {
						"application/json": boolean & true;
					};
				};
			};
		};
		patch: {
			parameters: {
				path: {
					id: number;
				};
			};
			requestBody?: {
				content: {
					"application/json": {
						content?: string;
						sources?: string[];
					};
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								id: number;
								content: string;
								sources: string[];
								/** Format: date-time */
								createdAt: string;
								votesCount: number;
								currentUserVotedOn: boolean;
								createdBy: {
									id: number;
									firstName: string | null;
									lastName: string | null;
									socialLogin: {
										[key: string]: (string | number) | undefined;
									};
								};
							};
						};
					};
				};
			};
		};
	};
	"/answers/{id}/votes": {
		post: {
			parameters: {
				path: {
					id: number;
				};
			};
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": {
							data: {
								userId: number;
								answerId: number;
							};
						};
					};
				};
			};
		};
		delete: {
			parameters: {
				path: {
					id: number;
				};
			};
			responses: {
				/** @description Default Response */
				204: {
					content: {
						"application/json": boolean & true;
					};
				};
			};
		};
	};
	"/": {
		get: {
			responses: {
				/** @description Default Response */
				200: {
					content: {
						"application/json": string;
					};
				};
			};
		};
	};
}

export type webhooks = Record<string, never>;

export interface components {
	schemas: {};
	responses: never;
	parameters: never;
	requestBodies: never;
	headers: never;
	pathItems: never;
}

export type external = Record<string, never>;

export type operations = Record<string, never>;
