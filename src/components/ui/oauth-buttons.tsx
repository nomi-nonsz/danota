import { BsFacebook, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export const OAuthButtons = () => {
  const oauths = [
    {
      name: "Google",
      icon: FcGoogle,
      onclick: () => {}
    },
    {
      name: "Facebook",
      icon: BsFacebook,
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