import { Footer } from "flowbite-react";

export default function FooterComponent() {
  return (
    <Footer container>
      <Footer.Copyright href="#" by="Josué Matamoros " year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">Email</Footer.Link>
        <Footer.Link href="#">LinkedIn</Footer.Link>
        <Footer.Link href="#">Github</Footer.Link>
        <Footer.Link href="#">Instagram</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}