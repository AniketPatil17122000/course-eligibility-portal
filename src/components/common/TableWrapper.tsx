import { Table } from "antd";
import type { Tableprops } from "../../interfaces/interfaces";


const TableWrapper = (props: Tableprops) => {
  return (
    <>
      {props?.title && <h5 className="d-flex mb-2">{props?.title}</h5>}

      <div className="table-responsive" >
        <Table


          className={props.className}
          dataSource={props?.dataSource}
          columns={props?.columns}
          loading={props?.loading}
          bordered={props?.bordered}


          // scroll={{ x: "max-content" }}
          scroll={props?.scroll}
          // tableLayout="auto"
          pagination={props?.pagination ? {
            pageSize: props?.pageSize || 5,
            showSizeChanger: false,
            showLessItems: true
            

            // pageSizeOptions: ["5", "10", "20", "50"],
            // responsive: true,
          } : false}

          // locale={{}}
          locale={props.locale}
          key={props?.key
          }
          rowKey={props?.rowKey}
          showHeader={props.showHeader}
          size={props?.size}
        />
      </div>
    </>
  );

}

export default TableWrapper