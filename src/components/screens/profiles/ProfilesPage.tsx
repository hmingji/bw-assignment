import { useContext, useState } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { Button } from '../../common/Button';
import { ThemeContext } from '../../../App';
import { PlusIcon } from '../../common/Icons/PlusIcon';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../../common/Illustrations/EmptyState';
import { ProfileCard } from '../../common/ProfileCard';
import { fetchStaffs } from '../../../utils/fetchStaffs';
import { Pagination } from '../../common/Pagination';

export function ProfilesPage() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width: 640px)');
  const [pageNum, setPageNum] = useState(1);
  const pageSize = 10; //pageSize could be adjusted here
  const { staffs, totalCount } = fetchStaffs(pageSize, pageNum);

  const CreateButton = () => {
    return (
      <Button
        theme={theme!.value}
        onClick={() => navigate('/profiles/new')}
      >
        <div className="w-full flex items-center">
          <PlusIcon />
          <p className="flex-grow text-white font-bold font-primary">
            New Profile
          </p>
        </div>
      </Button>
    );
  };

  return (
    <>
      <div className="px-4 sm:min-h-[88vh] min-h-screen flex flex-col pt-20 sm:py-4 gap-4 pb-20">
        <div className="flex justify-between items-center">
          <p className="font-primary text-xl font-bold">Profiles</p>
          {matches && (
            <div className="w-52">
              <CreateButton />
            </div>
          )}
        </div>

        {totalCount === 0 ? (
          <div className="flex-grow grid">
            <div className="w-60 justify-self-center self-center">
              <div className="flex justify-center">
                <EmptyState />
              </div>
              <p className="font-bold font-primary text-lg text-center">
                No Profiles Yet
              </p>
              <p className="font-primary text-base text-center">{`Click on the button at the ${
                matches ? 'top right' : 'bottom'
              } to create a new profile.`}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-grow grid sm:grid-cols-2 grid-cols-1 sm:pr-20 gap-2 auto-rows-min">
              {staffs.map((s) => (
                <div
                  className="cursor-pointer"
                  key={s.id}
                  onClick={() => navigate(`/profiles/${s.id}`)}
                >
                  <ProfileCard staff={s} />
                </div>
              ))}
            </div>
            <div className="sm:pr-20 mx-auto">
              <Pagination
                currentPage={pageNum}
                updatePage={setPageNum}
                pageSize={pageSize}
                totalCount={totalCount}
                theme={theme!.value}
              />
            </div>
          </>
        )}
      </div>

      {!matches && (
        <div className="fixed bottom-10 w-full px-5">
          <CreateButton />
        </div>
      )}
    </>
  );
}
