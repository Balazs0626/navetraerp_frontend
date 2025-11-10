import { useTable, List, EditButton, DeleteButton } from "@refinedev/antd";
import { IPositionList } from "../../../interfaces";
import { Button, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { usePermissions, useTranslation } from "@refinedev/core";
import { useEffect } from "react";

export const PositionList = () => {

  const { tableProps } = useTable<IPositionList>({
    resource: "positions",
    pagination: {
      pageSize: 10,
    }
  });

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = translate("pages.positions.list.title");
  }) 

  return (
    <List
      title={translate("pages.positions.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("/hr/positions/create")} disabled={!permissions?.includes("CREATE:POSITIONS")}>
                {translate("pages.positions.buttons.create")}
            </Button>
          </Space>
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex={"positionName"} title={translate("pages.positions.titles.position")}/>
        <Table.Column dataIndex={"description"} title={translate("pages.positions.titles.description")}/>
        <Table.Column<IPositionList>
          title={translate("pages.positions.list.actions")}
          dataIndex="actions"
          key="actions"
          render={(_, record) => (
            <Space>
              <EditButton
                size="small"
                recordItemId={record.id}
                resource="positions"
                onClick={() => navigate(`/hr/positions/edit/${record.id}`)}
                disabled={!permissions?.includes("EDIT:POSITIONS")}
              />
              <DeleteButton
                size="small"
                recordItemId={record.id}
                resource="positions"
                confirmTitle={translate("notifications.deleteMessage")}
                disabled={!permissions?.includes("DELETE:POSITIONS")}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
};