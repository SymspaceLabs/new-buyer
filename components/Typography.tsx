"use client";

import clsx from "clsx";

export function H1({ children, className, ...props }) {
  return (
    <h1 className={clsx("lowercase font-elemental", className)} {...props}>
      {children}
    </h1>
  );
}

export function H2({ children, className, ...props }) {
  return (
    <h2 className={clsx("font-sans font-bold", className)} {...props}>
      {children}
    </h2>
  );
}

export function Paragraph({ children, className, ...props }) {
  return (
    <p className={clsx("font-sans font-medium", className)} {...props}>
      {children}
    </p>
  );
}

export function H3({ children, ellipsis = false, className, ...props }) {
  return (
    <h3 className={clsx("text-[20px] font-bold", ellipsis && "truncate", className)} {...props}>
      {children}
    </h3>
  );
}

export function H4({ children, ellipsis = false, className, ...props }) {
  return (
    <h4 className={clsx("text-[17px] font-semibold", ellipsis && "truncate", className)} {...props}>
      {children}
    </h4>
  );
}

export function H5({ children, ellipsis = false, className, ...props }) {
  return (
    <h5 className={clsx("text-[16px] font-semibold leading-none", ellipsis && "truncate", className)} {...props}>
      {children}
    </h5>
  );
}

export function H6({ children, ellipsis = false, className, ...props }) {
  return (
    <h6 className={clsx("text-[14px] font-semibold", ellipsis && "truncate", className)} {...props}>
      {children}
    </h6>
  );
}

export function Small({ children, ellipsis = false, className, ...props }) {
  return (
    <small className={clsx("text-[12px] font-normal", ellipsis && "truncate", className)} {...props}>
      {children}
    </small>
  );
}

export function Span({ children, ellipsis = false, className, ...props }) {
  return (
    <span className={clsx(ellipsis && "truncate", className)} {...props}>
      {children}
    </span>
  );
}

export function Tiny({ children, ellipsis = false, className, ...props }) {
  return (
    <small className={clsx("text-[10px] font-normal", ellipsis && "truncate", className)} {...props}>
      {children}
    </small>
  );
}