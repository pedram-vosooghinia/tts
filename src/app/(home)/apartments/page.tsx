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
export default function Apartments() {
  const { data, isLoading, error } = useSWR(
    "apartment/getAllApartment",
    fetcherApi,
  );
  console.log("data", data);
  const apartmentData = data?.apartments;
  console.log("apartmentData", apartmentData);

  if (isLoading) return <LoadingModal />;
  if (error) return <RefreshButton />;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>زون</TableHead>
            <TableHead>بلوک</TableHead>
            <TableHead>طبقه</TableHead>
            <TableHead>قیمت</TableHead>
            <TableHead>تماس</TableHead>
            <TableHead>جهت</TableHead>
            <TableHead>وضعیت وام</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {apartmentData?.map((item:ApartmentType) => (
            <TableRow key={item.id}>
              <TableCell>{item.zone}</TableCell>
              <TableCell>{item.block}</TableCell>
              <TableCell>{item.level}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.contact}</TableCell>
              <TableCell>{item.direction}</TableCell>
              <TableCell>{item.loan_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
