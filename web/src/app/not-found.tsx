import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow justify-center">404</span>
      <h1 className="my-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)]">This horizon is uncharted</h1>
      <p className="mb-8 max-w-md text-lg text-sand">The page you seek doesn&apos;t exist — but new opportunities always await.</p>
      <Link href="/" className="btn btn-gold">Return home</Link>
    </section>
  );
}
