export default function Hero() {
  return (
    <section className="py-12">
      <h1 className="text-4xl font-bold text-center">
        Descubra as melhores <br />
        receitas culinárias
      </h1>
      <p className="text-center text-muted-foreground">Para o seu paladar</p>
      <form className="container flex gap-2 mt-4 max-w-2xl mx-auto">
        <input
          type="search"
          className="border border-input w-full py-2 px-3 rounded-md"
          placeholder="O que você deseja hoje?"
        />
        <button className="py-2 px-4 rounded-md font-semibold bg-primary text-muted">
          Pesquisar
        </button>
      </form>
    </section>
  );
}
