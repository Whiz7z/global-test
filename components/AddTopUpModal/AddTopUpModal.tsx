import { redirect } from "next/navigation";

interface ModalProps {
  handleAddTopUp: (data: FormData) => void;
  error?: string;
  modalOpen: boolean;
}

export default function AddTopUpModal({
  handleAddTopUp,
  error,
  modalOpen,
}: ModalProps) {

  const closeModal = async() => {
    'use server';
    redirect("/dashboard");
  };
  
  return (
    <>
      <div
        className={`modal ${modalOpen ? "show" : "fade"}`}
        id="addTopUpModal"
        tabIndex={1}
        aria-labelledby="addTopUpModalLabel"
        style={{ display: modalOpen ? "grid" : "none",backdropFilter: "blur(2px)", width: "100%", height: "100%", placeContent: "center" }}
        aria-hidden={!modalOpen}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header gap-5">
              <h5 className="modal-title" id="addTopUpModalLabel">
                Add New Top-Up Request

              </h5>
              <form method="post" action={closeModal} style={{height: '100%',display:'grid'}}>
                <input type="hidden" name="closeModal" value="true" />
                <button
                  type="submit"
                  className="btn-close"
                  aria-label="Close"
                />
              </form>
            </div>
            <div className="modal-body">
              <form action={handleAddTopUp} method="post">
                <div className="mb-3">
                  <label htmlFor="accountId" className="form-label">
                    Account ID
                  </label>
                  <input
                    type="number"
                    name="accountId"
                    id="accountId"
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="form-control"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Add Request
                </button>

                {error && (
                  <div className="alert alert-danger mt-3">{error}</div>
                )}
              </form>
            </div>
          </div>
        </div>
        {/* {modalOpen && <div className="modal-backdrop show"></div>} */}
      </div>
    </>
  );
}
