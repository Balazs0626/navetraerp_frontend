import { DeleteButton, EditButton, List, useTable } from "@refinedev/antd";
import { Space, Table, Input, Form, Row, Col, Button } from "antd";
import { IUserList } from "../../interfaces";
import { Roles } from "../../constants/users";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigation, useTranslation } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export const UserList = () => {
    useEffect(() => {
        document.title = "NavetraERP - Felhasználó lista";
    })

    const [searchQuery, setSearchQuery] = useState("");

    const { tableProps } = useTable<IUserList>({
        resource: "User",
    });

    const navigate = useNavigate();

    const { translate } = useTranslation();

    return (
        <Row gutter={[16, 16]}>
{/*             <Col lg={6} xs={24}>

            </Col> */}
            <Col lg={24} xs={24}>
                <List
                    title={translate("pages.users.list.title")}
                    headerButtons={
                        <Button icon={<PlusOutlined />} size="large" onClick={() => navigate("/users/create")}>
                            {translate("pages.users.list.create_button")}
                        </Button>
                    }
                >
                    <Table {...tableProps} rowKey="id">
                        <Table.Column dataIndex={"username"} title={translate("pages.users.common.username")}/>
                        <Table.Column dataIndex={"email"} title={translate("pages.users.common.email")}/>
                        <Table.Column 
                            dataIndex={"role"} 
                            title={translate("pages.users.common.role")}
                            render={(value) => {
                                const role = Roles.find(r => r.value === value);
                                return role? role.label : value;
                            }}
                        />
                        <Table.Column<IUserList>
                            title={translate("pages.users.list.actions")}
                            dataIndex="actions"
                            key="actions"
                            render={(_, record) => (
                                <Space>
                                    <EditButton
                                        size="small"
                                        recordItemId={record.id}
                                        resource="User"
                                    />
                                    <DeleteButton
                                        size="small"
                                        recordItemId={record.id}
                                        resource="User"
                                        confirmTitle="Biztosan törli a felhasználót?"
                                    />
                                </Space>
                            )}
                        />
                    </Table>
                </List>
            </Col>
        </Row>
    )
};