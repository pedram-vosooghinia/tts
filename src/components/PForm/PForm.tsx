import { useForm, FormProvider } from "react-hook-form";
import ImageInput from "./ImageInput";
import ButtonPForm from "./ButtonPForm";
import TextareaForm from "./TextAreaForm";

export const PForm = <T extends FormItem>({
  Items,
  button,
  onSubmit,
}: PFormProps<T>) => {
  // const { handleSubmit } = useForm<T>();
  const methods = useForm<T>();

  return (
    <FormProvider {...methods}>

    <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-wrap justify-center items-center"
    >
      {Items.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="rtl flex justify-center w-full flex-wrap"
        >
          {row.map((item) => (
            <div key={item.id} className={"mx-2"}>
              {item.type === "file" && <ImageInput imageItems={item} />}
              {item.type === "textarea" && <TextareaForm areaItems={item} />}
            </div>
          ))}
        </div>
      ))}
      <ButtonPForm label={button?.label} />
    </form>
    </FormProvider>

  );
};
