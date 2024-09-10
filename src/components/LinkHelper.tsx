import Link from "next/link";
import React from "react";

interface ILinkHelper {
  href: string;
  classes?: string;
  title: string;
}

const LinkHelper: React.FC<ILinkHelper> = ({ href, classes, title }) => {
  return (
    <Link
      href={href}
      className={`${classes} p-[10px] capitalize rounded-md hover:bg-[#2c2937]`}
    >
      {title}
    </Link>
  );
};

export default LinkHelper;
