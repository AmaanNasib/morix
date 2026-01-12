import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

export interface DefaultBreadCrumbsProps {
  breadcrumbs: string[];
}

export function DefaultBreadCrumbs({ breadcrumbs }: DefaultBreadCrumbsProps) {
  return (
    <Breadcrumbs>
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem key={`${index}-${breadcrumb}`}>
          {breadcrumb}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}

export default DefaultBreadCrumbs;
