import {
    useForm,
    type FieldValues,
    type UseFormProps,
    type UseFormReturn,
} from "react-hook-form";

type AppFormReturn<T extends FieldValues> = UseFormReturn<T> & {
    errors : UseFormReturn<T>["formState"]["errors"];
      isValid: boolean;
}

function useAppFormHook<T extends FieldValues>(
    options?:  UseFormProps<T>
) : AppFormReturn<T> {
     const form = useForm<T>({
        mode: "all",
        ...options,
    });

     return Object.assign(form, {
        errors: form.formState.errors,
        isValid: form.formState.isValid,
        isSubmitting : form.formState.isSubmitting
    });

}

export default useAppFormHook;