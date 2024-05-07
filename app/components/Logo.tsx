// import { ReactComponent as Logo } from "@/assets/logo/logo.svg";
import { SVGProps } from "react";

export const LogoPrimary = (props: SVGProps<SVGSVGElement>) => {
  return (
    <div className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start w-full whitespace-nowrap text-blue-500 ">
      {/* <Logo {...props} /> */}
    </div>
  );
};

export const LogoSecondary = (props: SVGProps<SVGSVGElement>) => {
  return (
    <div className="uppercase font-bold text-base tracking-wider flex flex-row items-center justify-start w-full whitespace-nowrap text-blue-500 ">
      {/* <LogoLightSVG {...props} /> */}
    </div>
  );
};
