"use client";

import { MarketProps } from "@/types";
import { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";

interface InstitutionContactProps {
  isOpen: boolean;
  closeModal: () => void;
  market: MarketProps;
}

const InstitutionContact = ({
  isOpen,
  closeModal,
  market,
}: InstitutionContactProps) => {
  const { exchange_name } = market;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white text-left shadow-xl transition-all flex flex-col gap-5 ">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-lime-100 rounded-full"
                  >
                    <IoClose />
                  </button>

                  <div className="flex flex-1 flex-col">
                    <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                      <h2 className="p-10 font-bold">{exchange_name}</h2>
                      <p className="px-10">Contato: teste123@email.com.br</p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default InstitutionContact;
