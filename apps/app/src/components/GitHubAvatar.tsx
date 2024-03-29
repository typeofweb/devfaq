import Image from "next/image";
import { ComponentProps } from "react";
import { User } from "../types";

type GitHubAvatarProps = Readonly<{
	user: Pick<User, "id" | "firstName" | "lastName" | "socialLogin">;
}> &
	Omit<ComponentProps<typeof Image>, "src" | "alt">;

export const GitHubAvatar = ({
	user: { id, firstName, lastName, socialLogin },
	...props
}: GitHubAvatarProps) => {
	if (!socialLogin.github) {
		return null;
	}

	const avatarUrl = `https://avatars.githubusercontent.com/u/${socialLogin.github}`;
	const alt = firstName
		? `Zdjęcie użytkownika ${firstName} ${lastName || ""}`.trim()
		: `Zdjęcie użytkownika ${id}`;

	if (!props.width || !props.height) {
		return (
			<Image
				src={avatarUrl}
				alt={alt}
				{...props}
				fill={!props.width && !props.height}
				sizes="(max-width: 639px) 48px, (min-width: 640px) 24px"
			/>
		);
	}
	return <Image src={avatarUrl} alt={alt} {...props} />;
};
