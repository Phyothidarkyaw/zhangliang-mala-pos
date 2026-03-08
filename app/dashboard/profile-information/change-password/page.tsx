import Header from "@/components/Header";
import ChangePasswordSection from "@/modules/profile-information/components/ChangePasswordSection";

const Page = () => {
  return (
    <>
      <Header
        links={[
          {
            title: "Profile Information",
            href: "/dashboard/profile-information",
          },
        ]}
        currentPage="Change Password"
      />
      <ChangePasswordSection/>
    </>
  );
};

export default Page;
