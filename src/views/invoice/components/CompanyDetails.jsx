import Input from "../../../components/form/Input";

const CompanyDetails = props => {
  const { form, onFormChange } = props;

  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold text-indigo-600/75">
        Company Details
      </h2>

      <div className="flex flex-wrap gap-x-8 gap-y-4 md:[&>*]:basis-[calc(50%-2rem)]">
        <Input
          label="Name"
          value={form.senderName}
          onChange={onFormChange("senderName")}
        />
        <Input
          label="Address"
          value={form.senderAddress}
          onChange={onFormChange("senderAddress")}
        />
        <Input
          label="Postcode"
          value={form.senderPostcode}
          onChange={onFormChange("senderPostcode")}
        />
        <Input
          label="City"
          value={form.senderCity}
          onChange={onFormChange("senderCity")}
        />
        <Input
          label="Country"
          value={form.senderCountry}
          onChange={onFormChange("senderCountry")}
        />
        <Input
          label="Email"
          value={form.senderEmail}
          onChange={onFormChange("senderEmail")}
        />
        <Input
          label="Phone"
          value={form.senderPhone}
          onChange={onFormChange("senderPhone")}
        />
      </div>
    </div>
  );
};

export default CompanyDetails;
