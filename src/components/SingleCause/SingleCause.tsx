import React from 'react';
import { Cause } from 'types/cause';

type Props = {
  cause: Cause;
};

const SingleCause = ({ cause }: Props) => {
  return (
    <div
      className="single-cause p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md flex flex-col justify-between gap-4"
      key={cause.uuid}
    >
      <div>
        <p className="text-xl">{cause.name}</p>
      </div>
      <div>
        <p className="text-md">{cause.address}</p>
      </div>
      <div>
        <a href={cause.details_url} target="_blank">
          <button
            type="button"
            className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900"
          >
            Details
          </button>
        </a>
        <a href={cause.join_url} target="_blank">
          <button
            type="button"
            className="focus:outline-none text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-orange-900"
          >
            Support
          </button>
        </a>
      </div>
    </div>
  );
};

export default SingleCause;
