import { ShoppingCart } from "lucide-react";
import ModuleLink from "./ModuleLink";

function ModuleLinkList() {
  const moduleLinks = [
    {
      groupTitle: "Sale Module",
      modules: [
        {
          icon: <ShoppingCart />,
          title: "Sale",
          href: "/dashboard/sale",
        },
      ],
    },
    {
      groupTitle: "Management",
      modules: [
        {
          icon: <ShoppingCart />,
          title: "Sale",
          href: "/dashboard/sale",
        },
        {
          icon: <ShoppingCart />,
          title: "Sale",
          href: "/dashboard/sale",
        },
        {
          icon: <ShoppingCart />,
          title: "Sale",
          href: "/dashboard/sale",
        },
      ],
    },
    {
      groupTitle: "User Information",
      modules: [
        {
          icon: <ShoppingCart />,
          title: "Sale",
          href: "/dashboard/sale",
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
