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
import DeleteDialog from "@/components/dashboard/apartment/apartments/DeleteDialog";
import ShowDetailsApartment from "@/components/dashboard/apartment/apartments/ShowDetailsApartment";
import { useState } from "react";
import { deleteApartmentServices } from "@/services/apartment";
export default function Apartments() {
  const { data, isLoading, error } = useSWR("apartment/getAll", fetcherApi);
  const apartmentData = data?.apartments;
  const [showSelectedApartment, setShowSelectedApartment] =
    useState<ApartmentType | null>(null);
  const [deleteSelectedApartment, setDeleteSelectedApartment] =
    useState<ApartmentType | null>(null);


  if (isLoading) return <LoadingModal />;
  if (error) return <RefreshButton />;
  return (
    <div className=" flex flex-col gap-y-4 w-full mt-6">
      <Link href="/apartment/addApartment" className="w-full  items-end">
        <Button variant="default" className="text-white">
          افزودن آپارتمانی
        </Button>
      </Link>
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="px-1 py-1 text-center text-xs md:text-sm">
              زون
            </TableHead>
            <TableHead className="px-1 py-1 text-center text-xs md:text-sm">
              بلوک
            </TableHead>
            <TableHead className="px-1 py-1 text-center text-xs md:text-sm">
              طبقه
            </TableHead>
            <TableHead className="px-1 py-1 text-center text-xs md:text-sm">
              جهت
            </TableHead>
            <TableHead className="px-1 py-1 text-center text-xs md:text-sm">
              قیمت
            </TableHead>
            <TableHead className="px-1 py-1 text-center text-xs md:text-sm">
              بیشتر
            </TableHead>
            <TableHead className="px-1 py-1 text-center text-xs md:text-sm">
              حذف
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {apartmentData?.map((item: ApartmentType) => (
            <TableRow key={item.id} className="">
              <TableCell className="px-1 py-1 text-center text-xs md:text-sm">
                {item.zone}
              </TableCell>
              <TableCell className="px-1 py-1 text-center text-xs md:text-sm">
                {item.block}
              </TableCell>
              <TableCell className="px-1 py-1 text-center text-xs md:text-sm">
                {item.level}
              </TableCell>
              <TableCell className="px-1 py-1 text-center text-xs md:text-sm">
                {item.direction}
              </TableCell>
              <TableCell className="px-1 py-1 text-center text-xs md:text-sm">
                {item.price}
              </TableCell>
              <TableCell className="px-1 py-1 text-center text-xs md:text-sm">
                <Button
                  onClick={() => setShowSelectedApartment(item)}
                  variant="secondary"
                  className="text-xs md:text-sm"
                >
                  بیشتر
                </Button>
              </TableCell>
              <TableCell className="px-1 py-1 text-center">
                <Button
                  className="text-xs md:text-sm"
                  onClick={() => setDeleteSelectedApartment(item)}
                  variant="destructive"
                >
                  حذف
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ShowDetailsApartment
        item={showSelectedApartment}
        open={!!showSelectedApartment}
        onOpenChange={(open) => {
          if (!open) setShowSelectedApartment(null);
        }}
      />
      <DeleteDialog
        title="آپارتمان"
        id={deleteSelectedApartment?.id}
        open={!!deleteSelectedApartment}
        onOpenChange={(open) => {
          if (!open) setDeleteSelectedApartment(null);
        }}
        callDeleteService={deleteApartmentServices}
        refreshUrl="apartment/getAll"
      />
    </div>
  );
}
