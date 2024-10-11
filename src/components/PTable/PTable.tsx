"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface HeaderItem<T> {
  title: string;
  value: (row: T) => string | number;
}

interface IPtable<T> {
  tableTitle: string;
  header: HeaderItem<T>[];
  data: T[];
}

export const PTable = <T,>({tableTitle, header,  data }: IPtable<T>) => {
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center my-8">
        داده‌ای برای نمایش وجود ندارد
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center rtl mt-8 p-4 w-full">
      <h2 className="text-xl font-bold mb-4">{tableTitle}</h2>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {header.map((item, index) => (
                <TableHead key={index} className="text-center">
                  {item.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {header.map((item, idx) => (
                  <TableCell key={idx} className="text-center">
                    {item.value(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
