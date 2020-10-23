import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {COMMENT_LOADING_REQUEST, COMMENT_UPLOADING_REQUEST} from "../../redux/types";
import {Form, Input, Row, Button} from "reactstrap";

const Comments = ({id, userId, userName}) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState('')
    const onSubmit = async (e) => {
        await e.preventDefault();
        const token = localStorage.getItem('token');
        const body = {
            contents: form,
            token,
            id,
            userId,
            userName,
        }
        dispatch({
            type: COMMENT_UPLOADING_REQUEST,
            payload: body,
        });
        resetValue.current.value = '';
        setForm('');
    }
    const resetValue = useRef();
    const onChange = (e) => {
        setForm(e.target.value);
        console.log(form.contents);
    }

    useEffect(() => {
        dispatch({
            type: COMMENT_LOADING_REQUEST,
            payload: id,
        })
    }, [dispatch, id])
    return (
        <>
            <Form onSubmit={onSubmit}>
                <Row className="p-2">
                    <div className="font-weight-bold m-1">Make Comment</div>
                    <div className="w-100">
                        <Input ref={resetValue} type="textarea" name="contents" id="contents" onChange={onChange} placeholder="Comment"/>
                    </div>
                    <Button color="primary" block className="mt-2 col-md-2 offset-md-10">
                        Submit
                    </Button>

                </Row>
            </Form>
        </>
    )
}

export default Comments;