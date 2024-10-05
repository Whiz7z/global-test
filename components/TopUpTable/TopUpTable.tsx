interface TopUpTableProps {
  topUpData: {
    id: number;
    userName: string | undefined;
    tfAccountId: string | undefined;
    amount: number;
    createDate: Date;
  }[];
  handleDeleteTopUp: (data: FormData) => void;
}

export default function TopUpTable({
  topUpData,
  handleDeleteTopUp,
}: TopUpTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>User</th>
          <th>Account</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {topUpData.map((topUp) => (
          <tr key={topUp.id}>
            <td>{topUp.userName}</td>
            <td>{topUp.tfAccountId}</td>
            <td>{topUp.amount}</td>
            <td>{topUp.createDate.toISOString()}</td>
            <td>
              <form action={handleDeleteTopUp} method="post">
                <input type="hidden" name="id" value={topUp.id} />
                <button type="submit" className="btn btn-danger btn-sm">
                  Delete
                </button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
