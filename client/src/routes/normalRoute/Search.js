import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from 'react-router-dom';
import {SEARCH_REQUEST} from "../../redux/types";
import {Row} from 'reactstrap';
import PostCardOne from "../../components/post/PostCardOne";

const Search = () => {
    const dispatch = useDispatch();
    const {searchTerm} = useParams();
    const {searchResult} = useSelector((state) => state.post);
    useEffect(() => {
        if (searchTerm) {
            dispatch({
                type: SEARCH_REQUEST,
                payload: searchTerm
            })
        }
    }, [dispatch, searchTerm]);
    return (
        <>
            <h1>검색결과: "{searchTerm}"</h1>
            <Row>
                <PostCardOne posts={searchResult}/>
            </Row>
        </>
    )
}

export default Search;