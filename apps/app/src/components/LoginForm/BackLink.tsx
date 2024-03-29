"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const BackLink = () => {
	const searchParams = useSearchParams();
	const previousPath = searchParams.get("previousPath") || "/";

	return (
		<Link
			href={previousPath}
			className="text-sm text-white underline transition-opacity hover:opacity-80"
		>
			Powrót do strony głównej
		</Link>
	);
};
