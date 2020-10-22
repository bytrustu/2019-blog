import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CLEAR_ERROR_REQUEST, REGISTER_REQUEST} from "../../redux/types";
import {NavLink, Modal, ModalHeader, ModalBody, Alert, Form, FormGroup, Label, Input, Button} from "reactstrap";

const RegisterModal = () => {
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [localMsg, setLocalMsg] = useState('');
    const { errorMsg } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        })
        setModal(!modal);
    }

    useEffect(() => {
        try {
            setLocalMsg(errorMsg);
        } catch (e) {
            console.log(e);
        }
    }, [errorMsg]);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const {name, email, password} = form;
        const newUser = {name, email, password};
        console.log(newUser, "newUser");
        dispatch({
            type: REGISTER_REQUEST,
            payload: newUser
        })
    }
    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Register
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Register</ModalHeader>
                <ModalBody>
                    {localMsg && <Alert color="danger">{localMsg}</Alert>}
                </ModalBody>
                <Form onSubmit={onSubmit} className="p-3">
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholader="Name" onChange={onChange}/>
                        <Label for="name">Email</Label>
                        <Input type="email" name="email" id="email" placeholader="Email" onChange={onChange}/>
                        <Label for="name">Password</Label>
                        <Input type="password" name="password" id="password" placeholader="Password" onChange={onChange}/>
                        <Button color="dark" className="mt-2" block>Register</Button>
                    </FormGroup>
                </Form>
            </Modal>
        </div>
    )
}

export default RegisterModal;