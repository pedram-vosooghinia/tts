import { Button } from "@/components/ui/button";
import { ApartmentType } from "@/types/apartment";
import toast from "react-hot-toast";

interface CopyApartmentTextType {
  item: ApartmentType | null;
}

export default function CopyApartmentText({ item }: CopyApartmentTextType) {
  if (!item) return null;

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("متن کپی شد");
    } catch {
      toast.error("خطا در کپی کردن");
    }
  };

  const smsText = [
    `آپارتمان زون ${item.zone} بلوک ${item.block} طبقه ${
      item.level === "0" ? "همکف" : item.level
    } ${item.direction}`,
    item.vazieatvahed !== "ندارد" ? `${item.vazieatvahed}` : null,
    item.arse !== "ندارد" ? `عرصه ${item.arse}` : null,
    item.vam !== "ندارد" ? `وام ${item.vam}` : null,
    item.naghoentegal !== "ندارد" ? `نقل و انتقال ${item.naghoentegal}` : null,
    `قیمت ${item.price}`,
  ]
    .filter(Boolean)
    .join("\n");

  const divarText = [
    `🏠 فروش آپارتمان`,
    `📍 زون ${item.zone} | ${
      item.level === "0" ? "همکف" : `طبقه ${item.level}`
    }`,
    `🧭 جهت: ${item.direction}`,

    item.vam !== "ندارد" ? `🏦 وام: ${item.vam}` : null,
    item.arse !== "ندارد" ? `🏗 عرصه: ${item.arse}` : null,
    item.naghoentegal !== "ندارد"
      ? `📄 نقل و انتقال: ${item.naghoentegal}`
      : null,
    `🔹 واحد: ${item.vazieatvahed}`,
  ]
    .filter(Boolean)
    .join("\n");
  const baleText = [
    `زون ${item.zone} بلوک ${item.block}`,
    `طبقه ${item.level === "0" ? "همکف" : item.level} جهت ${item.direction}`,
    item.vam !== "ندارد" ? `✅ وام: ${item.vam}` : null,
    item.arse !== "ندارد" ? `✅ عرصه: ${item.arse}` : null,
    item.naghoentegal !== "ندارد"
      ? `✅ نقل و انتقال: ${item.naghoentegal}`
      : null,
    `✅ واحد: ${item.vazieatvahed}`,
    `💰 قیمت: ${item.price}`,
    `وثوقی
    09909403511`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="flex justify-between items-center">
      <Button className="text-white" onClick={() => copyText(divarText)}>
        کپی دیوار
      </Button>

      <Button className="text-white" onClick={() => copyText(smsText)}>
        کپی sms
      </Button>

      <Button className="text-white" onClick={() => copyText(baleText)}>
        کپی بله
      </Button>
    </div>
  );
}
