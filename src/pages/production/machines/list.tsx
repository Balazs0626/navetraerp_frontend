import { useTable, List, EditButton, DeleteButton, ExportButton, ShowButton } from "@refinedev/antd";
import { Button, Card, Input, Space, Table } from "antd";
import { ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined, ImportOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { CanAccess, useExport, useImport, usePermissions, useTranslation } from "@refinedev/core";
import { useEffect } from "react";
import { CustomErrorComponent } from "../../error";
import { IMachineList } from "../../../interfaces";

export const MachineList = () => {

  const { tableProps } = useTable<IMachineList>({
      resource: "machines",
      pagination: {
        pageSize: 10,
      }
  });

  const navigate = useNavigate();
  const { translate } = useTranslation();

  const { data: permissions } = usePermissions<string[]>({});

  useEffect(() => {
    document.title = `${translate("pages.machines.list.title")} | NavetraERP`;
  }) 

  return (
    <CanAccess 
      resource="machines" 
      action="list" 
      fallback={<CustomErrorComponent status="403"/>}
    >
      <List
        title={translate("pages.machines.list.title")}
        headerButtons={
            <Space>
              <Button icon={<PlusOutlined/>} size="large" type="primary" onClick={() => navigate("/production/machines/create")} disabled={!permissions?.includes("CREATE:DEPARTMENTS")}>
                  {translate("pages.machines.buttons.create")}
              </Button>
              <Button icon={<ArrowLeftOutlined/>} size="large" onClick={() => navigate("/hr")}>
                  {translate("buttons.back_module")}
              </Button>
  {/*             <ExportButton onClick={triggerExport} loading={exportLoading} size="large">Export</ExportButton>
              <Input 
                {...inputProps}
                prefix={<ImportOutlined/>}
                size="large"
              /> */}
            </Space>
        }
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex={"name"} title={translate("pages.machines.titles.name")}/>
          <Table.Column dataIndex={"code"} title={translate("pages.machines.titles.code")}/>
          <Table.Column 
                dataIndex="active"
                title={translate("pages.machines.titles.active")}
                align="center"
                render={(value: boolean) => (
                  <Space>
                    {value ? (
                        <CheckCircleOutlined 
                            style={{ color: '#52C41A', fontSize: 18 }} 
                        />
                    ) : (
                        <CloseCircleOutlined 
                            style={{ color: '#FF4D4F', fontSize: 18 }} 
                        />
                    )}
                  </Space>
                )}
              />
          <Table.Column
            title={translate("pages.departments.list.actions")}
            dataIndex="actions"
            key="actions"
            render={(_, record) => (
              <Space>
                <ShowButton
                  size="small"
                  recordItemId={record.id}
                  resource="machines"
                />
                <EditButton
                  size="small"
                  recordItemId={record.id}
                  resource="machines"
                  disabled={!permissions?.includes("EDIT:DEPARTMENTS")}
                />
                <DeleteButton
                  size="small"
                  recordItemId={record.id}
                  resource="machines"
                  confirmTitle={translate("notifications.deleteMessage")}
                  disabled={!permissions?.includes("DELETE:DEPARTMENTS")}
                />
              </Space>
            )}
          />
        </Table>
      </List>
    </CanAccess>
  )
};