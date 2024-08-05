
import { useState, useEffect } from "react";
import "./Searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [searchdata, setSearchdata] = useState([]);
  const fetchdetails = async () => {
    const response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${search}`
    );
    setSearchdata(response.data);
  };
  useEffect(() => {
    if(search=="")
    {
        setSearchdata([])
    }
    if (search != "") {
      fetchdetails();
    }
  }, [search]);
  const handlesearch = (e) => {
    setSearch(e.target.value);
  };
  const handleclose = () => {
    setSearch("");
    setSearchdata([]);
  };
  return (
    <>
      <section className="section">
        <div className="searchbox">
          <input
            type="text"
            className="searchinput"
            onChange={handlesearch}
            value={search}
          />
          {search == "" ? (
            <div>
              <SearchIcon />
            </div>
          ) : (
            <div onClick={handleclose}>
              <CloseIcon />
            </div>
          )}
        </div>
       {search?<div className="searchsuggestions">
            {
                searchdata.map((data ,index)=>{
                    return <a href={data.show.url} target = {"_blank"} key={index} className="searchsuggestions--line">{data.show.name}</a>
                })
            }

        </div>:""} 
      </section>
    </>
  );
};

export default Searchbar;
