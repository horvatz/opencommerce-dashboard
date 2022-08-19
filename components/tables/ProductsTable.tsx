import { AgGridReact } from 'ag-grid-react';
import { useMemo, useRef, useState } from 'react';
import { ProductDetailsFragment } from '../../generated/graphql';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import {
  ColDef,
  GridOptions,
  IDetailCellRendererParams,
  RowClickedEvent,
} from 'ag-grid-community';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

type Props = {
  products: ProductDetailsFragment[];
};

/**
 * Table for products catalog
 */
const ProductsTable = ({ products }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const rowData = products.map((product) => {
    const image = product.media[0] ?? '';

    return {
      image: image,
      id: product.id,
      name: product.name,
      description: product.description,
      type: product.type,
      numOfVariants: product.variants?.length ?? 0,
    };
  });

  const gridRef = useRef(null);

  const [columnDefs] = useState<ColDef[]>([
    {
      field: 'image',
      headerName: '',
      width: 100,
      cellRenderer: (props: IDetailCellRendererParams) =>
        props.value ? (
          <Image
            // TODO
            src={`http://localhost:3000${props.value.path}`}
            layout="fill"
            objectFit="contain"
            alt="product image"
          />
        ) : (
          ''
        ),
    },
    {
      field: 'name',
      headerName: t('name'),
      filter: 'true',
      flex: 2,
    },
    { field: 'description', headerName: t('description'), flex: 2 },
    { field: 'type', headerName: t('productType'), flex: 1 },
    { field: 'numOfVariants', headerName: t('variants'), width: 100 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const gridOptions: GridOptions = useMemo(
    () => ({
      rowHeight: 60,
    }),
    []
  );

  const handleRowClick = (e: RowClickedEvent) => {
    router.push({ pathname: '/products/[id]', query: { id: e.data.id } });
  };

  return (
    <div className="w-full p-1 h-full bg-white border border-gray-100 shadow-xl rounded-xl">
      <div className="ag-theme-material h-full w-full">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          animateRows={true}
          defaultColDef={defaultColDef}
          onRowClicked={handleRowClick}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
