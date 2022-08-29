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
import { IMAGE_HOST } from '../../utils/constants';

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
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative h-14 w-14 rounded-xl overflow-hidden">
              <Image
                // TODO
                src={`${IMAGE_HOST}${props.value.path}`}
                layout="fill"
                objectFit="cover"
                alt="product image"
              />
            </div>
          </div>
        ) : (
          ''
        ),
    },
    {
      field: 'name',
      headerName: t('name'),
      filter: 'true',
    },
    { field: 'description', headerName: t('description'), width: 500 },
    { field: 'type', headerName: t('productType') },
    { field: 'numOfVariants', headerName: t('variants'), flex: 1 },
  ]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const gridOptions: GridOptions = useMemo(
    () => ({
      rowHeight: 70,
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
