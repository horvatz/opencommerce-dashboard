import { NextPage } from 'next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Card from '../../components/cards/Card';
import EditTaxRateDialog from '../../components/dialogs/EditTaxRateDialog';
import Header from '../../components/layout/Header';
import TaxesTable from '../../components/tables/TaxesTable';
import {
  CreateTaxRateInput,
  UpdateTaxRateInput,
  useCreateTaxRateMutation,
  useRemoveTaxRateMutation,
  useTaxRatesQuery,
  useUpdateTaxRateMutation,
} from '../../generated/graphql';

const TaxRatesIndex: NextPage = () => {
  const { t } = useTranslation();

  const [editDialogOpen, setEditDialogOpen] = useState<{
    open: boolean;
    taxRateId: number | null;
  }>({
    open: false,
    taxRateId: null,
  });

  const {
    data: ratesData,
    loading: ratesLoading,
    error: ratesError,
  } = useTaxRatesQuery();

  const [removeTaxRate] = useRemoveTaxRateMutation({
    refetchQueries: ['TaxRates'],
  });

  const [updateTaxRate] = useUpdateTaxRateMutation({
    refetchQueries: ['TaxRates'],
  });

  const [createTaxRate] = useCreateTaxRateMutation({
    refetchQueries: ['TaxRates'],
  });

  const handleTaxRateRemove = async (id: number) => {
    try {
      await removeTaxRate({ variables: { id } });
      toast.success(t('taxRateRemoved'));
    } catch (error) {}
  };

  const handleTaxRateEdit = async (id: number, values: UpdateTaxRateInput) => {
    try {
      await updateTaxRate({ variables: { id, taxRate: values } });
      toast.success(t('taxRateUpdated'));
      setEditDialogOpen({ open: false, taxRateId: null });
    } catch (error) {}
  };

  const handleTaxRateCreate = async (values: CreateTaxRateInput) => {
    try {
      await createTaxRate({ variables: { taxRate: values } });
      toast.success(t('taxRateCreated'));
      setEditDialogOpen({ open: false, taxRateId: null });
    } catch (error) {}
  };

  if (!ratesData || ratesLoading || ratesError) {
    return <></>;
  }

  const taxRates = ratesData.taxRates;

  const currentTaxRate = taxRates.find(
    (rate) => rate.id === editDialogOpen.taxRateId?.toString()
  );

  return (
    <>
      <Header
        actionText={t('createTaxRate')}
        onAction={() => setEditDialogOpen({ open: true, taxRateId: null })}
        title={t('taxRates')}
        subtitle={t('taxRatesDescription')}
      />
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
        <Card margin="m-0" padding="py-3">
          <TaxesTable
            onTaxRateRemove={(id) => handleTaxRateRemove(id)}
            onTaxRateEdit={(id) =>
              setEditDialogOpen({ open: true, taxRateId: id })
            }
            rates={taxRates}
          />
        </Card>
      </div>
      <EditTaxRateDialog
        open={editDialogOpen.open}
        mode={editDialogOpen.taxRateId ? 'edit' : 'create'}
        initialValues={{
          name: currentTaxRate?.name ?? '',
          description: currentTaxRate?.description ?? '',
          rate: currentTaxRate?.rate ?? 0,
        }}
        onSuccess={(values) =>
          editDialogOpen.taxRateId
            ? handleTaxRateEdit(editDialogOpen.taxRateId, values)
            : handleTaxRateCreate(values)
        }
        onClose={() => setEditDialogOpen({ open: false, taxRateId: null })}
      />
    </>
  );
};

export default TaxRatesIndex;
