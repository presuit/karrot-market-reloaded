import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Login with SMS!</h2>
      </div>
      <form className="flex flex-col gap-5">
        <FormInput
          required
          type="number"
          placeholder="Phone Number"
          errors={[]}
        />
        <FormInput
          required
          type="number"
          placeholder="Verification code"
          errors={[]}
        />

        <FormButton text="Verify" loading={false} />
      </form>
    </div>
  );
}
