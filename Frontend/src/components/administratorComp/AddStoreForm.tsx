import type { FieldErrors } from "react-hook-form";
import type { StoreFormValues } from "../../zod schema/createSchema";
import Input from "../../ui/Input";

type Props = {
  register: any;
  errors: FieldErrors<StoreFormValues>;
};

const AddStoreForm = ({ register, errors }: Props) => {
  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Store Name"
        {...register("storeName")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.storeName && (
        <p className="text-red-500">{errors.storeName.message as string}</p>
      )}

      <Input
        type="text"
        placeholder="Store Address"
        {...register("storeAddress")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.storeAddress && (
        <p className="text-red-500">{errors.storeAddress.message as string}</p>
      )}

      <Input
        type="text"
        placeholder="Owner Name"
        {...register("ownerName")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.ownerName && (
        <p className="text-red-500">{errors.ownerName.message as string}</p>
      )}

      <Input
        type="email"
        placeholder="Owner Email"
        {...register("ownerEmail")}
        className="w-full border px-3 py-2 rounded"
      />
      {errors.ownerEmail && (
        <p className="text-red-500">{errors.ownerEmail.message as string}</p>
      )}
    </div>
  );
};

export default AddStoreForm;
