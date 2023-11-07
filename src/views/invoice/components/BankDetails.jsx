import Input from "../../../components/form/Input";

const BankDetails = props => {
  const { form, onFormChange } = props;
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold text-indigo-600/75">
        Bank Details
      </h2>

      <div className="flex flex-wrap gap-x-8 gap-y-4 md:[&>*]:basis-[calc(50%-2rem)]">
        <Input
          label="Account Name"
          value={form.accountName}
          onChange={onFormChange("accountName")}
        />
        <Input
          label="Sort Code"
          value={form.accountSortCode}
          onChange={onFormChange("accountSortCode")}
        />
        <Input
          label="Account Number"
          value={form.accountNumber}
          onChange={onFormChange("accountNumber")}
        />
        <Input
          label="IBAN"
          value={form.accountIban}
          onChange={onFormChange("accountIban")}
        />
        <Input
          label="Address"
          value={form.accountAddress}
          onChange={onFormChange("accountAddress")}
        />
      </div>
    </div>
  );
};

export default BankDetails;
