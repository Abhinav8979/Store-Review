import type { FieldErrors } from "react-hook-form";
import { adminRoles } from "../../constants/role";
import type { AdminFormValues } from "../../zod schema/createSchema";

type Props = {
  register: any;
  errors: FieldErrors<AdminFormValues>;
};

const AddAdminForm = ({ register, errors }: Props) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        {...register("name")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.name && (
        <p className="text-red-500">{errors.name.message as string}</p>
      )}

      <input
        type="email"
        placeholder="Email"
        {...register("email")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.email && (
        <p className="text-red-500">{errors.email.message as string}</p>
      )}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message as string}</p>
      )}

      <input
        type="text"
        placeholder="Address"
        {...register("address")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.address && (
        <p className="text-red-500">{errors.address.message as string}</p>
      )}

      <select
        {...register("role", { required: "Role is required" })}
        className="w-full border px-3 py-2 rounded"
      >
        {adminRoles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      {errors.role && (
        <p className="text-red-500">{errors.role.message as string}</p>
      )}
    </div>
  );
};

export default AddAdminForm;
