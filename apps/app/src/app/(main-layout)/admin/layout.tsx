import { ReactNode } from "react";
import { Container } from "../../../components/Container";

export default function AdminPageLayout({ children }: { readonly children: ReactNode }) {
	return <Container as="main">{children}</Container>;
}
