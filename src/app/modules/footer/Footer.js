import React, { Component } from "react";

import { Layout } from "antd";

const { Footer } = Layout;

class FooterPage extends Component {
    render() {
        return (
            <Footer style={{ textAlign: "center" }}>
                Confession App ©2018 Thiết kế dựa trên ReactJS và NodeJS.
            </Footer>
        );
    }
}

export default FooterPage;