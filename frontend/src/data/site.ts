export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "หน้าแรก", href: "#home" },
  { label: "เกี่ยวกับเรา", href: "#about" },
  { label: "หลักสูตร", href: "#curriculum" },
  { label: "บุคลากร", href: "#faculty" },
  { label: "กิจกรรม/ผลงาน", href: "#news" },
  { label: "ติดต่อเรา", href: "#contact" },
];

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 450, suffix: "+", label: "นักศึกษา" },
  { value: 18, suffix: "", label: "อาจารย์ผู้เชี่ยวชาญ" },
  { value: 8, suffix: "", label: "ห้องปฏิบัติการ" },
  { value: 92, suffix: "%", label: "อัตราการได้งานทำ" },
];

export type Major = { name: string; detail: string; focus: string };

export type Program = {
  degree: string;
  name: string;
  nameEn: string;
  badge?: string;
  duration?: string;
  credits?: string;
  highlights?: string[];
  majors?: Major[];
};

export const programs: Program[] = [
  {
    degree: "วท.บ.",
    name: "วิทยาศาสตรบัณฑิต สาขาวิชาคอมพิวเตอร์และเทคโนโลยีสารสนเทศ",
    nameEn: "B.Sc. (Computer and Information Technology)",
    majors: [
      {
        name: "แขนงวิชาเทคโนโลยีสารสนเทศ",
        detail: "ม.6 เรียน 3 ปีครึ่ง · ปวส. เรียน 2 ปี",
        focus: "จุดเน้น Database Administrator",
      },
      {
        name: "แขนงวิชาเทคโนโลยีเครือข่ายและอินเทอร์เน็ต",
        detail: "เรียน 3 ปีครึ่ง",
        focus: "จุดเน้น Network Administration, Server, Network & Internet Security",
      },
    ],
  },
  {
    degree: "วศ.บ.",
    name: "วิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมคอมพิวเตอร์",
    nameEn: "B.Eng. Computer Engineering",
    badge: "หลักสูตรใหม่ (อยู่ระหว่างพัฒนา)",
    duration: "4 ปี",
    highlights: [
      "ระบบฝังตัวและอินเทอร์เน็ตของสรรพสิ่ง (IoT)",
      "สถาปัตยกรรมคอมพิวเตอร์และฮาร์ดแวร์",
      "ปัญญาประดิษฐ์และหุ่นยนต์เบื้องต้น",
    ],
  },
];

export const otherPrograms = [
  "สาขาวิชาวิทยาการคอมพิวเตอร์",
  "สาขาวิชาวิทยาการมัลติมีเดียปัญญาประดิษฐ์",
];

export const careers = [
  "Programmer/Developer",
  "System Analyst",
  "Network & Internet Administrator",
  "Web Developer",
  "Database Administrator",
  "Graphic Designer",
  "IT Support",
  "Computer Instructor",
];

export type Course = { name: string; nameEn: string; icon: string };

export const courses: Course[] = [
  { name: "วิศวกรรมซอฟต์แวร์", nameEn: "Software Engineering", icon: "code" },
  { name: "พัฒนาเว็บและมือถือ", nameEn: "Web & Mobile Dev", icon: "smartphone" },
  { name: "ความมั่นคงไซเบอร์", nameEn: "Cybersecurity", icon: "shield" },
  { name: "คลาวด์คอมพิวติ้ง", nameEn: "Cloud Computing", icon: "cloud" },
  { name: "ปัญญาประดิษฐ์และวิทยาการข้อมูล", nameEn: "AI & Data Science", icon: "brain" },
  { name: "IoT และระบบฝังตัว", nameEn: "IoT & Embedded", icon: "cpu" },
];

export type NewsCategory = "ข่าวประชาสัมพันธ์" | "กิจกรรมนักศึกษา" | "งานวิจัยและผลงาน";

export type NewsItem = {
  id: number;
  category: NewsCategory;
  date: string;
  title: string;
  excerpt: string;
  image?: string;
};

export const news: NewsItem[] = [
  {
    id: 1,
    category: "ข่าวประชาสัมพันธ์",
    date: "11 ต.ค. 2568",
    title: "รอบ \"โควตาพิเศษ\" ปีการศึกษา 2569",
    excerpt: "รับสมัครนักศึกษาใหม่รอบ Quota ตั้งแต่วันนี้ถึง 25 ตุลาคม 2568 สมัครออนไลน์ที่ admission.reru.ac.th",
    image: "/images/news/quota-2569.jpg",
  },
  {
    id: 2,
    category: "ข่าวประชาสัมพันธ์",
    date: "24 ต.ค. 2568",
    title: "สารแสดงความยินดี พิธีพระราชทานปริญญาบัตร 2568",
    excerpt: "คณะเทคโนโลยีสารสนเทศขอแสดงความยินดีกับบัณฑิต มหาบัณฑิต และดุษฎีบัณฑิต รุ่นที่ 14",
    image: "/images/news/graduation-2568.jpg",
  },
  {
    id: 3,
    category: "กิจกรรมนักศึกษา",
    date: "4 ก.ย. 2568",
    title: "ค่าย IT RERU Tech Journey: AI & IoT ครั้งที่ 1",
    excerpt: "เปิดให้ดาวน์โหลดใบเกียรติบัตรออนไลน์สำหรับผู้เข้าร่วมค่าย AI & IoT",
    image: "/images/news/tech-journey-camp.jpg",
  },
  {
    id: 4,
    category: "กิจกรรมนักศึกษา",
    date: "3 ก.ย. 2568",
    title: "ประชาสัมพันธ์คณะ ณ โรงเรียนเสลภูมิพิทยาคม",
    excerpt: "อาจารย์กล้า ภูมิพยัคฆ์ และอาจารย์เขมวิทย์ จิตตะยโศธร แนะแนวหลักสูตรให้นักเรียนชั้น ม.6",
    image: "/images/news/school-visit.jpg",
  },
  {
    id: 5,
    category: "งานวิจัยและผลงาน",
    date: "21 ส.ค. 2568",
    title: "ขับเคลื่อนสู่อนาคตด้วยนวัตกรรม",
    excerpt: "ผลงานนวัตกรรมและโครงงานของนักศึกษาและอาจารย์คณะเทคโนโลยีสารสนเทศ",
    image: "/images/news/innovation.jpg",
  },
  {
    id: 6,
    category: "งานวิจัยและผลงาน",
    date: "18 ส.ค. 2568",
    title: "Rebranding เพื่ออนาคต… ปรับ เปลี่ยน พร้อมก้าวสู่ความเป็นเลิศ",
    excerpt: "กิจกรรมการจัดการความรู้ (KM) ปรับภาพลักษณ์คณะสู่ความเป็นเลิศ",
    image: "/images/news/rebranding.jpg",
  },
  {
    id: 7,
    category: "ข่าวประชาสัมพันธ์",
    date: "9 ธ.ค. 2568",
    title: "การแข่งขัน E-Sport: ROV IT CHAMPION – RERU FAIR 2025",
    excerpt: "เปิดรับทีมแข่งขัน ROV ในงาน RERU FAIR 2025",
  },
  {
    id: 8,
    category: "ข่าวประชาสัมพันธ์",
    date: "31 มี.ค. 2569",
    title: "เปิดรับสมัครรอบรับตรง 5-6 ปีการศึกษา 2569",
    excerpt: "เรียน IT / AI / IoT / Graphics ประสบการณ์จริง มีรายได้ระหว่างเรียน (CWIE) รับสมัครถึง 29 พ.ค. 2569",
  },
];

export const newsCategories: Array<"ทั้งหมด" | NewsCategory> = [
  "ทั้งหมด",
  "ข่าวประชาสัมพันธ์",
  "กิจกรรมนักศึกษา",
  "งานวิจัยและผลงาน",
];

export type FacultyMember = {
  name: string;
  title: string;
  degree: string;
  image: string;
  expertise: string[];
  link?: string;
};

export const faculty: FacultyMember[] = [
  {
    name: "ดร.ประมูล สุขสกาวผ่อง",
    title: "ประธานหลักสูตร",
    degree: "ปร.ด. (เทคโนโลยีสารสนเทศ) มจพ.",
    image: "/images/faculty/pramool.jpg",
    expertise: ["Information Technology", "Software Dev"],
  },
  {
    name: "ดร.ธีรพล สืบชมภู",
    title: "อาจารย์",
    degree: "ปร.ด. (สารสนเทศศึกษา) ม.ขอนแก่น",
    image: "/images/faculty/theerapol.jpg",
    expertise: ["Information Science", "Computer Education"],
  },
  {
    name: "ผู้ช่วยศาสตราจารย์เชี่ยวชาญ ยางศิลา",
    title: "ผู้ช่วยศาสตราจารย์",
    degree: "วท.ม. (วิทยาการคอมพิวเตอร์) ม.ขอนแก่น",
    image: "/images/faculty/cheawchan.jpg",
    expertise: ["Computer Science", "Web Dev"],
    link: "http://cheawchan.reru.ac.th/",
  },
  {
    name: "ผู้ช่วยศาสตราจารย์ ดร.นิธิศ วังโน",
    title: "คณบดีคณะเทคโนโลยีสารสนเทศ",
    degree: "ปร.ด. (เทคโนโลยีสารสนเทศ) ม.ขอนแก่น",
    image: "/images/faculty/nithit.jpg",
    expertise: ["Information Technology", "Networks"],
  },
  {
    name: "นายเข็มชาติ สังฆะคาม",
    title: "อาจารย์พิเศษ / ผู้ทรงคุณวุฒิภายนอก",
    degree: "รองประธานเจ้าหน้าที่บริหาร ฝ่าย Innovation & System Development บมจ. สยามโกลบอลเฮ้าส์",
    image: "/images/faculty/khemchat.jpg",
    expertise: ["Innovation", "System Development"],
  },
];

export const dean = {
  name: "ผศ.ดร.นิธิศ วังโน",
  title: "คณบดีคณะเทคโนโลยีสารสนเทศ",
  image: "/images/faculty/nithit.jpg",
};

export type Facility = { name: string; nameEn: string; icon: string; gradient: string };

export const facilities: Facility[] = [
  { name: "ห้องปฏิบัติการคอมพิวเตอร์", nameEn: "Computer Lab", icon: "monitor", gradient: "from-blue-600 to-blue-800" },
  { name: "ห้องปฏิบัติการเครือข่าย", nameEn: "Network Lab", icon: "network", gradient: "from-indigo-600 to-indigo-800" },
  { name: "ห้องปฏิบัติการความมั่นคงไซเบอร์", nameEn: "Cyber Security Lab", icon: "shield", gradient: "from-amber-600 to-amber-700" },
  { name: "ห้อง IoT และนวัตกรรม", nameEn: "IoT & Maker Lab", icon: "cpu", gradient: "from-amber-500 to-amber-700" },
  { name: "พื้นที่ทำงานร่วมกัน", nameEn: "Co-Working Space", icon: "users", gradient: "from-blue-500 to-indigo-700" },
  { name: "ห้องสตูดิโอมัลติมีเดีย", nameEn: "Multimedia Studio", icon: "video", gradient: "from-indigo-600 to-blue-800" },
];

export const contact = {
  faculty: "คณะเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏร้อยเอ็ด",
  address: "113 หมู่ 12 ตำบลเกาะแก้ว อำเภอเสลภูมิ จังหวัดร้อยเอ็ด 45120",
  phone: "043-556001",
  fax: "043-556009",
  email: "ite@reru.ac.th",
  website: "https://ite.reru.ac.th",
};

export const partners = [
  { name: "ตั้งตานี กรุ๊ป", image: "/images/partner-tongtanee.jpg" },
  { name: "สวทช. (NSTDA)", image: "/images/partner-nstda.png" },
];

export const vision = "เป็นแหล่งเรียนรู้ด้านเทคโนโลยีสารสนเทศที่ได้มาตรฐานระดับชาติ";

export const missionPoints = [
  "ผลิตบัณฑิตให้มีความรู้คู่คุณธรรม มีความสามารถตามมาตรฐานวิชาชีพ",
  "ผลิตผลงานวิจัยหรืองานสร้างสรรค์ที่มีคุณภาพระดับชาติหรือนานาชาติ",
  "บริการวิชาการเพื่อเสริมสร้างความเข้มแข็งของชุมชนโดยใช้เทคโนโลยีสารสนเทศ",
  "ทำนุบำรุงศิลปวัฒนธรรม ขนบธรรมเนียมประเพณีอันดีงามของไทย",
];

export const philosophy = "โยคา เว ชายเต ภูริ (ปัญญาย่อมเกิดขึ้นเพราะการฝึกฝน)";

export const ictValues = [
  { letter: "I", term: "Innovation Productivity" },
  { letter: "C", term: "Corporation Productivity" },
  { letter: "T", term: "Technology Orientation" },
];
