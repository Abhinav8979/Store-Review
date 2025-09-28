import type { FieldErrors } from "react-hook-form";
import { roles } from "../../constants/role";
import type { AdminFormValues } from "../../zod schema/createSchema";
import SelectBox from "../../ui/SelectBox";
import Input from "../../ui/Input";

type Props = {
  register: any;
  errors: FieldErrors<AdminFormValues>;
};

const AddAdminForm = ({ register, errors }: Props) => {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Name"
        {...register("name")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.name && (
        <p className="text-red-500">{errors.name.message as string}</p>
      )}

      <Input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message as string}</p>
      )}

      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message as string}</p>
      )}

      <Input
        type="text"
        placeholder="Address"
        {...register("address")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.address && (
        <p className="text-red-500">{errors.address.message as string}</p>
      )}

      <SelectBox
        name="role"
        register={register}
        options={roles.map((role) => ({ label: role, value: role }))}
        placeholder="Select a role"
        error={errors.role?.message as string}
      />
    </div>
  );
};

export default AddAdminForm;
