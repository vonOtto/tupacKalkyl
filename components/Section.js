export default function Section({ id, title, items, renderItem }) {
    return (
      <section id={id} className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <ul className="space-y-2">
          {items.map(renderItem)}
        </ul>
      </section>
    );
  }
  