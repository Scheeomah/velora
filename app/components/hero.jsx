import Image from "next/image";

export default function Hero() {
  return (
    <section id="home" className="w-full overflow-hidden bg-[#292421]">
      <a
        href="#shop"
        aria-label="Explore the VÉLORA collection"
        className="block"
      >
        <Image
          src="/hero-velora.png"
          alt="VÉLORA fashion campaign featuring a man in a chocolate tailored suit and a woman in an elegant ivory outfit"
          width={1680}
          height={945}
          priority
          sizes="100vw"
          className="h-auto w-full"
        />
      </a>
    </section>
  );
}
