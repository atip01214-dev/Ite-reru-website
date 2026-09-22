import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin User ────────────────────────────────────────────────────────────
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "ite2026";
  const hash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { username },
    update: { passwordHash: hash },
    create: { username, passwordHash: hash },
  });
  console.log("✅ Admin user created");

  // ─── Nav Links ─────────────────────────────────────────────────────────────
  await prisma.navLink.deleteMany();
  await prisma.navLink.createMany({
    data: [
      { label: "หน้าแรก", href: "#home", order: 0 },
      { label: "เกี่ยวกับเรา", href: "#about", order: 1 },
      { label: "หลักสูตร", href: "#curriculum", order: 2 },
      { label: "บุคลากร", href: "#faculty", order: 3 },
      { label: "กิจกรรม/ผลงาน", href: "#news", order: 4 },
      { label: "ติดต่อเรา", href: "#contact", order: 5 },
    ],
  });
  console.log("✅ Nav links seeded");

  // ─── Hero ──────────────────────────────────────────────────────────────────
  await prisma.hero.deleteMany();
  await prisma.hero.create({
    data: {
      badge: "รับสมัครนักศึกษาใหม่ ปีการศึกษา 2569 · รอบรับตรง 5-6 ถึง 29 พ.ค. 2569",
      title: "สาขาวิชาวิศวกรรมคอมพิวเตอร์และเทคโนโลยีสารสนเทศ",
      subtitle: "Innovate, Cyber Security, Software Engineering & AI for the Future",
      tags: JSON.stringify(["AI", "Cybersecurity", "Cloud", "IoT"]),
      highlightCwie: "CWIE เรียนควบคู่ทำงานจริง",
      highlightIncome: "มีรายได้ระหว่างเรียน",
      ctaPrimary: "ดูหลักสูตรการศึกษา",
      ctaAdmission: "https://admission.reru.ac.th",
      bgImage: "/images/hero-bg.png",
    },
  });
  console.log("✅ Hero seeded");

  // ─── Stats ─────────────────────────────────────────────────────────────────
  await prisma.stat.deleteMany();
  await prisma.stat.createMany({
    data: [
      { value: 450, suffix: "+", label: "นักศึกษา", order: 0 },
      { value: 18, suffix: "", label: "อาจารย์ผู้เชี่ยวชาญ", order: 1 },
      { value: 8, suffix: "", label: "ห้องปฏิบัติการ", order: 2 },
      { value: 92, suffix: "%", label: "อัตราการได้งานทำ", order: 3 },
    ],
  });
  console.log("✅ Stats seeded");

  // ─── About ─────────────────────────────────────────────────────────────────
  await prisma.about.deleteMany();
  await prisma.about.create({
    data: {
      vision: "เป็นแหล่งเรียนรู้ด้านเทคโนโลยีสารสนเทศที่ได้มาตรฐานระดับชาติ",
      philosophy: "โยคา เว ชายเต ภูริ (ปัญญาย่อมเกิดขึ้นเพราะการฝึกฝน)",
      missionPoints: JSON.stringify([
        "ผลิตบัณฑิตให้มีความรู้คู่คุณธรรม มีความสามารถตามมาตรฐานวิชาชีพ",
        "ผลิตผลงานวิจัยหรืองานสร้างสรรค์ที่มีคุณภาพระดับชาติหรือนานาชาติ",
        "บริการวิชาการเพื่อเสริมสร้างความเข้มแข็งของชุมชนโดยใช้เทคโนโลยีสารสนเทศ",
        "ทำนุบำรุงศิลปวัฒนธรรม ขนบธรรมเนียมประเพณีอันดีงามของไทย",
      ]),
      ictValues: JSON.stringify([
        { letter: "I", term: "Innovation Productivity" },
        { letter: "C", term: "Corporation Productivity" },
        { letter: "T", term: "Technology Orientation" },
      ]),
      awardBadge: "Top 10 สถาบันราชภัฏด้านไอที (TER 2020)",
    },
  });
  console.log("✅ About seeded");

  // ─── Programs ──────────────────────────────────────────────────────────────
  await prisma.major.deleteMany();
  await prisma.program.deleteMany();

  const prog1 = await prisma.program.create({
    data: {
      degree: "วท.บ.",
      name: "วิทยาศาสตรบัณฑิต สาขาวิชาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ",
      nameEn: "B.Sc. (Computer and Information Technology)",
      order: 0,
    },
  });
  await prisma.major.createMany({
    data: [
      {
        programId: prog1.id,
        name: "แขนงวิชาเทคโนโลยีสารสนเทศ",
        detail: "ม.6 เรียน 3 ปีครึ่ง · ปวส. เรียน 2 ปี",
        focus: "จุดเน้น Database Administrator",
        order: 0,
      },
      {
        programId: prog1.id,
        name: "แขนงวิชาเทคโนโลยีเครือข่ายและอินเทอร์เน็ต",
        detail: "เรียน 3 ปีครึ่ง",
        focus: "จุดเน้น Network Administration, Server, Network & Internet Security",
        order: 1,
      },
    ],
  });

  await prisma.program.create({
    data: {
      degree: "วศ.บ.",
      name: "วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมคอมพิวเตอร์",
      nameEn: "B.Eng. Computer Engineering",
      badge: "หลักสูตรใหม่ (อยู่ระหว่างพัฒนา)",
      duration: "4 ปี",
      highlights: JSON.stringify([
        "ระบบฝังตัวและอินเทอร์เน็ตของสรรพสิ่ง (IoT)",
        "สถาปัตยกรรมคอมพิวเตอร์และฮาร์ดแวร์",
        "ปัญญาประดิษฐ์และหุ่นยนต์เบื้องต้น",
      ]),
      order: 1,
    },
  });
  console.log("✅ Programs seeded");

  // ─── Other Programs ────────────────────────────────────────────────────────
  await prisma.otherProgram.deleteMany();
  await prisma.otherProgram.createMany({
    data: [
      { name: "สาขาวิชาวิทยาการคอมพิวเตอร์", order: 0 },
      { name: "สาขาวิชาวิทยาการมัลติมีเดียปัญญาประดิษฐ์", order: 1 },
    ],
  });

  // ─── Courses ───────────────────────────────────────────────────────────────
  await prisma.course.deleteMany();
  await prisma.course.createMany({
    data: [
      { name: "วิศวกรรมซอฟต์แวร์", nameEn: "Software Engineering", icon: "code", order: 0 },
      { name: "พัฒนาเว็บและมือถือ", nameEn: "Web & Mobile Dev", icon: "smartphone", order: 1 },
      { name: "ความมั่นคงไซเบอร์", nameEn: "Cybersecurity", icon: "shield", order: 2 },
      { name: "คลาวด์คอมพิวติ้ง", nameEn: "Cloud Computing", icon: "cloud", order: 3 },
      { name: "ปัญญาประดิษฐ์และวิทยาการข้อมูล", nameEn: "AI & Data Science", icon: "brain", order: 4 },
      { name: "IoT และระบบฝังตัว", nameEn: "IoT & Embedded", icon: "cpu", order: 5 },
    ],
  });

  // ─── Careers ───────────────────────────────────────────────────────────────
  await prisma.career.deleteMany();
  const careerNames = [
    "Programmer/Developer",
    "System Analyst",
    "Network & Internet Administrator",
    "Web Developer",
    "Database Administrator",
    "Graphic Designer",
    "IT Support",
    "Computer Instructor",
  ];
  await prisma.career.createMany({
    data: careerNames.map((name, i) => ({ name, order: i })),
  });
  console.log("✅ Curriculum seeded");

  // ─── News ──────────────────────────────────────────────────────────────────
  await prisma.news.deleteMany();
  await prisma.news.createMany({
    data: [
      {
        category: "ข่าวประชาสัมพันธ์",
        date: "11 ต.ค. 2568",
        title: "รอบ \"โควตาพิเศษ\" ปีการศึกษา 2569",
        excerpt: "รับสมัครนักศึกษาใหม่รอบ Quota ตั้งแต่วันนี้ถึง 25 ตุลาคม 2568 สมัครออนไลน์ที่ admission.reru.ac.th",
        image: "/images/news/quota-2569.jpg",
      },
      {
        category: "ข่าวประชาสัมพันธ์",
        date: "24 ต.ค. 2568",
        title: "สารแสดงความยินดี พิธีพระราชทานปริญญาบัตร 2568",
        excerpt: "คณะเทคโนโลยีสารสนเทศขอแสดงความยินดีกับบัณฑิต มหาบัณฑิต และดุษฎีบัณฑิต รุ่นที่ 14",
        image: "/images/news/graduation-2568.jpg",
      },
      {
        category: "กิจกรรมนักศึกษา",
        date: "4 ก.ย. 2568",
        title: "ค่าย IT RERU Tech Journey: AI & IoT ครั้งที่ 1",
        excerpt: "เปิดให้ดาวน์โหลดใบเกียรติบัตรออนไลน์สำหรับผู้เข้าร่วมค่าย AI & IoT",
        image: "/images/news/tech-journey-camp.jpg",
      },
      {
        category: "กิจกรรมนักศึกษา",
        date: "3 ก.ย. 2568",
        title: "ประชาสัมพันธ์คณะ ณ โรงเรียนเสลภูมิพิทยาคม",
        excerpt: "อาจารย์กล้า ภูมิพยัคฆ์ และอาจารย์เขมวิทย์ จิตตะยโศธร แนะแนวหลักสูตรให้นักเรียนชั้น ม.6",
        image: "/images/news/school-visit.jpg",
      },
      {
        category: "งานวิจัยและผลงาน",
        date: "21 ส.ค. 2568",
        title: "ขับเคลื่อนสู่อนาคตด้วยนวัตกรรม",
        excerpt: "ผลงานนวัตกรรมและโครงงานของนักศึกษาและอาจารย์คณะเทคโนโลยีสารสนเทศ",
        image: "/images/news/innovation.jpg",
      },
      {
        category: "งานวิจัยและผลงาน",
        date: "18 ส.ค. 2568",
        title: "Rebranding เพื่ออนาคต… ปรับ เปลี่ยน พร้อมก้าวสู่ความเป็นเลิศ",
        excerpt: "กิจกรรมการจัดการความรู้ (KM) ปรับภาพลักษณ์คณะสู่ความเป็นเลิศ",
        image: "/images/news/rebranding.jpg",
      },
      {
        category: "ข่าวประชาสัมพันธ์",
        date: "9 ธ.ค. 2568",
        title: "การแข่งขัน E-Sport: ROV IT CHAMPION – RERU FAIR 2025",
        excerpt: "เปิดรับทีมแข่งขัน ROV ในงาน RERU FAIR 2025",
      },
      {
        category: "ข่าวประชาสัมพันธ์",
        date: "31 มี.ค. 2569",
        title: "เปิดรับสมัครรอบรับตรง 5-6 ปีการศึกษา 2569",
        excerpt: "เรียน IT / AI / IoT / Graphics ประสบการณ์จริง มีรายได้ระหว่างเรียน (CWIE) รับสมัครถึง 29 พ.ค. 2569",
      },
    ],
  });
  console.log("✅ News seeded");

  // ─── Faculty ───────────────────────────────────────────────────────────────
  await prisma.faculty.deleteMany();
  await prisma.faculty.createMany({
    data: [
      {
        name: "ดร.ประมูล สุขสกาวผ่อง",
        title: "ประธานหลักสูตร",
        degree: "ปร.ด. (เทคโนโลยีสารสนเทศ) มจพ.",
        image: "/images/faculty/pramool.jpg",
        expertise: JSON.stringify(["Information Technology", "Software Dev"]),
        isDean: false,
        order: 0,
      },
      {
        name: "ดร.ธีรพล สืบชมภู",
        title: "อาจารย์",
        degree: "ปร.ด. (สารสนเทศศึกษา) ม.ขอนแก่น",
        image: "/images/faculty/theerapol.jpg",
        expertise: JSON.stringify(["Information Science", "Computer Education"]),
        isDean: false,
        order: 1,
      },
      {
        name: "ผู้ช่วยศาสตราจารย์เชี่ยวชาญ ยางศิลา",
        title: "ผู้ช่วยศาสตราจารย์",
        degree: "วท.ม. (วิทยาการคอมพิวเตอร์) ม.ขอนแก่น",
        image: "/images/faculty/cheawchan.jpg",
        expertise: JSON.stringify(["Computer Science", "Web Dev"]),
        link: "http://cheawchan.reru.ac.th/",
        isDean: false,
        order: 2,
      },
      {
        name: "ผู้ช่วยศาสตราจารย์ ดร.นิธิศ วังโน",
        title: "คณบดีคณะเทคโนโลยีสารสนเทศ",
        degree: "ปร.ด. (เทคโนโลยีสารสนเทศ) ม.ขอนแก่น",
        image: "/images/faculty/nithit.jpg",
        expertise: JSON.stringify(["Information Technology", "Networks"]),
        isDean: true,
        order: 3,
      },
      {
        name: "นายเข็มชาติ สังฆะคาม",
        title: "อาจารย์พิเศษ / ผู้ทรงคุณวุฒิภายนอก",
        degree: "รองประธานเจ้าหน้าที่บริหาร ฝ่าย Innovation & System Development บมจ. สยามโกลบอลเฮ้าส์",
        image: "/images/faculty/khemchat.jpg",
        expertise: JSON.stringify(["Innovation", "System Development"]),
        isDean: false,
        order: 4,
      },
    ],
  });
  console.log("✅ Faculty seeded");

  // ─── Facilities ────────────────────────────────────────────────────────────
  await prisma.facility.deleteMany();
  await prisma.facility.createMany({
    data: [
      { name: "ห้องปฏิบัติการคอมพิวเตอร์", nameEn: "Computer Lab", icon: "monitor", gradient: "from-blue-600 to-blue-800", order: 0 },
      { name: "ห้องปฏิบัติการเครือข่าย", nameEn: "Network Lab", icon: "network", gradient: "from-indigo-600 to-indigo-800", order: 1 },
      { name: "ห้องปฏิบัติการความมั่นคงไซเบอร์", nameEn: "Cyber Security Lab", icon: "shield", gradient: "from-amber-600 to-amber-700", order: 2 },
      { name: "ห้อง IoT และนวัตกรรม", nameEn: "IoT & Maker Lab", icon: "cpu", gradient: "from-amber-500 to-amber-700", order: 3 },
      { name: "พื้นที่ทำงานร่วมกัน", nameEn: "Co-Working Space", icon: "users", gradient: "from-blue-500 to-indigo-700", order: 4 },
      { name: "ห้องสตูดิโอมัลติมีเดีย", nameEn: "Multimedia Studio", icon: "video", gradient: "from-indigo-600 to-blue-800", order: 5 },
    ],
  });
  console.log("✅ Facilities seeded");

  // ─── Contact ───────────────────────────────────────────────────────────────
  await prisma.contact.deleteMany();
  await prisma.contact.create({
    data: {
      faculty: "คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏร้อยเอ็ด",
      address: "113 หมู่ 12 ตำบลเกาะแก้ว อำเภอเสลภูมิ จังหวัดร้อยเอ็ด 45120",
      phone: "043-556001",
      fax: "043-556009",
      email: "ite@reru.ac.th",
      website: "https://ite.reru.ac.th",
    },
  });
  console.log("✅ Contact seeded");

  // ─── Partners ──────────────────────────────────────────────────────────────
  await prisma.partner.deleteMany();
  await prisma.partner.createMany({
    data: [
      { name: "ตั้งตานี กรุ๊ป", image: "/images/partner-tongtanee.jpg", order: 0 },
      { name: "สวทช. (NSTDA)", image: "/images/partner-nstda.png", order: 1 },
    ],
  });
  console.log("✅ Partners seeded");

  console.log("\n🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
