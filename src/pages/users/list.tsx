import { DeleteButton, EditButton, List, useTable } from "@refinedev/antd";
import { Space, Table, Input, Form, Row, Col, Button } from "antd";
import { IUserList } from "../../interfaces";
import { Roles } from "../../constants/users";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigation, usePermissions, useTranslation } from "@refinedev/core";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export const UserList = () => {

    const { tableProps } = useTable<IUserList>({
        resource: "users",
    });

    const navigate = useNavigate();

    const { translate } = useTranslation();

    useEffect(() => {
        document.title = `NavetraERP - ${translate("pages.users.list.title")}`;
    })

    const { data: permissions, isLoading } = usePermissions<string[]>({});

    return (
        <Row gutter={[16, 16]}>
            <Col lg={24} xs={24}>
                <List
                    title={translate("pages.users.list.title")}
                    headerButtons={
                        <Button icon={<PlusOutlined />} size="large" onClick={() => navigate("/users/create")}>
                            {translate("pages.users.buttons.create")}
                        </Button>
                    }
                >
                    <Table {...tableProps} rowKey="id">
                        <Table.Column dataIndex={"username"} title={translate("pages.users.titles.username")}/>
                        <Table.Column dataIndex={"email"} title={translate("pages.users.titles.email")}/>
                        <Table.Column 
                            dataIndex={"role"} 
                            title={translate("pages.users.titles.role")}
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
                                    {permissions?.includes("EDIT:USERS") &&
                                        <EditButton
                                            size="small"
                                            recordItemId={record.id}
                                            resource="users"
                                            onClick={() => navigate(`/users/edit/${record.id}`)}
                                        />
                                    }
                                    {permissions?.includes("DELETE:USERS") &&
                                        <DeleteButton
                                            size="small"
                                            recordItemId={record.id}
                                            resource="users"
                                            confirmTitle={translate("pages.users.list.delete_message")}
                                        />
                                    }
                                </Space>
                            )}
                        />
                    </Table>
                </List>
            </Col>
        </Row>
    )
};