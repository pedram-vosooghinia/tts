import { Home, PackageCheckIcon, User } from 'lucide-react'

export const accountItems = [
  {
    id: 1,
    title: 'سفارشات',
    content: 'پیگیری، بازگشت، لغو سفارش، دانلود فاکتور یا خرید مجدد',
    href: '/dashboard/account/orders',
    icon: PackageCheckIcon,
  },
  {
    id: 2,
    title: 'ورود و امنیت',
    content: 'مدیریت رمز عبور، ایمیل و شماره موبایل',
    href: '/dashboard/account/manage',
    icon: User,
  },
  {
    id: 3,
    title: 'آدرس‌ها',
    content: 'ویرایش، حذف یا تعیین آدرس پیش‌فرض',
    href: '/dashboard/account/addresses',
    icon: Home,
  },
]
