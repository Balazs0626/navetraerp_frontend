import { DeleteButton, EditButton, List, useTable } from "@refinedev/antd";
import { Space, Table } from "antd";
import { IUserList } from "../../interfaces";
import { Roles } from "../../constants/users";
import { useEffect } from "react";


export const UserList = () => {
    useEffect(() => {
        document.title = "NavetraERP - Felhasználó lista";
    })
    const { tableProps } = useTable<IUserList>({
        resource: "User",
        pagination: {
            currentPage: 1,
            pageSize: 10,
        }
    });

    return (
        <List
            title="Felhasználók"
        >
            <Table {...tableProps}>
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
    )
};