"use client";

import { UserData } from "../../types";
import { GitHubAvatar } from "../GitHubAvatar";

type UserAvatarProps = Readonly<{
	userData: UserData;
}>;

export const UserAvatar = ({ userData }: UserAvatarProps) => {
	const { _user } = userData;

	return <GitHubAvatar user={_user} className="mx-auto rounded-full" />;
};
