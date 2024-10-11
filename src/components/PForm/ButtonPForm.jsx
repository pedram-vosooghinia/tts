"use client"
import { Button } from "../ui/button";
const ButtonPForm = ({ label }) => (
  <Button
    type="submit"
    className=" "
  >
    {label || "افزودن"}
  </Button>
);

export default ButtonPForm;
