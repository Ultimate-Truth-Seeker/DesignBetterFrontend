import Hero from "@/components/Hero";
import { TemplateCarousel } from "@/components/template-carousel";
import { sampleTemplates } from "@/types/template";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto mb-6 max-w-xl rounded-xl border bg-white px-6 py-3 text-center shadow-sm">
          <h2 className="text-base font-medium text-gray-800">Explora Plantillas Recomendadas</h2>
        </div>
        <TemplateCarousel title="" templates={sampleTemplates.slice(0, 8)} />
      </section>
    </>
  );
}