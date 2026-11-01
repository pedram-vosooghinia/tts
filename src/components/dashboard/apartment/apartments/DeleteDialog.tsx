import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { mutate } from "swr";
export interface ResponseRequest {
  success: false;
  message: string;
  status: number;
}
interface DeleteDialogType {
  title: string;
  id: string | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  callDeleteService: (
    id: string | number,
  ) => Promise<AxiosResponse<ResponseRequest>>;
  refreshUrl?: string;
}

export default function DeleteDialog({
  title,
  id,
  open,
  onOpenChange,
  callDeleteService,
  refreshUrl,
}: DeleteDialogType) {
  const handelDeleteItem = async (id: string) => {
    try {
      const res = await callDeleteService(id);
      const data = res.data;

      if (data.success) {
        toast.success(data.message);
        onOpenChange(false);
        mutate(refreshUrl);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("مشکلی در ثبت وجود دارد");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>حذف {title}</DialogTitle>
            <DialogDescription>
              آیا از حذف {title} اطمینان دارید؟
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="  !flex  !justify-around !items-center w-full">
            <DialogClose asChild>
              <Button variant="outline">بیخیال</Button>
            </DialogClose>
            <Button
              onClick={() => id && handelDeleteItem(id)}
              variant="destructive"
              className="text-white"
            >
              حذف آیتم
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
