import { use } from "react";
import { serializeSource } from "../../lib/markdown";
import { MarkdownContent } from "../MarkdownContent";

export const ContentPreview = ({ content }: { readonly content: string }) => {
	const source = use(serializeSource(content));

	return (
		<div className="relative z-10 h-full overflow-auto bg-neutral-50 p-2 dark:bg-neutral-700">
			<MarkdownContent source={source} />
		</div>
	);
};
