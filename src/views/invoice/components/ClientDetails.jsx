import Input from "../../../components/form/Input";

const ClientDetails = props => {
  const { form, onFormChange } = props;

  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold text-indigo-600/75">
        Client Details
      </h2>
      <div className="flex flex-wrap gap-x-8 gap-y-4 md:[&>*]:basis-[calc(50%-2rem)]">
        <Input
          label="Client Name"
          value={form.clientName}
          onChange={onFormChange("clientName")}
        />
        <Input
          label="Client Address"
          value={form.clientAddress}
          onChange={onFormChange("clientAddress")}
        />
        <Input
          label="Client Postcode"
          value={form.clientPostcode}
          onChange={onFormChange("clientPostcode")}
        />
        <Input
          label="Client City"
          value={form.clientCity}
          onChange={onFormChange("clientCity")}
        />
        <Input
          label="Client Country"
          value={form.clientCountry}
          onChange={onFormChange("clientCountry")}
        />
        <Input
          label="Client Email"
          value={form.clientEmail}
          onChange={onFormChange("clientEmail")}
        />
        <Input
          label="Client Phone"
          value={form.clientPhone}
          onChange={onFormChange("clientPhone")}
        />
      </div>
    </div>
  );
};

export default ClientDetails;
