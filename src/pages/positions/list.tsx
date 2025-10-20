import { useTable, List, EditButton, DeleteButton, ExportButton } from "@refinedev/antd";
import { IPositionList } from "../../interfaces";
import { Button, Space, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { table } from "console";
import { useNavigate } from "react-router";
import { useExport, useTranslate, useTranslation } from "@refinedev/core";
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

  useEffect(() => {
    document.title = translate("pages.positions.list.title");
  }) 

  return (
    <List
      title={translate("pages.positions.list.title")}
      headerButtons={
          <Space>
            <Button icon={<PlusOutlined/>} size="large" onClick={() => navigate("/hr/positions/create")}>
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
              />
              <DeleteButton
                size="small"
                recordItemId={record.id}
                resource="positions"
                confirmTitle={translate("notifications.deleteMessage")}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  )
};