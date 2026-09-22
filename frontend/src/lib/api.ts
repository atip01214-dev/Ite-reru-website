/**
 * Typed API client for the ITE RERU backend (Express + Prisma).
 * All public routes use server-side fetch (Next.js Server Components).
 * Admin routes attach the JWT token stored in localStorage (client only).
 */

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// ─── Types (mirrors Prisma models) ────────────────────────────────────────────

export type HeroData = {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  tags: string[];
  highlightCwie: string;
  highlightIncome: string;
  ctaPrimary: string;
  ctaAdmission: string;
  bgImage: string;
};

export type StatData = {
  id: number;
  value: number;
  suffix: string;
  label: string;
  order: number;
};

export type AboutData = {
  id: number;
  vision: string;
  philosophy: string;
  missionPoints: string[];
  ictValues: { letter: string; term: string }[];
  awardBadge: string;
};

export type MajorData = {
  id: number;
  programId: number;
  name: string;
  detail: string;
  focus: string;
  order: number;
};

export type ProgramData = {
  id: number;
  degree: string;
  name: string;
  nameEn: string;
  badge?: string | null;
  duration?: string | null;
  credits?: string | null;
  highlights?: string[] | null;
  majors: MajorData[];
  order: number;
};

export type CourseData = {
  id: number;
  name: string;
  nameEn: string;
  icon: string;
  order: number;
};

export type OtherProgramData = {
  id: number;
  name: string;
  order: number;
};

export type CareerData = {
  id: number;
  name: string;
  order: number;
};

export type NewsCategory = "ข่าวประชาสัมพันธ์" | "กิจกรรมนักศึกษา" | "งานวิจัยและผลงาน";

export type NewsItem = {
  id: number;
  category: NewsCategory;
  date: string;
  title: string;
  excerpt: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type FacultyMember = {
  id: number;
  name: string;
  title: string;
  degree: string;
  image: string;
  expertise: string[];
  link?: string | null;
  isDean: boolean;
  order: number;
};

export type FacilityData = {
  id: number;
  name: string;
  nameEn: string;
  icon: string;
  gradient: string;
  order: number;
};

export type ContactData = {
  id: number;
  faculty: string;
  address: string;
  phone: string;
  fax: string;
  email: string;
  website: string;
};

export type PartnerData = {
  id: number;
  name: string;
  image: string;
  order: number;
};

export type NavLinkData = {
  id: number;
  label: string;
  href: string;
  order: number;
};

// ─── Fetch helpers ─────────────────────────────────────────────────────────────

async function get<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
    ...opts,
  });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("ite_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function authFetch<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? `${method} ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const api = {
  // Hero
  getHero: () => get<HeroData>("/api/hero"),
  // Stats
  getStats: () => get<StatData[]>("/api/stats"),
  // About
  getAbout: () => get<AboutData>("/api/about"),
  // Programs
  getPrograms: () => get<ProgramData[]>("/api/curriculum/programs"),
  getCourses: () => get<CourseData[]>("/api/curriculum/courses"),
  getOtherPrograms: () => get<OtherProgramData[]>("/api/curriculum/other-programs"),
  getCareers: () => get<CareerData[]>("/api/curriculum/careers"),
  // News
  getNews: (category?: string) =>
    get<NewsItem[]>(`/api/news${category ? `?category=${encodeURIComponent(category)}` : ""}`),
  getNewsItem: (id: number) => get<NewsItem>(`/api/news/${id}`),
  // Faculty
  getFaculty: () => get<FacultyMember[]>("/api/faculty"),
  getDean: () => get<FacultyMember>("/api/faculty/dean"),
  // Facilities
  getFacilities: () => get<FacilityData[]>("/api/facilities"),
  // Contact
  getContact: () => get<ContactData>("/api/contact"),
  // Partners
  getPartners: () => get<PartnerData[]>("/api/partners"),
  // NavLinks
  getNavLinks: () => get<NavLinkData[]>("/api/navlinks"),
} as const;

// ─── Admin API (requires JWT) ─────────────────────────────────────────────────

export const adminApi = {
  // Auth
  login: (username: string, password: string) =>
    authFetch<{ token: string; username: string }>("POST", "/api/auth/login", { username, password }),
  me: () => authFetch<{ adminId: number }>("GET", "/api/auth/me"),

  // Hero
  updateHero: (data: Partial<HeroData>) => authFetch<HeroData>("PUT", "/api/hero", data),

  // Stats
  updateStats: (data: Array<{ value: number; suffix: string; label: string; order?: number }>) =>
    authFetch<StatData[]>("PUT", "/api/stats", data),

  // About
  updateAbout: (data: Partial<AboutData>) => authFetch<AboutData>("PUT", "/api/about", data),

  // Programs
  createProgram: (data: Omit<ProgramData, "id" | "majors">) =>
    authFetch<ProgramData>("POST", "/api/curriculum/programs", data),
  updateProgram: (id: number, data: Partial<ProgramData>) =>
    authFetch<ProgramData>("PUT", `/api/curriculum/programs/${id}`, data),
  deleteProgram: (id: number) =>
    authFetch<{ success: boolean }>("DELETE", `/api/curriculum/programs/${id}`),
  createMajor: (programId: number, data: Omit<MajorData, "id" | "programId">) =>
    authFetch<MajorData>("POST", `/api/curriculum/programs/${programId}/majors`, data),
  updateMajor: (id: number, data: Partial<MajorData>) =>
    authFetch<MajorData>("PUT", `/api/curriculum/majors/${id}`, data),
  deleteMajor: (id: number) =>
    authFetch<{ success: boolean }>("DELETE", `/api/curriculum/majors/${id}`),
  createCourse: (data: Omit<CourseData, "id">) =>
    authFetch<CourseData>("POST", "/api/curriculum/courses", data),
  updateCourse: (id: number, data: Partial<CourseData>) =>
    authFetch<CourseData>("PUT", `/api/curriculum/courses/${id}`, data),
  deleteCourse: (id: number) =>
    authFetch<{ success: boolean }>("DELETE", `/api/curriculum/courses/${id}`),
  updateOtherPrograms: (data: { name: string }[]) =>
    authFetch<OtherProgramData[]>("PUT", "/api/curriculum/other-programs", data),
  updateCareers: (data: { name: string }[]) =>
    authFetch<CareerData[]>("PUT", "/api/curriculum/careers", data),

  // News
  createNews: (data: Omit<NewsItem, "id" | "createdAt" | "updatedAt">) =>
    authFetch<NewsItem>("POST", "/api/news", data),
  updateNews: (id: number, data: Partial<NewsItem>) =>
    authFetch<NewsItem>("PUT", `/api/news/${id}`, data),
  deleteNews: (id: number) =>
    authFetch<{ success: boolean }>("DELETE", `/api/news/${id}`),

  // Faculty
  createFaculty: (data: Omit<FacultyMember, "id" | "createdAt" | "updatedAt">) =>
    authFetch<FacultyMember>("POST", "/api/faculty", data),
  updateFaculty: (id: number, data: Partial<FacultyMember>) =>
    authFetch<FacultyMember>("PUT", `/api/faculty/${id}`, data),
  deleteFaculty: (id: number) =>
    authFetch<{ success: boolean }>("DELETE", `/api/faculty/${id}`),

  // Facilities
  createFacility: (data: Omit<FacilityData, "id">) =>
    authFetch<FacilityData>("POST", "/api/facilities", data),
  updateFacility: (id: number, data: Partial<FacilityData>) =>
    authFetch<FacilityData>("PUT", `/api/facilities/${id}`, data),
  deleteFacility: (id: number) =>
    authFetch<{ success: boolean }>("DELETE", `/api/facilities/${id}`),

  // Contact
  updateContact: (data: Partial<ContactData>) =>
    authFetch<ContactData>("PUT", "/api/contact", data),

  // Partners
  createPartner: (data: Omit<PartnerData, "id">) =>
    authFetch<PartnerData>("POST", "/api/partners", data),
  updatePartner: (id: number, data: Partial<PartnerData>) =>
    authFetch<PartnerData>("PUT", `/api/partners/${id}`, data),
  deletePartner: (id: number) =>
    authFetch<{ success: boolean }>("DELETE", `/api/partners/${id}`),

  // NavLinks
  updateNavLinks: (data: { label: string; href: string }[]) =>
    authFetch<NavLinkData[]>("PUT", "/api/navlinks", data),

  // Upload
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${BASE}/api/upload/image`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },
} as const;
