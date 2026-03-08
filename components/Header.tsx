"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ChevronLeft, ChevronRight, House } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

type LinkType = {
  title: string;
  href: string;
};

type Props = {
  links?: LinkType[];
  currentPage: string;
};

const Header = ({ links=[], currentPage }: Props) => {
  const router = useRouter();
  return (
    <header className="bg-card ">
      <div className="py-2 container mx-auto flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">
                <House className="size-3" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {links.map(({ title, href }: LinkType) => (
              <Fragment key={title}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ButtonGroup>
          <Button
          onClick={() => router.back()}
            className={"size-5"}
            variant="outline"
            size="icon"
            aria-label="Go Back"
          >
            <ChevronLeft className="size-3" />
          </Button>
          <Button
          onClick={() => router.forward()}
            className={"size-5"}
            variant="outline"
            size="icon"
            aria-label="Go Back"
          >
            <ChevronRight className="size-3" />
          </Button>
        </ButtonGroup>
      </div>
    </header>
  );
};

export default Header;
