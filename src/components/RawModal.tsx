import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface RawModalProps {
  open: boolean;
  onClose: () => void;
  json: object;
}

export function RawModal({ open, onClose, json }: RawModalProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-auto rounded bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900 dark:text-white mb-4"
                >
                  Dados brutos do arquivo
                </Dialog.Title>

                <pre className="text-sm bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4 rounded max-h-[70vh] overflow-auto">
{JSON.stringify(json, null, 2)}
                </pre>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
                  >
                    Fechar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}