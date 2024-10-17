import { useForm, FormProvider } from "react-hook-form";
import ImageInput from "./ImageInput";
import ButtonPForm from "./ButtonPForm";
import TextareaForm from "./TextAreaForm";
import SelectForm from "./SelectForm";
import NumberInput from "./NumberInput";
import TextForm from "./TextForm";
export const PForm = <T extends FormItem>({
  Items,
  button,
  onSubmit,
}: PFormProps<T>) => {
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
              <div key={item.id}>
                {item.type === "file" && <ImageInput imageItems={item} />}
                {item.type === "textarea" && <TextareaForm areaItems={item} />}
                {item.type === "select" && <SelectForm selectItems={item} />}
                {item.type === "number" && <NumberInput numberItems={item} />}
                {item.type === "text" && <TextForm textItems={item} />}
              </div>
            ))}
          </div>
        ))}
        <ButtonPForm label={button?.label} />
      </form>
    </FormProvider>
  );
};
