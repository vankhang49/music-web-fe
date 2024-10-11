import {Anchor, Button, Card, Grid, Group, Modal, Typography, useResponsive} from 'lvq';
import React, {useEffect, useState} from 'react';
import useDebounce from "../../hooks/UseDebounce";
import * as searchService from "../../core/services/SearchService";
import {Link} from "react-router-dom";
import "./ModalSearch.scss"

const ModalSearch = ({isOpen, onClose, searchValue, position}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const breakpoints = useResponsive([480, 640, 768, 1024, 1280, 1536]);
    const [searchList, setSearchList] = useState([]);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        setSearchTerm(searchValue);
    }, [searchValue]);

    useEffect(() => {
        const fetchSearches = async () => {
            console.log(debouncedSearchTerm)
            if (debouncedSearchTerm) {
                const temp = await searchService.getSearchList(debouncedSearchTerm);
                setSearchList(temp);
            }
        }
        fetchSearches();
    }, [debouncedSearchTerm]);

    const handleClose = () => {
        onClose(false);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} displayCoat={false} className='sm:w-full max-w-[500px]' idControl={[1,2,3,4,5].includes(breakpoints) ? "search_bar_active_modal": ""} gd={[3,4,5].includes(breakpoints) ? {width: position?.right - position?.left}: {top: position.bottom + 8}}>
            <Grid className="keyword">
                <Typography tag={'h4'} gd={{fontSize: '1rem'}}>Từ khoá liên quan</Typography>
                {searchList && searchList.map(keyword =>(
                    <Anchor tag={'p'} className={'key-word'} title={keyword.searchTitle}
                    >{keyword.searchTitle}</Anchor>
                ))}
            </Grid>
            <Group className={'search-content'}>
                {searchList && searchList.map((search, index) => (
                    <Card long sizeImg={40}
                          key={index}
                          shape={search.type === 'artist' ? 'circle' : 'square'}
                          srcImg={search.coverImageUrl}
                          gd={{padding: 5, maxWidth: '100%', color: '#000'}}
                          title={<Typography tag={'p'} gd={{color: '#000'}}>{search?.searchTitle}</Typography> }
                          className={'card-content'}
                          description={search.artists && search.artists.map((artist, index) => (
                              <Link to={`/artists/${artist.artistName}`} key={artist.artistId}>
                                  {artist.artistName}
                                  {index !==  search.artists.length - 1 && <span>, </span>}
                              </Link>
                          ))}
                          urlLink={search.type === 'album'? `/albums/${search.searchId}` :
                              search.type === 'song'? `/albums/${search.searchId}` :
                                  `/artists/${search.searchTitle}`
                          }
                          onClick={handleClose}
                          LinkComponent={Link}
                    ></Card>
                ))}
            </Group>
        </Modal>
    );
};

export default ModalSearch;