const StatisticCard = (): JSX.Element => {
  return (
    <article className="flex items-end justify-between p-6 bg-white border border-gray-100 rounded-lg">
      <div className="flex items-center gap-4">
        <span className="hidden p-2 text-gray-600 bg-gray-100 rounded-full sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>

        <div>
          <p className="text-sm text-gray-400">Profit</p>

          <p className="text-2xl font-medium text-gray-900">$240.94</p>
        </div>
      </div>

      <div className="inline-flex gap-2 p-1 text-green-600 bg-green-100 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>

        <span className="text-xs font-medium"> 67.81% </span>
      </div>
    </article>
  );
};

export default StatisticCard;
