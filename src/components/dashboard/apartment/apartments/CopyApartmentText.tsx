import { Button } from "@/components/ui/button";
import { ApartmentType } from "@/types/apartment";
import toast from "react-hot-toast";
interface CopyApartmentTextType {
  item: ApartmentType | null;
}

export default function CopyApartmentText({ item }: CopyApartmentTextType) {
  if (!item) return null;
console.log("item",item)
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("متن کپی شد");
    } catch {
      toast.error("خطا در کپی کردن");
    }
  };

  const divarText = `
🏠 فروش آپارتمان

📍 زون: ${item.zone}
🏢 بلوک: ${item.block}
🏬 طبقه: ${item.level === "0" ? "همکف" : item.level}
🧭 جهت: ${item.direction}

💰 قیمت: ${item.price}

📞 ${item.contact}
`.trim();

  const smsText = `
آپارتمان زون ${item.zone} بلوک ${item.block} طبقه ${item.level === "0" ? "همکف" : item.level}
قیمت: ${item.price}
تماس: ${item.contact}
`.trim();

  const baleText = `
🏠 مشخصات واحد

زون: ${item.zone}
بلوک: ${item.block}
طبقه: ${item.level === "0" ? "همکف" : item.level}
جهت: ${item.direction}

قیمت: ${item.price}
وضعیت وام: ${item.vam}
وضعیت عرصه: ${item.arse}
وضعیت واحد: ${item.vazieatvahed}
وضعیت انتقال: ${item?.naghoentegal}

معرف: ${item.referrer}
شماره تماس: ${item.contact}
`.trim();

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
