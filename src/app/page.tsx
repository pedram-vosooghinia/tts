"use client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Home() {
  return (
    <div className="flex bg-red-700">
      <Button
        onClick={() => {
          toast.success("موفق  می باشد");
        }}
      >
        toastSuccess{" "}
      </Button>
      <Button
        onClick={() => {
          toast.error( "موفق  می باشد");
        }}
      >
        toastError{" "}
      </Button>
      <Button
        onClick={() => {
          toast( "موفق  می باشد");
        }}
      >
        toastWarning{" "}
      </Button>
    </div>
  );
}
