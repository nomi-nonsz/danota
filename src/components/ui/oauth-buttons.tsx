import { BsFacebook, BsGithub } from "react-icons/bs";
import { CiFacebook } from "react-icons/ci";
import { DiGithub } from "react-icons/di";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io5";
import { PiFacebookLogo } from "react-icons/pi";
import { SlSocialFacebook } from "react-icons/sl";
import { TbBrandFacebook } from "react-icons/tb";

export const OAuthButtons = () => {
  const oauths = [
    {
      name: "Google",
      icon: FcGoogle,
      onclick: () => {}
    },
    {
      name: "Facebook",
      icon: TbBrandFacebook,
      onclick: () => {}
    },
    {
      name: "Github",
      icon: BsGithub,
      onclick: () => {}
    }
  ];

  return (
    <div className="flex flex-row gap-2">
      {oauths.map((oauth) => (
        <button  key={oauth.name} className="border p-3 rounded-xl w-full flex justify-center" onClick={oauth.onclick}>
          <oauth.icon size={20} />
        </button>
      ))}
    </div>
  )
}