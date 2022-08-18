import { ColDef, RowClickedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ProductCategoryDetailsFragment } from '../../generated/graphql';
import { useRouter } from 'next/router';

type Props = {
  categories: ProductCategoryDetailsFragment[];
};

const ProductCategoryTable = ({ categories }: Props): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  const rowData = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    numOfProducts: category.products?.length ?? 0,
  }));

  const [columnDefs] = useState<ColDef[]>([
    {
      field: 'name',
      headerName: t('name'),
      filter: 'true',
      flex: 2,
    },
    { field: 'description', headerName: t('description'), flex: 2 },
    { field: 'numOfProducts', headerName: t('numberOfProducts'), width: 200 },
  ]);

  const handleRowClick = (e: RowClickedEvent) => {
    router.push({
      pathname: '/products/categories/[id]',
      query: { id: e.data.id },
    });
  };

  return (
    <div className="w-full p-1 h-full bg-white border border-gray-100 shadow-xl rounded-xl">
      <div className="ag-theme-material h-full w-full">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          //gridOptions={gridOptions}
          animateRows={true}
          //defaultColDef={defaultColDef}
          onRowClicked={handleRowClick}
        />
      </div>
    </div>
  );
};

export default ProductCategoryTable;
