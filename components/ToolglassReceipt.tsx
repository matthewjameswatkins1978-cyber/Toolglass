type ReceiptRow = { label: string; value: string };

export default function ToolglassReceipt({ rows }: { rows: ReceiptRow[] }) {
  return (
    <section className="receipt" aria-label="Toolglass evidence receipt">
      <div className="receipt-head">
        <span>TOOLGLASS RECEIPT</span>
        <span aria-hidden="true">/ / /</span>
      </div>
      <dl>
        {rows.map((row, index) => (
          <div key={`${row.label}-${index}`}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
