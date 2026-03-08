import Header from "@/components/Header";
import EditProfileSection from "@/modules/profile-information/components/EditProfileSection";

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
        currentPage="Edit Profile"
      />
      <EditProfileSection/>
    </>
  );
};

export default Page;
