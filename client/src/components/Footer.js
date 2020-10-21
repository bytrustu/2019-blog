import React from 'react';
import {Row, Col} from "reactstrap";

const Footer = () => {
    const thisYear = () => (new Date().getFullYear());
    return (
        <div id="main-footer" className="text-center m-auto p-2">
            <Row>
                <Col>
                    Copyright &copy; <span>{thisYear()}</span>
                </Col>
            </Row>
        </div>
    )
}

export default Footer;