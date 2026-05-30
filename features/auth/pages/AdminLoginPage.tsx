import { AuthBrandHero } from "../components/AuthBrandHero";
import { LoginCard } from "../components/LoginCard";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AuthBrandHero className="lg:w-[45%] xl:w-[42%]" />
      <div className="flex flex-1 items-center justify-center bg-surf px-4 py-10 lg:py-0">
        <LoginCard />
      </div>
    </div>
  );
}
