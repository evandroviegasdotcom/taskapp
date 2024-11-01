"use client"
import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  children: React.ReactNode;
  close: () => void;
  title: string;
  isOpen: boolean;
};

export default function Modal(props: Props) {
  const { isOpen, title, close, children } = props;
  const modalRef = useRef<HTMLDivElement | null>(null);
  const onScreenClick = (e: any) => {
    const dimentions = modalRef.current?.getBoundingClientRect()
    if(!dimentions) return  
    if(
        e.clientX < dimentions.left || 
        e.clientX > dimentions.right || 
        e.clientY < dimentions.top || 
        e.clientY > dimentions.bottom  
    ) {
        close()
    }
  }
  if (!isOpen) return null;

  return (
    <div onClick={onScreenClick} className="fixed z-[10] inset-0 bg-zinc-900/90 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-background text-white rounded max-h-[90vh] overflow-y-auto md:max-w-[70vw] max-w-[90vw]"
      >
        <div className="flex flex-col gap-1">
          <div className="py-4 px-8 border-b border-b-white/10">
            <div className="flex gap-12 items-center justify-between">
              {title ? <span className="text-xl">{title}</span> : null}
              <button className="cursor-pointer" onClick={close}>
                <IoClose />
              </button>
            </div>
          </div>
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
