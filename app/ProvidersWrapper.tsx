"use client";

import { Toaster } from "@/components/ui/toaster";
type Props = {
  children: React.ReactNode;
};
export default function ProvidersWrapper(props: Props) {
  const { children } = props;
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
