import { redirect } from "next/navigation";
import { QuestionItem } from "../../../../components/QuestionItem/QuestionItem";
import { QuestionsHeader } from "../../../../components/QuestionsHeader/QuestionsHeader";
import { QuestionsPagination } from "../../../../components/QuestionsPagination";
import { PAGE_SIZE } from "../../../../lib/constants";
import { getQueryOrder, DEFAULT_ORDER_QUERY } from "../../../../lib/order";
import { technologies } from "../../../../lib/technologies";
import { getAllQuestions } from "../../../../services/questions.service";

export default async function QuestionsPage({
	params,
	searchParams,
}: {
	params: { technology: string; page: string };
	searchParams?: { orderBy?: string };
}) {
	const page = parseInt(params.page);
	const queryOrder = getQueryOrder(searchParams?.orderBy || DEFAULT_ORDER_QUERY);

	if (!technologies.includes(params.technology) || isNaN(page)) {
		return redirect("/");
	}

	const { data } = await getAllQuestions({
		category: params.technology,
		limit: PAGE_SIZE,
		offset: (page - 1) * PAGE_SIZE,
		orderBy: queryOrder?.orderBy,
		order: queryOrder?.order,
	});

	return (
		<div className="flex flex-col gap-y-10">
			<QuestionsHeader technology={params.technology} total={data.meta.total} />
			{data.data.map(({ id, question, _levelId, acceptedAt, votesCount }) => (
				<QuestionItem
					key={id}
					title={question}
					level={_levelId}
					creationDate={new Date(acceptedAt || "")}
					votes={votesCount}
					voted={id % 2 === 0}
				/>
			))}
			<QuestionsPagination technology={params.technology} total={data.meta.total} />
		</div>
	);
}
