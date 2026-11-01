import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApartmentType } from "@/types/apartment";
import CopyApartmentText from "./CopyApartmentText";
interface ShowDetailsApartmentTypes {
  item: ApartmentType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function ShowDetailsApartment({
  item,
  open,
  onOpenChange,
}: ShowDetailsApartmentTypes) {
  if (!item) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
        dir="rtl"
      >
        <DialogHeader>
          <DialogTitle>جزئیات آپارتمان</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <Label>زون</Label>
            <Input value={item?.zone} readOnly />
          </Field>

          <Field>
            <Label>بلوک</Label>
            <Input value={item?.block} readOnly />
          </Field>

          <Field>
            <Label>طبقه</Label>
            <Input value={item?.level} readOnly />
          </Field>

          <Field>
            <Label>جهت</Label>
            <Input value={item?.direction} readOnly />
          </Field>

          <Field>
            <Label>قیمت</Label>
            <Input value={item?.price} readOnly />
          </Field>

          <Field>
            <Label>وضعیت وام</Label>
            <Input value={item?.vam} readOnly />
          </Field>

          <Field>
            <Label>وضعیت عرصه</Label>
            <Input value={item?.arse} readOnly />
          </Field>

          <Field>
            <Label>وضعیت انتقال</Label>
            <Input value={item?.naghoentegal} readOnly />
          </Field>

          <Field>
            <Label>وضعیت واحد</Label>
            <Input value={item?.vazieatvahed} readOnly />
          </Field>

          <Field>
            <Label>معرف</Label>
            <Input value={item?.referrer} readOnly />
          </Field>

          <Field>
            <Label>شماره تماس</Label>
            <Input value={item?.contact} readOnly />
          </Field>
        </div>

        {item?.description && (
          <div className="mt-4">
            <Label>توضیحات</Label>
            <textarea
              readOnly
              value={item?.description}
              className="w-full rounded-md border p-2"
            />
          </div>
        )}

        <DialogFooter className=" flex flex-col">
          <DialogClose asChild>
            <Button variant="secondary">بستن</Button>
          </DialogClose>
        </DialogFooter>
        <CopyApartmentText item={item} />
      </DialogContent>
    </Dialog>
  );
}
