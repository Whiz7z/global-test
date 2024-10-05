import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  verifyToken,
  getTopUpData,
  getTotalAmount,
  openModal,
} from "../../utils/dashboardUtils";
import AddTopUpModal from "../../../components/AddTopUpModal/AddTopUpModal";
import TopUpTable from "../../../components/TopUpTable/TopUpTable";
import { Database } from "../../models/database";

import {handleLogout} from "../../utils/logout";

interface DashboardProps {
  searchParams: { error: string; modal: string };
}

export default async function DashboardPage({ searchParams }: DashboardProps) {
  const isAuthenticated = verifyToken();
  if (!isAuthenticated) {
    redirect("/");
  }

  const topUpData = getTopUpData();
  const totalAmount = getTotalAmount(topUpData);

  async function handleAddTopUp(data: FormData) {
    "use server";

    const accountId = parseInt(data.get("accountId") as string);
    const amount = parseFloat(data.get("amount") as string);
    const account = Database.accounts
      .getAll()
      .find((account) => parseInt(account.tfAccountId) === accountId);

    if (!account) {
      redirect(`/dashboard?error=Account not found for ID: ${accountId}&modal=open`);
      return;
    }

    const userId = account.userId;
    Database.topUpRequests.add({ userId, accountId, amount });
    revalidatePath("/dashboard");
    redirect("/dashboard");
  }

  async function handleDeleteTopUp(data: FormData) {
    "use server";
    const id = parseInt(data.get("id") as string);
    Database.topUpRequests.remove(id);
    revalidatePath("/dashboard");
  }


  const modalOpen = searchParams.modal === "open";

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">Dashboard</span>
          <form action={handleLogout} method="post">
            <button type="submit" className="btn btn-outline-danger">
              Logout
            </button>
          </form>
        </div>
      </nav>

      <div className="container mt-5">
        <h1>Top-Up Requests</h1>

        <div className="mt-5 mb-5 w-100 justify-content-end d-grid">
          <form action={openModal} method="get">
            <input type="hidden" name="modal" value="open" />
            <button type="submit" className="btn btn-primary">
              Add New Request
            </button>
          </form>
        </div>
        <TopUpTable
          topUpData={topUpData}
          handleDeleteTopUp={handleDeleteTopUp}
        />

        <div className="mt-3">
          <strong>Total Amount: </strong> {totalAmount}
        </div>

        <AddTopUpModal
          handleAddTopUp={handleAddTopUp}
          error={searchParams.error}
          modalOpen={modalOpen}
        />
      </div>
    </div>
  );
}
