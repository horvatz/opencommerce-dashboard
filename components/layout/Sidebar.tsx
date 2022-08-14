import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FiShoppingBag, FiTag } from 'react-icons/fi';

const Sidebar = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-between w-16 h-screen bg-white border-r">
      <div>
        <div className="inline-flex items-center justify-center w-16 h-16">
          <span className="block w-10 h-10 bg-gray-200 rounded-lg"></span>
        </div>

        <div className="border-t border-gray-100">
          <nav className="flex flex-col p-2">
            <div className="py-4">
              <Link href="/products/add" passHref>
                <a className="flex justify-center px-2 py-1.5 t text-blue-700 rounded bg-blue-50 group relative">
                  <FiShoppingBag />
                  <span className="absolute text-xs font-medium text-white bg-gray-900 left-full ml-4 px-2 py-1.5 top-1/2 -translate-y-1/2 rounded opacity-0 group-hover:opacity-100">
                    {t('products')}
                  </span>
                </a>
              </Link>
            </div>

            <ul className="pt-4 space-y-1 border-t border-gray-100">
              <li>
                <a
                  href=""
                  className="flex justify-center px-2 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group"
                >
                  <FiTag />
                  <span className="absolute text-xs font-medium text-white bg-gray-900 left-full ml-4 px-2 py-1.5 top-1/2 -translate-y-1/2 rounded opacity-0 group-hover:opacity-100">
                    {t('categories')}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href=""
                  className="flex justify-center px-2 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700 relative group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>

                  <span className="absolute text-xs font-medium text-white bg-gray-900 left-full ml-4 px-2 py-1.5 top-1/2 -translate-y-1/2 rounded opacity-0 group-hover:opacity-100">
                    {t('orders')}
                  </span>
                </a>
              </li>

              <li>
                <a
                  href=""
                  className="relative group flex justify-center px-2 py-1.5 text-gray-500 rounded hover:bg-gray-50 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>

                  <span className="absolute text-xs font-medium text-white bg-gray-900 left-full ml-4 px-2 py-1.5 top-1/2 -translate-y-1/2 rounded opacity-0 group-hover:opacity-100">
                    Account
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 p-2 bg-white border-t border-gray-100">
        <form action="/logout">
          <button
            type="submit"
            className="flex justify-center w-full px-2 py-1.5 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 group relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span className="absolute text-xs font-medium text-white bg-gray-900 left-full ml-4 px-2 py-1.5 top-1/2 -translate-y-1/2 rounded opacity-0 group-hover:opacity-100">
              {t('logout')}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sidebar;