"use client";
import Image from "next/image";
import Wrapper from "./components/Wrapper";
import { Layers } from "lucide-react";
import { useEffect, useState } from "react";
import { createEmptyInvoice, getInvoicesByEmail } from "./actions";
import { useUser } from "@clerk/nextjs";
import confetti from "canvas-confetti";
import { Invoice } from "@/type";

export default function Home() {
  const [invoiceName, setInvoiceName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const fetchInvoices = async () => {
    try {
      const data = await getInvoicesByEmail(email);
      if (data) {
        setInvoices(data);
      }
    } catch (error) {
      console.error("Error fetching invoices ", error);
    }
  };
  useEffect(() => {
    fetchInvoices();
  }, [email]);

  useEffect(() => {
    if (invoiceName.length > 60) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
  }, [invoiceName]);
  const handleCreateInvoice = async () => {
    try {
      if (email) {
        await createEmptyInvoice(email, invoiceName);
      }
      setInvoiceName("");
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 9999,
      });
    } catch (error) {
      console.error("Error lors de la cration de la facture ", error);
    }
  };
  return (
    <Wrapper>
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg font-bold">Mes factures</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <div
            className="cursor-pointer border border-accent rounded-xl flex flex-col p-5 justify-center items-center"
            onClick={() =>
              (
                document.getElementById("my_modal_3") as HTMLDialogElement
              ).showModal()
            }
          >
            <div className="font-bold text-accent">Creer une facture</div>
            <div className="bg-accent-content text-accent rounded-full p-2 mt-2">
              <Layers className="h-6 w-6" />
            </div>
          </div>
          {/* Listes des factures */}
          {invoices.length > 0 &&
            invoices.map((invoice, index) => (
              <div key={index}>{invoice.name}</div>
            ))}
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Nouvelle facture</h3>
            <input
              className="input input-bordered w-full my-4"
              type="text"
              placeholder="Nom de facture (max 60 caracteres)"
              value={invoiceName}
              onChange={(e) => setInvoiceName(e.target.value)}
            />
            {!isNameValid && (
              <p className="mb-4 text-sm">
                Le nom ne peut pas exceder 60 caracteres
              </p>
            )}
            <button
              className="btn btn-accent"
              disabled={!isNameValid || invoiceName.length === 0}
              onClick={handleCreateInvoice}
            >
              Creer
            </button>
          </div>
        </dialog>
      </div>
    </Wrapper>
  );
}
