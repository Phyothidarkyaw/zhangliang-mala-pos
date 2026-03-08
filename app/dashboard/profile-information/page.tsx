import Header from "@/components/Header";
import ProfileInformationSection from "@/modules/profile-information/components/ProfileInformationSection";

const Page = () => {
  return (
    <>
      <Header currentPage="Profile Information" />
      <ProfileInformationSection />
    </>
  );
};

export default Page;
