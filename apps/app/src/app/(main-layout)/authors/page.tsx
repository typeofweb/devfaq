import { Author } from "../../../components/Author/Author";
import { StaticPageContainer } from "../../../components/StaticPageContainer";
import { getAllContributors } from "../../../lib/contributors";

export default function AuthorsPage() {
	return (
		<StaticPageContainer>
			<h1 className="mb-8 text-4xl font-bold">Autorzy</h1>
			<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{getAllContributors().map((contributor) => (
					<li key={contributor.login}>
						<Author contributor={contributor} />
					</li>
				))}
			</ul>
		</StaticPageContainer>
	);
}
