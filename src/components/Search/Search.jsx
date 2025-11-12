import { useContext, useEffect } from "react";
import { HeaderContext } from "../../Context";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Heading1 from "../Heading/Heading1";
import { ContentWrapper } from "../Utilities/Utilities";

function Search() {
  const headerContext = useContext(HeaderContext);

  useEffect(() => {
    headerContext.setactiveMenuItem("search");
  }, []);

  return (
    <>
      <Heading1 text="Search" />
      <p className="mt-3">Find posts, people, and topics</p>
      {/* <div className="flex items-center gap-x-2 mt-5 bg-white p-5 rounded-lg border-purple-200 border-2"> */}
      <ContentWrapper>
        <div className="flex items-center gap-x-2 ">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for anything..."
              className="pl-10 py-1 w-full rounded-lg bg-gray-100"
            />
            <SearchOutlinedIcon className="absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-2 py-1 rounded-lg">
            <SearchOutlinedIcon /> Search
          </button>
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className="text-center my-5">
          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 inline-block p-7 rounded-full text-white">
            <SearchOutlinedIcon fontSize="large" />
          </div>
          <h3 className="text-xl mt-5">Start searching</h3>
          <p className="text-gray-500 mt-5">
            Enter a keyword to find posts, people, and topics
          </p>
        </div>
      </ContentWrapper>
      {/* </div> */}
    </>
  );
}

export default Search;
