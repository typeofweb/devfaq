export const SkipToTheContent = () => {
	return (
		<a
			href={`#main-content`}
			className="fixed -top-[100%] z-50 m-4 border-white bg-violet-900 p-4 px-8 text-white focus:visible focus:top-0 focus:border-2 focus:border-dashed"
		>
			Przejdź do treści
		</a>
	);
};