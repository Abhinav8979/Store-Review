import type { FieldErrors } from "react-hook-form";
import type { UserFormValues } from "../../zod schema/createSchema";
import Input from "../../ui/Input";

type Props = {
  register: any;
  errors: FieldErrors<UserFormValues>;
};

const AddUserForm = ({ register, errors }: Props) => {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Name"
        {...register("name")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <Input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <Input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <Input
        type="text"
        placeholder="Address"
        {...register("address")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.address && (
        <p className="text-red-500">{errors.address.message}</p>
      )}

      <Input
        type="text"
        placeholder="Role"
        {...register("address")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.address && <p className="text-red-500">{errors.role.message}</p>}
    </div>
  );
};

export default AddUserForm;
