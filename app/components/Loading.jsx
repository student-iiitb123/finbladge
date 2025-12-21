"use client";

import React from "react";
import Link from "next/link";

const LoadingLink = ({ children, className, href, ...props }) => {
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};

export default LoadingLink;
