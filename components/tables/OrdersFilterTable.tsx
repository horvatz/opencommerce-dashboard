import {
  ColDef,
  IDetailCellRendererParams,
  RowClickedEvent,
} from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import {
  CheckoutDetailsFragment,
  CheckoutStatus,
} from '../../generated/graphql';
import Badge from '../Badge';

type Props = {
  orders: CheckoutDetailsFragment[];
};

/**
 * Table for orders catalog
 */
const OrdersFilterTable = ({ orders }: Props): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  const [columnDefs] = useState<ColDef[]>([
    {
      field: 'id',
      headerName: t('id'),
      width: 300,
    },
    {
      field: 'customer',
      headerName: t('customer'),
      width: 200,
    },
    {
      field: 'status',
      headerName: t('orderStatus'),
      cellRenderer: (props: IDetailCellRendererParams) => {
        const status = props.value;
        console.log(status);
        return (
          <Badge
            text={status}
            variant={
              status === CheckoutStatus.Closed
                ? 'success'
                : status === CheckoutStatus.Canceled
                ? 'error'
                : 'primary'
            }
          />
        );
      },
    },
    { field: 'totalPrice', headerName: t('totalPrice') },
  ]);

  const rowData = orders.map((order) => ({
    id: order.id,
    customer: `${order.billingAddress?.firstName} ${order.billingAddress?.lastName}`,
    status: order.status,
  }));

  const handleRowClick = (e: RowClickedEvent) => {
    router.push({ pathname: '/orders/[id]', query: { id: e.data.id } });
  };

  return (
    <div className="w-full p-1 h-full bg-white border border-gray-100 shadow-xl rounded-xl">
      <div className="ag-theme-material h-full w-full">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          //gridOptions={gridOptions}
          animateRows={true}
          onRowClicked={handleRowClick}
        />
      </div>
    </div>
  );
};

export default OrdersFilterTable;
