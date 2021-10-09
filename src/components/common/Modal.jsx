import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { classNames } from '../../functions/utils';

const Modal = (props) => {
  const {
    children,
    sizeClass,
    title: modalTitle,
    renderComponent: C,
    bgImg,
    isOpen,
    onClose,
    closeable = true,
    CTAText,
    handleClickCTA,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState(sizeClass);
  const [title, setTitle] = useState(modalTitle);

  useEffect(() => {
    setIsModalOpen(!!isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      setTimeout(() => {
        setMaxWidth(sizeClass);
        setTitle(modalTitle);
      }, 500);
    }
  }, [isModalOpen]);

  return (
    <>
      <div onClick={(e) => setIsModalOpen(true)}>{children}</div>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog
          unmount
          as="div"
          className="fixed z-40 inset-0 overflow-y-auto"
          onClose={() => (onClose ? onClose() : setIsModalOpen(false))}
        >
          <div className="flex md:items-end items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className={classNames(
                  maxWidth || 'max-w-5xl',
                  `bg-white bg-cover rounded-lg shadow-xl transform sm:align-middle sm:w-full inline-block align-bottom transition-all dark:bg-popup-dark-bg`,
                )}
              >
                <div className={`${bgImg} w-full h-full sm:py-8 rounded-lg`}>
                  <div className="px-4 pt-5 text-left sm:px-12 md:px-16 sm:pt-6 pb-8">
                    <div className="absolute lg:top-8 lg:right-8 top-2 right-2 flex">
                      {!!(CTAText && handleClickCTA) && (
                        <button
                          type="button"
                          onClick={handleClickCTA}
                          className="mr-3 py-2 px-4 shadow-lg text-login-button-text font-Montserrat font-body-md font-medium rounded-lg bg-login-button-bg"
                        >
                          {CTAText}
                        </button>
                      )}
                      {closeable && (
                        <button
                          type="button"
                          onClick={() => (onClose ? onClose() : setIsModalOpen(false))}
                          className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-offset-0"
                        >
                          <span className="sr-only">Close</span>
                          <XIcon
                            className="lg:h-7 lg:w-7 h-5 w-5 text-dark-blue dark:text-white"
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h1"
                        className="font-Montserrat md:text-h2 text-h5 font-semibold text-dark-blue text-center pb-3 dark:text-white"
                      >
                        {title ?? 'Dialog'}
                      </Dialog.Title>
                      <div className="mt-2">
                        <C {...props} {...{ isModalOpen, setIsModalOpen, setMaxWidth, setTitle }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Modal;
