"use client";

import ThemeSwitcher from "@/components/MainComponents/ThemeSwitcher";

const Dashboard = () => {

  return (
    <div>
      <h1 className="text-primary">داشبورد</h1>
      <ThemeSwitcher />
      <p>این متن رنگش با تم تغییر می‌کنه</p>
      <button className="bg-primary text-white px-4 py-2 rounded">
        دکمه تست
      </button>
      <button className="bg-primary text-white px-4 py-2 rounded">دکمه</button>
      <p className="text-[color:var(--color-text)]">متن تستی</p>
    </div>
  );
};

export default Dashboard;
