import { ChartBarStacked, CircleUserRound, ShoppingCart, SquareMenu, Users, Utensils } from "lucide-react";
import ModuleLink from "./ModuleLink";

function ModuleLinkList() {
  const moduleLinks = [
    {
      groupTitle: "Sale Relations",
      modules: [
        {
          icon: <ShoppingCart />,
          title: "Sale Screen",
          href: "/dashboard/sale",
        },
        {
          icon: <SquareMenu />,
          title: "Sale Voucher",
          href: "/dashboard/sale",
        },
      ],
    },
    {
      groupTitle: "Management",
      modules: [
        {
          icon: <ChartBarStacked />,
          title: "Category",
          href: "/dashboard/categories",
        },
        {
          icon: <Utensils />,
          title: "Menu",
          href: "/dashboard/menu",
        },
        {
          icon: <Users />,
          title: "Customer",
          href: "/dashboard/customers",
        },
      ],
    },
    {
      groupTitle: "User Information",
      modules: [
        {
          icon: <CircleUserRound />,
          title: "Profile Information",
          href: "/dashboard/profile-information",
        },
        {
          icon: <CircleUserRound />,
          title: "Brand Information",
          href: "/dashboard/profile-information",
        },
      ],
    },
  ];
  return (
    <section className="flex flex-col gap-8 container mx-auto">
      {moduleLinks.map(({ groupTitle, modules },index) => (
        <div key={`module-group-${index}`}>
          <h4 className="mb-3">{groupTitle}</h4>
          <div className="grid grid-cols-4 gap-4">
            {modules.map(({ icon, title, href },index) => (
              <ModuleLink key={`module-link-${index}`} icon={icon} title={title} href={href} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default ModuleLinkList;
