import Link from "next/link";
import { Drawer } from "./drawer";
export const TopBar = () => {
    return (
        <div className="absolute top-0 z-50 max-w-screen-xl w-full h-[50px] flex justify-center items-center px-5  bg-background  ">
            <div className="w-full h-full max-w-screen-xl flex justify-between items-center gap-10">
                <Link href="/home">
                    <div className="flex items-center">
                        <h2 className="scroll-m-20  text-[24px] font-semibold tracking-tight first:mt-0">Paymeal</h2>
                    </div>
                </Link>

                <Drawer />
            </div>
        </div>
    );
};
