import { twMerge } from "tailwind-merge";

type ErrorProps = Readonly<{
	visible: boolean;
	className?: string;
}>;

export const Error = ({ visible, className }: ErrorProps) => (
	<p
		role="alert"
		className={twMerge(
			"text-right text-sm text-red-600",
			visible ? "visible" : "invisible",
			className,
		)}
	>
		⚠️ Wystąpił nieoczekiwany błąd. Spróbuj ponownie, a jeśli problem będzie się powtarzał,{" "}
		<a
			href="https://discord.com/invite/va2NhBv"
			className="underline"
			target="_blank"
			rel="noreferrer"
		>
			skontaktuj się z administracją.
		</a>
	</p>
);
