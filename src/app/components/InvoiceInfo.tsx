import { Invoice } from "@/type";
import React from "react";

interface Props {
  invoice: Invoice;
  setInvoice: (invoice: Invoice) => void;
}

const InvoiceInfo: React.FC<Props> = ({ invoice, setInvoice }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setInvoice({
      ...invoice,
      [field]: e.target.value,
    });
  };
  return (
    <div className="flex flex-col h-fit bg-base-200 p-5 rounded-xl mb-4 md:mb-0">
      <div className="space-y-4">
        <h2 className="badge badge-accent">Emétteur</h2>
        <input
          type="text"
          value={invoice?.issuerName}
          placeholder="Nom de l'entreprise émettrice"
          className="input input-bordered w-full resize-none"
          required
          onChange={(e) => handleInputChange(e, "issuerName")}
        />
        <textarea
          className="textarea textarea-bordered w-full resize-none h-40"
          value={invoice?.issuerAddress}
          placeholder="Adresse de l'entreprise émettrice"
          aria-rowcount={5}
          onChange={(e) => handleInputChange(e, "issuerAddress")}
        ></textarea>
        <h2 className="badge badge-accent">Client</h2>
        <input
          type="text"
          value={invoice?.clientName}
          placeholder="Nom de l'entreprise client"
          className="input input-bordered w-full resize-none"
          required
          onChange={(e) => handleInputChange(e, "clientName")}
        />
        <textarea
          className="textarea textarea-bordered w-full resize-none h-40"
          value={invoice?.clientAddress}
          placeholder="Adresse de l'entreprise client"
          aria-rowcount={5}
          onChange={(e) => handleInputChange(e, "clientAddress")}
        ></textarea>
        <h2 className="badge badge-accent">Date de la facture</h2>
        <input
          type="date"
          value={invoice?.invoiceDate}
          className="input input-bordered w-full resize-none"
          required
          onChange={(e) => handleInputChange(e, "invoiceDate")}
        />
        <h2 className="badge badge-accent">Date de l'echeance</h2>
        <input
          type="date"
          value={invoice?.dueDate}
          className="input input-bordered w-full resize-none"
          required
          onChange={(e) => handleInputChange(e, "dueDate")}
        />
      </div>
    </div>
  );
};

export default InvoiceInfo;
