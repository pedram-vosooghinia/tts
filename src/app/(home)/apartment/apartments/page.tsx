"use client";
import { fetcherApi } from "@/provider/fetchers";
import useSWR from "swr";
import LoadingModal from "@/components/MainComponents/LoadingModal";
import RefreshButton from "@/components/MainComponents/RefreshButton";
import { ApartmentType } from "@/types/apartment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import  DeleteDialog  from "@/components/dashboard/apartment/apartments/DeleteDialog";
export default function Apartments() {
  const { data, isLoading, error } = useSWR(
    "apartment/getAllApartment",
    fetcherApi,
  );
  const apartmentData = data?.apartments;

  if (isLoading) return <LoadingModal />;
  if (error) return <RefreshButton />;
  return (
    <div className=" flex flex-col gap-y-4 w-full">
      <Link href="/apartment/addApartment" className="w-full  items-end">
        <Button variant="default" className="text-white">
          افزودن آپارتمانی
        </Button>
      </Link>
      <Table dir="rtl">
        <TableHeader>
          <TableRow >
            <TableHead className="text-center">زون</TableHead>
            <TableHead className="text-center">بلوک</TableHead>
            <TableHead className="text-center">طبقه</TableHead>
            <TableHead className="text-center">جهت</TableHead>
            <TableHead className="text-center">قیمت</TableHead>
            <TableHead className="text-center">بیشتر</TableHead>
            <TableHead className="text-center">حذف</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {apartmentData?.map((item: ApartmentType) => (
            <TableRow key={item.id} 
            className="text-center"
            >
              <TableCell>{item.zone}</TableCell>
              <TableCell>{item.block}</TableCell>
              <TableCell>{item.level}</TableCell>
              <TableCell>{item.direction}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>
                <DeleteDialog title="آپارتمان" item={item}/>
              </TableCell>
              <TableCell>
                <DeleteDialog title="آپارتمان" item={item}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
