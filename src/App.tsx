import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Search from 'components/Search/Search';
import SingleCause from 'components/SingleCause/SingleCause';
import { Cause, CausesResponse } from 'types/cause';

function App() {
  const [causes, setCauses] = useState<Cause[] | []>([]);
  const [causesLeft, setCausesLeft] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>('');
  const [searchCity, setSearchCity] = useState<string>('');
  const [searchState, setSearchState] = useState<string>('');

  console.log(causes);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get<CausesResponse>(
        'https://api.givebacks.com/services/core/causes/search'
      );

      setCauses(data.causes);

      if (data.meta.has_more) {
        setCausesLeft(true);
      } else {
        setCausesLeft(false);
      }
    };

    getData().catch(console.error);
  }, []);

  // const renderCauses = useCallback(() => {
  //   return causes.map((cause) => {
  //     return <SingleCause key={cause.uuid} cause={cause} />;
  //   });
  // }, []);

  return (
    <div className="App">
      <header className="p-8 flex justify-between items-center">
        <h1 className="text-orange-400 text-4xl font-medium">givebacks</h1>{' '}
        <Search
          causes={causes}
          setCauses={setCauses}
          causesLeft={causesLeft}
          setCausesLeft={setCausesLeft}
          searchName={searchName}
          setSearchName={setSearchName}
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          searchState={searchState}
          setSearchState={setSearchState}
        />
      </header>

      <div className="causes">
        {causes.length < 1 ? (
          <h2 className="flex justify-center align-center">
            No availble causes!
          </h2>
        ) : (
          <>
            {causesLeft ? (
              <h2 className="py-4 text-2xl flex justify-center align-center">{`Over ${causes.length} results:`}</h2>
            ) : (
              <h2>{`${causes.length} results:`}</h2>
            )}
            <div className="cause-cards grid gap-8 grid-cols-4 px-4 ">
              {/* {renderCauses()} */}
              {causes.map((cause) => {
                return <SingleCause key={cause.uuid} cause={cause} />;
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
