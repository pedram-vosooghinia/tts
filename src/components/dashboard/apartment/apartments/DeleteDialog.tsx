import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface DeleteDialogType {
  title: string;
  item: unknown;
}
export default function DeleteDialog({ title, item }: DeleteDialogType) {
  console.log("ite", item);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">حذف</Button>
        </DialogTrigger>
        <DialogContent >
          <DialogHeader >
            <DialogTitle>حذف {title}</DialogTitle>
            <DialogDescription>
              آیا از حذف {title} اطمینان دارید؟
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="  !flex  !justify-around !items-center w-full">
            <DialogClose asChild>
              <Button variant="outline">بیخیال</Button>
            </DialogClose>
            <Button type="submit" variant="destructive" className="text-white">
              حذف آیتم
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
