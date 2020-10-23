import React, {useRef, useState} from 'react';
import {Input} from 'reactstrap';
import {useDispatch} from 'react-redux';
import {SEARCH_REQUEST} from "../../redux/types";
import Form from "reactstrap/es/Form";

const SearchInput = () => {
    const dispatch = useDispatch();
    const resetValue = useRef();
    const [form, setForm] = useState({
        searchBy: ''
    })
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }
    const onSubmit = async (e) => {
        await e.preventDefault();
        const {searchBy} = form;
        dispatch({
            type: SEARCH_REQUEST,
            payload: searchBy
        });
        resetValue.current.value = '';
    }
    return (
        <>
            <Form onSubmit={onSubmit} className="col mt-2">
                <Input name="searchBy" onChange={onChange} ref={resetValue}/>
            </Form>
        </>
    )
}

export default SearchInput