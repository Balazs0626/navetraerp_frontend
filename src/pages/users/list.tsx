import { DeleteButton, EditButton, List, useTable } from "@refinedev/antd";
import { Space, Table, Input, Form, Row, Col, Button } from "antd";
import { IUserList } from "../../interfaces";
import { Roles } from "../../constants/users";
import { useEffect, useState } from "react";

const { Search } = Input;

export const UserList = () => {
    useEffect(() => {
        document.title = "NavetraERP - Felhasználó lista";
    })

    const [searchQuery, setSearchQuery] = useState("");

    const { tableProps } = useTable<IUserList>({
        resource: "User",
    });


    return (
        <Row gutter={[16, 16]}>
            <Col lg={6} xs={24}>

            </Col>
            <Col lg={18} xs={24}>
                <List
                    title="Felhasználók"
                >
                    <Table {...tableProps} rowKey="id">
                        <Table.Column dataIndex={"username"} title="Felhasználónév"/>
                        <Table.Column dataIndex={"email"} title="E-mail cím"/>
                        <Table.Column 
                            dataIndex={"role"} 
                            title="Rang"
                            render={(value) => {
                                const role = Roles.find(r => r.value === value);
                                return role? role.label : value;
                            }}
                        />
                        <Table.Column<IUserList>
                            title="Műveletek"
                            dataIndex="actions"
                            key="actions"
                            render={(_, record) => (
                                <Space>
                                    <EditButton
                                        size="small"
                                        recordItemId={record.id}
                                        resource="User">Módosítás</EditButton>
                                    <DeleteButton
                                        size="small"
                                        recordItemId={record.id}
                                        resource="User"
                                        confirmTitle="Biztosan törli a felhasználót?">Törlés</DeleteButton>
                                </Space>
                            )}
                        />
                    </Table>
                </List>
            </Col>
        </Row>
    )
};