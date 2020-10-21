import React, {useEffect, useState} from 'react';
import {NavLink, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button, Alert} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_ERROR_REQUEST, LOGIN_REQUEST} from "../../redux/types";

const LoginModal = () => {
    const [modal, setModal] = useState(false);
    const [localMsg, setLocalMsg] = useState('');
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();
    const {errorMsg} = useSelector((state) => state.auth);
    useEffect(() => {
        try {
            setLocalMsg(errorMsg);
        } catch (e) {
            console.log(e);
        }
    }, [errorMsg]);

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        })
        setModal(!modal);
    }

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = form;
        const user = {email, password};
        console.log(user);
        dispatch({
            type: LOGIN_REQUEST,
            payload: user
        })
    }

    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>
                    Login
                </ModalHeader>
                <ModalBody>
                    {localMsg && <Alert color="danger">{localMsg}</Alert>}
                </ModalBody>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="p-3">
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholader="Email" onChange={onChange}/>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholader="Password" onChange={onChange}/>
                        <Button color="dark" style={{marginTop: "2rem"}} block>Login</Button>
                    </FormGroup>
                </Form>
            </Modal>
        </div>
    )
}

export default LoginModal;