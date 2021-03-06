import React from "react";
import Exception from "ant-design-pro/lib/Exception";
import { Link } from "react-router-dom";

import { Layout, Button } from "antd";

import Helmet from "react-helmet-async";

const { Content } = Layout;

function NotFound() {
    return (
        <Content className="content-container">
            <Helmet>
                <title>404 - FUHCM.com</title>
            </Helmet>
            <div
                style={{
                    background: "#fff",
                    padding   : "2rem",
                    textAlign : "center",
                }}
            >
                <Exception
                    type="404"
                    actions={(
                        <Link to="/medium">
                            <Button type="primary">Đọc báo đê?</Button>
                        </Link>
)}
                    title="404"
                    desc="Mô phật, thí chủ đi đâu mà lạc vào đây?"
                />
            </div>
        </Content>
    );
}

export default NotFound;
