import React, { Component } from "react";

import {
    Layout,
    Card,
    Row,
    Col,
    Skeleton,
    Icon,
    BackTop,
    Badge,
    Divider,
} from "antd";

import moment from "moment";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import paramCase from "param-case";
import { getArticles } from "../../utils/Crawl";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "../../utils/LocalStorage";

const { Content } = Layout;
const { Meta } = Card;

class Index extends Component {
    state = {
        loading: true,
        posts: [],
    };

    componentDidMount() {
        const newsExpire = parseInt(
            LocalStorageUtils.getItem(
                LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS_EXPIRE,
                null
            )
        );
        const now = parseInt(moment().unix());

        if (
            LocalStorageUtils.getItem(
                LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS,
                null
            ) !== null &&
            now - newsExpire <= 0
        ) {
            let posts = JSON.parse(
                LocalStorageUtils.getItem(
                    LOCAL_STORAGE_KEY.TOIDICODEDAO_NEWS,
                    null
                )
            );

            posts = this.filterNotLightningTalk(posts);

            this.setState({
                posts,
                loading: false,
            });
        } else {
            getArticles(
                ["https://toidicodedao.com", "https://codeaholicguy.com"],
                true,
                "toidicodedao"
            ).then(posts => {
                posts = this.filterNotLightningTalk(posts);

                this.setState({
                    posts,
                    loading: false,
                });
            });
        }
    }

    filterNotLightningTalk(posts) {
        return posts.filter(post => !post.title.includes("Lightning Talk"));
    }

    renderPosts = posts => {
        return posts.map((post, index) => {
            post.description = post.description
                .replace(/<(.|\n)*?>/g, "")
                .trim();
            post.description = post.description.substring(0, 250) + "...";

            const patt = /p=(\d+)$/;
            const guid = patt.exec(post.guid)[1];

            const postTitle = paramCase(this.removeVnStr(post.title));

            return (
                <Link
                    to={`/toidicodedao/bai-viet/${guid}/${postTitle}`}
                    key={index}
                >
                    <Col lg={8} md={12}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt={post.title}
                                    src={
                                        post.thumbnail ||
                                        "https://cdn-images-1.medium.com/max/1024/1*7aJPlxn8gwhI7JjcBFr-tQ.jpeg"
                                    }
                                    style={{
                                        objectFit: "cover",
                                        height: "15rem",
                                    }}
                                />
                            }
                            style={{ marginBottom: "1rem" }}
                        >
                            <Meta
                                style={{
                                    height: "10rem",
                                    overflow: "hidden",
                                }}
                                title={post.title}
                                description={post.description}
                            />
                        </Card>
                    </Col>
                </Link>
            );
        });
    };

    removeVnStr(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");

        return str;
    }

    render() {
        const { loading, posts } = this.state;

        return (
            <Content className="content-container">
                <Helmet>
                    <title>Tôi đi code dạo</title>
                    <meta name="description" content="Từ coder đến developer" />
                </Helmet>
                <BackTop />
                <div className="content-wrapper">
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "1.2rem",
                        }}
                    >
                        <h2>
                            <img src="https://i.imgur.com/uzF6Fok.png" alt="" />
                            {loading && (
                                <Icon
                                    type="loading"
                                    style={{ marginLeft: "1rem" }}
                                />
                            )}
                            {!loading && (
                                <span
                                    style={{
                                        marginLeft: "1rem",
                                    }}
                                >
                                    <Badge
                                        count={posts.length + "+"}
                                        style={{
                                            backgroundColor: "#40A9FF",
                                            color: "#fff",
                                        }}
                                    />
                                </span>
                            )}
                        </h2>
                    </div>
                    <Divider style={{ fontWeight: "lighter" }}>
                        Từ coder đến developer
                    </Divider>
                    {posts && !loading && (
                        <Row gutter={16}>{this.renderPosts(posts)}</Row>
                    )}
                    {loading && (
                        <div>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                    )}
                </div>
            </Content>
        );
    }
}

export default Index;
