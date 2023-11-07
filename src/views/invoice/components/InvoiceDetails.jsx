import Input from "../../../components/form/Input";

const InvoiceDetails = props => {
  const { form, onFormChange } = props;

  return (
    <div>
      <div>
        <h2 className="mb-4 text-sm font-semibold text-indigo-600/75">
          Invoice Details
        </h2>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-4 md:[&>*]:basis-[calc(50%-2rem)]">
        <Input
          label="Invoice ID"
          required
          value={form.invoiceId}
          onChange={onFormChange("invoiceId")}
        />
        <Input
          label="Invoice Date"
          type="date"
          required
          value={form.date}
          onChange={onFormChange("date")}
        />
        <Input
          label="Invoice Due Date"
          type="date"
          required
          value={form.dueDate}
          onChange={onFormChange("dueDate")}
        />
        <Input
          label="Invoice Amount"
          value={form.amount}
          required
          onChange={onFormChange("amount")}
        />

        <Input
          rootProps={{
            style: {
              flexBasis: "calc(100% - 2rem)",
            },
          }}
          label="Description"
          required
          value={form.description}
          onChange={onFormChange("description")}
        />

        <Input
          label="Payment Date"
          type="date"
          value={form.paymentDate}
          onChange={onFormChange("paymentDate")}
        />

        <div className="flex flex-col w-full gap-1">
          <label className="text-sm text-indigo-950/75">Payment Received</label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`flex-grow px-4 py-2 rounded-md ${
                form.paymentReceived
                  ? "bg-indigo-100"
                  : "bg-indigo-600 text-indigo-100"
              }`}
              onClick={() => {
                onFormChange("paymentReceived")(false);
              }}
            >
              No
            </button>
            <button
              type="button"
              className={`flex-grow px-4 py-2 rounded-md ${
                form.paymentReceived
                  ? "bg-indigo-600 text-indigo-100"
                  : "bg-indigo-100"
              }`}
              onClick={() => {
                onFormChange("paymentReceived")(true);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
