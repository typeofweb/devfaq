import Link from "next/link";
import Logo from "../../../public/devfaq-logo.svg";
import { Container } from "../Container";
import { HeaderNavigation } from "./HeaderNavigation";
import { ActiveNavigationLink } from "./ActiveNagivationLink";
import { DarkModeSwitch } from "./DarkModeSwitch";

export const Header = () => (
	<div className="bg-primary dark:bg-violet-800">
		<Container
			as="header"
			className="flex h-16 items-center justify-between border-b border-violet-600 text-white"
		>
			<Link href="/">
				<div className="h-10 w-24 sm:w-36">
					<Logo className="h-full w-full" viewBox="0 0 503 104" />
				</div>
			</Link>
			<HeaderNavigation>
				<ActiveNavigationLink href="/">Jak korzystać?</ActiveNavigationLink>
				<ActiveNavigationLink href="/foo">Autorzy</ActiveNavigationLink>
				<a href="https://www.facebook.com/DevFAQ" target="_blank" rel="noreferrer">
					FaceBook
				</a>
				<ActiveNavigationLink href="#">Zaloguj</ActiveNavigationLink>
				<DarkModeSwitch />
			</HeaderNavigation>
		</Container>
	</div>
);
