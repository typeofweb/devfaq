import { Transition } from "@headlessui/react";
import { useCallback, useRef, useState } from "react";
import FocusLock from "react-focus-lock";
import { UserData } from "../../types";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useUser } from "../../hooks/useUser";
import { useOnKeydown } from "../../hooks/useOnKeydown";
import { UserAvatar } from "./UserAvatar";

type UserMenuProps = {
	userData: UserData;
};

export const UserMenu = ({ userData }: UserMenuProps) => {
	const { logout } = useUser();
	const [isDropdownVisible, setIsDropdownVisible] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);
	useOnClickOutside(dropdownRef, () => setIsDropdownVisible(false));

	useOnKeydown(
		"Escape",
		useCallback(() => {
			if (isDropdownVisible) {
				setIsDropdownVisible(false);
			}
		}, [isDropdownVisible]),
	);

	return (
		<div ref={dropdownRef} className="flex flex-col items-center gap-0">
			<button
				type="button"
				className="relative mx-auto flex flex flex-row items-center gap-3 rounded-full bg-violet-800 pr-6 uppercase transition-opacity hover:opacity-80 dark:bg-violet-700 sm:gap-2 sm:pr-4"
				onClick={() => setIsDropdownVisible((prev) => !prev)}
				aria-label={`${isDropdownVisible ? "Zamknij" : "Otwórz"} menu użytkownika`}
				aria-expanded={isDropdownVisible}
				aria-controls="user-menu"
			>
				<div className="relative h-12 w-12 sm:h-6 sm:w-6">
					<UserAvatar userData={userData} />
				</div>
				konto
			</button>
			<Transition
				show={isDropdownVisible}
				enter="transform transition duration-200"
				enterFrom="opacity-0 scale-50 "
				enterTo="opacity-100 scale-1"
				leave="transform duration-200 transition ease-in-out"
				leaveFrom="opacity-100 scale-100 "
				leaveTo="opacity-0 scale-95"
			>
				<FocusLock
					as="ul"
					className={`absolute right-[50%] z-40 mt-1 flex w-48 translate-x-[50%] flex-col items-start items-center gap-4 rounded-md border-violet-600 bg-violet-800 p-4 shadow-xl dark:bg-violet-700 sm:gap-2`}
					lockProps={{ id: "user-menu" }}
				>
					<li>
						<button
							type="button"
							onClick={() => logout.mutate({})}
							className="uppercase transition-opacity hover:opacity-80"
						>
							Wyloguj się
						</button>
					</li>
				</FocusLock>
			</Transition>
		</div>
	);
};
