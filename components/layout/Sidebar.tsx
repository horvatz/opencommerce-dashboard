import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import {
  FiBookOpen,
  FiDollarSign,
  FiLogOut,
  FiPlusCircle,
  FiShoppingBag,
  FiShoppingCart,
  FiTag,
  FiUsers,
} from 'react-icons/fi';
import { useAuth } from '../../contexts/auth';

type Props = {
  mobileOpen: boolean;
};

const Sidebar = ({ mobileOpen }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  return (
    <div
      className={`absolute ${
        mobileOpen === false ? 'hidden' : ''
      } z-50 sm:relative md:flex flex-col justify-between h-screen bg-white border-r w-64`}
    >
      <div className="px-4 py-6">
        <Link href="/" passHref>
          <a className="flex justify-center items-center gap-2 w-full h-10 text-center rounded-lg">
            <FiShoppingCart />
            <span className="text-base font-medium text-gray-900">
              {t('appName')}
            </span>
          </a>
        </Link>
        <nav className="flex flex-col mt-6 space-y-1">
          <details className="group">
            <summary className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
              <FiShoppingBag opacity={75} className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">{t('products')}</span>
              <span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <nav className="mt-1.5 ml-8 flex flex-col">
              <Link href="/products" passHref>
                <a className="flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                  <FiBookOpen opacity={75} className="h-5 w-5" />
                  <span className="ml-3 text-sm font-medium">
                    {t('catalog')}
                  </span>
                </a>
              </Link>
              <Link href="/products/add" passHref>
                <a className="flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                  <FiPlusCircle opacity={75} className="h-5 w-5" />
                  <span className="ml-3 text-sm font-medium">
                    {t('newProduct')}
                  </span>
                </a>
              </Link>

              <Link href="/products/categories" passHref>
                <a className="flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                  <FiTag opacity={75} className="h-5 w-5" />
                  <span className="ml-3 text-sm font-medium">
                    {t('categories')}
                  </span>
                </a>
              </Link>
            </nav>
          </details>

          <Link href="/orders" passHref>
            <a className="flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
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

              <span className="ml-3 text-sm font-medium">{t('orders')}</span>
            </a>
          </Link>

          <Link href="/tax-rates" passHref>
            <a className="flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
              <FiDollarSign opacity={75} className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">{t('taxRates')}</span>
            </a>
          </Link>
          <Link href="/users" passHref>
            <a className="flex items-center px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
              <FiUsers opacity={75} className="h-5 w-5" />
              <span className="ml-3 text-sm font-medium">{t('users')}</span>
            </a>
          </Link>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <span
          onClick={handleSignOut}
          className="flex cursor-pointer items-center p-4 bg-white hover:bg-gray-50 shrink-0"
        >
          <div className="ml-1.5 flex w-full justify-between">
            <p className="text-xs">
              <strong className="block font-medium">Sign out</strong>
            </p>
            <FiLogOut />
          </div>
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
