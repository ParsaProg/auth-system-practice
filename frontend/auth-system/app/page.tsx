import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-row gap-x-3 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-black">
      <Link href={"/login"} className="flex justify-center gap-x-2 cursor-pointer hover:bg-black hover:text-white transition-all duration-200 p-3 rounded-lg text-black bg-white border-[1px] outline-none border-slate-600">
        <FaRegUser size={20} />
        ورود به وبسایت
      </Link>
      <Link href={"/auth"} className="flex justify-center gap-x-2 cursor-pointer hover:bg-black hover:text-white transition-all duration-200 p-3 rounded-lg text-black bg-white border-[1px] outline-none border-slate-600">
        <FaUser size={20} /> نام نویسی در وبسایت
      </Link>
    </div>
  );
}
