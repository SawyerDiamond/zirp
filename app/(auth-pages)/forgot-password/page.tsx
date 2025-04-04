import ForgotPasswordForm from "../../../components/authComponents/ForgotPasswordForm";
import { Message } from "@/components/authComponents/form-message";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex items-center justify-center h-screen">
      <ForgotPasswordForm searchParams={searchParams} />
    </div>
  );
}
