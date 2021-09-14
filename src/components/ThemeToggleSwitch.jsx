import React, { useState, useContext } from 'react';
import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { classNames } from '../functions/utils';
import { ThemeContext } from '../themeContext';

export default function ThemeToggleSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Switch
      checked={theme !== 'dark'}
      onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={classNames(
        theme !== 'dark' ? 'bg-black' : 'bg-gray-200',
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0',
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          theme !== 'dark' ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white dark:bg-body-dark-bg shadow transform ring-0 transition ease-in-out duration-200',
        )}
      />
      {theme !== 'dark' ? (
        <span
          className={classNames(
            theme !== 'dark' ? 'ease-out duration-100' : 'ease-in duration-200',
            'pl-1 absolute inset-0 h-full flex items-center justify-start transition-opacity text-white fill-current ',
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-3 w-3" aria-hidden="true" />
        </span>
      ) : (
        <span
          className={classNames(
            theme !== 'dark' ? 'ease-in duration-200' : 'ease-out duration-100',
            'pr-1 absolute inset-0 h-full flex items-center justify-end transition-opacity',
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3 text-black" aria-hidden="true" />
        </span>
      )}
    </Switch>
  );
}
