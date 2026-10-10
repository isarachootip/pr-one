import { company } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 px-6 py-7 text-sm text-dim">
        <span>
          © {new Date().getFullYear()} {company.name} · Tax ID {company.taxId}
        </span>
        <span>Events · PR · Lead Generation · Creative — Bangkok, Thailand</span>
      </div>
    </footer>
  );
}
