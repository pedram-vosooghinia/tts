"use client";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import toast from "react-hot-toast";
import { mainValueExcell, underValueExcell } from "./excellItems";
import { Button } from "@/components/ui/button";
const ExcelDownloader = ({ data }) => {
  const handleExportExcel = async () => {
    if (data.length === 0) {
      toast.error("No data available to export.");
      return;
    }

    try {
      const workbook = new ExcelJS.Workbook();

      const worksheet1 = workbook.addWorksheet("فاکتورها");
      worksheet1.columns = mainValueExcell;

      data.forEach((order) => {
        const rowData = {
          year: order.jalali_date_pay.split("-")[0],
          mounth: order.jalali_date_pay.split("-")[1],
          day: order.jalali_date_pay.split("-")[2],
          marketer_name: order.customer.marketer_name,
          buy_type: order.buy_type,
          total_price: order.total_price,
          total_value: order.total_value,
          clear_profit: order.clear_profit,
          marketer_discount: order.marketer_discount,
          total_name: order.customer.total_name,
          mobile: order.customer.mobile,
          jalali_date_nopay: order.jalali_date_nopay,
          jalali_date_pay: order.jalali_date_pay,
          final_pay: order.final_pay,
          discount_amount: order.discount_amount,
        };
        worksheet1.addRow(rowData);
      });

      const worksheet2 = workbook.addWorksheet("ریز فاکتورها");
      worksheet2.columns = underValueExcell;

      data.forEach((order) => {
        order.order_items.forEach((item) => {
          const saleMonth = order.jalali_date_pay.split("-")[1];
          const saleDay = order.jalali_date_pay.split("-")[2];
          const rowData = {
            mounth: item.jalali_date_chanell.split("-")[1],
            day: item.jalali_date_chanell.split("-")[2],
            sale_month: saleMonth,
            sale_day: saleDay,
            barcode: item.barcode,
            category: item.category,
            number_in_pack: item.number_in_pack,
            quantity: item.quantity,
            price: item.price,
            sell_code: item.sell_code,
          };
          worksheet2.addRow(rowData);
        });
      });

      const buffer = await workbook.xlsx.writeBuffer();

      const fileName = "complete_orders.xlsx";
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        fileName
      );
    } catch (error) {
      toast.error("Error exporting to Excel:", error);
    }
  };

  return (
    <div className="flex justify-center items-center my-4">
      <Button onClick={handleExportExcel}>دریافت اکسل</Button>
    </div>
  );
};

export default ExcelDownloader;
