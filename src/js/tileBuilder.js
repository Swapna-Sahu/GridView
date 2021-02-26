import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import tiles from './tile';
import AddTile from './addTile';
import '../style/tile.css';

const TileBuilder = () => {
    const [gridTiles,setGriTiles] = useState([]);
    const [searchTile, setSearchTile] = useState('');
    const [tileDetails,setTileDetails] = useState([]);
    const [data, setData] = useState(true);
    const [offset, setOffset] = useState(0);
    const [perPage] = useState(2);
    const [pageCount, setPageCount] = useState(0)

    //adding new tile to tiles
    const addNewTile = (tile) => {
        let updatedTiles = [...gridTiles, tile];
        setGriTiles(updatedTiles);
    }

    useEffect( () => {
        if (data) {
            const slice = tiles.slice(offset, offset + perPage);
            setGriTiles(slice);
            setPageCount(Math.ceil(tiles.length / perPage));
        }
    }, [offset]);
    
    const searchedTile = (searchTile) => {
        searchTile = searchTile.charAt(0).toUpperCase() + searchTile.slice(1);
        const fetchTile = gridTiles.filter(function(a) {
            return  a.title === searchTile;
        });

        // Slicing the data for pagination
        const slice = fetchTile.slice(offset, offset + perPage);
        setPageCount(Math.ceil(fetchTile.length / perPage));
        setGriTiles(slice);

        // Single data display
        setTileDetails(fetchTile[0]);
        setData(false);
    }

    const submit = (e) => {
        searchedTile(searchTile);
        setSearchTile('');
    };

    const changeTile = (e) => {
        setSearchTile('');
        setGriTiles(tiles);
        setSearchTile(e.target.value);
        if (e.target.keyCode === 13) {
            submit();
        }
    };
    const enterKey = (e) => {
        if (e.keyCode === 13) {
            submit();
        }
    };
    // Pagination selected page
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage + 1)
    };

    return (
        <>
            <input type='text'
                onChange={changeTile}
                onKeyDown={enterKey}
                value={searchTile}
                placeholder='Search Tile'
            />
            <button onClick={submit}>Submit</button>
            <AddTile addNewTile={addNewTile}/>
            <div className='tiles'>
                {gridTiles.length === 0 ?
                    <>
                        {
                            <div className='tile-details'>
                                <h1>Tile not found</h1>
                            </div>
                        }
                    </> :
                    <>
                        {gridTiles.length >= 2 ?
                            <>
                                {gridTiles.map((tile) => {
                                    const { imagePath } = tile;
                                    return (
                                        <div>
                                            <img src={imagePath} alt='tile' />
                                        </div>
                                    );
                                })}
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    activeClassName={"active"}
                                />
                            </>
                            :
                            <>
                                {
                                    <div className='tile-details'>
                                        <img src={tileDetails.imagePath} alt='tile' />
                                        <h1>Title : {tileDetails.title}</h1>
                                        <h3>Description : {tileDetails.description}</h3>
                                    </div>
                                }
                            </>
                        }
                    </>
                }
        </div>
    </>
    );
};
export default TileBuilder;