import Image from "next/image";
import { CodeXml, Printer, Globe, Mail, MapPin, MessageCircle, Phone, Play, ThumbsUp } from "lucide-react";
import type { NavLinkData, ContactData, PartnerData } from "@/lib/api";

interface FooterProps {
  navLinks: NavLinkData[];
  contact: ContactData;
  partners: PartnerData[];
}

export default function Footer({ navLinks, contact, partners }: FooterProps) {
  return (
    <footer id="contact">
      <div className="bg-blue-50/60 py-12 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h4 className="text-center font-bold text-blue-900 dark:text-white">
            ความร่วมมือกับหน่วยงานภายนอก
          </h4>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {partners.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-white/5"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  width={120}
                  height={40}
                  className="h-10 w-auto max-w-[120px] rounded-lg object-contain"
                />
                <span className="text-sm font-medium text-blue-900 dark:text-slate-200">
                  {p.name}
                </span>
              </div>
            ))}
            <span className="rounded-full border-2 border-dashed border-yellow-400 px-4 py-2 text-sm font-bold text-amber-600 dark:text-yellow-400">
              NCSA
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#0B1E3F] pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo-it-reru.jpg"
                  alt="ITE RERU"
                  width={34}
                  height={45}
                  className="h-11 w-auto rounded-md"
                />
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-white">ITE RERU</span>
                  <span className="block text-[11px] text-blue-200/70">
                    Roi Et Rajabhat University
                  </span>
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-blue-100/80">
                สาขาวิชาวิศวกรรมคอมพิวเตอร์และเทคโนโลยีสารสนเทศ
                มุ่งผลิตบัณฑิตดิจิทัลคุณภาพเพื่ออนาคต
              </p>
            </div>

            <div>
              <h4 className="font-bold text-yellow-400">ลิงก์ด่วน</h4>
              <ul className="mt-4 space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-sm text-blue-100/80 transition hover:text-yellow-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-yellow-400">ติดต่อเรา</h4>
              <ul className="mt-4 space-y-3 text-sm text-blue-100/80">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
                  <span>
                    {contact.faculty}
                    <br />
                    {contact.address}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-yellow-400" />
                  โทร. {contact.phone}
                </li>
                <li className="flex items-center gap-2">
                  <Printer className="h-4 w-4 shrink-0 text-yellow-400" />
                  โทรสาร {contact.fax}
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-yellow-400" />
                  {contact.email}
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 shrink-0 text-yellow-400" />
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-yellow-400"
                  >
                    ite.reru.ac.th
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-yellow-400">ติดตามเรา</h4>
              <div className="mt-4 flex gap-3">
                {[
                  { icon: ThumbsUp, label: "Facebook" },
                  { icon: Play, label: "YouTube" },
                  { icon: CodeXml, label: "GitHub" },
                  { icon: MessageCircle, label: "Line" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#contact"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-blue-100 transition hover:scale-110 hover:border-yellow-400 hover:text-yellow-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-blue-200/60">
            © 2026 ITE RERU. All rights reserved.
            <div className="mt-2">
              <a
                href="/admin/login"
                className="text-xs text-blue-200/50 transition hover:text-yellow-400"
              >
                เข้าสู่ระบบผู้ดูแล (Admin)
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
