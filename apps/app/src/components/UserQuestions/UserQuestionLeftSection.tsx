import { useEffect } from "react";
import { useUIContext } from "../../providers/UIProvider";
import { AdminQuestion } from "../../types";
import PencilIcon from "../../../public/icons/pencil.svg";
import { Button } from "../Button/Button";

type UserQuestionLeftSectionProps = Readonly<{
	question: AdminQuestion;
	refetchQuestions: () => void;
}>;

export const UserQuestionLeftSection = ({
	question,
	refetchQuestions,
}: UserQuestionLeftSectionProps) => {
	const { openModal, openedModal } = useUIContext();

	return (
		<div className="mr-3 flex flex-col justify-start gap-1.5">
			<Button
				variant="branding"
				className="m-px flex w-24 min-w-0 items-center justify-center gap-2 p-0"
				onClick={() =>
					openModal("AddQuestionModal", {
						...question,
						additionalActionOnClose: refetchQuestions,
					})
				}
			>
				<PencilIcon className="fill-violet-700 dark:fill-neutral-200" />
				Edytuj
			</Button>
		</div>
	);
};
