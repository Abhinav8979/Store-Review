import { useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminSchema,
  storeSchema,
  userSchema,
  type AdminFormValues,
  type StoreFormValues,
  type UserFormValues,
} from "../../../zod schema/createSchema";
import AddAdminForm from "../../../components/administratorComp/AddAdminForm";
import AddStoreForm from "../../../components/administratorComp/AddStoreForm";
import Button from "../../../ui/Button";
import {
  useAddAdmin,
  useAddStore,
} from "../../../services/admins/adminMutations";
import { toast } from "react-toastify";

const Create = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("add") || "user";

  const currentSchema = useMemo(() => {
    if (tab === "admin") return adminSchema;
    if (tab === "store") return storeSchema;
    return userSchema;
  }, [tab]);

  type FormValues = UserFormValues | AdminFormValues | StoreFormValues;

  const methods = useForm<FormValues>({
    resolver: zodResolver(currentSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { mutate: createUser, isPending } = useAddAdmin();
  const { mutate: createStore, isPending: isStorePending } = useAddStore();

  const onSubmit = (data: FormValues) => {
    if (tab === "user") {
      createUser(
        { tab, ...data },
        {
          onSuccess: () => {
            reset();
            toast.success("Created successfully");
          },
        }
      );
    } else {
      createStore(
        { tab, ...data },
        {
          onSuccess: () => {
            reset();
            toast.success("Created successfully");
          },
          onError: (err) => {
            toast.error(err.message || "Failed to create store");
          },
        }
      );
    }
  };

  useEffect(() => {
    reset();
  }, [tab, reset]);

  return (
    <div className="p-6 space-y-6 min-h-screen bg-[var(--background)] flex flex-col items-center justify-center">
      <div className="flex space-x-4 mb-6">
        <Button
          disabled={tab === "user"}
          variant={tab === "user" ? "ghost" : "primary"}
          onClick={() => setSearchParams({ add: "user" })}
        >
          Add User
        </Button>
        <Button
          disabled={tab === "store"}
          variant={tab === "store" ? "ghost" : "primary"}
          onClick={() => setSearchParams({ add: "store" })}
        >
          Add Store
        </Button>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[var(--card)] p-6 border rounded w-full max-w-lg space-y-4"
        >
          {tab === "user" && (
            <AddAdminForm register={methods.register} errors={errors} />
          )}
          {tab === "store" && (
            <AddStoreForm register={methods.register} errors={errors} />
          )}

          <Button
            type="submit"
            disabled={isPending || isStorePending}
            className={`mt-4 px-4 py-2 rounded w-full ${
              isPending || isStorePending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            {isPending || isStorePending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Create;
