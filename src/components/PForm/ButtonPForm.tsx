"use client";
import { Button } from "../ui/button";
interface IButtonPForm {
  label: string;
}

const ButtonPForm = ({ label }: IButtonPForm) => (
  <Button type="submit" className=" m-2">
    {label || "افزودن"}
  </Button>
);

export default ButtonPForm;
